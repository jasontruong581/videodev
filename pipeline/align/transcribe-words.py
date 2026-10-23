"""ASR local (faster-whisper, CPU) trên từng WAV dòng để lấy mốc từng âm tiết.

    tools/asr/.venv/Scripts/python.exe pipeline/align/transcribe-words.py episodes/EP002-cache-hit-miss [--model small]

Ra <episode>/words-asr.json: {"model", "lines": {"L01": [{"word","start","end"}]}} theo giây trong WAV của dòng.
Đây là đầu vào thô cho compile-timeline; ASR không bảo đảm forced alignment tuyệt đối nên chữ lệch sẽ
được đánh dấu estimated ở bước compile. Không dùng dịch vụ trả phí.
"""
import argparse
import difflib
import json
import re
import subprocess
import sys
from pathlib import Path

import numpy as np

for _s in (sys.stdout, sys.stderr):
    _s.reconfigure(encoding='utf-8', errors='replace')


def load_16k(path):
    """ffmpeg -> float32 mono 16 kHz; tránh phụ thuộc bộ giải mã PyAV của faster-whisper"""
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'],
                         check=True, capture_output=True).stdout
    return np.frombuffer(raw, np.float32)


def tokens(text):
    return [t for t in (re.sub(r'[^\w]', '', x.lower()) for x in re.split(r'[\s-]+', text)) if t]


def similarity(words, say):
    return difflib.SequenceMatcher(None, [t for w in words for t in tokens(w['word'])], tokens(say)).ratio()


def transcribe(model, audio, say, use_prompt):
    segs, _ = model.transcribe(audio, language='vi', word_timestamps=True, beam_size=5,
                               initial_prompt=say if use_prompt else None, condition_on_previous_text=False)
    words = [{'word': w.word.strip(), 'start': round(w.start, 3), 'end': round(w.end, 3)}
             for s in segs for w in (s.words or [])]
    return words, use_prompt


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('episode')
    ap.add_argument('--model', default='small')
    args = ap.parse_args()
    ep = Path(args.episode)
    manifest = json.loads((ep / 'voice-manifest.json').read_text(encoding='utf-8'))

    from faster_whisper import WhisperModel

    model = WhisperModel(args.model, device='cpu', compute_type='int8')
    out = {}
    for line in manifest['lines']:
        audio = load_16k(ep / line['file'])
        words, used_prompt = transcribe(model, audio, line['say'], True)
        # initial_prompt giúp bám chính tả nhưng có thể làm Whisper bịa nội dung; lệch nhiều thì chạy lại không prompt
        if similarity(words, line['say']) < 0.7:
            words, used_prompt = transcribe(model, audio, line['say'], False)
        out[line['id']] = words
        note = '' if used_prompt else '  [không prompt]'
        print(f"{line['id']}: {len(words)} từ  sim={similarity(words, line['say']):.2f}{note}  ->  {' '.join(w['word'] for w in words)}", flush=True)
    (ep / 'words-asr.json').write_text(json.dumps({'model': f'faster-whisper:{args.model}', 'lines': out},
                                                  ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
