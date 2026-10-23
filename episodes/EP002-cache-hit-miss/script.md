# Script — EP002 Cache hit và cache miss (r1, chờ duyệt)

`text` là bản hiển thị/phụ đề, `say` là bản đưa TTS. Hai bản cùng ý; `say` chỉ đổi cách đọc thuật ngữ. Mọi cách đọc dưới đây là ứng viên, chưa nghe thử: chốt sau khi nghe Hải Đăng đọc.

Ước tính ~255 âm tiết, tức khoảng 65–80 giây ở nhịp giải thích. Chỉ là ước tính; thời lượng thật lấy từ WAV.

| Line | Scene | text | say |
|---|---|---|---|
| L01 | S01 | Cùng một request, vì sao lúc thì lấy từ cache, lúc lại phải xuống database? | Cùng một ri-quét, vì sao lúc thì lấy từ két, lúc lại phải xuống đây-ta-bây? |
| L02 | S02 | Giả sử app cần hiển thị một sản phẩm. Phía sau app có hai chỗ để lấy dữ liệu: cache và database. | Giả sử áp cần hiển thị một sản phẩm. Phía sau áp có hai chỗ để lấy dữ liệu: két và đây-ta-bây. |
| L03 | S02 | Database giữ dữ liệu gốc. Cache là bộ nhớ đệm, truy cập nhanh hơn. | Đây-ta-bây giữ dữ liệu gốc. Két là bộ nhớ đệm, truy cập nhanh hơn. |
| L04 | S03 | Request đầu tiên đến. App hỏi cache trước, nhưng cache chưa có sản phẩm này. Đó là cache miss. | Ri-quét đầu tiên đến. Áp hỏi két trước, nhưng két chưa có sản phẩm này. Đó là két mít. |
| L05 | S03 | App xuống database lấy dữ liệu, ghi một bản vào cache, rồi mới trả kết quả. | Áp xuống đây-ta-bây lấy dữ liệu, ghi một bản vào két, rồi mới trả kết quả. |
| L06 | S04 | Cache miss không phải lỗi. Nó chỉ cho biết lần này cache chưa có thứ cần tìm. | Két mít không phải lỗi. Nó chỉ cho biết lần này két chưa có thứ cần tìm. |
| L07 | S05 | Request thứ hai hỏi cùng sản phẩm. App vẫn hỏi cache trước, và lần này cache đã có. Đó là cache hit. | Ri-quét thứ hai hỏi cùng sản phẩm. Áp vẫn hỏi két trước, và lần này két đã có. Đó là két hít. |
| L08 | S05 | Dữ liệu trả về từ cache, database không phải làm gì thêm. | Dữ liệu trả về từ két, đây-ta-bây không phải làm gì thêm. |
| L09 | S06 | Nhưng hit không có nghĩa là dữ liệu luôn mới nhất. Nếu dữ liệu gốc đổi, bản trong cache có thể vẫn là bản cũ. Tập sau mình nói về chuyện này. | Nhưng hít không có nghĩa là dữ liệu luôn mới nhất. Nếu dữ liệu gốc đổi, bản trong két có thể vẫn là bản cũ. Tập sau mình nói về chuyện này. |
| L10 | S07 | Nhớ nhé: hit là cache đã có, miss là cache chưa có nên phải xuống database. Cùng một request, hai đường đi. | Nhớ nhé: hít là két đã có, mít là két chưa có nên phải xuống đây-ta-bây. Cùng một ri-quét, hai đường đi. |
| L11 | S07 | Tập tới: dữ liệu trong cache sống được bao lâu? | Tập tới: dữ liệu trong két sống được bao lâu? |

## Ghi chú nguồn cho từng ý

- L04–L05: cache-aside, [facts.md](facts.md) C01–C03.
- L06: C06 (diễn giải từ luồng thiết kế, không phải trích nguyên văn).
- L07–L08: C01, C03, C04 (chỉ nói định tính, không có số đo).
- L09: C05.
- L03: "truy cập nhanh hơn" là định tính, C04.

## Chủ ý khi viết

- Chỉ dạy cache-aside, nói rõ "app hỏi cache trước". Không khẳng định mọi cache đều hoạt động như vậy.
- L09 chỉ cảnh báo giới hạn, không giải thích TTL/invalidation để giữ tập gọn.
- Không ví von, không số liệu hiệu năng.
