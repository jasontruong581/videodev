# Phase 1 — Nền tảng và chuyển template
Status: pending. Quyết định kiến trúc đã có, chưa xây runtime.

1. Khởi tạo Remotion local với version lock; kiểm môi trường Node, font tiếng Việt và khả năng render.
2. Schema/validator episode/script/storyboard/timing/approval; lỗi anchor phải rõ.
3. Port scene đầu: title, flow, compare, code, tree. Các scene còn lại thêm theo yêu cầu tập.
4. Adapter tới VieNeu env hiện có/Hải Đăng; tránh cài env trùng.
5. Cài/test local ASR riêng; map text/say và thuật ngữ. Không paid fallback.
6. Compile timeline từ WAV; preview, FFmpeg mix/export, QA, revision cache.
7. Spike với dữ liệu giả kiểm seek, frame cuối, caption, giọng dài/đoạn, không công bố.

Ownership đích: packages/video/, pipeline/, schemas/ (chưa tồn tại). Config/channel.json đã có, không tự thay quyết định user. Không sửa nguyên bản references/imported/.

Done: một fixture render local được kiểm hình/âm; lỗi thiếu asset/anchor rõ; JSON roundtrip và timing bounds đạt. Đây chưa phải user duyệt nội dung hoặc video sản xuất.

