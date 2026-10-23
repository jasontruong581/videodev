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

## Đợt 2: 30 ý tưởng bổ sung (IDEA037–IDEA066)

Đề xuất ngày 24/10/2026, chưa chọn thứ tự ưu tiên. Mỗi dòng vẫn chỉ là góc khai thác, chưa fact-check. IDEA062–066 liên quan tính năng/giao thức AI nên phải kiểm tài liệu chính thức sát ngày viết trước khi làm.

| ID | Chủ đề | Câu hỏi/hook | Show bằng gì | Mức |
|---|---|---|---|---|
| IDEA037 | LRU eviction: cache đầy thì bỏ mục nào? | Bộ nhớ có hạn, thứ gì bị đẩy ra trước? | Hàng ô cache, mục lâu không dùng bị loại | cơ bản |
| IDEA038 | Cache-aside, write-through, write-back khác nhau ở đâu? | Ghi dữ liệu mới thì cache và database cập nhật theo thứ tự nào? | Ba đường ghi cạnh nhau trên cùng sơ đồ | trung cấp |
| IDEA039 | Memory leak là gì? | Chương trình không crash nhưng bộ nhớ cứ tăng, vì sao? | Đồ thị bộ nhớ tăng và đối tượng còn được tham chiếu | cơ bản |
| IDEA040 | SQL JOIN: INNER và LEFT khác nhau thế nào? | Hai bảng ghép lại, dòng nào mất, dòng nào còn? | Hai bảng nhỏ và kết quả ghép từng loại JOIN | cơ bản |
| IDEA041 | Isolation level giải quyết lỗi đọc nào? | Hai transaction chạy cùng lúc có thể thấy dữ liệu dở dang không? | Timeline hai transaction và các mức isolation | trung cấp |
| IDEA042 | Deadlock trong database xảy ra thế nào? | Hai transaction chờ nhau mãi, ai nhả khóa trước? | Hai transaction giữ khóa chéo và vòng chờ | trung cấp |
| IDEA043 | Replication và replication lag | Vừa ghi xong mà đọc lại thấy dữ liệu cũ, vì sao? | Primary ghi, replica nhận chậm, request đọc rơi vào replica | trung cấp |
| IDEA044 | Sharding và partitioning khác nhau thế nào? | Một bảng quá lớn thì chia ra sao và request tìm đúng phần nào? | Khóa chia dữ liệu vào các shard | trung cấp |
| IDEA045 | Optimistic và pessimistic locking | Khóa trước hay kiểm tra phiên bản sau khi sửa? | Hai người sửa cùng bản ghi với version | trung cấp |
| IDEA046 | Load balancer chia request thế nào? | Nhiều server giống nhau, request đi vào server nào? | Request chia theo round robin và theo tải | cơ bản |
| IDEA047 | REST, GraphQL và gRPC khác nhau ở đâu? | Cùng lấy một dữ liệu, ba kiểu gọi khác nhau thế nào? | Ba cách gọi cùng một tác vụ cạnh nhau | trung cấp |
| IDEA048 | Circuit breaker bảo vệ hệ thống thế nào? | Dịch vụ phía sau chết, vì sao cứ gọi tiếp lại làm tệ hơn? | Ba trạng thái closed/open/half-open | trung cấp |
| IDEA049 | Pub/Sub khác queue ở đâu? | Một sự kiện, nhiều nơi cần biết, ai nhận được gì? | Một message đến một worker và đến nhiều subscriber | cơ bản |
| IDEA050 | Reverse proxy và API gateway làm gì? | Client chỉ thấy một địa chỉ, phía sau là gì? | Client → proxy/gateway → các dịch vụ | cơ bản |
| IDEA051 | HTTP/1.1, HTTP/2 và HTTP/3 khác nhau thế nào? | Cùng tải một trang, ba phiên bản gửi request ra sao? | Các request chạy trên một hoặc nhiều kết nối | trung cấp |
| IDEA052 | CDN hoạt động thế nào? | Người dùng ở xa server thì file đến từ đâu? | Bản đồ server gốc và các điểm cache gần người dùng | cơ bản |
| IDEA053 | CORS là gì và vì sao trình duyệt chặn? | API chạy tốt trong Postman nhưng lỗi trên trình duyệt, vì sao? | Trình duyệt, origin và header cho phép | cơ bản |
| IDEA054 | SQL injection xảy ra thế nào? | Một ô nhập liệu có thể đổi nghĩa câu truy vấn không? | Câu query ghép chuỗi và câu query có tham số | cơ bản |
| IDEA055 | XSS và CSRF khác nhau thế nào? | Một bên chèn mã vào trang, một bên mượn phiên đăng nhập? | Hai luồng tấn công với ranh giới của trình duyệt | trung cấp |
| IDEA056 | Hash, mã hóa và cách lưu mật khẩu | Lưu mật khẩu đã mã hóa có đủ an toàn không? | Mật khẩu → salt → hash chậm, không có đường ngược | cơ bản |
| IDEA057 | API key và access token khác nhau thế nào? | Một chuỗi bí mật trong request có vai trò gì? | Hai cách xác thực với phạm vi và thời hạn | cơ bản |
| IDEA058 | Garbage collection làm gì? | Ai dọn bộ nhớ khi mình không gọi free? | Đối tượng còn được tham chiếu và không còn | cơ bản |
| IDEA059 | Stack và heap khác nhau thế nào? | Biến nằm ở đâu khi hàm chạy? | Call stack và vùng heap cho đối tượng | cơ bản |
| IDEA060 | Git merge và rebase khác nhau thế nào? | Cùng gộp nhánh nhưng lịch sử khác nhau ra sao? | Hai đồ thị commit trước và sau | trung cấp |
| IDEA061 | CI/CD pipeline chạy những bước nào? | Push code xong, điều gì tự động chạy tiếp? | Commit → build → test → deploy | cơ bản |
| IDEA062 | Context window là gì? | Vì sao mô hình quên đoạn đầu của cuộc trò chuyện dài? | Cửa sổ token trượt qua đoạn hội thoại | cơ bản |
| IDEA063 | Prompt caching là gì? | Gửi lại cùng một đoạn prompt dài, phần nào được dùng lại? (kiểm tài liệu nhà cung cấp sát ngày viết) | Prefix giống nhau là hit, đổi một chỗ là miss | trung cấp |
| IDEA064 | Vector database khác database thường ở đâu? | Tìm theo nghĩa khác tìm theo giá trị chính xác thế nào? | Truy vấn khớp chính xác và tìm láng giềng gần | trung cấp |
| IDEA065 | AI agent thực chất là vòng lặp nào? | Mô hình nghĩ, gọi công cụ, rồi sao nữa? | Vòng lặp model → tool → kết quả → model | trung cấp |
| IDEA066 | MCP là gì và giải quyết việc gì? | Nhiều công cụ, nhiều ứng dụng AI, vì sao cần một giao thức chung? (kiểm đặc tả sát ngày viết) | Ứng dụng AI ↔ MCP server ↔ công cụ | trung cấp |
