// Biên dịch timing một tập: script.md + voice-manifest.json + words-asr.json + storyboard.json
//   -> words.json (mốc từng từ hiển thị, giây) và timeline.json (frame cho Remotion/FFmpeg).
//
//   node pipeline/compile/compile-timeline.mjs episodes/EP002-cache-hit-miss
//
// Lỗi cấu trúc (lời hiển thị không khớp lời đọc, anchor không tìm thấy) dừng ngay kèm thông báo;
// không có fallback âm thầm về đầu cảnh.
import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const episodeDir = process.argv[2];
if (!episodeDir) throw new Error('Cách dùng: node compile-timeline.mjs <thư mục tập>');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const fail = (msg) => {
  console.error(`LỖI: ${msg}`);
  process.exit(1);
};

const norm = (s) => s.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}]/gu, '');
const syllablesOf = (s) => s.split(/[\s-]+/).map(norm).filter(Boolean);

// ---------- script.md ----------
const scriptLines = [];
for (const row of readFileSync(join(episodeDir, 'script.md'), 'utf8').split(/\r?\n/)) {
  const c = row.trim().replace(/^\||\|$/g, '').split('|').map((x) => x.trim());
  if (c.length === 4 && /^L\d+$/.test(c[0])) scriptLines.push({id: c[0], scene: c[1], text: c[2], say: c[3]});
}
if (!scriptLines.length) fail('script.md không có hàng lời đọc.');

const pron = readJson(join(episodeDir, 'pronunciation.json')).map;
const manifest = readJson(join(episodeDir, 'voice-manifest.json'));
const asr = readJson(join(episodeDir, 'words-asr.json'));
const storyboard = readJson(join(episodeDir, 'storyboard.json'));
const channel = readJson(join(episodeDir, '..', '..', 'config', 'channel.json'));
const {fps, width, height} = channel.format;

// Whisper hay trả từ dài 0 giây ngay sau chỗ ngắt; kéo ngược start về tối đa 0,18 s (không vượt cuối từ trước)
for (const ws of Object.values(asr.lines)) {
  ws.forEach((w, i) => {
    if (w.end - w.start < 0.08) w.start = Math.max(i ? ws[i - 1].end : 0, w.end - 0.18);
  });
}

const manifestById = new Map(manifest.lines.map((l) => [l.id, l]));

// ---------- bước 1: map từ hiển thị -> âm tiết lời đọc ----------
function mapDisplayToSay(line) {
  const display = line.text.split(/\s+/).filter(Boolean);
  const say = syllablesOf(line.say);
  const out = [];
  let pos = 0;
  for (const token of display) {
    const key = norm(token);
    const expected = pron[key] ? syllablesOf(pron[key]) : [key];
    const got = say.slice(pos, pos + expected.length);
    if (got.join('|') !== expected.join('|')) {
      fail(`${line.id}: từ hiển thị "${token}" cần đọc "${expected.join(' ')}" nhưng lời đọc ở vị trí ${pos} là "${got.join(' ')}". Sửa script.md (cột say) hoặc pronunciation.json.`);
    }
    out.push({text: token, key, sayStart: pos, sayEnd: pos + expected.length});
    pos += expected.length;
  }
  if (pos !== say.length) fail(`${line.id}: lời đọc còn dư âm tiết sau từ hiển thị cuối: "${say.slice(pos).join(' ')}".`);
  return {tokens: out, say};
}

