# VideoAILab — video kỹ thuật cho lập trình viên

Project giúp creator học sâu và giải thích bằng hình: Redis, memory/cache, database, backend, network, runtime, AI engineering và devtools mới. Định hướng cập nhật theo chủ kênh ngày 23/10/2026.

## Quyết định đã chốt
- Giọng Hải Đăng, VieNeu-TTS local 3.8.3/CPU ONNX đã cài và thử.
- Remotion generate code/render; FFmpeg cắt, mix, hậu kỳ.
- Clip ngắn chủ lực; tập giải thích sâu tối đa 5 phút.
- Chủ kênh chọn một ý tưởng, duyệt từng script và từng video; làm xong mới qua tập khác.
- Ngân sách mua thêm 0 đồng. Nhạc/SFX chủ kênh cung cấp, Audio Library bổ sung sau kiểm track.
- Đăng Facebook bằng API, duyệt/lịch qua GitHub PR; chờ project mẫu để nối đúng hệ thống.
- Thiết kế pipeline đầy đủ ngay từ đầu, không đợi ba tập.

## Pilot đã chọn

**IDEA003 — Cache hit/miss**, hồ sơ [EP002](episodes/EP002-cache-hit-miss/README.md). Chủ kênh đã chọn chủ đề; script r1 đã duyệt, video chưa làm. Scaffold dần từ bộ khung này.

[Repository và khôi phục môi trường](docs/repository.md). Engine/model, media tham khảo và ZIP template chỉ lưu local, không nằm trên GitHub.

## Đọc từ đâu
1. [36 ý tưởng để chọn](content/ideas-menu.md) — backlog, IDEA003 đã được chọn.
2. [Chiến lược kênh](docs/channel-strategy.md).
3. [Đánh giá template ZIP](docs/template-assessment.md).
4. [Pipeline và schema](docs/production-system.md).
5. [Operation và publish PR/API](docs/operation-draft.md).
6. [Kế hoạch triển khai](plans/261023-videoailab/plan.md).
7. [Cấu hình đã chốt](config/channel.json), [hướng dẫn VieNeu](docs/vieneu-setup.md).

## Trạng thái thực tế
Đã có tài liệu, backlog mới, template nghiên cứu đã giải nén, cấu hình lựa chọn và VieNeu hoạt động. ZIP dùng HyperFrames/GSAP; sẽ lấy ý tưởng/schema phù hợp rồi port sang Remotion, không chạy nguyên bộ.

Chưa có Remotion project, aligner local đã kiểm thử, renderer end-to-end hay Facebook publisher. Config là hợp đồng thiết kế, chưa được runtime đọc. Chưa sản xuất video mới hoặc đăng bài.

[Tập API cũ](episodes/EP001-api-la-gi/README.md) chỉ là hồ sơ tham khảo, không mặc định là tập đầu được chọn. Không xóa nội dung cũ.

## Mẫu dùng lại
[Brief](templates/episode-brief.md), [Director](templates/director-script.md), [QC/publish](templates/publish-checklist.md), [Creator learning notes](templates/creator-learning-notes.md).

Tên trang còn mở; VideoAILab là tên nội bộ. Cần project mẫu PR/API và nhạc/SFX để hoàn tất integration; vẫn có thể chọn ý tưởng và phát triển phần local trước.

