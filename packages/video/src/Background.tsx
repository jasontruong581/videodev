import {AbsoluteFill} from 'remotion';
import {theme} from './theme';

export const Background = ({cornerLabel}: {cornerLabel: string | null}) => (
  <AbsoluteFill style={{backgroundColor: theme.bg}}>
    <AbsoluteFill style={{background: `radial-gradient(ellipse 900px 700px at 50% 38%, ${theme.glow}, transparent 70%)`}} />
    {cornerLabel && (
      <div style={{position: 'absolute', left: 54, top: 120, fontFamily: theme.font, fontWeight: 600, fontSize: 34, color: theme.hit, letterSpacing: 0.5}}>
        {cornerLabel}
      </div>
    )}
  </AbsoluteFill>
);
