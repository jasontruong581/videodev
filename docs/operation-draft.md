# Operation — quyết định hiện tại
Cập nhật 23/10/2026. Chủ kênh duyệt từng script và từng video. Một video đang sản xuất. Số giờ mỗi tuần chưa cung cấp; bỏ giả định 3 video/tuần và sản xuất batch.

## Luồng duyệt
1. Agent trình menu ý tưởng, góc khai thác, visual và độ khó.
2. Chủ kênh chọn ID. EP001 API cũ là bản tham khảo, chưa tự động được chọn.
3. Research → facts → script + director board → chủ kênh duyệt script.
4. Sau duyệt: Hải Đăng → timing/caption → Remotion → FFmpeg → QC.
5. Trình MP4, cover, caption, nguồn và QC → chủ kênh duyệt video hoặc sửa.
6. Gói đã duyệt đi qua GitHub PR/lịch đăng và Facebook API theo project mẫu sẽ được cung cấp.
7. Lưu receipt hoặc scheduled confirmation. Video đã hẹn lịch không chiếm slot sản xuất; có thể chọn tập tiếp sau hoàn tất gói tập hiện tại.

Chưa chốt số vòng sửa. Gom feedback theo revision; nội dung script đổi phải duyệt lại, export đổi phải duyệt lại video.

## Trạng thái
idea → selected → researching → script_review → script_approved → producing → video_review → video_approved → publish_ready → scheduled → published

changes_requested quay lại bước tương ứng; blocked có lý do; failed lưu lỗi/retry. scripted_reference dành cho EP001, không có nghĩa đã được chọn/duyệt. scheduled chỉ khi adapter xác nhận nhận lịch.

## GitHub PR / Facebook API
Thiết kế điểm nối từ đầu; chưa triển khai hay gọi API đăng. Project mẫu sẽ quyết định repo conventions, trigger, storage, quyền và cách hẹn lịch.

PR là hồ sơ duyệt/lịch, tự nó không phải scheduler. Workflow phía sau đọc manifest đã duyệt để đăng đúng giờ; chọn nền tảng nhận lịch hoặc runner tới giờ gọi API theo mẫu. Chưa khẳng định endpoint/quyền Reels khi chưa kiểm chứng.

Manifest: episode/revision, SHA-256 MP4, caption/cover, page target, thời điểm Asia/Bangkok và UTC, approval của chủ kênh, nguồn/credit, khóa chống đăng lặp. Không chứa token. Approval gắn hash bản cuối; thay artifact/caption/lịch phải duyệt lại.

Upload/publish timeout: tra trạng thái bằng remote ID đã lưu trước khi retry. Lưu video ID/post ID, processing/scheduled/published, thời điểm, lỗi; chống trùng episode+revision+destination. Token hết hạn, quota hoặc máy offline là lỗi cần xử lý, không coi là đã đăng.

## Ngân sách
0 đồng mua thêm dịch vụ: TTS/render local; không Soniox/Gemini/ElevenLabs trả phí hoặc render cloud mặc định. Máy/điện/mạng và công cụ đang có vẫn tiêu thụ tài nguyên. Coding assistant hiện có có giới hạn usage, không phải API miễn phí vô hạn.

Nhạc/SFX chủ kênh cung cấp trước; ghi track, nguồn, license, credit. YouTube Audio Library bổ sung nếu cần; kiểm điều kiện từng track cho Facebook, không mặc định quyền dùng ngoài YouTube. Thiếu track phù hợp có thể xuất không nhạc. [Hướng dẫn Audio Library](https://support.google.com/youtube/answer/3376882) — đối chiếu 23/10/2026.

GitHub runner/storage tùy quota tài khoản, chưa hứa miễn phí vô hạn. Render local; chốt nơi chứa MP4 theo project mẫu, tránh media lớn trong Git history.

## Học và đo
Ghi giờ research/script/voice/render/revision, lỗi thuật ngữ, bài học và phản hồi người xem. Sau đăng đo chỉ số có thật ở 48 giờ/7 ngày; N/A nếu không có. Không áp quota tăng trưởng.

## Còn cần
Project mẫu PR → lịch → Facebook; danh sách nhạc/SFX; tên kênh; số giờ/tuần nếu muốn lập lịch. Không cản việc chốt kiến trúc và chọn chủ đề.

