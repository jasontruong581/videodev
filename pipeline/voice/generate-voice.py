"""Tạo giọng đọc cho một tập từ bảng `say` trong script.md bằng VieNeu local (CPU ONNX).

    python pipeline/voice/generate-voice.py episodes/EP002-cache-hit-miss [--voice "Hải Đăng"] [--force]

Chạy bằng Python đã cài `vieneu` (xem docs/vieneu-setup.md). Không tải model: đặt HF_HUB_OFFLINE=1
khi đã có cache.

Ra:
  <episode>/audio/<lineId>.wav      WAV mono từng dòng, 48 kHz (không commit, *.wav bị ignore)
  <episode>/audio/narration.wav     các dòng ghép theo thứ tự, có khoảng nghỉ
  <episode>/voice-manifest.json     hash lời đọc, model, thời lượng và mốc từng dòng trong narration.wav

Dòng đã tạo với cùng (lời đọc, giọng, model) được giữ nguyên; chỉ dòng đổi mới tạo lại.
Mốc trong manifest là mốc theo dòng đo từ WAV thật, chưa phải timing từng từ.
"""
import argparse
import hashlib
import json
import re
import sys
import wave
from datetime import datetime, timezone
from importlib.metadata import version
from pathlib import Path

import numpy as np

for _s in (sys.stdout, sys.stderr):
    _s.reconfigure(encoding='utf-8', errors='replace')

MODE, BACKEND = 'v3turbo', 'onnx'
GAP_SENTENCE = 0.25  # giây nghỉ giữa các câu trong một dòng
GAP_LINE = 0.45  # giây nghỉ giữa các dòng
LEAD = 0.08  # lặng đầu narration cho đỡ cụt
MODELS = ['pnnbao-ump/VieNeu-TTS-v3-Turbo', 'OpenMOSS-Team/MOSS-Audio-Tokenizer-Nano-ONNX']


def parse_say(script_md):
    """[(lineId, say)] từ các hàng `| L01 | S01 | text | say |`"""
    rows = []
    for ln in script_md.read_text(encoding='utf-8').splitlines():
        cells = [c.strip() for c in ln.strip().strip('|').split('|')]
        if len(cells) == 4 and re.fullmatch(r'L\d+', cells[0]):
            rows.append((cells[0], cells[3]))
    if not rows:
        sys.exit(f'Không thấy hàng lời đọc dạng "| L01 | S01 | text | say |" trong {script_md}')
    ids = [r[0] for r in rows]
    if len(set(ids)) != len(ids):
        sys.exit('Line ID bị trùng trong script.md')
    return rows


def trim(x, sr):
    win = sr // 100
    n = len(x) // win
    env = np.abs(x[: n * win]).reshape(n, win).max(axis=1)
    voiced = np.where(env > max(0.015, float(env.max()) * 0.04))[0]
    if not len(voiced):
        return x
    return x[max(0, voiced[0] - 2) * win: min(n, voiced[-1] + 4) * win]


def write_wav(path, x, sr):
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sr)
        w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())


def read_wav(path):
    with wave.open(str(path), 'rb') as w:
        sr, raw = w.getframerate(), w.readframes(w.getnframes())
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768, sr


def model_revisions():
    refs = Path.home() / '.cache' / 'huggingface' / 'hub'
    out = {}
    for m in MODELS:
        ref = refs / ('models--' + m.replace('/', '--')) / 'refs' / 'main'
        out[m] = ref.read_text().strip() if ref.exists() else None
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('episode')
    ap.add_argument('--voice', default='Hải Đăng')
    ap.add_argument('--force', action='store_true')
    args = ap.parse_args()

    ep = Path(args.episode)
    lines = parse_say(ep / 'script.md')
    audio_dir = ep / 'audio'
    audio_dir.mkdir(exist_ok=True)
    manifest_path = ep / 'voice-manifest.json'
    prev = {}
    if manifest_path.exists():
        prev = {i['id']: i for i in json.loads(manifest_path.read_text(encoding='utf-8'))['lines']}

    from vieneu import Vieneu

    tts = None
    sr = 48000
    items = []
    for lid, say in lines:
        key = hashlib.sha256(f'{say}|{args.voice}|{MODE}|{BACKEND}'.encode('utf-8')).hexdigest()
        wav = audio_dir / f'{lid}.wav'
        if not args.force and wav.exists() and prev.get(lid, {}).get('cacheKey') == key:
            x, sr = read_wav(wav)
            status = 'kept'
        else:
            if tts is None:
                tts = Vieneu(mode=MODE, backend=BACKEND)
                sr = tts.sample_rate
            parts = []
            sents = [s for s in re.split(r'(?<=[.!?…])\s+', say) if s]
            for k, s in enumerate(sents):
                parts.append(trim(np.asarray(tts.infer(s, voice=args.voice), np.float32), sr))
                if k < len(sents) - 1:
                    parts.append(np.zeros(int(GAP_SENTENCE * sr), np.float32))
            x = np.concatenate(parts)
            write_wav(wav, x, sr)
            status = 'generated'
        print(f'{lid}: {len(x) / sr:5.2f}s {status}', flush=True)
        items.append((lid, say, key, x))

    t = LEAD
    chunks = [np.zeros(int(LEAD * sr), np.float32)]
    out_lines = []
    for n, (lid, say, key, x) in enumerate(items):
        d = len(x) / sr
        out_lines.append({'id': lid, 'say': say, 'cacheKey': key, 'file': f'audio/{lid}.wav',
                          'durationSec': round(d, 3), 'startSec': round(t, 3), 'endSec': round(t + d, 3)})
        chunks.append(x)
        t += d
        if n < len(items) - 1:
            chunks.append(np.zeros(int(GAP_LINE * sr), np.float32))
            t += GAP_LINE
    narration = np.concatenate(chunks)
    peak = float(np.abs(narration).max()) or 1.0
    write_wav(audio_dir / 'narration.wav', narration * min(1.0, 0.89 / peak), sr)

    manifest_path.write_text(json.dumps({
        'schemaVersion': 1,
        'episodeId': ep.name.split('-')[0],
        'engine': 'vieneu',
        'sdkVersion': version('vieneu'),
        'mode': MODE,
        'backend': BACKEND,
        'voice': args.voice,
        'modelRevisions': model_revisions(),
        'sampleRate': sr,
        'gapSentenceSec': GAP_SENTENCE,
        'gapLineSec': GAP_LINE,
        'generatedAt': datetime.now(timezone.utc).isoformat(timespec='seconds'),
        'totalDurationSec': round(len(narration) / sr, 3),
        'lines': out_lines,
    }, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'narration.wav: {len(narration) / sr:.1f}s  -> {manifest_path}')


if __name__ == '__main__':
    main()
