# Gói sản xuất và xuất bản — bản nháp

## Tài sản cần tạo

- Icon App, dịch vụ, bếp, thực đơn; mũi tên request/response; thẻ lỗi.
- Thẻ dữ liệu Hà Nội 28°C phải có chữ “minh họa”, không phải dự báo thật.
- WAV mỗi đoạn sau khi chốt voice; bản ghép master; subtitle SRT và ASS sau căn thời gian.
- Video dọc 1080×1920, 30 fps là cấu hình nội bộ đề xuất; bản xuất H.264/AAC cần xem thử trên thiết bị trước đăng.

## Phụ đề

`voice-manifest.csv` nối ID cảnh, phiên bản văn bản, tên file dự kiến, giọng thực tế và thời lượng đo. Các đường dẫn audio hiện chưa tồn tại; điền sau khi tạo voice. Nếu đổi câu/giọng, tăng phiên bản, đo lại và đánh dấu cảnh/phụ đề liên quan cần căn lại.

Lời TTS ghi “ây pi ai”, phụ đề ghi “API”. Hai bản cùng ý, cùng thứ tự; không lấy văn bản đã phiên âm làm phụ đề hiển thị. Ghi duration thực tế từng clip, căn từng cụm theo âm thanh, nghe và sửa thủ công. Chưa tạo SRT giả timestamp vì chưa có voice thật.

Đề xuất tối đa hai dòng, khoảng 5–9 đơn vị cách nhau bởi dấu cách mỗi cụm, ưu tiên cắt theo nghĩa. Cỡ chữ thử 56–64 px ở 1080p; thu nhỏ màn hình để kiểm tra, không coi đó là mức bắt buộc. Từ khóa nhấn bằng cyan, còn lại trắng có viền tối. Chừa vùng mép và giao diện Facebook; phải xem preview thực tế vì vùng che thay đổi theo thiết bị.

## Caption bài đăng dự thảo

API nghe có vẻ khó, nhưng bạn có thể bắt đầu từ một lần gọi món: gửi yêu cầu, nhận kết quả, theo một bộ quy tắc. Trong video này mình dùng ứng dụng thời tiết để giải thích request và response. Ví dụ nhà hàng chỉ là cách ví von; API còn nhiều dạng khác nữa.

Bạn muốn tập tiếp theo nói về API key hay JSON?

#AIDeHieu #LapTrinhChoNguoiMoi #API

Tiêu đề cover: “API LÀ GÌ?”; dòng phụ: “Hiểu qua một lần gọi món”. Tên/hashtag thương hiệu là phương án nháp.

## Nhật ký nguồn

Đối chiếu ngày 23/10/2026:

- [MDN: API](https://developer.mozilla.org/en-US/docs/Glossary/API): API cung cấp tính năng và quy tắc để phần mềm tương tác; phạm vi API rộng hơn dịch vụ mạng. Hỗ trợ định nghĩa cảnh S03.
- [MDN: HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview): thông điệp phía client gửi là request, phía server trả lời là response. Hỗ trợ ví dụ dịch vụ mạng ở S04–S05.
- Nhà hàng và nhiệt độ 28°C là ví dụ tự tạo, không phải trích dẫn hoặc dữ liệu thật. Không dùng video mẫu làm nguồn chứng minh định nghĩa kỹ thuật.

## Cổng nghiệm thu

- [x] Đối chiếu định nghĩa và giới hạn ví dụ với tài liệu MDN.
- [ ] Nghe thử phát âm API/request/response/API key.
- [ ] Đo voice thật và chỉnh lại mốc cảnh.
- [ ] Căn phụ đề đủ câu, dấu tiếng Việt đúng, không chồng cue.
- [ ] Mute vẫn hiểu ý; nghe không nhìn vẫn hiểu ví dụ.
- [ ] Người mới kể lại đúng request/response.
- [ ] Kiểm tra tài sản, preview điện thoại và người phụ trách duyệt bản cuối.
