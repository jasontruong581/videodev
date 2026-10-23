# Pilot — Cache hit và cache miss

- Episode: EP002 (EP001 là bản API tham khảo cũ).
- Idea: IDEA003.
- Trạng thái: script_review. Chủ kênh đã chọn; script r1 chờ duyệt, video chưa làm.
- Hồ sơ: [brief](brief.md), [facts](facts.md), [learning notes](learning-notes.md), [script](script.md), [director](director-script.md).
- Đối tượng: lập trình viên và người học kỹ thuật.
- Giọng: Hải Đăng / VieNeu local.
- Dự kiến: 60–90 giây, không vượt 300 giây.
- Render dự kiến: Remotion + FFmpeg.

## Câu hỏi chính

Cùng một request lấy dữ liệu, vì sao có lúc ứng dụng đọc từ cache, có lúc phải xuống database?

## Hướng hình ảnh để phát triển

Giữ sơ đồ Client → App → Cache / Database. Cho một request đi qua khi cache chưa có giá trị, rồi cho request tiếp theo đi qua khi đã có giá trị. Highlight đường đi, phần nhận dữ liệu và bước điền cache. Chọn một chiến lược cụ thể (dự kiến cache-aside) để tránh diễn đạt như mọi cache đều giống nhau.

## Những gì cần nghiên cứu trước script

- Định nghĩa hit/miss và luồng cache-aside từ nguồn chính thức.
- Cache miss không đồng nghĩa lỗi hệ thống.
- Hit không bảo đảm dữ liệu mới nhất; chỉ nhắc giới hạn ngắn, không ôm thêm cả TTL/invalidation vào tập này.
- Không dùng số mili giây hoặc tỷ lệ nhanh hơn nếu chưa đo; animation là minh họa cơ chế.

## Bước tiếp theo

Scaffold nền Remotion và schema theo kế hoạch; nghiên cứu nguồn, trình script + director để chủ kênh duyệt rồi mới tạo giọng/video sản xuất. Chưa có MP4 hoặc lịch đăng.