// ---------- bước 2: căn âm tiết lời đọc với từ ASR ----------
function alignSyllables(say, asrWords, lineDur) {
  const a = say;
  const b = asrWords.map((w) => norm(w.word));
  const n = a.length;
  const m = b.length;
  const dp = Array.from({length: n + 1}, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const match = new Array(n).fill(-1);
  for (let i = 0, j = 0; i < n && j < m;) {
    if (a[i] === b[j]) match[i++] = j++;
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  // khoảng chưa khớp: nếu số âm tiết = số từ ASR trong khoảng thì ghép theo vị trí, ngược lại nội suy
  const res = new Array(n);
  let i = 0;
  let prevJ = -1;
  let prevEnd = 0;
  while (i < n) {
    if (match[i] >= 0) {
      const w = asrWords[match[i]];
      res[i] = {start: w.start, end: w.end, origin: 'asr'};
      prevJ = match[i];
      prevEnd = w.end;
      i++;
      continue;
    }
    let k = i;
    while (k < n && match[k] < 0) k++;
    const nextJ = k < n ? match[k] : m;
    const gapAsr = asrWords.slice(prevJ + 1, nextJ);
    const gapN = k - i;
    if (gapAsr.length === gapN) {
      for (let t = 0; t < gapN; t++) res[i + t] = {start: gapAsr[t].start, end: gapAsr[t].end, origin: 'asr'};
    } else {
      const t0 = prevEnd;
      const t1 = k < n ? asrWords[match[k]].start : lineDur;
      const step = (t1 - t0) / gapN;
      for (let t = 0; t < gapN; t++) res[i + t] = {start: t0 + t * step, end: t0 + (t + 1) * step, origin: 'estimated'};
    }
    prevEnd = res[k - 1].end;
    i = k;
  }
  return res;
}

// ---------- bước 3: từ hiển thị với mốc tuyệt đối ----------
const f = (sec) => Math.round(sec * fps);
const words = [];
const wordsOut = [];
const stats = {asr: 0, estimated: 0};
for (const line of scriptLines) {
  const m = manifestById.get(line.id);
  if (!m) fail(`voice-manifest.json thiếu dòng ${line.id}. Chạy lại generate-voice.py.`);
  const asrWords = asr.lines[line.id];
  if (!asrWords) fail(`words-asr.json thiếu dòng ${line.id}. Chạy lại transcribe-words.py.`);
  const {tokens, say} = mapDisplayToSay(line);
  const syl = alignSyllables(say, asrWords, m.durationSec);
  tokens.forEach((t, index) => {
    const part = syl.slice(t.sayStart, t.sayEnd);
    const origin = part.every((p) => p.origin === 'asr') ? 'asr' : 'estimated';
    const start = m.startSec + part[0].start;
    const end = m.startSec + part[part.length - 1].end;
    stats[origin]++;
    wordsOut.push({lineId: line.id, index, displayToken: t.text, key: t.key, start: +start.toFixed(3), end: +end.toFixed(3), origin, reviewStatus: 'unreviewed'});
    words.push({lineId: line.id, index, text: t.text, key: t.key, startFrame: f(start), endFrame: Math.max(f(end), f(start) + 1), origin});
  });
}

// ---------- cue ----------
const cues = {};
for (const c of storyboard.cues) {
  if (cues[c.name] !== undefined) fail(`cue "${c.name}" bị trùng.`);
  const candidates = words.filter((w) => w.lineId === c.lineId && w.key === norm(c.token));
  const w = candidates[(c.occurrence ?? 1) - 1];
  if (!w) {
    const have = words.filter((x) => x.lineId === c.lineId).map((x) => x.key).join(' ');
    fail(`cue "${c.name}": không thấy từ "${c.token}" lần thứ ${c.occurrence ?? 1} trong ${c.lineId}. Các từ có: ${have}`);
  }
  cues[c.name] = Math.max(0, w.startFrame + f(c.offsetSec ?? 0));
}
const sfx = storyboard.sfx.map((s) => {
  if (cues[s.cue] === undefined) fail(`sfx ${s.name}: cue "${s.cue}" không tồn tại.`);
  return {name: s.name, frame: cues[s.cue], volume: s.volume};
});

// ---------- caption: cụm <= 26 ký tự, ngắt ở dấu câu ----------
const captions = [];
for (const line of scriptLines) {
  const lw = words.map((w, idx) => ({w, idx})).filter((x) => x.w.lineId === line.id);
  const groups = [];
  let cur = [];
  const len = (g) => g.map((x) => x.w.text).join(' ').length;
  for (const item of lw) {
    if (cur.length && len([...cur, item]) > 26) {
      groups.push(cur);
      cur = [];
    }
    cur.push(item);
    if (/[,.:;?!…]$/.test(item.w.text)) {
      groups.push(cur);
      cur = [];
    }
  }
  if (cur.length) groups.push(cur);
  // cụm cuối chỉ 1 từ thì dồn vào cụm trước nếu không quá dài
  if (groups.length > 1 && groups[groups.length - 1].length === 1 && len([...groups[groups.length - 2], ...groups[groups.length - 1]]) <= 32) {
    groups[groups.length - 2].push(...groups.pop());
  }
  groups.forEach((g, gi) => {
    const next = groups[gi + 1];
    const startFrame = g[0].w.startFrame;
    const lastEnd = g[g.length - 1].w.endFrame;
    const endFrame = next ? Math.max(lastEnd, next[0].w.startFrame) : lastEnd + f(0.2);
    captions.push({id: `${line.id}-${gi + 1}`, lineId: line.id, startFrame, endFrame, wordIndexes: g.map((x) => x.idx)});
  });
}

// ---------- kiểm tra bounds ----------
const totalFrames = f(manifest.totalDurationSec + storyboard.tailSec);
for (const w of words) {
  if (w.endFrame > totalFrames || w.startFrame < 0) fail(`từ "${w.text}" (${w.lineId}) ngoài khoảng video.`);
}
for (let i = 1; i < words.length; i++) {
  if (words[i].startFrame < words[i - 1].startFrame) fail(`mốc từ không tăng dần tại "${words[i].text}" (${words[i].lineId}).`);
}

const lines = scriptLines.map((l) => {
  const m = manifestById.get(l.id);
  return {id: l.id, startFrame: f(m.startSec), endFrame: f(m.endSec)};
});

writeFileSync(join(episodeDir, 'words.json'), JSON.stringify({schemaVersion: 1, asrModel: asr.model, words: wordsOut}, null, 2) + '\n');
writeFileSync(
  join(episodeDir, 'timeline.json'),
  JSON.stringify(
    {schemaVersion: 1, episodeId: storyboard.episodeId, fps, width, height, totalFrames, cornerLabel: channel.brand?.cornerLabel ?? null, lines, words, captions, cues, sfx},
    null,
    2,
  ) + '\n',
);
console.log(`words: ${words.length} (asr ${stats.asr}, estimated ${stats.estimated}); captions: ${captions.length}; cues: ${Object.keys(cues).length}; totalFrames: ${totalFrames} (${(totalFrames / fps).toFixed(1)}s)`);
