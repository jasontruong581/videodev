import {theme} from './theme';

export type Pt = readonly [number, number];

/** gói tin chạy từ a đến b; chỉ vẽ khi 0 < p < 1 */
export const Packet = ({from, to, p, color, label}: {from: Pt; to: Pt; p: number; color: string; label: string}) => {
  if (p <= 0 || p >= 1) return null;
  const x = from[0] + (to[0] - from[0]) * p;
  const y = from[1] + (to[1] - from[1]) * p;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        padding: '6px 20px',
        borderRadius: 999,
        background: color,
        color: '#06100c',
        fontFamily: theme.font,
        fontWeight: 800,
        fontSize: 30,
        whiteSpace: 'nowrap',
        boxShadow: `0 0 28px ${color}`,
      }}
    >
      {label}
    </div>
  );
};

export const Edge = ({from, to, opacity}: {from: Pt; to: Pt; opacity: number}) => (
  <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={theme.cardBorder} strokeWidth={4} strokeLinecap="round" opacity={opacity} />
);
