# Pipeline kỹ thuật — thiết kế từ đầu
Trạng thái: pipeline local (giọng → ASR → timeline → Remotion → FFmpeg → QC) đã chạy cho EP002, xem [pipeline/README.md](../pipeline/README.md); chưa có publisher. Các schema dưới đây vẫn là hợp đồng đề xuất, hiện được thực thi bằng kiểm tra trong `pipeline/compile` và `pipeline/qa`, chưa có validator riêng. VieNeu 3.8.3 CPU ONNX đã thử thành công; Hải Đăng đã được chọn. Tối đa 300 giây. Không đợi ba tập mới thiết kế tự động hóa.

## Luồng
Idea menu → USER SELECT → Research/facts → Script + Director → USER SCRIPT APPROVAL → VieNeu → Timing/captions → Remotion → FFmpeg/QA → USER VIDEO APPROVAL → Publish manifest/PR → Scheduler adapter → Facebook API → Receipt.

Vai trò là trách nhiệm logic, không đòi hỏi nhiều agent/API đồng thời. Research/script/code được hỗ trợ trong phiên coding assistant hiện có; các bước media có thể chạy script local. Không coi biên kịch AI là dịch vụ miễn phí luôn hoạt động.

| Bước | Đầu ra | Điều kiện |
|---|---|---|
| Research | facts.md, learning-notes.md | Claim có nguồn/ngày/phiên bản hoặc nhãn minh họa |
| Script/director | script.json, storyboard.json | Cơ chế + giới hạn; user duyệt revision |
| Voice | narration.wav, voice-manifest.json | Đúng Hải Đăng, không mất câu, hash text |
| Timing | words.json, captions.json/SRT | Căn theo WAV, map phát âm, review |
| Compile | timeline.json | Anchor và bounds hợp lệ |
| Remotion | contact sheet, preview.mp4 | Hình đúng nghĩa, chữ rõ, animation deterministic |
| FFmpeg/QA | final.mp4, qc.json | <=300s; kiểm bản cuối |
| Review | approvals.json | Chủ kênh duyệt hash export |
| Publish | manifest, receipt/remote IDs | Theo project mẫu, chống trùng, lịch rõ múi giờ |

## Hợp đồng dữ liệu đề xuất
Chưa có validator/runtime triển khai.

- episode.json: schemaVersion, id, ideaId, revision, state, language=vi, width=1080, height=1920, fps=30, maxDurationSec=300, voiceProfile.
- script.json: scenes[] có stable id, lines[] có id, text (display), say (TTS), claimIds và pronunciation mapping.
- storyboard.json: cùng scene ID, type, nodes/edges hoặc props, anchors, assetIds, sourceIds. Anchor dùng lineId + token index/occurrence; tránh khớp từ đầu tiên mơ hồ.
- words.json: lineId, displayToken, start/end seconds, origin=asr|manual|estimated, reviewStatus. Map API → ây pi ai là một-nhiều. Estimated chỉ preview, không tự coi là timing chuẩn.
- timeline.json: fps, totalFrames, scenes/startFrame/durationFrames, captions/events cùng clock. WAV quyết định thời lượng, làm tròn frame thống nhất.
- assets.csv: id,path,sha256,source,license,attribution,usageStatus.
- approvals.json: gate, reviewer, timestamp, revision, inputHash, artifactHash, verdict. Không tự giả chữ ký chủ kênh.

## TTS và timing local
Dùng tools/VieNeu-TTS/.venv/cache hiện có; explicit Vieneu(mode='v3turbo', backend='onnx'), voice='Hải Đăng'. Không chạy setup ZIP để tạo thêm ~/.agentvid.

Ưu tiên take liên tục cho clip ngắn nếu kiểm thử không mất nội dung. Bài tới 5 phút phải kiểm giới hạn SDK; nếu cần chia theo đoạn ngữ điệu, giữ cùng preset/model/process, ghép khoảng nghỉ rồi đo lại. Đây là điều chỉnh có chủ đích so với quy tắc one-take tuyệt đối của template.

Nhánh dự kiến: faster-whisper CPU local → đối chiếu script → map say/text → sửa timing. ASR timestamp không bảo đảm forced alignment tuyệt đối. Aligner chưa cài/kiểm thử trong project. Nếu timing từ không đạt, dùng caption cụm đã căn/duyệt; không karaoke sai. Không dùng auto provider vì có thể chọn Soniox từ biến môi trường.

## Remotion
Port thành React components: Title, Flow, Compare, Tree, Stack, Code, Bars, Shot, Quote, Outro. Bổ sung CacheHitMiss, MemoryHierarchy, RequestSequence, QueueWorkers theo tập cần. Không bọc nguyên HTML/GSAP vào Remotion rồi coi là đã chuyển đổi.

Animation phụ thuộc frame: useCurrentFrame/interpolate/spring/Sequence; không timer/CSS animation theo wall clock. Font local, layout tokens riêng, duration theo WAV. Timeline phải seek cùng frame ra cùng hình. Thiếu anchor phải fail có thông báo, không fallback âm thầm về đầu scene.

Một sân khấu, sơ đồ tăng dần theo lời. Không bắt buộc meme, số liệu hook hoặc nhạc. Safe area phải xem thực tế trên điện thoại.

## FFmpeg và QC
Remotion tạo hình/timeline, FFmpeg trim/mix/normalize/encode khi cần. Nếu cắt đổi thời gian phải cập nhật caption/timeline; không giữ SRT cũ. Hạn chế encode nhiều lần.

Preset nội bộ H.264/AAC 1080×1920/30fps; <=300s. Mục tiêu mix khởi đầu khoảng -14 LUFS, true peak <=-1 dBTP, kiểm nghe; không phải khẳng định tiêu chuẩn Facebook. Nhạc phải không che lời, không áp cứng khoảng cách 6 dB cho mọi track.

QC: ffprobe metadata, audio/caption bounds, timestamps monotonic, không overflow, assets/sources đủ. Snapshot đầu/giữa/cuối scene và điểm chuyển; xem MP4 thật, nghe toàn bộ. Test seek, frame0/frame cuối, không chỉ schema.

## Revision/resume
Hash text+model+voice+pronunciation cho cache voice. Sửa script → voice/timing/render/approval stale. Sửa timing → render stale. Sửa hình → render/QC/video approval. Sửa caption đăng/lịch → publish approval. Chỉ chạy lại phần bị ảnh hưởng; audio giữ khi đổi màu node.

Job có state/log, giữ artifact hợp lệ cuối; subprocess lỗi không marked done. Render/model nặng tuần tự. Secrets không vào Git/manifest/log.

## Cấu trúc đích
- config/: lựa chọn đã chốt, có trong lần thiết kế này.
- content/: ý tưởng/backlog.
- episodes/<id>/: facts/script/storyboard/audio/timing/export/approval.
- packages/video/: Remotion app; hiện có composition CacheHitMiss cho EP002, các scene khác thêm theo tập.
- pipeline/: voice, align, compile, render, qa đã có; publish adapter chưa xây.
- assets/: thư viện của kênh, chưa nhập.
- references/imported/: ZIP nghiên cứu, không runtime.
- tools/VieNeu-TTS/: engine local đã hoạt động.

Xem [operation](operation-draft.md), [template assessment](template-assessment.md) và [plan](../plans/261023-videoailab/plan.md).

