// Render hình của một tập bằng Remotion từ timeline.json.
//
//   node pipeline/render/render-episode.mjs episodes/EP002-cache-hit-miss                 # renders/EP002/visual.mp4 (không tiếng)
//   node pipeline/render/render-episode.mjs episodes/EP002-cache-hit-miss --stills=30,300 # vài khung PNG để kiểm tra
//
// Âm thanh được ghép ở bước FFmpeg (pipeline/render/mix-episode.mjs), không nằm trong Remotion.
import {mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {basename, join, resolve} from 'node:path';

const episodeDir = resolve(process.argv[2] ?? '');
const stillsArg = process.argv.find((a) => a.startsWith('--stills='));
const id = basename(episodeDir).split('-')[0];
const props = join(episodeDir, 'timeline.json');
const outDir = resolve(episodeDir, '..', '..', 'renders', id);
const videoDir = resolve(episodeDir, '..', '..', 'packages', 'video');
mkdirSync(outDir, {recursive: true});

const run = (args) => {
  const r = spawnSync('npx', ['remotion', ...args], {cwd: videoDir, stdio: 'inherit', shell: true});
  if (r.status !== 0) process.exit(r.status ?? 1);
};

if (stillsArg) {
  for (const f of stillsArg.slice('--stills='.length).split(',')) {
    run(['still', 'src/index.ts', 'CacheHitMiss', join(outDir, `still-${f.padStart(5, '0')}.png`), `--props=${props}`, `--frame=${f}`]);
  }
} else {
  run(['render', 'src/index.ts', 'CacheHitMiss', join(outDir, 'visual.mp4'), `--props=${props}`, '--codec=h264', '--muted']);
}
