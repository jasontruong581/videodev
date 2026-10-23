// QC bản xuất cuối của một tập: metadata, loudness, bounds timeline, contact sheet.
//
//   node pipeline/qa/qc-episode.mjs episodes/EP002-cache-hit-miss
//
// Ghi <episode>/qc.json (kèm sha256 của final.mp4 để gắn approval) và renders/<id>/contact-sheet.jpg.
// Script chỉ kiểm máy được; nghe toàn bộ và xem trên điện thoại vẫn là việc của người duyệt.
import {createHash} from 'node:crypto';
import {readFileSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {basename, join, resolve} from 'node:path';

const episodeDir = resolve(process.argv[2] ?? '');
const id = basename(episodeDir).split('-')[0];
const root = resolve(episodeDir, '..', '..');
const final = join(root, 'renders', id, 'final.mp4');
const timeline = JSON.parse(readFileSync(join(episodeDir, 'timeline.json'), 'utf8'));
const channel = JSON.parse(readFileSync(join(root, 'config', 'channel.json'), 'utf8'));

const run = (cmd, args) => {
  const r = spawnSync(cmd, args, {encoding: 'utf8'});
  if (r.status !== 0) throw new Error(`${cmd} lỗi: ${r.stderr}`);
  return r;
};

const probe = JSON.parse(run('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', final]).stdout);
const v = probe.streams.find((s) => s.codec_type === 'video');
const a = probe.streams.find((s) => s.codec_type === 'audio');
const duration = Number(probe.format.duration);

const ebu = run('ffmpeg', ['-hide_banner', '-nostats', '-i', final, '-af', 'ebur128=peak=true', '-f', 'null', '-']).stderr;
const summary = ebu.slice(ebu.lastIndexOf('Summary:'));
const num = (re) => Number(summary.match(re)?.[1]);
const loudness = {integratedLufs: num(/I:\s+(-?[\d.]+) LUFS/), truePeakDbtp: num(/Peak:\s+(-?[\d.]+) dBFS/), lra: num(/LRA:\s+([\d.]+) LU/)};

const checks = [];
const check = (name, pass, detail) => checks.push({name, pass, detail});
check('codec h264 + aac', v?.codec_name === 'h264' && a?.codec_name === 'aac', `${v?.codec_name}/${a?.codec_name}`);
check('1080x1920', v?.width === 1080 && v?.height === 1920, `${v?.width}x${v?.height}`);
check('30 fps', v?.r_frame_rate === '30/1', v?.r_frame_rate);
check(`thời lượng <= ${channel.format.maximumSeconds}s`, duration <= channel.format.maximumSeconds, `${duration.toFixed(2)}s`);
check('thời lượng khớp timeline', Math.abs(duration - timeline.totalFrames / timeline.fps) < 0.1, `${duration.toFixed(2)}s vs ${(timeline.totalFrames / timeline.fps).toFixed(2)}s`);
check('true peak <= -1 dBTP', loudness.truePeakDbtp <= -1, `${loudness.truePeakDbtp} dBTP`);
check('loudness khoảng -14 LUFS (±2)', Math.abs(loudness.integratedLufs + 14) <= 2, `${loudness.integratedLufs} LUFS`);
check('mốc từ tăng dần và trong video', timeline.words.every((w, i) => w.startFrame >= 0 && w.endFrame <= timeline.totalFrames && w.endFrame > w.startFrame && (i === 0 || w.startFrame >= timeline.words[i - 1].startFrame)), `${timeline.words.length} từ`);
check('caption trong video, không chồng nhau', timeline.captions.every((c, i) => c.endFrame <= timeline.totalFrames && (i === 0 || c.startFrame >= timeline.captions[i - 1].startFrame) && (i === 0 || timeline.captions[i - 1].endFrame <= c.startFrame + 1)), `${timeline.captions.length} cụm`);
const estimated = timeline.words.filter((w) => w.origin === 'estimated').length;
check('từ timing estimated', estimated === 0, `${estimated} từ estimated`);

// contact sheet: khung đầu, các cue chính, khung cuối
const marks = [0, ...['appIn', 'cacheIn', 'dbData', 'r1Miss', 'r1Fill', 'notError', 'r2Hit', 'dbDim', 'cacheStale', 'recapMiss', 'outroIn'].map((k) => timeline.cues[k] + 20), timeline.totalFrames - 1].filter((f) => f !== undefined);
const sheet = join(root, 'renders', id, 'contact-sheet.jpg');
const select = marks.map((f) => `eq(n\\,${f})`).join('+');
run('ffmpeg', ['-hide_banner', '-y', '-i', final, '-vf', `select='${select}',scale=270:-1,tile=7x2`, '-frames:v', '1', '-fps_mode', 'passthrough', sheet]);

const sha256 = createHash('sha256').update(readFileSync(final)).digest('hex');
const qc = {schemaVersion: 1, episodeId: timeline.episodeId, finalFile: 'renders/' + id + '/final.mp4', sha256, durationSec: +duration.toFixed(3), loudness, checks, allPassed: checks.every((c) => c.pass), contactSheet: 'renders/' + id + '/contact-sheet.jpg'};
writeFileSync(join(episodeDir, 'qc.json'), JSON.stringify(qc, null, 2) + '\n');
for (const c of checks) console.log(`${c.pass ? 'OK  ' : 'FAIL'} ${c.name}: ${c.detail}`);
console.log(`sha256: ${sha256}`);
process.exit(qc.allPassed ? 0 : 1);
