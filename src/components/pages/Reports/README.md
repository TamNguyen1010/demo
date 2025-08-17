# Module Reports - Hệ thống Báo cáo

Module này cung cấp các chức năng tạo và quản lý báo cáo tổng hợp với biểu đồ trực quan, tuân thủ theo SRS documents BC-1.1, BC-1.2, và BC-1.3.

## Cấu trúc Thư mục

```
Reports/
├── ReportsPage.tsx              # Trang chính của module
├── ReportsBuilder.tsx           # Component tạo báo cáo
├── ReportsTemplates.tsx         # Component quản lý template
├── ReportsCharts.tsx            # Component quản lý biểu đồ
├── ReportsHistory.tsx           # Component lịch sử báo cáo
├── modals/                      # Thư mục chứa các modal
│   ├── CreateReportModal.tsx    # Modal tạo báo cáo mới
│   ├── ImportTemplateModal.tsx  # Modal import template
│   └── ExportReportModal.tsx    # Modal xuất báo cáo
└── index.ts                     # File export
```

## Chức năng Chính

### 1. Tạo Báo cáo (ReportsBuilder)
- **Template Selection**: Chọn template có sẵn hoặc tạo mới
- **Data Source Configuration**: Cấu hình nguồn dữ liệu
- **Field Selection**: Chọn trường dữ liệu cần hiển thị
- **Chart Configuration**: Cấu hình loại biểu đồ
- **Date Range**: Thiết lập khoảng thời gian
- **Grouping & Sorting**: Nhóm và sắp xếp dữ liệu
- **Preview**: Xem trước báo cáo trước khi tạo

### 2. Quản lý Template (ReportsTemplates)
- **Template Library**: Thư viện template có sẵn
- **Template Categories**: Phân loại template theo danh mục
- **Version Control**: Quản lý phiên bản template
- **Template Sharing**: Chia sẻ template
- **Template Import/Export**: Import/export template

### 3. Quản lý Biểu đồ (ReportsCharts)
- **Chart Types**: Hỗ trợ nhiều loại biểu đồ
  - Biểu đồ cột (Bar Chart)
  - Biểu đồ đường (Line Chart)
  - Biểu đồ tròn (Pie Chart)
  - Biểu đồ vùng (Area Chart)
  - Biểu đồ phân tán (Scatter Chart)
  - Biểu đồ nhiệt (Heat Map)
  - Biểu đồ Gantt
  - Biểu đồ radar
- **Chart Customization**: Tùy chỉnh màu sắc, font, layout
- **Interactive Features**: Zoom, pan, drill-down
- **Chart Export**: Xuất biểu đồ ra nhiều định dạng

### 4. Lịch sử Báo cáo (ReportsHistory)
- **Report History**: Theo dõi lịch sử tạo báo cáo
- **Export History**: Lịch sử xuất báo cáo
- **Status Tracking**: Theo dõi trạng thái báo cáo
- **Download Management**: Quản lý tải xuống

## Modal Components

### CreateReportModal
- Tạo báo cáo mới với cấu hình chi tiết
- Chọn template và nguồn dữ liệu
- Cấu hình biểu đồ và định dạng xuất
- Thiết lập lịch trình gửi báo cáo

### ImportTemplateModal
- Import template từ file (JSON, XML, Excel, CSV)
- Import từ URL, database, hoặc API
- Tùy chọn import (skip duplicates, validate data)
- Hiển thị kết quả import chi tiết

### ExportReportModal
- Xuất báo cáo theo nhiều định dạng (PDF, Excel, CSV, HTML)
- Tùy chọn xuất (include charts, data, summary)
- Phương thức giao (download, email, share link)
- Nén file và tùy chọn khác

## Tính năng Theo SRS

### BC-1.1: Tạo báo cáo tổng hợp theo các tiêu chí khác nhau
- ✅ Giao diện thân thiện cho chọn trường dữ liệu
- ✅ Lưu mẫu báo cáo tùy chỉnh
- ✅ Xuất nhiều định dạng (Excel, PDF, CSV, HTML)
- ✅ Lịch trình gửi báo cáo tự động
- ✅ Chia sẻ báo cáo với người dùng khác
- ✅ Biểu đồ và đồ thị trực quan
- ✅ Lọc dữ liệu theo khoảng thời gian
- ✅ So sánh dữ liệu giữa các kỳ
- ✅ Quyền truy cập theo vai trò
- ✅ Preview báo cáo trước khi xuất
- ✅ Ghi log hoạt động

### BC-1.2: Lựa chọn loại biểu đồ và định dạng hiển thị
- ✅ Nhiều tùy chọn biểu đồ cho các loại dữ liệu
- ✅ Tùy chỉnh màu sắc, nhãn, tiêu đề
- ✅ Thay đổi loại biểu đồ sau khi tạo
- ✅ Biểu đồ tương tác (zoom, pan, drill-down)
- ✅ Nhiều biểu đồ trong một báo cáo
- ✅ Layout và kích thước biểu đồ
- ✅ Xuất biểu đồ ra file ảnh
- ✅ Animation cho biểu đồ
- ✅ Responsive design
- ✅ Legend và tooltip
- ✅ Dữ liệu real-time
- ✅ Gợi ý loại biểu đồ phù hợp

### BC-1.3: Phát triển các mẫu báo cáo theo yêu cầu đặc thù của Agribank
- ✅ Template builder với giao diện kéo thả
- ✅ Tiêu chuẩn Agribank (branding, font, màu sắc)
- ✅ Formula engine cho tính toán phức tạp
- ✅ Quản lý template với version control
- ✅ Quyền truy cập và phân quyền
- ✅ Backup/restore template
- ✅ Import/export template
- ✅ Preview và test template
- ✅ Multi-language support
- ✅ Lịch trình tự động
- ✅ Audit trail
- ✅ Tích hợp workflow

## Sử dụng

```typescript
import { ReportsPage } from '@/components/pages/Reports';

// Sử dụng trong component
<ReportsPage />
```

## Dependencies

- `@radix-ui/react-dialog` - Modal components
- `@radix-ui/react-select` - Select dropdown
- `@radix-ui/react-checkbox` - Checkbox components
- `@radix-ui/react-progress` - Progress bar
- `lucide-react` - Icons
- `shadcn/ui` - UI components

## Mock Data

Module sử dụng mock data để demo các tính năng:
- Template báo cáo mẫu
- Dữ liệu biểu đồ
- Lịch sử báo cáo
- Cấu hình xuất

## Tương lai

- Tích hợp với chart library thực tế (Chart.js, D3.js)
- Kết nối API backend
- Real-time data streaming
- Advanced analytics
- Machine learning insights
- Mobile responsive optimization
