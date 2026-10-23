# Creator learning notes — EP002 Cache hit và cache miss

- Câu hỏi mình muốn hiểu: cùng một request, vì sao có lúc app đọc từ cache, có lúc phải xuống database?
- Trước khi nghiên cứu mình nghĩ: *(chủ kênh tự điền)*
- Cơ chế đã xác minh: với cache-aside, app hỏi cache trước. Có dữ liệu là hit. Không có là miss: app lấy từ database, nạp vào cache, rồi trả kết quả. Lần sau cùng key sẽ hit. Nguồn: [facts.md](facts.md) C01–C03.
- Sơ đồ mình tự giải thích lại: *(chủ kênh tự vẽ lại Client → App → Cache / Database cho hai request)*
- Thí nghiệm nhỏ / input / output / môi trường / phiên bản: chưa chạy. Gợi ý: Redis local, đọc cùng một key hai lần bằng `GET`, lần đầu trả `nil` (miss) rồi `SET` sau khi lấy từ DB giả. Ghi lại phiên bản Redis nếu làm.
- Phép ví von đúng tới đâu, sai từ đâu: video không dùng ví von để khỏi lệch nghĩa; sơ đồ là mô phỏng cơ chế.
- Điểm còn chưa chắc, không đưa vào video như sự thật: mức chênh tốc độ giữa hit và miss (chưa đo); tỷ lệ hit hợp lý cho từng hệ thống.
- Nguồn gốc và ngày đọc: Microsoft Learn Cache-Aside pattern (cập nhật 11/09/2025), Wikipedia Cache (computing); đọc 23/10/2026.
- Điều người xem có thể áp dụng: khi thấy request lúc chậm lúc nhanh, kiểm tra xem đó là hit hay miss trước khi kết luận có lỗi.
- Chủ đề liên quan để học tiếp: TTL (IDEA004), cache invalidation (IDEA005), cache stampede (IDEA006), write-through caching.
