# Đánh giá agentvid-motion-tech-brief-9x16

Ngày 23/10/2026. Đã giải nén nguyên bản vào `references/imported/agentvid-motion-tech-brief-9x16/`, đọc skill, voice/ASR adapters, runtime, schema ví dụ và review gates. Chưa chạy pipeline ZIP hoặc sửa mã nguồn của nó.

## Kết luận

**Dùng được làm bộ tham khảo và nền thiết kế; không chạy nguyên xi cho project này.** Visual rất hợp kênh kỹ thuật. Render engine và một số defaults khác yêu cầu đã chốt. Chuyển đổi có chủ đích sang Remotion, local timing, Hải Đăng và quy trình duyệt của chủ kênh.

| Thành phần | Bằng chứng trong ZIP | Quyết định |
|---|---|---|
| Script text/say, facts, storyboard | template/data/script.example.vi.json, storyboard.example.vi.json | Giữ mô hình dữ liệu, thêm stable line/claim IDs |
| Tree/flow/compare/code/stack/bars | template/scenes/tb-scene-*.js | Học layout/choreography; viết React components |
| Dark teal / grid whiteboard | template/styles/*.css, theme.json | Tham khảo token; đổi nhận diện riêng |
| Render | SKILL.md; template/runtime/motion-runtime.js dùng gsap.timeline/window.__timelines; template/hyperframes.json | Thay bằng Remotion, frame-driven |
| TTS | scripts/tts-vieneu-batch.py dùng Vieneu(); lib/tts-engines.mjs fallback Thanh Bình | Gắn env hiện có, explicit CPU ONNX và Hải Đăng |
| Đường dẫn Python | scripts/lib/vieneu-env.mjs trỏ ~/.agentvid/vieneu-env | Không trùng env hiện có; cần adapter/config path |
| Alignment | SKILL bắt Soniox; lib/recognise-words.mjs thực tế có auto/soniox/elevenlabs/local/estimate | Chọn local explicit; chặn tự gọi paid provider |
| Local ASR | scripts/transcribe-words-local.py dùng faster-whisper CPU int8, model small mặc định | Có hướng reuse, cần cài/benchmark riêng; chưa đạt QC |
| Word anchors | motion-runtime.js W() có fallback scene start khi không tìm thấy | Bản port phải fail hoặc yêu cầu sửa, không che lỗi |
| Review | references/review-gates.md, scripts/review-gate.py | Giữ hash/stale logic ở mức thiết kế; user duyệt script/video |
| Nhạc/SFX | compose-calm-bed, shared-audio; provider scripts khác | User assets trước; procedural/local tùy chọn, không gọi cloud |

## Xung đột giữa hướng dẫn và code

Skill nói Soniox bắt buộc, không local fallback; ví dụ script lại align=auto, code chọn Soniox nếu có key, local nếu đã cài, rồi estimate. Không xem auto là miễn phí hoặc chính xác. Với yêu cầu 0 đồng, cấu hình mới phải local và đánh dấu timing chưa duyệt.

Skill yêu cầu one-take toàn bài; batch helper hỗ trợ nhiều jobs. Không kết luận helper chia scene mặc định: caller quyết định. Với tối đa 5 phút, thử take dài trước, cho phép chia đoạn giữ giọng nếu cần, ghi rõ revision và thời gian ghép.

Skill gợi tempo 1.12 và nhạc khoảng 6 dB dưới lời. Đây là lựa chọn style, không yêu cầu chất lượng cho mọi giọng/track. Hải Đăng đã chọn; tốc độ gốc và nghe thử là chuẩn ban đầu.

## Font, logo và credit

ZIP có OFL cho Be Vietnam Pro và JetBrains Mono trong licenses/fonts; giữ license nếu phân phối font. Có LICENSE.txt riêng cho shared-audio. Chưa thấy license cấp phép chung cho toàn bộ template trong danh sách archive đã kiểm tra; không tự gắn MIT hoặc hứa được phân phối lại nguyên bộ. Dùng tài liệu thiết kế và tự viết renderer; nếu sao chép module code cho phát hành, làm rõ quyền/license module đó.

Mặc dù skill có câu nói không kèm logo thương hiệu, archive thực tế có template/assets/brand/logo-*.png. Không tự dùng những logo này làm nhận diện kênh. Yêu cầu credit style trong skill cần được giữ nếu dùng trực tiếp phần style/template tương ứng; đây khác với đặt logo của họ lên kênh.

## Mức reuse đề xuất

Giữ: cấu trúc facts → script → storyboard → timing → QA, scene vocabulary, typography/font local với license, phân biệt text/say, review theo hash.

Viết lại: renderer, timeline compiler gắn stable anchors, env adapter, publish adapter. Thẩm định thêm trước reuse mã: caption matching, audio probe, review/cache utilities.

Không dùng mặc định: HyperFrames, Gemini/ElevenLabs/Soniox, logo đi kèm, số benchmark trong ví dụ, fallback timing estimate cho bản final.

## Phạm vi kiểm chứng

Đây là review tĩnh, chưa chứng minh compatibility end-to-end. VieNeu local đã chạy từ lần trước, nhưng Remotion renderer, local ASR và Facebook publisher chưa triển khai. Cần spike kỹ thuật dùng dữ liệu giả để thử seek, font tiếng Việt, text/say mapping, audio/timing trước tập thật.

Remotion có Free License cho cá nhân và nhóm đủ điều kiện; dùng local phù hợp hướng một creator hiện tại, không suy ra miễn phí cho mọi quy mô. Nguồn chính thức đã đối chiếu: [Remotion licensing](https://www.remotion.pro/license), [License FAQ](https://www.remotion.dev/docs/license/faq). Nhạc bổ sung: [YouTube Audio Library](https://support.google.com/youtube/answer/3376882), kiểm điều kiện từng track cho Facebook.
