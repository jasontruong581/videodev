# VieNeu-TTS local — thiết lập và vận hành

Ngày kiểm tra: 23/10/2026. Nguồn: https://github.com/pnnbao97/VieNeu-TTS

## Bản được chọn

- Checkout: `tools/VieNeu-TTS`, commit `04044e1b8f822f946bafb2c88b716459f4164152`.
- Python SDK: `vieneu 3.8.3`; mô hình: **v3 Turbo**, 48 kHz, CPU ONNX, fp32.
- v4 là dịch vụ riêng của tác giả; không thuộc bản cài local này.
- Máy hiện tại: Windows, Python 3.10.6, Intel Core i5-14400, RAM khoảng 32 GB, Intel UHD Graphics 730. Không phát hiện NVIDIA CUDA.
- Môi trường riêng: `tools/VieNeu-TTS/.venv`; không thay đổi package Python toàn máy.
- Cache mô hình của smoke test: `tools/VieNeu-TTS/.cache/huggingface`. Bộ graph/codec/denoiser CPU khoảng **609 MB** tải về; Windows không dùng symlink có thể tốn thêm dung lượng cache. Venv và cache pip tính riêng.

## Cài lại từ thư mục gốc project

```powershell
git clone https://github.com/pnnbao97/VieNeu-TTS tools/VieNeu-TTS
git -C tools/VieNeu-TTS checkout 04044e1b8f822f946bafb2c88b716459f4164152
python -m venv tools/VieNeu-TTS/.venv
& './tools/VieNeu-TTS/.venv/Scripts/python.exe' -m pip install -e './tools/VieNeu-TTS'
```

Không chạy lại `git clone` nếu thư mục đã có. Dependencies sẽ được resolve theo thời điểm cài; dùng bản `local-requirements-freeze.txt` đã lưu để tham khảo phiên bản của máy hiện tại.

## Tạo 3 mẫu để chọn giọng

```powershell
$env:PYTHONUTF8 = '1'
& './tools/VieNeu-TTS/.venv/Scripts/python.exe' './tools/VieNeu-TTS/local-smoke.py'
```

Output: `tools/VieNeu-TTS/local-output/audition-*.wav` và `smoke-result.json`.

| Preset | Metadata chính thức | Mục đích nghe thử |
| --- | --- | --- |
| Hải Đăng | Nam, Bắc, tự nhiên; giọng mặc định | Lời giải thích thân thiện |
| Thiện Minh | Nam, Bắc, kể chuyện | Kể chuyện, ví dụ lập trình |
| Minh Đức | Nam, Bắc, tin tức | Bản tin AI ngắn |

Metadata không xác nhận giọng nào “nam trầm”. Chủ kênh cần nghe thử, chọn theo độ trầm, độ rõ và sự dễ chịu. Không dùng đổi pitch làm mặc định trước khi nghe. Các giọng nam miền Nam khác có thể thử: Thái Sơn (kể chuyện), Minh Triết (tin tức), Đức Trí (đọc truyện).

## Nối vào pipeline video

```python
import os
os.environ['HF_HOME'] = r'D:\Hoang Code AI\Side Project\videoailab\tools\VieNeu-TTS\.cache\huggingface'
from vieneu import Vieneu

tts = Vieneu(mode='v3turbo', backend='onnx')
audio = tts.infer('Hôm nay, mình sẽ giải thích API bằng một ví dụ rất đơn giản.', voice='Hải Đăng')
tts.save(audio, 'narration.wav')
```

Chạy bằng Python trong `.venv` ở trên. Khởi tạo model một lần rồi tái sử dụng cho nhiều câu/scene. Lưu WAV nguyên bản 48 kHz; tạo phụ đề dựa trên thời lượng audio thực tế, không lấy số chữ để khẳng định timestamp đã chuẩn. Lưu tên preset, commit SDK, narration text, model revision và thời điểm render vào manifest mỗi tập.

Với từ kỹ thuật, giữ hai phiên bản: `display_text` đúng thuật ngữ và `tts_text` đã viết lại cách phát âm sau khi nghe. Không mặc định rằng TTS sẽ đọc đúng API, Git, SQL hoặc tên hãng.

