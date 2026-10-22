# Bài thực hành 02 - Lập trình Web

## Cấu trúc thư mục
- `PhanA_VanillaJS`: Bài làm Phần A bằng HTML, CSS, JavaScript thuần (chia module).
- `PhanA_TypeScript`: Phần A viết bằng TypeScript.
- `PhanB_React_Vite`: Bài làm Phần B bằng React + Vite.

## So sánh cách làm Phần A (DOM thuần) và Phần B (React)

1. **Cách xây dựng giao diện:**
   - Phần A phải tự tạo từng thẻ bằng `document.createElement`, gán `textContent` rồi nối vào cây DOM bằng `appendChild`.
   - Phần B viết giao diện trực quan bằng cú pháp JSX và chia nhỏ thành các component (`Header`, `Section`, `GenreFilter`, `BookList`, `BookCard`, `Footer`).

2. **Quản lý dữ liệu và cập nhật giao diện:**
   - Phần A phải lưu dữ liệu trong biến JavaScript và tự gọi lại hàm render mỗi khi dữ liệu thay đổi (tìm kiếm, lọc, thêm, xóa, yêu thích).
   - Phần B quản lý dữ liệu bằng `useState` ở component `App` và truyền xuống qua `props`. Khi state thay đổi, React tự động render lại đúng những phần cần thiết.

3. **Xử lý sự kiện:**
   - Phần A dùng event delegation gắn sự kiện vào thẻ cha `#book-grid` rồi kiểm tra `dataset` của từng nút bấm.
   - Phần B truyền trực tiếp hàm xử lý sự kiện qua props xuống từng component con thông qua thuộc tính `onClick`.

4. **Khả năng tái sử dụng và bảo trì:**
   - Phần A khi giao diện lớn dần thì file xử lý DOM khá dài và khó tái sử dụng.
   - Phần B tách riêng từng component độc lập (như `Section` dùng `children`, `BookCard` nhận `props`) nên gọn và dễ sửa đổi hơn.
