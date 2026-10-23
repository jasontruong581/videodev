export type Timeline = {
  schemaVersion: 1;
  episodeId: string;
  fps: number;
  width: number;
  height: number;
  totalFrames: number;
  /** nhãn nhỏ ở góc trái trên; null thì không hiện */
  cornerLabel: string | null;
  lines: {id: string; startFrame: number; endFrame: number}[];
  words: TimelineWord[];
  captions: Caption[];
  /** tên cue -> frame; thiếu cue là lỗi, không có giá trị mặc định */
  cues: Record<string, number>;
  sfx: {name: string; frame: number; volume: number}[];
};

export type TimelineWord = {
  lineId: string;
  index: number;
  text: string;
  startFrame: number;
  endFrame: number;
  origin: 'asr' | 'estimated';
};

export type Caption = {
  id: string;
  lineId: string;
  startFrame: number;
  endFrame: number;
  /** chỉ số vào words[] */
  wordIndexes: number[];
};
