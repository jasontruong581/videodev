import {Easing, interpolate} from 'remotion';

/** tiến độ 0..1 của một chuyển động bắt đầu ở cue; thiếu cue là lỗi rõ ràng, không rơi về 0 */
export const makeCueProgress = (cues: Record<string, number>, frame: number) => {
  const at = (name: string): number => {
    const v = cues[name];
    if (v === undefined) throw new Error(`Thiếu cue "${name}" trong timeline.json`);
    return v;
  };
  const progress = (name: string, durFrames: number, ease = Easing.out(Easing.cubic)) =>
    interpolate(frame, [at(name), at(name) + durFrames], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: ease,
    });
  const reached = (name: string) => frame >= at(name);
  return {at, progress, reached};
};
export type CueProgress = ReturnType<typeof makeCueProgress>;
