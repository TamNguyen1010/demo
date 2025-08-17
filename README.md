# Agribank Dashboard - Frontend

Hệ thống quản lý dự án và đơn hàng cho Agribank, được xây dựng với Next.js, TypeScript và Tailwind CSS.

## Tính năng chính

### 1. Quản lý Danh mục Dự án (DMDA-1.1)
- **Lọc theo năm**: Chọn năm từ dropdown (2024, 2025, v.v.) - mặc định là năm hiện tại
- **Lọc theo loại dự án**: Dự án Đầu tư, Mua sắm, Thuê dịch vụ, Bảo trì, hoặc Tất cả
- **Lọc theo nguồn gốc**: Dự án Mới, Dự án Chuyển tiếp, hoặc Tất cả
- **Lọc theo trạng thái**: Khởi tạo, Chờ phê duyệt, Đã phê duyệt, Từ chối phê duyệt, Dừng thực hiện, Yêu cầu chỉnh sửa
- **Hiển thị thông tin dự án**: Mã dự án, Tên dự án, Nguồn gốc, TMĐT dự kiến, TMĐT phê duyệt, Vốn đã ứng, Vốn năm hiện tại, Dự kiến vốn, Kế hoạch năm sau, Trạng thái

### 2. Quản lý Đơn hàng
- Quản lý kho và đơn hàng
- Theo dõi trạng thái đơn hàng
- Quản lý nhà cung cấp

## Cấu trúc dự án

```
demo/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Trang chính với navigation tabs
│   │   ├── layout.tsx               # Layout chung
│   │   └── globals.css              # CSS toàn cục
│   ├── components/
│   │   ├── project-category-dashboard.tsx  # Component quản lý dự án
│   │   ├── order-dashboard.tsx             # Component quản lý đơn hàng
│   │   └── ui/                      # UI components (shadcn/ui)
│   └── lib/
│       └── utils.ts                 # Utility functions
├── package.json
└── README.md
```

## Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn

### Cài đặt dependencies
```bash
cd demo
npm install
```

### Chạy development server
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: http://localhost:3000

### Build production
```bash
npm run build
npm start
```

## Công nghệ sử dụng

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks

## Cấu trúc dữ liệu

### Project Interface
```typescript
interface Project {
  id: string
  project_code: string          // Format: PRJ-YYYY-XXXX
  name: string                  // Tên dự án
  project_source: string        // Nguồn gốc dự án
  project_type: 'new' | 'carryover'
  planned_budget: number        // TMĐT dự kiến
  approved_budget: number       // TMĐT phê duyệt
  total_disbursed: number       // Lũy kế vốn đã ứng
  current_year_disbursed: number // Vốn đã ứng năm hiện tại
  expected_disbursement: number  // Dự kiến vốn sẽ ứng
  next_year_plan: number        // Đề xuất kế hoạch vốn năm sau
  approval_status: string       // Trạng thái phê duyệt
  execution_status: string      // Trạng thái thực hiện
  edit_request_status: string   // Trạng thái yêu cầu chỉnh sửa
  created_at: string
  updated_at: string
}
```

## Tính năng lọc

### Bộ lọc dự án
1. **Năm**: Chọn năm cụ thể (2024, 2025, v.v.)
2. **Loại dự án**: 
   - INV: Dự án Đầu tư
   - PUR: Dự án Mua sắm
   - SER: Dự án Thuê dịch vụ
   - MAI: Dự án Bảo trì
   - Tất cả
3. **Nguồn gốc**: Dự án Mới, Dự án Chuyển tiếp, hoặc Tất cả
4. **Trạng thái phê duyệt**: Khởi tạo, Chờ phê duyệt, Đã phê duyệt, Từ chối phê duyệt
5. **Trạng thái thực hiện**: Chưa bắt đầu, Đang thực hiện, Tạm dừng, Hoàn thành

## Responsive Design

- Hỗ trợ desktop và mobile
- Grid layout tự động điều chỉnh theo kích thước màn hình
- Scroll area cho bảng dữ liệu lớn

## Performance

- Lọc dữ liệu real-time với debounce
- Loading states cho các thao tác
- Optimized rendering với React hooks

## Tương lai

- [ ] Tích hợp API backend
- [ ] Thêm tính năng tìm kiếm nâng cao
- [ ] Export dữ liệu ra Excel/PDF
- [ ] Dashboard với biểu đồ và thống kê
- [ ] Hỗ trợ mobile app
- [ ] Thông báo real-time

## Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

Dự án này được phát triển cho Agribank. Tất cả quyền được bảo lưu.
