# Director script — EP001

Các mốc bên dưới là ngân sách dựng 90 giây, KHÔNG phải timestamp phụ đề hoặc thời lượng TTS đã đo. Nếu voice quá dài, rút câu hoặc kéo thời lượng; không ép tốc độ đến khó nghe. Lời đọc đầy đủ nằm trong voiceover.txt.

| Cảnh | Mốc dự kiến | Lời đọc bắt đầu | Hình ảnh và chuyển động | Chữ chính | Ý định |
|---|---|---|---|---|---|
| S01 | 0–5s | Bạn nghe ây pi ai suốt… | Ba ô App → ? → Dịch vụ; dấu hỏi biến thành API | API là gì? | Nêu đúng câu hỏi |
| S02 | 5–17s | Hãy tưởng tượng bạn đi ăn… | Vẽ bàn ăn, thực đơn, bếp; đơn gọi món đi sang bếp, món quay về | Gửi yêu cầu → nhận kết quả | Tạo ví dụ quen thuộc |
| S03 | 17–28s | Phần mềm cũng cần… | Chuyển bàn ăn thành App, bếp thành Dịch vụ; hiện thẻ quy tắc bên đường nối | Giao tiếp theo quy tắc | Gắn ví dụ với định nghĩa |
| S04 | 28–40s | Ví dụ, ứng dụng thời tiết… | App gửi “Hà Nội?”; dịch vụ trả thẻ “28°C”; App hiện biểu tượng thời tiết | Dữ liệu minh họa | Hiện request/response cụ thể; số 28 là giả lập |
| S05 | 40–54s | Yêu cầu gửi đi gọi là… | Hai mũi tên khác màu; lần lượt gắn request và response; góc nhỏ nhắc ví dụ nhà hàng | Request / Response | Dạy hai thuật ngữ, giữ giới hạn ví von |
| S06 | 54–66s | Không phải yêu cầu nào… | Một nhánh thành công và ba thẻ lỗi: thiếu thông tin, thiếu quyền, sự cố | Có thể trả về lỗi | Sửa hiểu nhầm API luôn chạy thành công |
| S07 | 66–78s | Khi một ứng dụng gọi… | App → Dịch vụ AI → câu trả lời; không nhân hóa máy thành người suy nghĩ | Đầu vào → Đầu ra | Nối sang chủ đề AI |
| S08 | 78–90s | Nhớ thế này… | Thu gọn về hai hộp và quy tắc ở giữa; hiện câu hỏi tập sau | API key để làm gì? | Nhắc một ý, dẫn tập tiếp |

## Chỉ đạo dựng

Một chuyển động giải thích một quan hệ. Chỉ làm nổi phần đang nói. Tránh chữ chạy liên tục hoặc stock footage không liên quan. Dùng icon tự tạo hoặc tài sản có license rõ ràng. Tắt nhạc ở bản nghe thử đầu để kiểm tra giọng.

Nhịp giọng: nam trầm, bình tĩnh, như người hướng dẫn giải thích cho bạn mới. Không hạ pitch bằng hậu kỳ để giả giọng trầm nếu làm méo âm. Đọc thử “API”, “request”, “response”, “AI”, “API key”; chọn phát âm rõ và nhất quán, không mặc định TTS hiểu đúng tiếng Anh.

## Kiểm chứng trước xuất bản

Đối chiếu định nghĩa API/request/response với tài liệu nền tảng; ghi URL, ngày xem, mệnh đề được hỗ trợ trong production-notes.md. Không diễn đạt rằng mọi API đều dùng mạng hoặc HTTP; tập này dùng ví dụ dịch vụ mạng. Chưa có bài thử người xem: nhờ một người mới kể lại bằng lời của họ.
