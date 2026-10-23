# Menu ý tưởng kỹ thuật

Chủ kênh chọn **một ID** để bắt đầu. Các dòng dưới là đề tài/góc nghiên cứu, chưa phải script hoặc phát biểu kỹ thuật đã fact-check. Clip ngắn là mặc định; tối đa 5 phút. EP001 API cũ chỉ là tham khảo, chưa được chọn sản xuất.

| ID | Chủ đề | Câu hỏi/hook | Show bằng gì | Mức |
|---|---|---|---|---|
| IDEA001 | Redis là gì ngoài việc làm cache? | Một công cụ, nhiều cách dùng: chọn một ví dụ chính | App → Redis → database, phân biệt vai trò | cơ bản |
| IDEA002 | CPU cache, RAM và ổ đĩa khác nhau thế nào? | Dữ liệu đi qua những tầng nào khi code chạy? | Memory hierarchy và mũi tên đọc dữ liệu | cơ bản |
| IDEA003 | Cache hit và cache miss là gì? | Cùng một request, vì sao có hai đường đi? | Hai lượt request với hit/miss | cơ bản |
| IDEA004 | TTL hết hạn thì chuyện gì xảy ra? | Cache không tự biết dữ liệu gốc đã đổi | Timeline giá trị mới/cũ và expiry | cơ bản |
| IDEA005 | Cache invalidation khó ở đâu? | DB đã đổi nhưng màn hình vẫn thấy giá cũ | Hai đường write/read trên timeline | trung cấp |
| IDEA006 | Cache stampede là gì? | Một key hết hạn, nhiều request cùng chạy xuống DB | Dòng request hội tụ và single-flight | trung cấp |
| IDEA007 | Database index hoạt động thế nào? | Tìm một dòng có cần đọc cả bảng? | Bảng nhỏ đối chiếu cấu trúc index minh họa | cơ bản |
| IDEA008 | Index nhiều có luôn tốt? | Đọc nhanh hơn, ghi phải làm thêm gì? | Insert cập nhật bảng và các index | trung cấp |
| IDEA009 | Transaction giúp tránh điều gì? | Chuyển tiền mà mới cập nhật một phía thì sao? | Hai thay đổi commit/rollback | cơ bản |
| IDEA010 | Race condition trong backend | Hai request cùng mua sản phẩm cuối | Timeline xen kẽ hai request | trung cấp |
| IDEA011 | N+1 query là gì? | Một trang danh sách gọi database bao nhiêu lượt? | Một query danh sách và vòng query con | trung cấp |
| IDEA012 | Pagination offset và cursor | Trang sau được xác định bằng số hay mốc? | Bản ghi thêm mới giữa hai lần tải | trung cấp |
| IDEA013 | Queue và worker hoạt động thế nào? | Request có cần đợi gửi email xong? | Producer → queue → worker | cơ bản |
| IDEA014 | Retry vì sao có thể làm lỗi nặng hơn? | Một lần timeout có chắc chưa xử lý? | Response thất lạc và request gửi lại | trung cấp |
| IDEA015 | Idempotency key để làm gì? | Bấm thanh toán hai lần có tạo hai giao dịch? | Cùng key đối chiếu trạng thái xử lý | trung cấp |
| IDEA016 | Rate limit bằng token bucket | Cho phép burst nhưng vẫn giới hạn ra sao? | Token sinh thêm và request lấy token | trung cấp |
| IDEA017 | Webhook khác polling thế nào? | Cứ hỏi lại hay chờ được báo? | Hai timeline trao đổi message | cơ bản |
| IDEA018 | WebSocket khác HTTP request thông thường? | Ứng dụng chat nhận tin mới theo cách nào? | Kết nối dài và luồng message | cơ bản |
| IDEA019 | DNS làm gì khi gõ một tên miền? | Ai tìm địa chỉ cho request của bạn? | Resolver và các bước tra cứu rút gọn | cơ bản |
| IDEA020 | TCP và UDP: chọn theo yêu cầu nào? | Truyền dữ liệu cần bảo đảm điều gì? | Gói tin đến lệch thứ tự và mất gói | cơ bản |
| IDEA021 | HTTPS bảo vệ phần nào? | Có ổ khóa có nghĩa website đáng tin hoàn toàn? | TLS giữa client/server và ranh giới bảo vệ | cơ bản |
| IDEA022 | Cookie và session khác nhau ở đâu? | Trạng thái đăng nhập được giữ ở đâu? | Browser cookie ↔ server session | cơ bản |
| IDEA023 | JWT có phải dữ liệu được mã hóa? | Nhìn thấy payload có làm token giả được không? | Header/payload/signature, signed vs encrypted | trung cấp |
| IDEA024 | OAuth: đăng nhập và cấp quyền có giống nhau? | Ứng dụng được phép truy cập điều gì? | Actor và permission flow có phạm vi rõ | trung cấp |
| IDEA025 | Process và thread khác nhau thế nào? | Những gì được chia sẻ, những gì tách riêng? | Vùng bộ nhớ và luồng thực thi | cơ bản |
| IDEA026 | Event loop chạy callback khi nào? | Code async có nghĩa chạy song song mọi thứ? | Call stack và hàng đợi callback | trung cấp |
| IDEA027 | Docker khác máy ảo thế nào? | Ứng dụng chia sẻ lớp nào với máy host? | Stack ứng dụng/runtime/kernel | cơ bản |
| IDEA028 | Environment variable khác config file? | Đổi môi trường mà không sửa code thế nào? | Cùng build với các nguồn config | cơ bản |
| IDEA029 | Token khác từ như thế nào? | Một câu được mô hình chia ra sao? | Chuỗi chữ chia token bằng tokenizer xác minh | cơ bản |
| IDEA030 | Embedding dùng để tìm kiếm thế nào? | Hai câu khác chữ vẫn có thể gần nhau? | Không gian minh họa và nearest neighbors | cơ bản |
| IDEA031 | RAG khác fine-tuning ở bước nào? | Thêm tài liệu và thay trọng số khác nhau ra sao? | Hai pipeline dữ liệu/inference/training | trung cấp |
| IDEA032 | Tool calling thực sự chạy ở đâu? | Mô hình yêu cầu công cụ, ai thực thi? | Model → ứng dụng → tool → kết quả | trung cấp |
| IDEA033 | KV cache trong inference là gì? | Khi sinh token tiếp theo, phần nào được dùng lại? | Attention cache tăng theo chuỗi token | nâng cao |
| IDEA034 | Mổ xẻ một devtool mới qua một tác vụ | Nó giải quyết vấn đề nào trong workflow thật? | Demo input/output và phần cơ chế | tùy công cụ |
| IDEA035 | Một tính năng AI mới thay đổi bước nào của dev? | Tin mới này giúp việc gì và có giới hạn gì? | Cùng bài thử trước/sau, ghi phiên bản | tùy công cụ |
| IDEA036 | Đọc một benchmark công cụ cho đúng | Con số nhanh hơn được đo trong điều kiện nào? | Bài đo, dataset, môi trường, kết quả | trung cấp |

Gợi ý mở màn: IDEA003 cache hit/miss dễ làm một video ngắn rõ cơ chế; IDEA001 Redis phù hợp hướng backend; IDEA023 JWT tạo được cú sửa hiểu lầm có giá trị. Không tự chọn thay chủ kênh.

IDEA034–036 chỉ sản xuất sau khi chọn công cụ/tính năng/benchmark và kiểm nguồn chính thức sát ngày viết; không dùng tin hoặc số đo giả định.

