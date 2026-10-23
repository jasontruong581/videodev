# Director script — EP002

- Revision: r1 (đã duyệt cùng [script.md](script.md), 23/10/2026)
- Script/nguồn đang dùng: [script.md](script.md), [facts.md](facts.md)
- Voice WAV đã duyệt: chưa có
- Timing: dự kiến, chưa căn WAV
- Mục tiêu hiểu sau khi xem: hai request giống nhau đi hai đường khác nhau tùy cache đã có dữ liệu hay chưa; miss không phải lỗi.

## Hình xuyên suốt

Một sân khấu cố định: Client → App, App rẽ sang Cache (trên) và Database (dưới). Nhãn nhỏ "Sản phẩm #42 · minh họa". Sơ đồ tăng dần theo lời, không chuyển cảnh cắt. Màu: đường request xanh; đường database cam; chữ "MISS" đỏ nhạt, "HIT" xanh lá. Màu không là tín hiệu duy nhất, luôn kèm chữ.

## Storyboard

| Scene | Dòng | Hình giúp hiểu điều gì | Chữ trên hình | Chuyển động | Asset |
|---|---|---|---|---|---|
| S01 | L01 | Câu hỏi: một mũi tên request đi vào, tách thành hai nhánh mờ | "Cùng một request, hai đường đi?" | Mũi tên vào, nhánh chia đôi, dấu hỏi | Vẽ bằng Remotion |
| S02 | L02–L03 | Giới thiệu bốn khối: Client, App, Cache, Database | "Cache: bộ nhớ đệm" / "Database: dữ liệu gốc" | Từng khối hiện đúng lúc nhắc tên; Cache trống, Database có "#42" | Icon tự vẽ |
| S03 | L04–L05 | Request 1: App → Cache, cache rỗng; App → Database lấy "#42"; ghi bản sao vào Cache; trả về Client | "Request 1 · MISS" | Gói tin chạy theo từng mũi tên; Cache sáng lên rồi trống; sau L05 một bản "#42" rơi vào Cache | — |
| S04 | L06 | Nhấn mạnh miss là bước bình thường: nhãn MISS đổi từ đỏ sang trung tính kèm "bước bình thường" | "MISS ≠ lỗi" | Nhãn đổi, không rung lắc cảnh báo | — |
| S05 | L07–L08 | Request 2: App → Cache có "#42"; trả thẳng về Client, Database mờ đi | "Request 2 · HIT" | Gói tin đi App→Cache→App→Client; Database xám | — |
| S06 | L09 | Giới hạn: Database đổi "#42" sang giá mới, Cache vẫn giữ bản cũ, hai thẻ lệch nhau | "Dữ liệu gốc đổi → cache có thể vẫn cũ" | Thẻ database đổi giá, thẻ cache giữ nguyên, dấu "≠" | — |
| S07 | L10–L11 | Tóm tắt hai đường cạnh nhau, rồi câu hỏi tập sau | "HIT: cache có" / "MISS: xuống database" / "Cache sống được bao lâu?" | Hai đường thu nhỏ song song; thẻ câu hỏi cuối | — |

Mốc thời gian lấy từ WAV sau khi script được duyệt. Anchor: mỗi chuyển động gắn lineId + từ khóa, ví dụ L04 "miss" kích hoạt nhãn MISS, L07 "hit" kích hoạt nhãn HIT.

## Âm thanh và caption

- Cách đọc thuật ngữ: ứng viên "cách", "hít", "mít", "áp", "ri-quét", "đây-ta-bây" trong [script.md](script.md). Chưa nghe thử, chốt sau khi nghe.
- Phụ đề hiển thị giữ nguyên "cache", "hit", "miss", "request", "database", "app".
- Ngắt nghỉ quan trọng: sau "Đó là cache miss/hit" để gói tin kịp đến nơi.
- Nhạc/SFX: chưa có track, bản đầu không nhạc. Chủ kênh cung cấp SFX thì ghi nguồn và quyền dùng.
- Từ cần nhấn: "miss", "hit", "chưa có", "đã có".

## Duyệt

- [x] Hình và lời bổ trợ nhau; không có cảnh chỉ để trang trí.
- [ ] Mốc thời gian ghi rõ dự kiến hay thật.
- [ ] Mỗi asset có nguồn và trạng thái quyền dùng.
- [x] Người duyệt / ngày / revision: chủ kênh / 23/10/2026 / r1 (xem approvals.json)

## Câu hỏi còn mở

- Cách đọc "cache" đã chốt: "cách" (chủ kênh, 23/10/2026). "hit", "miss", "request", "app", "database" vẫn là ứng viên, chờ nghe thử.
