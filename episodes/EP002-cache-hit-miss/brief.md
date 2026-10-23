# Brief — EP002: Cache hit và cache miss

- Revision / ngày / owner: r1 / 23/10/2026 / chủ kênh
- Trạng thái: script_review
- Idea ID được chủ kênh chọn: IDEA003
- Tuyến: memory
- Người xem cụ thể: lập trình viên và người học kỹ thuật đã biết app gọi database.
- Vấn đề/câu hỏi của họ: cùng một request, vì sao có lúc app đọc từ cache, có lúc phải xuống database?
- Một điều họ sẽ hiểu: app hỏi cache trước; có dữ liệu là hit, chưa có là miss thì xuống database lấy rồi nạp vào cache. Miss không phải lỗi.
- Định dạng / độ dài dự kiến: short dọc 1080×1920, 60–90 giây (ước tính từ số âm tiết, đo lại bằng WAV thật).
- Hook: "Cùng một request, vì sao lúc thì lấy từ cache, lúc lại phải xuống database?"
- Ví dụ xuyên suốt / dữ liệu giả: một sản phẩm "#42" với giá giả, gắn nhãn "minh họa". Chiến lược: cache-aside.
- Ba ý bắt buộc: (1) miss → database → nạp cache; (2) hit → trả thẳng từ cache; (3) hit không bảo đảm dữ liệu mới nhất.
- Điều không đưa vào tập: TTL, invalidation, eviction, stampede, số đo tốc độ, tỷ lệ hit.
- CTA: tập sau — dữ liệu trong cache sống bao lâu (IDEA004).
- Ngày dự kiến đăng; hạn kiểm lại tin/tính năng: chưa đặt; nội dung cơ chế ổn định, kiểm lại nguồn khi đăng.

## Bằng chứng

Xem [facts.md](facts.md).

## Sản xuất

- Voice: Hải Đăng / VieNeu 3.8.3 local CPU ONNX; render Remotion + FFmpeg.
- Thuật ngữ cần thử phát âm: cache, hit, miss, request, database, app.
- Asset cần tạo: icon Client/App/Cache/Database và mũi tên vẽ bằng Remotion; không cần ảnh ngoài.
- Demo thật hay mô phỏng: mô phỏng cơ chế, gắn nhãn "minh họa".
- Tiêu chí hoàn thành riêng: mute vẫn thấy đường đi khác nhau của hai request; không có con số hiệu năng.
- Người duyệt script / ngày: chờ chủ kênh.

## Câu hỏi còn mở

- Cách đọc "cache" (xem mục phát âm trong [script.md](script.md)) cần nghe thử khi có giọng.
