import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Background} from './Background';
import {Captions} from './Captions';
import {makeCueProgress} from './cues';
import {Badge, Node, Slot} from './Node';
import {Edge, Packet, type Pt} from './Packet';
import {theme} from './theme';
import type {Timeline} from './types';

// Dữ liệu minh họa, không phải số đo
const PRICE_OLD = '199.000đ';
const PRICE_NEW = '219.000đ';

const CLIENT = {x: 540, y: 640, w: 300, h: 110};
const APP = {x: 540, y: 860, w: 300, h: 110};
const CACHE = {x: 290, y: 1110, w: 400, h: 180};
const DB = {x: 790, y: 1110, w: 400, h: 180};

const CLIENT_BOTTOM: Pt = [540, 695];
const APP_TOP: Pt = [540, 805];
const APP_TO_CACHE: Pt = [450, 915];
const CACHE_TOP: Pt = [320, 1020];
const APP_TO_DB: Pt = [630, 915];
const DB_TOP: Pt = [760, 1020];

const PACKET_FRAMES = 16;
const SHORT_FRAMES = 14;

export const CacheHitMiss = (timeline: Timeline) => {
  const frame = useCurrentFrame();
  const c = makeCueProgress(timeline.cues, frame);

  const stageP = c.progress('stageIn', 12);
  const hookOpacity = 1 - stageP;
  const recapP = c.progress('recapIn', 14);
  const stageOpacity = 1 - recapP;

  const appear = {
    client: c.progress('clientIn', 10),
    app: c.progress('appIn', 10),
    cache: c.progress('cacheIn', 10),
    db: c.progress('dbIn', 10),
  };

  // Cache được nạp khi gói dữ liệu của request 1 tới nơi
  const fillArrive = c.at('r1Fill') + PACKET_FRAMES;
  const cacheFilled = frame >= fillArrive;
  const cacheFlash = cacheFilled ? interpolate(frame, [fillArrive, fillArrive + 20], [1, 0], {extrapolateRight: 'clamp'}) : 0;
  const dbChanged = c.reached('dbChange');
  const dbFlash = dbChanged ? interpolate(frame, [c.at('dbChange'), c.at('dbChange') + 20], [1, 0], {extrapolateRight: 'clamp'}) : 0;

  const dbDim = c.progress('dbDim', 12) * (1 - c.progress('staleIn', 12));

  const packets: {start: number; dur: number; from: Pt; to: Pt; color: string; label: string}[] = [
    {start: c.at('r1Start'), dur: SHORT_FRAMES, from: CLIENT_BOTTOM, to: APP_TOP, color: theme.request, label: 'request'},
    {start: c.at('r1Ask'), dur: PACKET_FRAMES, from: APP_TO_CACHE, to: CACHE_TOP, color: theme.request, label: 'request'},
    {start: c.at('r1ToDb'), dur: PACKET_FRAMES, from: APP_TO_DB, to: DB_TOP, color: theme.request, label: 'request'},
    {start: c.at('r1FromDb'), dur: PACKET_FRAMES, from: DB_TOP, to: APP_TO_DB, color: theme.data, label: '#42'},
    {start: c.at('r1Fill'), dur: PACKET_FRAMES, from: APP_TO_CACHE, to: CACHE_TOP, color: theme.data, label: '#42'},
    {start: c.at('r1Return'), dur: SHORT_FRAMES, from: APP_TOP, to: CLIENT_BOTTOM, color: theme.data, label: '#42'},
    {start: c.at('r2Start'), dur: SHORT_FRAMES, from: CLIENT_BOTTOM, to: APP_TOP, color: theme.request, label: 'request'},
    {start: c.at('r2Ask'), dur: PACKET_FRAMES, from: APP_TO_CACHE, to: CACHE_TOP, color: theme.request, label: 'request'},
    {start: c.at('r2Return'), dur: PACKET_FRAMES, from: CACHE_TOP, to: APP_TO_CACHE, color: theme.data, label: '#42'},
    {start: c.at('r2Return') + PACKET_FRAMES, dur: SHORT_FRAMES, from: APP_TOP, to: CLIENT_BOTTOM, color: theme.data, label: '#42'},
  ];

  const missScale = c.progress('r1Miss', 8) * (1 - c.progress('r2Start', 8));
  const hitScale = c.progress('r2Hit', 8) * (1 - c.progress('staleIn', 8));
  const staleScale = c.progress('cacheStale', 8);

  const requestNo = c.reached('r2Start') ? 2 : c.reached('r1Start') ? 1 : 0;
  const result = requestNo === 2 ? (c.reached('r2Hit') ? 'HIT' : '') : requestNo === 1 ? (c.reached('r1Miss') ? 'MISS' : '') : '';
  const inNotError = c.reached('notError') && !c.reached('r2Start');
  const chip = c.reached('staleIn') ? 'Dữ liệu gốc đổi' : inNotError ? 'MISS ≠ lỗi' : requestNo ? `Request ${requestNo}${result ? ` · ${result}` : ''}` : '';
  const chipColor = c.reached('staleIn') || inNotError ? theme.accent : result === 'HIT' ? theme.hit : result === 'MISS' ? theme.miss : theme.request;

  const recapHit = c.progress('recapHit', 12);
  const recapMiss = c.progress('recapMiss', 12);
  const outroP = c.progress('outroIn', 14);

  const arrowP = interpolate(frame, [8, 30], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <Background cornerLabel={timeline.cornerLabel} />

      {/* S01: câu hỏi mở đầu, hiện từ frame 0 */}
      <AbsoluteFill style={{opacity: hookOpacity}}>
        <div style={{position: 'absolute', top: 300, left: 0, right: 0, textAlign: 'center', fontFamily: theme.font, fontWeight: 800, fontSize: 84, lineHeight: 1.15, color: theme.text}}>
          Cùng một request,
          <br />
          <span style={{color: theme.accent}}>hai đường đi?</span>
        </div>
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, display: arrowP > 0 ? 'block' : 'none'}}>
          <line x1={540} y1={730} x2={540 + (310 - 540) * arrowP} y2={730 + (900 - 730) * arrowP} stroke={theme.request} strokeWidth={6} strokeLinecap="round" />
          <line x1={540} y1={730} x2={540 + (770 - 540) * arrowP} y2={730 + (900 - 730) * arrowP} stroke={theme.data} strokeWidth={6} strokeLinecap="round" />
        </svg>
        <Pill x={540} y={690} text="request" color={theme.request} />
        <Pill x={300} y={950} text="cache" color={theme.hit} opacity={arrowP} />
        <Pill x={780} y={950} text="database" color={theme.data} opacity={arrowP} />
      </AbsoluteFill>

      {/* S02–S07: sân khấu */}
      <AbsoluteFill style={{opacity: stageP * stageOpacity}}>
        <div style={{position: 'absolute', top: 290, left: 0, right: 0, textAlign: 'center', fontFamily: theme.font, fontWeight: 800, fontSize: 56, color: theme.text}}>
          Cache hit và cache miss
        </div>
        {chip && (
          <div style={{position: 'absolute', top: 400, left: 0, right: 0, textAlign: 'center'}}>
            <span style={{display: 'inline-block', padding: '8px 30px', borderRadius: 999, border: `3px solid ${chipColor}`, color: chipColor, fontFamily: theme.font, fontWeight: 800, fontSize: 40}}>
              {chip}
            </span>
          </div>
        )}

        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
          <Edge from={CLIENT_BOTTOM} to={APP_TOP} opacity={Math.min(appear.client, appear.app)} />
          <Edge from={APP_TO_CACHE} to={CACHE_TOP} opacity={Math.min(appear.app, appear.cache)} />
          <Edge from={APP_TO_DB} to={DB_TOP} opacity={Math.min(appear.app, appear.db)} />
        </svg>

        <Node {...CLIENT} title="Client" appear={appear.client} />
        <Node {...APP} title="App" appear={appear.app} />
        <Node
          {...CACHE}
          title="Cache"
          subtitle={c.reached('cacheLabel') ? 'Bộ nhớ đệm' : undefined}
          appear={appear.cache}
          borderColor={hitScale > 0.5 ? theme.hit : theme.cardBorder}
        >
          {appear.cache > 0.5 &&
            (cacheFilled ? <Slot label={`#42 · ${PRICE_OLD}`} color={theme.data} flash={cacheFlash} /> : <Slot label="trống" color={theme.muted} empty />)}
        </Node>
        <Node {...DB} title="Database" subtitle={c.reached('dbLabel') ? 'Dữ liệu gốc' : undefined} appear={appear.db} dim={dbDim}>
          {c.reached('dbData') && <Slot label={`#42 · ${dbChanged ? PRICE_NEW : PRICE_OLD}`} color={theme.data} flash={dbFlash} />}
        </Node>

        {staleScale > 0 && (
          <div style={{position: 'absolute', left: 540, top: 1110, transform: `translate(-50%,-50%) scale(${staleScale})`, color: theme.accent, fontFamily: theme.font, fontWeight: 800, fontSize: 80}}>
            ≠
          </div>
        )}

        {packets.map((p, i) => (
          <Packet key={i} from={p.from} to={p.to} p={(frame - p.start) / p.dur} color={p.color} label={p.label} />
        ))}

        <Badge text="MISS" color={theme.miss} x={200} y={990} scale={missScale} />
        <Badge text="HIT" color={theme.hit} x={200} y={990} scale={hitScale} />
        <Badge text="bản cũ" color={theme.accent} x={200} y={990} scale={staleScale} />

        {c.reached('dbData') && (
          <div style={{position: 'absolute', left: 0, right: 0, top: 1250, textAlign: 'center', fontFamily: theme.font, fontWeight: 400, fontSize: 26, color: theme.muted}}>
            Dữ liệu minh họa
          </div>
        )}
      </AbsoluteFill>

      {/* S07: tóm tắt và câu hỏi tập sau */}
      {recapP > 0 && (
        <AbsoluteFill>
          <RecapCard y={720} label="HIT" color={theme.hit} text="cache đã có → trả thẳng" p={recapHit * (1 - 0.6 * outroP)} />
          <RecapCard y={940} label="MISS" color={theme.accent} text="cache chưa có → xuống database" p={recapMiss * (1 - 0.6 * outroP)} />
          {outroP > 0 && (
            <div
              style={{
                position: 'absolute',
                left: 90,
                right: 90,
                top: 1060,
                height: 190,
                borderRadius: 30,
                border: `3px solid ${theme.accent}`,
                background: theme.card,
                opacity: outroP,
                transform: `translateY(${(1 - outroP) * 30}px)`,
                fontFamily: theme.font,
                textAlign: 'center',
                paddingTop: 26,
                boxSizing: 'border-box',
              }}
            >
              <div style={{fontWeight: 400, fontSize: 28, color: theme.muted}}>Tập tới</div>
              <div style={{fontWeight: 800, fontSize: 56, color: theme.accent, marginTop: 6}}>Cache sống được bao lâu?</div>
            </div>
          )}
        </AbsoluteFill>
      )}

      <Captions timeline={timeline} />
    </AbsoluteFill>
  );
};

const Pill = ({x, y, text, color, opacity = 1}: {x: number; y: number; text: string; color: string; opacity?: number}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: 'translate(-50%,-50%)',
      opacity,
      padding: '10px 34px',
      borderRadius: 999,
      border: `3px solid ${color}`,
      color,
      background: theme.card,
      fontFamily: theme.font,
      fontWeight: 800,
      fontSize: 38,
    }}
  >
    {text}
  </div>
);

const RecapCard = ({y, label, color, text, p}: {y: number; label: string; color: string; text: string; p: number}) => (
  <div
    style={{
      position: 'absolute',
      left: 90,
      right: 90,
      top: y - 80,
      height: 160,
      borderRadius: 30,
      border: `3px solid ${color}`,
      background: theme.card,
      opacity: p,
      transform: `translateY(${(1 - p) * 30}px)`,
      display: 'flex',
      alignItems: 'center',
      gap: 34,
      padding: '0 44px',
      boxSizing: 'border-box',
      fontFamily: theme.font,
    }}
  >
    <div style={{fontWeight: 800, fontSize: 64, color}}>{label}</div>
    <div style={{fontWeight: 600, fontSize: 40, color: theme.text}}>{text}</div>
  </div>
);