## Web UI (tùy chọn)

```powershell
$env:PYTHONUTF8 = '1'
$env:HF_HOME = Join-Path (Get-Location) 'tools/VieNeu-TTS/.cache/huggingface'
& './tools/VieNeu-TTS/.venv/Scripts/vieneu-web.exe'
```

Theo tài liệu upstream: truy cập `http://127.0.0.1:7860`. Web UI chưa được kiểm thử trong lần thiết lập này; không có server chạy nền. Không cần Web UI để gọi SDK.

## Trạng thái kiểm thử

**Đã cài thành công và xuất 3 file WAV trên máy này.**

- `pip install -e tools/VieNeu-TTS`: exit 0; `pip check`: No broken requirements found.
- SDK import + ONNX inference thành công; không cài PyTorch.
- Lần khởi tạo đầu (gồm tải mô hình): 105,91 giây.
- WAV PCM 16-bit, mono, 48 kHz. Mẫu đều có dữ liệu hữu hạn, peak dưới 1.

| Mẫu | Thời lượng WAV | Thời gian synthesis |
| --- | ---: | ---: |
| audition-hai-dang.wav | 6,72 s | 11,87 s (gồm warm-up lần đầu) |
| audition-thien-minh.wav | 6,80 s | 2,46 s |
| audition-minh-duc.wav | 8,32 s | 3,43 s |

Các số trên là smoke test ngắn, không phải cam kết tốc độ với mọi kịch bản. Kiểm tra kỹ thuật đã đạt; chưa có bước nghe duyệt phát âm, ngắt câu, sắc thái hoặc xác nhận giọng trầm. Không coi file mẫu đã sẵn sàng đăng.

Model revision đã tải:

- `pnnbao-ump/VieNeu-TTS-v3-Turbo`: `61b85e3d937fbbacb387714180e8182823512523`.
- `OpenMOSS-Team/MOSS-Audio-Tokenizer-Nano-ONNX`: `ceff0d0749bfb3fa2d61149794ec6feef0d1e1ae`.
- Hai model card khai báo Apache-2.0; SDK cũng Apache-2.0.
- SDK mặc định resolve nhánh model `main`; ghi revision trên để đối chiếu, không coi SDK commit là đã pin toàn bộ model. Cache đã có để chạy lại; muốn khóa offline sau lần tải đầu đặt `$env:HF_HUB_OFFLINE='1'`.

Nguồn đối chiếu: [README upstream](https://github.com/pnnbao97/VieNeu-TTS), [model v3 Turbo](https://huggingface.co/pnnbao-ump/VieNeu-TTS-v3-Turbo), [codec ONNX](https://huggingface.co/OpenMOSS-Team/MOSS-Audio-Tokenizer-Nano-ONNX).


## Máy hiện tại: dùng bản đã cài sẵn

Máy làm việc D:/Project không có `tools/VieNeu-TTS`. VieNeu 3.8.3 đã cài trong Python 3.13 toàn máy (`C:\Users\Admin\AppData\Local\Programs\Python\Python313\python.exe`, cùng dùng cho `D:\Project\videobds`), model nằm ở `~/.cache/huggingface` với đúng hai revision ghi ở trên. Không cần clone hay tải lại.

Tạo giọng cho một tập (chạy từ thư mục gốc project):

```powershell
$env:PYTHONUTF8 = '1'; $env:HF_HUB_OFFLINE = '1'
& 'C:\Users\Admin\AppData\Local\Programs\Python\Python313\python.exe' pipeline/voice/generate-voice.py episodes/EP002-cache-hit-miss
```

Script đọc cột `say` trong script.md, ghi `audio/<lineId>.wav`, `audio/narration.wav` và `voice-manifest.json` (hash lời đọc, model, thời lượng, mốc từng dòng). Dòng không đổi lời đọc/giọng thì giữ nguyên, `--force` để tạo lại. `apply_watermark` của SDK giữ mặc định.
