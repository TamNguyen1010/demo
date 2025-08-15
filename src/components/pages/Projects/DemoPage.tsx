"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  DollarSign, 
  FolderOpen,
  Upload,
  BarChart3,
  History,
  Search,
  Download
} from "lucide-react"
import { DocumentManagement } from "./DocumentManagement"
import { FinancialDashboard } from "./FinancialDashboard"
import { StatisticsCards } from "./StatisticsCards"
import { ActivityLogSystem } from "./ActivityLogSystem"
import { ContractSearchSystem } from "./ContractSearchSystem"
import { ContractExportSystem } from "./ContractExportSystem"

interface Project {
  id: string
  name: string
  approval_status: string
  planned_budget: number
  approved_budget: number
  total_disbursed: number
}

export function DemoPage() {
  const [selectedProjectId] = useState("demo-project-001")
  
  // Mock data cho demo
  const mockProjects: Project[] = [
    {
      id: "demo-project-001",
      name: "Dự án Xây dựng Cầu Mới",
      approval_status: "approved",
      planned_budget: 1000000000,
      approved_budget: 1000000000,
      total_disbursed: 500000000
    },
    {
      id: "demo-project-002", 
      name: "Dự án Nâng cấp Đường",
      approval_status: "pending_approval",
      planned_budget: 500000000,
      approved_budget: 0,
      total_disbursed: 0
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-[#800020]">
          Demo Components - Projects Module
        </h1>
        <p className="text-gray-600">
          Các component theo yêu cầu SRS HD-3.1, HD-4.1, HD-5.1, HD-5.2 và HD-5.3
        </p>
      </div>

      {/* Project Info */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-[#800020]/5 to-[#800020]/10">
        <CardHeader>
          <CardTitle className="text-[#800020] flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            Thông tin Dự án Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Tên dự án</h3>
              <p className="text-[#800020] font-semibold">Dự án Xây dựng Cầu Mới</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Trạng thái</h3>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Đã phê duyệt
              </span>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Ngân sách</h3>
              <p className="text-[#800020] font-semibold">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                  minimumFractionDigits: 0
                }).format(1000000000)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="statistics" className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-[#800020]/10">
          <TabsTrigger 
            value="statistics" 
            className="data-[state=active]:bg-[#800020] data-[state=active]:text-white"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Thống kê
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className="data-[state=active]:bg-[#800020] data-[state=active]:text-white"
          >
            <FileText className="w-4 h-4 mr-2" />
            Quản lý Tài liệu
          </TabsTrigger>
          <TabsTrigger 
            value="financial" 
            className="data-[state=active]:bg-[#800020] data-[state=active]:text-white"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Dashboard Tài chính
          </TabsTrigger>
          <TabsTrigger 
            value="activity-logs" 
            className="data-[state=active]:bg-[#800020] data-[state=active]:text-white"
          >
            <History className="w-4 h-4 mr-2" />
            Lịch sử Hoạt động
          </TabsTrigger>
          <TabsTrigger 
            value="contract-search" 
            className="data-[state=active]:bg-[#800020] data-[state=active]:text-white"
          >
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm Hợp đồng
          </TabsTrigger>
          <TabsTrigger 
            value="contract-export" 
            className="data-[state=active]:bg-[#800020] data-[state=active]:text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Xuất Hợp đồng
          </TabsTrigger>
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-[#800020] data-[state=active]:text-white"
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            Tổng quan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="statistics" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#800020] flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Thống kê Dự án (StatisticsCards Component)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StatisticsCards 
                projects={mockProjects} 
                selectedYear="2024" 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#800020] flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Quản lý Tài liệu (DocumentManagement Component)
              </CardTitle>
              <p className="text-sm text-gray-600 font-normal">
                Theo yêu cầu SRS HD-3.1: Đính kèm Tài liệu Hợp đồng và Phụ lục
              </p>
            </CardHeader>
            <CardContent>
              <DocumentManagement projectId={selectedProjectId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#800020] flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Dashboard Tài chính (FinancialDashboard Component)
              </CardTitle>
              <p className="text-sm text-gray-600 font-normal">
                Theo yêu cầu SRS HD-4.1: Hiển thị Tổng giá trị Hợp đồng, Lũy kế Chi phí và Giá trị Chưa Hoàn thành
              </p>
            </CardHeader>
            <CardContent>
              <FinancialDashboard projectId={selectedProjectId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity-logs" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#800020] flex items-center gap-2">
                <History className="w-5 h-5" />
                Lịch sử Hoạt động (ActivityLogSystem Component)
              </CardTitle>
              <p className="text-sm text-gray-600 font-normal">
                Theo yêu cầu SRS HD-5.1: Ghi nhận Lịch sử Thao tác Hợp đồng (Log)
              </p>
            </CardHeader>
            <CardContent>
              <ActivityLogSystem projectId={selectedProjectId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contract-search" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#800020] flex items-center gap-2">
                <Search className="w-5 h-5" />
                Tìm kiếm & Lọc Hợp đồng (ContractSearchSystem Component)
              </CardTitle>
              <p className="text-sm text-gray-600 font-normal">
                Theo yêu cầu SRS HD-5.2: Tìm kiếm & Lọc Hợp đồng Đa tiêu chí
              </p>
            </CardHeader>
            <CardContent>
              <ContractSearchSystem projectId={selectedProjectId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contract-export" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#800020] flex items-center gap-2">
                <Download className="w-5 h-5" />
                Xuất Dữ liệu Hợp đồng (ContractExportSystem Component)
              </CardTitle>
              <p className="text-sm text-gray-600 font-normal">
                Theo yêu cầu SRS HD-5.3: Xuất Dữ liệu Hợp đồng ra Excel
              </p>
            </CardHeader>
            <CardContent>
              <ContractExportSystem projectId={selectedProjectId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#800020] flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Tổng quan Components
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* HD-3.1 Overview */}
                <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500 rounded-full">
                      <Upload className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-800">HD-3.1</h3>
                  </div>
                  <h4 className="font-medium text-blue-900 mb-2">
                    Đính kèm Tài liệu Hợp đồng và Phụ lục
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Hệ thống upload file với kéo thả</li>
                    <li>• Quản lý tài liệu theo phân loại</li>
                    <li>• Kiểm tra virus và bảo mật</li>
                    <li>• Tìm kiếm và lọc tài liệu</li>
                    <li>• Version control và quản lý thẻ</li>
                  </ul>
                </div>

                {/* HD-4.1 Overview */}
                <div className="p-6 border rounded-lg bg-gradient-to-br from-green-50 to-green-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500 rounded-full">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-800">HD-4.1</h3>
                  </div>
                  <h4 className="font-medium text-green-900 mb-2">
                    Dashboard Tài chính Hợp đồng
                  </h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Tổng giá trị hợp đồng</li>
                    <li>• Chi phí thực hiện lũy kế</li>
                    <li>• Giá trị nghiệm thu lũy kế</li>
                    <li>• Giá trị giải ngân lũy kế</li>
                    <li>• Hệ thống cảnh báo tài chính</li>
                  </ul>
                </div>

                {/* HD-5.1 Overview */}
                <div className="p-6 border rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500 rounded-full">
                      <History className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-purple-800">HD-5.1</h3>
                  </div>
                  <h4 className="font-medium text-purple-900 mb-2">
                    Ghi nhận Lịch sử Thao tác Hợp đồng
                  </h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Ghi log tự động cho mọi hành động</li>
                    <li>• Tìm kiếm và lọc log theo nhiều tiêu chí</li>
                    <li>• Xem chi tiết thay đổi (before/after)</li>
                    <li>• Xuất báo cáo log</li>
                    <li>• Audit trail hoàn chỉnh</li>
                  </ul>
                </div>

                {/* HD-5.2 Overview */}
                <div className="p-6 border rounded-lg bg-gradient-to-br from-orange-50 to-orange-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-500 rounded-full">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-orange-800">HD-5.2</h3>
                  </div>
                  <h4 className="font-medium text-orange-900 mb-2">
                    Tìm kiếm & Lọc Hợp đồng Đa tiêu chí
                  </h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Tìm kiếm từ khóa và đa trường</li>
                    <li>• Bộ lọc nâng cao với nhiều tiêu chí</li>
                    <li>• Lưu và tái sử dụng bộ lọc</li>
                    <li>• Sắp xếp kết quả theo nhiều tiêu chí</li>
                    <li>• Xuất kết quả tìm kiếm</li>
                  </ul>
                </div>

                {/* HD-5.3 Overview */}
                <div className="p-6 border rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-500 rounded-full">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-indigo-800">HD-5.3</h3>
                  </div>
                  <h4 className="font-medium text-indigo-900 mb-2">
                    Xuất Dữ liệu Hợp đồng ra Excel
                  </h4>
                  <ul className="text-sm text-indigo-800 space-y-1">
                    <li>• Xuất với nhiều định dạng (Excel, CSV, PDF)</li>
                    <li>• Chọn cột cần xuất</li>
                    <li>• Template xuất có sẵn</li>
                    <li>• Lịch sử xuất và tải xuống</li>
                    <li>• Lịch xuất tự động</li>
                  </ul>
                </div>
              </div>

              {/* Technical Features */}
              <div className="p-6 border rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Tính năng Kỹ thuật
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">UI/UX Design</h4>
                    <ul className="text-sm text-gray-800 space-y-1">
                      <li>• Concept màu đỏ #800020</li>
                      <li>• Gradient backgrounds</li>
                      <li>• Responsive design</li>
                      <li>• Modern card layouts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">State Management</h4>
                    <ul className="text-sm text-gray-800 space-y-1">
                      <li>• React hooks (useState, useEffect)</li>
                      <li>• Local state management</li>
                      <li>• Simulated API calls</li>
                      <li>• Real-time updates</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Components</h4>
                    <ul className="text-sm text-gray-800 space-y-1">
                      <li>• Shadcn/ui components</li>
                      <li>• Custom styling</li>
                      <li>• Icon integration</li>
                      <li>• Form controls</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
