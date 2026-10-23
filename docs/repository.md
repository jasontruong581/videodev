# Repository và khôi phục môi trường

Remote: https://github.com/jasontruong581/videodev

Repo lưu tài liệu, cấu hình, backlog, brief và sau này mã pipeline/Remotion. Môi trường engine, model, file media lớn và bản template bên thứ ba không được đưa vào Git.

## Sau khi clone

1. Đọc README.md và config/channel.json. Cấu hình hiện là thiết kế, chưa có runtime đọc.
2. Theo docs/vieneu-setup.md nếu cần cài lại VieNeu local. tools/VieNeu-TTS không được vendor hoặc đưa vào submodule.
3. ZIP template và video tham khảo do chủ kênh cung cấp riêng. references/imported và contact-sheets chỉ có trên máy làm việc, không nằm trong remote.
4. Mọi đường dẫn D:/ hoặc C:/ trong báo cáo cũ là lịch sử máy đã kiểm tra; thay bằng workspace của máy mới.

Chưa có package.json hay ứng dụng render ở lần push khởi tạo. Scaffold tiếp theo sẽ thêm từng phần có kiểm tra; không cần cài dependency Node chỉ để đọc bộ khung.

File âm thanh nghe thử, cache model và requirements freeze ghi trong báo cáo setup là artifact local. Xem commit/model revisions trong báo cáo để tái tạo; không giả định các artifact đó có sau clone.
