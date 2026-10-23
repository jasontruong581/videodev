import {Composition} from 'remotion';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/800.css';
import {CacheHitMiss} from './CacheHitMiss';
import type {Timeline} from './types';

// props thật do pipeline/render truyền qua --props=<timeline.json>; bản mặc định chỉ để Studio mở được
const empty: Timeline = {
  schemaVersion: 1, episodeId: 'EP000', fps: 30, width: 1080, height: 1920, totalFrames: 30,
  cornerLabel: null, lines: [], words: [], captions: [], cues: {}, sfx: [],
};

export const Root = () => (
  <Composition
    id="CacheHitMiss"
    component={CacheHitMiss}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={empty.totalFrames}
    defaultProps={empty}
    calculateMetadata={({props}) => ({
      durationInFrames: props.totalFrames,
      fps: props.fps,
      width: props.width,
      height: props.height,
    })}
  />
);
