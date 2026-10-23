# VideoAILab — quy tắc làm việc

Đọc [README.md](README.md) trước. Pipeline và lệnh chạy: [pipeline/README.md](pipeline/README.md).

- Một video sản xuất tại một thời điểm. Chủ kênh chọn ý tưởng, duyệt script và duyệt video; mỗi lần duyệt ghi vào `episodes/<id>/approvals.json` kèm hash, không tự ghi thay chủ kênh.
- Cần quyết định của chủ kênh (chủ đề, phong cách, giọng/cách đọc, đăng bài) thì hỏi trước khi làm.
- Commit sau mỗi bước hoàn chỉnh, theo conventional commit, không nhắc AI trong message.
- **Mỗi video xong (video được chủ kênh duyệt) thì push lên `origin main`.** Chưa duyệt thì không push, trừ khi chủ kênh yêu cầu.
- Không commit secret, token, `.env`, media nặng (`*.mp4`, `*.wav`), `tools/`, `renders/`. Đã có trong `.gitignore`.
- Không dùng dịch vụ trả phí; không đăng Facebook hay tạo PR/Release từ xa khi chưa được chủ kênh đồng ý.
