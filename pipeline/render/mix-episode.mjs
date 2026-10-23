// Ghép hình Remotion + giọng đọc + SFX bằng FFmpeg, chuẩn hóa âm lượng hai lượt, xuất final.mp4.
//
//   node pipeline/render/mix-episode.mjs episodes/EP002-cache-hit-miss
//
// Đầu vào: renders/<id>/visual.mp4, <episode>/audio/narration.wav, <episode>/timeline.json (mục sfx),
// config/channel.json (audio.sfxSource). Đầu ra: renders/<id>/final.mp4 và <episode>/assets.csv (SFX đã dùng).
import {createHash} from 'node:crypto';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {basename, join, resolve} from 'node:path';

const episodeDir = resolve(process.argv[2] ?? '');
const id = basename(episodeDir).split('-')[0];
const root = resolve(episodeDir, '..', '..');
const visual = join(root, 'renders', id, 'visual.mp4');
const narration = join(episodeDir, 'audio', 'narration.wav');
const out = join(root, 'renders', id, 'final.mp4');
const timeline = JSON.parse(readFileSync(join(episodeDir, 'timeline.json'), 'utf8'));
const channel = JSON.parse(readFileSync(join(root, 'config', 'channel.json'), 'utf8'));
const sfxDir = channel.audio?.sfxSource;

for (const p of [visual, narration]) if (!existsSync(p)) throw new Error(`Thiếu ${p}`);
if (timeline.sfx.length && !sfxDir) throw new Error('config/channel.json thiếu audio.sfxSource');

const sfxFiles = timeline.sfx.map((s) => {
  const file = join(sfxDir, `${s.name}.wav`);
  if (!existsSync(file)) throw new Error(`Thiếu SFX ${file}`);
  return {...s, file};
});
const duration = timeline.totalFrames / timeline.fps;

const inputs = ['-i', visual, '-i', narration, ...sfxFiles.flatMap((s) => ['-i', s.file])];
const chains = ['[1:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=1.0[v0]'];
sfxFiles.forEach((s, i) => {
  const ms = Math.round((s.frame / timeline.fps) * 1000);
  chains.push(`[${i + 2}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=${s.volume},adelay=${ms}|${ms}[v${i + 1}]`);
});
const labels = Array.from({length: sfxFiles.length + 1}, (_, i) => `[v${i}]`).join('');
const mix = `${chains.join(';')};${labels}amix=inputs=${sfxFiles.length + 1}:normalize=0:duration=longest,apad,atrim=0:${duration.toFixed(3)}`;

const ff = (args) => spawnSync('ffmpeg', ['-hide_banner', '-y', ...args], {encoding: 'utf8'});

// Lượt 1: đo loudness của bản mix
const target = {I: -14, TP: -1.5, LRA: 11};
const pass1 = ff([...inputs, '-filter_complex', `${mix},loudnorm=I=${target.I}:TP=${target.TP}:LRA=${target.LRA}:print_format=json[a]`, '-map', '[a]', '-f', 'null', '-']);
if (pass1.status !== 0) throw new Error(pass1.stderr);
const m = JSON.parse(pass1.stderr.slice(pass1.stderr.lastIndexOf('{'), pass1.stderr.lastIndexOf('}') + 1));

// Lượt 2: áp loudnorm tuyến tính theo số đo, mux với hình không encode lại
const ln = `loudnorm=I=${target.I}:TP=${target.TP}:LRA=${target.LRA}:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`;
const pass2 = ff([
  ...inputs,
  '-filter_complex', `${mix},${ln},aresample=48000[a]`,
  '-map', '0:v', '-map', '[a]',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(timeline.fps),
  '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart',
  '-t', duration.toFixed(3), out,
]);
if (pass2.status !== 0) throw new Error(pass2.stderr);

const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');
const rows = ['id,path,sha256,source,license,attribution,usageStatus'];
for (const name of [...new Set(sfxFiles.map((s) => s.name))]) {
  const file = join(sfxDir, `${name}.wav`);
  const source = name.startsWith('ding-02') || name.startsWith('whoosh') || name.startsWith('pop') ? 'Mister Horse Free SFX (qua videobds/public/sfx)' : 'videobds/public/sfx';
  rows.push([name, file.replaceAll('\\', '/'), sha(file), source, 'chưa xác minh điều khoản thương mại: đọc điều khoản Mister Horse trước khi đăng có quảng cáo', '', 'dùng thử, chờ chủ kênh xác nhận'].map((c) => (c.includes(',') ? `"${c}"` : c)).join(','));
}
writeFileSync(join(episodeDir, 'assets.csv'), rows.join('\n') + '\n');
console.log(`final: ${out}\nloudness đo trước chuẩn hóa: I=${m.input_i} LUFS, TP=${m.input_tp} dBTP\nsha256: ${sha(out)}`);
