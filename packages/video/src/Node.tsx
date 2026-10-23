import type {ReactNode} from 'react';
import {theme} from './theme';

export type NodeProps = {
  x: number; // tâm
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle?: string;
  /** 0..1 lúc hiện ra */
  appear: number;
  dim?: number; // 0..1, 1 = mờ hoàn toàn
  borderColor?: string;
  children?: ReactNode;
};

export const Node = ({x, y, w, h, title, subtitle, appear, dim = 0, borderColor = theme.cardBorder, children}: NodeProps) => (
  <div
    style={{
      position: 'absolute',
      left: x - w / 2,
      top: y - h / 2,
      width: w,
      height: h,
      boxSizing: 'border-box',
      borderRadius: 26,
      border: `3px solid ${borderColor}`,
      background: theme.card,
      fontFamily: theme.font,
      color: theme.text,
      opacity: appear * (1 - dim * 0.7),
      transform: `scale(${0.9 + 0.1 * appear})`,
      padding: '16px 22px',
    }}
  >
    <div style={{fontWeight: 800, fontSize: 40, lineHeight: 1.1, textAlign: subtitle || children ? 'left' : 'center', marginTop: subtitle || children ? 0 : 20}}>{title}</div>
    {subtitle && <div style={{fontWeight: 400, fontSize: 26, color: theme.muted, marginTop: 4}}>{subtitle}</div>}
    {children}
  </div>
);

/** ô chứa một mục dữ liệu; empty = ô trống nét đứt */
export const Slot = ({label, color, empty, flash = 0}: {label: string; color: string; empty?: boolean; flash?: number}) => (
  <div
    style={{
      position: 'absolute',
      left: 22,
      right: 22,
      bottom: 16,
      height: 56,
      borderRadius: 14,
      boxSizing: 'border-box',
      border: empty ? `3px dashed ${theme.cardBorder}` : `3px solid ${color}`,
      background: empty ? 'transparent' : `rgba(255,255,255,${0.06 + 0.2 * flash})`,
      color: empty ? theme.muted : theme.text,
      fontWeight: 600,
      fontSize: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {label}
  </div>
);

export const Badge = ({text, color, x, y, scale}: {text: string; color: string; x: number; y: number; scale: number}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity: Math.min(1, scale * 1.5),
      padding: '8px 26px',
      borderRadius: 999,
      background: color,
      color: '#06100c',
      fontFamily: theme.font,
      fontWeight: 800,
      fontSize: 40,
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </div>
);
