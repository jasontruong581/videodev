# Định hướng kênh — 23/10/2026

Kênh kỹ thuật cho lập trình viên và người đang học sâu về lập trình/AI. Creator cũng học thông qua nghiên cứu và sản xuất. Không tập trung mẹo AI đại chúng. Clip ngắn chủ lực, đề xuất 60–90 giây; chủ đề cần sâu hơn tối đa **5 phút**, tính cả outro.

**Đã chốt:** Hải Đăng / VieNeu local; Remotion dựng code; FFmpeg hậu kỳ; ngân sách mua thêm công cụ/dịch vụ/asset 0 đồng. Chủ kênh chọn ý tưởng, duyệt từng script và từng video; chỉ một tập đang sản xuất.

VideoAILab là tên nội bộ. Tên kênh chưa chốt; có thể cân nhắc “Code Bằng Hình”, “Dev Giải Thích”, “Bên Trong Code”. Tên AI Dễ Hiểu trước đây không còn mặc định.

## Lời hứa
Nhìn thấy bên trong một khái niệm kỹ thuật, hiểu khi nào nên dùng và khi nào không. Phép ví von chỉ mở đầu; phải quay về cơ chế thật và nêu giới hạn.

| Tuyến | Chủ đề | Visual |
|---|---|---|
| Bộ nhớ/hiệu năng | RAM, CPU cache, application cache, Redis, TTL | Dữ liệu di chuyển, hit/miss, timeline |
| Database/backend | Index, transaction, lock, queue, retry, idempotency | Bảng nhỏ, request đồng thời, trạng thái |
| Network/bảo mật | DNS, HTTP, TCP, TLS, cookie/session, JWT | Hành trình request, ranh giới tin cậy |
| Runtime/hạ tầng | Event loop, process/thread, Docker, deploy | Hàng đợi, bộ nhớ, lớp hệ thống |
| AI engineering | Token, embedding, RAG, inference, tool calling | Luồng dữ liệu, tìm kiếm, công cụ |
| Devtools/ứng dụng mới | Thư viện và sản phẩm hữu ích cho dev | Demo thật, cơ chế, trade-off, phiên bản |

Không ép tỷ lệ hoặc lịch đăng. Tin mới phải có nguồn, ngày và giá trị kỹ thuật rõ. Menu trong [ideas-menu](../content/ideas-menu.md) để chủ kênh chọn.

## Công thức
Câu hỏi/mâu thuẫn → luồng bình thường → điều thay đổi → ví dụ chạy từng bước → giới hạn → kết luận dùng được. Một tập một câu hỏi; tránh nhồi Redis, CPU cache và RAM vào cùng một định nghĩa.

Mỗi tập có learning note cho creator: hiểu gì, chỗ chưa chắc, nguồn, thí nghiệm nhỏ có thể tái hiện. Không tự dùng số benchmark hoặc phát biểu tuyệt đối để làm hook.

## Hình và tiếng
Stage dọc 1080×1920/30fps; node, mũi tên, dữ liệu hiện theo lời. Dark technical là hướng chính, whiteboard sáng là biến thể. Font tiếng Việt và monospace local; nhận diện riêng, không dùng logo 200Lab hoặc AgentVid làm logo kênh.

Hải Đăng ở tốc độ gốc trước; nghe thuật ngữ rồi mới đổi tempo. Không mặc định 1.12 như template. Caption giữ chính tả, TTS có bản phát âm. Nhạc/SFX do chủ kênh cung cấp; có thể xuất không nhạc.

## Hướng dài hạn
Nhóm video thành learning paths memory/cache → backend/data → network/runtime → AI systems. Có thể phát triển khóa học sau; hiện chưa xây funnel hoặc CTA bán hàng.

