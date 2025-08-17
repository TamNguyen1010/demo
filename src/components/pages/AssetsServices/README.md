# Module Tài sản & Dịch vụ (Assets & Services)

Module này quản lý tài sản và dịch vụ của tổ chức, bao gồm các chức năng chính:

## Cấu trúc thư mục

```
AssetsServices/
├── AssetsServicesPage.tsx          # Trang chính
├── AssetsServicesList.tsx          # Danh sách tài sản & dịch vụ
├── AssetsServicesStatistics.tsx    # Thống kê
├── AssetsServicesReport.tsx        # Báo cáo
├── AssetsServicesSearch.tsx        # Tìm kiếm
├── modals/                         # Các modal
│   ├── CreateAssetServiceModal.tsx # Modal tạo mới
│   └── ImportAssetServiceModal.tsx # Modal nhập dữ liệu
├── components/                     # Components phụ trợ
│   └── AssetsServicesAmountDisplay.tsx # Hiển thị số tiền
├── index.ts                        # Export tất cả components
└── README.md                       # Tài liệu này
```

## Các chức năng chính

### 1. Quản lý Tài sản
- Thêm, sửa, xóa tài sản
- Thông tin kỹ thuật (model, serial, nhà sản xuất)
- Thông tin tài chính (giá mua, giá trị hiện tại)
- Thông tin bảo hành
- Trạng thái và vị trí

### 2. Quản lý Dịch vụ
- Thêm, sửa, xóa dịch vụ
- Thông tin nhà cung cấp
- Thời gian dịch vụ
- Chi phí và tần suất thanh toán
- SLA và chỉ số hiệu suất

### 3. Thống kê và Báo cáo
- Dashboard với các chỉ số quan trọng
- Biểu đồ phân bố theo danh mục
- Xu hướng theo thời gian
- Báo cáo tùy chỉnh

### 4. Tìm kiếm và Lọc
- Tìm kiếm theo từ khóa
- Bộ lọc nâng cao (loại, danh mục, trạng thái, vị trí)
- Lọc theo thời gian và giá trị

### 5. Nhập/Xuất dữ liệu
- Nhập dữ liệu từ file Excel/CSV
- Xuất báo cáo
- Template mẫu

## Cách sử dụng

### Import module
```typescript
import { AssetsServicesPage } from '@/components/pages/AssetsServices';
```

### Sử dụng trong routing
```typescript
case "assets-services":
  return <AssetsServicesPage />
```

## Dữ liệu mẫu

Module sử dụng dữ liệu mẫu để demo các chức năng:

- **Tài sản**: 850 tài sản với các danh mục Hardware, Software, Office Equipment, etc.
- **Dịch vụ**: 420 dịch vụ với các danh mục IT Services, Cloud Services, etc.
- **Tổng giá trị**: 25,000,000,000 VND

## Giao diện

Module được thiết kế đồng bộ với các module khác:
- Sử dụng màu chủ đạo #800020 (Agribank Red)
- Gradient backgrounds và shadows
- Responsive design
- Consistent typography và spacing

## Tương lai

- Tích hợp với API backend
- Thêm biểu đồ thực tế (Chart.js/Recharts)
- Tính năng bảo trì và lịch sử
- Quản lý vòng đời tài sản
- Tích hợp với hệ thống kế toán
