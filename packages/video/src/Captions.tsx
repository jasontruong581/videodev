import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {theme} from './theme';
import type {Timeline} from './types';

/** Phụ đề karaoke: cụm đang đọc hiện ở ~70% chiều cao, từ đang đọc tô vàng */
export const Captions = ({timeline}: {timeline: Timeline}) => {
  const frame = useCurrentFrame();
  const cap = timeline.captions.find((c) => frame >= c.startFrame && frame < c.endFrame);
  if (!cap) return null;
  const fade = Math.min(1, (frame - cap.startFrame + 1) / 4);
  return (
    <AbsoluteFill style={{top: 1290, height: 130, justifyContent: 'center', alignItems: 'center', padding: '0 70px'}}>
      <div style={{fontFamily: theme.font, fontWeight: 800, fontSize: 60, lineHeight: 1.2, textAlign: 'center', opacity: fade}}>
        {cap.wordIndexes.map((wi, k) => {
          const w = timeline.words[wi];
          const state = frame >= w.endFrame ? 'done' : frame >= w.startFrame ? 'now' : 'next';
          return (
            <span key={wi} style={{color: state === 'now' ? theme.accent : state === 'done' ? theme.text : 'rgba(244,247,248,0.55)'}}>
              {k > 0 ? ' ' : ''}{w.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
