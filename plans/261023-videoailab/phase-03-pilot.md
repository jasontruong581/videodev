# Phase 3 — GitHub PR và Facebook publisher
Status: pending_reference. Tên file giữ để không phá link cũ; nội dung thay kế hoạch pilot cũ.

1. Nhận và đọc project mẫu: repo, PR conventions, scheduler, secrets, storage.
2. Kiểm API/version/quyền và khả năng hẹn lịch cho loại video được dùng.
3. Adapter input là publish manifest đã duyệt/hash; đổi artifact/lịch làm approval stale.
4. Upload, lưu remote ID trước retry; tra status sau timeout; chống trùng.
5. Xác nhận lịch/timezone, xử lý runner offline, token expiry, quota, remote processing.
6. Dry run không publish, kiểm reject bản chưa duyệt, đổi hash và retry.
7. Dùng bản video chủ kênh đã duyệt theo cơ chế project mẫu; lưu receipt/post URL thực.

Done: bằng chứng lịch hoặc post từ API, không coi PR created là scheduled; secrets ngoài Git; retry không tạo bài thứ hai. Chưa có credentials hoặc project mẫu, không tạo workflow giả có vẻ đã chạy được.

