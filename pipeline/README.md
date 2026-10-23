# Pipeline local

Chạy từ thư mục gốc project. Mỗi bước đọc file của bước trước trong `episodes/<id>/`; sửa gì thì chạy lại từ bước đó.

| Bước | Lệnh | Ra |
|---|---|---|
| 1. Giọng | `python pipeline/voice/generate-voice.py episodes/EP002-cache-hit-miss` | `audio/*.wav` (không commit), `voice-manifest.json` |
| 2. Mốc từ | `tools/asr/.venv/Scripts/python.exe pipeline/align/transcribe-words.py episodes/EP002-cache-hit-miss --model medium` | `words-asr.json` |
| 3. Timeline | `node pipeline/compile/compile-timeline.mjs episodes/EP002-cache-hit-miss` | `words.json`, `timeline.json` |
| 4. Hình | `node pipeline/render/render-episode.mjs episodes/EP002-cache-hit-miss` (`--stills=0,300` để xem khung) | `renders/EP002/visual.mp4` |
| 5. Âm thanh + xuất | `node pipeline/render/mix-episode.mjs episodes/EP002-cache-hit-miss` | `renders/EP002/final.mp4`, `assets.csv` |
| 6. QC | `node pipeline/qa/qc-episode.mjs episodes/EP002-cache-hit-miss` | `qc.json`, `renders/EP002/contact-sheet.jpg` |

Bước 1 chạy bằng Python đã cài `vieneu` (xem [docs/vieneu-setup.md](../docs/vieneu-setup.md)), đặt `PYTHONUTF8=1` và `HF_HUB_OFFLINE=1`.

## Cài một lần
- Remotion: `cd packages/video && npm install` (Node 24; lần render đầu tự tải Chrome headless shell).
- ASR: `python -m venv tools/asr/.venv` rồi `tools/asr/.venv/Scripts/python.exe -m pip install faster-whisper soundfile`. Lần đầu tải model Whisper về cache Hugging Face (small ~0,5 GB, medium ~1,5 GB). Cần `ffmpeg` trong PATH.
- `tools/`, `renders/`, `*.wav`, `*.mp4` không nằm trong Git.

## Hợp đồng
- `script.md` bảng `| Line | Scene | text | say |` là nguồn lời. `pronunciation.json` ánh xạ từ hiển thị sang cách đọc; compile báo lỗi nếu `text` và `say` lệch nhau.
- `storyboard.json` gắn từng chuyển động (cue) vào một từ hiển thị theo `lineId + token + occurrence`. Cue không tìm thấy là lỗi, không rơi về đầu cảnh.
- Mốc từ lấy từ ASR trên WAV thật; từ nào không khớp được sẽ có `origin: estimated`. QC báo lỗi nếu còn từ estimated. ASR không phải forced alignment tuyệt đối, vẫn cần nghe kiểm.
- Remotion chỉ render hình theo frame; giọng, SFX, loudness (-14 LUFS, true peak <= -1,5 dBTP) làm ở FFmpeg.
- Approval gắn hash: sửa `script.md` hoặc `director-script.md` thì `approvals.json` cũ không còn đúng.
