# Facts — EP002 Cache hit và cache miss

Ngày kiểm tra nguồn: 23/10/2026. Chiến lược chọn cho tập: cache-aside (app tự đọc cache, tự nạp cache khi miss).

## Claim và nguồn

| ID | Claim được phép nói | Nguồn | Giới hạn |
|---|---|---|---|
| C01 | Cache hit là khi dữ liệu cần đọc có trong cache; cache miss là khi không có. | [Wikipedia — Cache (computing)](https://en.wikipedia.org/wiki/Cache_(computing)) | Định nghĩa chung; tập chỉ minh họa cache của ứng dụng đứng trước database. |
| C02 | Khi miss, dữ liệu được lấy từ nơi lưu gốc và thường được chép vào cache để lần sau dùng lại. | Wikipedia — Cache (computing) | "Thường", không phải mọi cache đều làm vậy. |
| C03 | Luồng cache-aside: (1) app thử đọc cache; (2) nếu miss, app lấy từ data store; (3) app thêm vào cache rồi trả cho người gọi. | [Microsoft Learn — Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside) | Chỉ đúng cho cache-aside. Cache có read-through tự nạp thì app không làm bước 2–3. |
| C04 | Hit đọc từ cache, là nơi truy cập nhanh hơn chỗ lưu gốc; miss tốn công hơn hit vì phải lấy dữ liệu từ nơi lưu gốc. | Wikipedia — Cache (computing) | Chỉ nói định tính. Không đưa mili giây hay "nhanh gấp N lần": chưa đo. |
| C05 | Cache-aside không bảo đảm cache và data store nhất quán; thay đổi ở data store không hiện trong cache cho đến khi item được nạp lại. | Microsoft Learn — Cache-Aside pattern (mục Consistency) | Chỉ nhắc một câu. TTL/invalidation để dành cho IDEA004/IDEA005. |
| C06 | Miss là một đường đi bình thường của cache, không phải lỗi hệ thống. | Suy ra từ C03: miss là bước 2 của luồng thiết kế, app có sẵn đường xử lý. | Là diễn giải của chúng ta từ mô tả luồng, không phải câu trích nguyên văn. |

## Số liệu minh họa

Sản phẩm "#42" và giá trên hình là dữ liệu giả, hình phải ghi nhãn "minh họa". Không có tỷ lệ hit, thời gian phản hồi hay so sánh tốc độ nào trong video.

## Nguyên nhân miss — chỉ ghi nhận, không đưa vào video

Miss có thể xảy ra vì chưa từng nạp, vì dữ liệu hết hạn, hoặc vì bị đẩy ra khi cache đầy (Microsoft Learn — mục Lifetime/Evicting). Video chỉ minh họa trường hợp "chưa có" để không ôm thêm TTL/eviction.

## Không đưa vào tập

TTL, invalidation, eviction, cache stampede, write-through, hit ratio, CPU cache. Các ý này có chỗ riêng ở IDEA004–IDEA006.
