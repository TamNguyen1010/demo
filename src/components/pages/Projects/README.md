# Projects Module Components

## Tổng quan

Module này chứa các component được phát triển theo yêu cầu SRS (Software Requirements Specification) cho hệ thống quản lý dự án, với focus vào:

- **HD-3.1**: Đính kèm Tài liệu Hợp đồng và Phụ lục
- **HD-4.1**: Hiển thị Tổng giá trị Hợp đồng, Lũy kế Chi phí và Giá trị Chưa Hoàn thành

## Concept Màu sắc

Sử dụng concept màu đỏ chính của Projects module:
- **Primary Color**: `#800020` (Burgundy)
- **Secondary Color**: `#A00030` (Darker Burgundy)
- **Gradient**: `from-[#800020] to-[#A00030]`

## Components

### 1. DocumentManagement (HD-3.1)

**Mô tả**: Component quản lý tài liệu hợp đồng với khả năng upload, phân loại và quản lý file.

**Tính năng chính**:
- Upload file với kéo thả
- Phân loại tài liệu theo category và subcategory
- Quản lý metadata (mô tả, thẻ)
- Kiểm tra virus scan status
- Tìm kiếm và lọc tài liệu
- Version control
- Preview và download

**Props**:
```typescript
interface DocumentManagementProps {
  projectId: string
}
```

**Sử dụng**:
```tsx
import { DocumentManagement } from './DocumentManagement'

<DocumentManagement projectId="project-123" />
```

### 2. FinancialDashboard (HD-4.1)

**Mô tả**: Dashboard hiển thị thông tin tài chính hợp đồng với các chỉ số quan trọng.

**Tính năng chính**:
- Tổng giá trị hợp đồng
- Chi phí thực hiện lũy kế
- Giá trị nghiệm thu lũy kế
- Giá trị giải ngân lũy kế
- Hệ thống cảnh báo tài chính
- Biểu đồ tiến độ tròn
- Quản lý chi phí liên kết

**Props**:
```typescript
interface FinancialDashboardProps {
  projectId: string
}
```

**Sử dụng**:
```tsx
import { FinancialDashboard } from './FinancialDashboard'

<FinancialDashboard projectId="project-123" />
```

### 3. DemoPage

**Mô tả**: Trang demo tích hợp tất cả các component để test và showcase.

**Tính năng**:
- Tab navigation giữa các component
- Mock data để demo
- Overview về tính năng kỹ thuật
- Responsive design

**Sử dụng**:
```tsx
import { DemoPage } from './DemoPage'

<DemoPage />
```

## Cấu trúc File

```
Projects/
├── DocumentManagement.tsx    # HD-3.1: Quản lý tài liệu
├── FinancialDashboard.tsx    # HD-4.1: Dashboard tài chính
├── DemoPage.tsx             # Trang demo tích hợp
├── StatisticsCards.tsx      # Component thống kê hiện có
├── index.ts                 # Export tất cả components
└── README.md               # Hướng dẫn này
```

## Tính năng Kỹ thuật

### State Management
- Sử dụng React hooks (useState, useEffect)
- Local state management cho demo
- Simulated API calls với setTimeout

### UI Components
- Shadcn/ui components làm base
- Custom styling với Tailwind CSS
- Gradient backgrounds và shadows
- Responsive design cho mobile/desktop

### Icons
- Lucide React icons
- Consistent icon usage across components
- Color-coded icons theo context

### Form Controls
- Input, Select, Textarea components
- File upload handling
- Form validation (basic)
- Progress indicators

## Sử dụng trong Dự án

### 1. Import Components
```tsx
import { 
  DocumentManagement, 
  FinancialDashboard,
  DemoPage 
} from '@/components/pages/Projects'
```

### 2. Sử dụng trong Route
```tsx
// pages/projects/[id]/documents.tsx
export default function ProjectDocumentsPage() {
  return (
    <div>
      <DocumentManagement projectId={projectId} />
    </div>
  )
}

// pages/projects/[id]/financial.tsx
export default function ProjectFinancialPage() {
  return (
    <div>
      <FinancialDashboard projectId={projectId} />
    </div>
  )
}
```

### 3. Sử dụng trong Layout
```tsx
// components/layout/ProjectLayout.tsx
export function ProjectLayout({ children, projectId }) {
  return (
    <div className="project-layout">
      <ProjectSidebar projectId={projectId} />
      <main className="project-main">
        {children}
      </main>
    </div>
  )
}
```

## Customization

### Thay đổi Màu sắc
```tsx
// Thay đổi primary color
const customColors = {
  primary: '#your-color',
  secondary: '#your-secondary-color'
}

// Sử dụng trong component
<div className={`bg-gradient-to-r from-[${customColors.primary}] to-[${customColors.secondary}]`}>
```

### Thêm Tính năng Mới
```tsx
// Ví dụ: Thêm export functionality
const handleExport = () => {
  // Implement export logic
}

// Thêm button export
<Button onClick={handleExport}>
  <Download className="w-4 h-4 mr-2" />
  Export
</Button>
```

## Testing

### Unit Tests
```bash
npm run test DocumentManagement
npm run test FinancialDashboard
```

### Integration Tests
```bash
npm run test:integration Projects
```

### Manual Testing
1. Mở DemoPage
2. Test các tab khác nhau
3. Upload file trong DocumentManagement
4. Kiểm tra responsive design
5. Test các tính năng tương tác

## Dependencies

### Required Packages
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "lucide-react": "^0.263.0",
    "@radix-ui/react-select": "^1.2.0",
    "@radix-ui/react-tabs": "^1.0.0"
  }
}
```

### UI Components
- `@/components/ui/card`
- `@/components/ui/button`
- `@/components/ui/input`
- `@/components/ui/select`
- `@/components/ui/tabs`
- `@/components/ui/badge`
- `@/components/ui/progress`

## Troubleshooting

### Common Issues

1. **Component không render**
   - Kiểm tra import path
   - Kiểm tra props required
   - Kiểm tra console errors

2. **Styling không đúng**
   - Kiểm tra Tailwind CSS classes
   - Kiểm tra custom CSS variables
   - Kiểm tra responsive breakpoints

3. **State không update**
   - Kiểm tra useState hooks
   - Kiểm tra event handlers
   - Kiểm tra async operations

### Debug Tips
```tsx
// Thêm console.log để debug
useEffect(() => {
  console.log('Component mounted:', { projectId, documents })
}, [projectId, documents])

// Thêm error boundaries
<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <DocumentManagement projectId={projectId} />
</ErrorBoundary>
```

## Contributing

### Code Style
- Sử dụng TypeScript strict mode
- Follow React best practices
- Consistent naming conventions
- Proper error handling

### Adding New Features
1. Tạo component mới
2. Thêm vào index.ts
3. Cập nhật README
4. Thêm tests
5. Update demo page

## License

Internal use only - Company proprietary code.
