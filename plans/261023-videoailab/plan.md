---
title: "VideoAILab: pipeline video kỹ thuật Remotion"
description: "Thiết kế đủ pipeline local và hai điểm duyệt, nối publish PR/Facebook theo project mẫu."
status: pending
priority: P2
tags: [video, remotion, pipeline, docs]
created: 2026-10-23
---

# Kế hoạch cập nhật
Bộ thiết kế đã cập nhật; implementation pending. Không áp kế hoạch cũ 12 video/4 tuần hoặc manual-first. Chỉ một video đang sản xuất; đã chọn IDEA003 — Cache hit/miss (EP002).

| Phase | Kết quả | Trạng thái |
|---|---|---|
| [1. Nền tảng và port template](phase-01-concept.md) | Remotion scene library, schema, local adapters | in_progress: đã có CacheHitMiss, voice/align/compile/render/mix/QC; chưa có scene library chung và validator riêng |
| [2. Một tập được chọn](phase-02-first-episode.md) | Script duyệt → WAV/timing → final duyệt | in_progress: script đã duyệt, bản nháp chờ duyệt video |
| [3. Publish PR/API](phase-03-pilot.md) | Scheduler, receipt, chống đăng trùng | pending_reference |

## Đã hoàn thành trong bước thiết kế
- Hải Đăng và công cụ đã chốt; VieNeu chạy local.
- [Menu 36 ý tưởng](../../content/ideas-menu.md), [config](../../config/channel.json).
- [Review ZIP](../../docs/template-assessment.md), [pipeline](../../docs/production-system.md), [operation](../../docs/operation-draft.md).
- Short là chính, trần 300 giây, budget mua thêm 0, user duyệt script/video.

## Còn cần
Chủ kênh đã chọn IDEA003; bước nội dung tiếp theo là nghiên cứu và trình script/director. Project mẫu PR/API để tích hợp publish, nhạc/SFX để nhập thư viện. Có thể làm spike kỹ thuật độc lập bằng dữ liệu giả. Không tự đăng, tạo PR remote hoặc dùng paid API.

## Tiêu chí end-to-end
Một tập đi qua đúng user approvals; output tái tạo từ manifest; timing đúng audio; final <=300s; approval stale khi artifact đổi; publisher chỉ xử lý bản duyệt và không tạo bài trùng khi retry. Khi chưa có integration, dừng ở publish_ready và báo đúng trạng thái.

Kế hoạch này thay thế lịch pilot định lượng cũ. Các phase là việc cần triển khai, không phải cam kết đã thực hiện.

