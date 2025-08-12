"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Home, 
  FolderOpen, 
  Gavel, 
  Users, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Send,
  FileText,
  BarChart3,
  Calendar,
  Target,
  Building2,
  Search,
  Bell,
  Star,
  Flag,
  ChevronDown,
  Package,
  ShoppingCart,
  CreditCard,
  FileSpreadsheet,
  Headphones,
  Activity,
  MoreVertical,
  X
} from "lucide-react"
import { useState } from "react"

// Kanban Card Component
function KanbanCard({ 
  project, 
  onClick, 
  selectedProject 
}: {
  project: any
  onClick: () => void
  selectedProject: any
}) {
  return (
    <Card 
      className={`mb-3 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500 ${
        selectedProject?.code === project.code ? 'bg-blue-50 border-l-blue-600' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-slate-900">{project.code}</h4>
            <p className="text-xs text-slate-500">{project.name}</p>
          </div>
          <Badge variant="outline" className={`text-xs ${
            project.type === 'Đầu tư' ? 'bg-blue-100 text-blue-700 border-blue-200' :
            project.type === 'Mua sắm' ? 'bg-green-100 text-green-700 border-green-200' :
            'bg-orange-100 text-orange-700 border-orange-200'
          }`}>
            {project.type}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{project.department}</span>
          <span className="font-semibold">{project.value}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <Badge variant="outline" className={`text-xs ${
            project.status === 'Chờ phê duyệt' ? 'bg-orange-100 text-orange-700 border-orange-200' :
            project.status === 'Đã phê duyệt' ? 'bg-green-100 text-green-700 border-green-200' :
            'bg-red-100 text-red-700 border-red-200'
          }`}>
            {project.status}
          </Badge>
          <div className="flex space-x-1">
            <button className="p-1 hover:bg-slate-100 rounded">
              <Eye className="w-3 h-3 text-slate-600" />
            </button>
            <button className="p-1 hover:bg-slate-100 rounded">
              <Edit className="w-3 h-3 text-blue-600" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Kanban Board Component
function KanbanBoard({ 
  projects, 
  onProjectClick, 
  selectedProject 
}: {
  projects: any[]
  onProjectClick: (project: any) => void
  selectedProject: any
}) {
  const columns = [
    { id: 'draft', title: 'Bản nháp', color: 'bg-slate-100' },
    { id: 'pending', title: 'Chờ phê duyệt', color: 'bg-orange-100' },
    { id: 'approved', title: 'Đã phê duyệt', color: 'bg-green-100' },
    { id: 'rejected', title: 'Từ chối', color: 'bg-red-100' }
  ]

  const getProjectsByStatus = (status: string) => {
    return projects.filter((project: any) => {
      if (status === 'draft') return project.status === 'Bản nháp'
      if (status === 'pending') return project.status === 'Chờ phê duyệt'
      if (status === 'approved') return project.status === 'Đã phê duyệt'
      if (status === 'rejected') return project.status === 'Từ chối'
      return false
    })
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {columns.map((column) => (
        <div key={column.id} className="space-y-4">
          <div className={`p-3 rounded-lg ${column.color}`}>
            <h3 className="font-semibold text-slate-900">{column.title}</h3>
            <p className="text-sm text-slate-600">{getProjectsByStatus(column.id).length} dự án</p>
          </div>
          <div className="space-y-3">
            {getProjectsByStatus(column.id).map((project: any) => (
              <KanbanCard 
                key={project.code} 
                project={project} 
                onClick={() => onProjectClick(project)}
                selectedProject={selectedProject}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Dashboard Home Component
function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-8 rounded-xl border border-blue-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Chào mừng đến với DMDA System</h1>
        <p className="text-slate-600 text-lg">Hệ thống quản lý dự án và đấu thầu toàn diện</p>
        <div className="mt-6 flex space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Tạo Dự án Mới
          </Button>
          <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
            <BarChart3 className="w-4 h-4 mr-2" />
            Xem Báo cáo
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Tổng Dự án</CardTitle>
              <FolderOpen className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">156</div>
            <div className="text-sm text-green-600 font-medium">+12% so với tháng trước</div>
            <div className="h-2 bg-slate-200 mt-3 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Chờ Phê duyệt</CardTitle>
              <Clock className="w-4 h-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">23</div>
            <div className="text-sm text-orange-600 font-medium">Cần xử lý gấp</div>
            <div className="h-2 bg-slate-200 mt-3 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Đã Phê duyệt</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">89</div>
            <div className="text-sm text-green-600 font-medium">Đang thực hiện</div>
            <div className="h-2 bg-slate-200 mt-3 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Tổng Giá trị</CardTitle>
              <DollarSign className="w-4 h-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">58.8 tỷ VND</div>
            <div className="text-sm text-green-600 font-medium">+8% so với năm trước</div>
            <div className="h-2 bg-slate-200 mt-3 rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Hoạt động gần đây</CardTitle>
            <p className="text-sm text-slate-500">Các hoạt động mới nhất trong hệ thống</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Dự án DT-2024-001 được tạo</p>
                  <p className="text-xs text-slate-500">15/01/2024 - Nguyễn Văn A</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Dự án MS-2023-045 được phê duyệt</p>
                  <p className="text-xs text-slate-500">12/01/2024 - Trần Thị B</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Dự án DV-2024-012 cần bổ sung tài liệu</p>
                  <p className="text-xs text-slate-500">10/01/2024 - Lê Văn C</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Thống kê theo tháng</CardTitle>
            <p className="text-sm text-slate-500">Biểu đồ thống kê hoạt động</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Dự án mới</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">12</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Đã phê duyệt</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">8</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Chờ xử lý</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-orange-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">3</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Từ chối</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-1/5 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">1</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Projects Management Component  
function ProjectsManagement({ 
  projects, 
  selectedView, 
  setSelectedView, 
  onProjectClick, 
  selectedProject 
}: {
  projects: any[]
  selectedView: string
  setSelectedView: (view: string) => void
  onProjectClick: (project: any) => void
  selectedProject: any
}) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Quản lý Dự án & Đấu thầu</h1>
          <p className="text-slate-600 max-w-md mt-2">
            Hệ thống quản lý dự án và đấu thầu toàn diện cho việc theo dõi, phê duyệt và thực hiện các dự án.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="w-4 h-4 mr-2" />
          Tạo Dự án Mới
        </Button>
      </div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Tổng Dự án</CardTitle>
              <FolderOpen className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">156</div>
            <div className="text-sm text-green-600 font-medium">+12% so với tháng trước</div>
            <div className="h-2 bg-slate-200 mt-3 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Chờ Phê duyệt</CardTitle>
              <Clock className="w-4 h-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">23</div>
            <div className="text-sm text-orange-600 font-medium">Cần xử lý gấp</div>
            <div className="h-2 bg-slate-200 mt-3 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Đã Phê duyệt</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">89</div>
            <div className="text-sm text-green-600 font-medium">Đang thực hiện</div>
            <div className="h-2 bg-slate-200 mt-3 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">Tổng Giá trị</CardTitle>
              <DollarSign className="w-4 h-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">58.8 tỷ VND</div>
            <div className="text-sm text-green-600 font-medium">+8% so với năm trước</div>
            <div className="h-2 bg-slate-200 mt-3 rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Tabs defaultValue="2024" className="w-auto">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-lg">
              <TabsTrigger value="2023" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">2023</TabsTrigger>
              <TabsTrigger value="2024" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">2024</TabsTrigger>
              <TabsTrigger value="2025" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">2025</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <select className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm">
            <option value="">Tất cả loại dự án</option>
            <option value="investment">Dự án đầu tư</option>
            <option value="procurement">Mua sắm tài sản</option>
            <option value="service">Thuê dịch vụ</option>
            <option value="maintenance">Bảo trì</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedView("list")}
              className={`p-2 rounded-lg ${selectedView === "list" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600"}`}
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedView("kanban")}
              className={`p-2 rounded-lg ${selectedView === "kanban" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600"}`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
          <Button variant="outline" className="border-slate-300 hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" />
            Lọc
          </Button>
          <Button variant="outline" className="border-slate-300 hover:bg-slate-50">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Projects View */}
      {selectedView === "list" ? (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Danh sách Dự án</CardTitle>
            <p className="text-sm text-slate-500">Quản lý và theo dõi tất cả các dự án đang thực hiện</p>
          </CardHeader>
                     <CardContent>
             {/* Search and Filter Section */}
             <div className="mb-6 flex items-center justify-between">
               {/* Left side - Search */}
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <Input 
                   placeholder="Tìm kiếm dự án..." 
                   className="pl-10 w-64"
                 />
               </div>
               
               {/* Right side - Filters */}
               <div className="flex items-center space-x-4">
                 <select className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                   <option value="2025">2025</option>
                   <option value="2024" selected>2024</option>
                   <option value="2023">2023</option>
                   <option value="2022">2022</option>
                   <option value="2021">2021</option>
                   <option value="2020">2020</option>
                 </select>
                 
                 <select className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                   <option value="">Tất cả</option>
                   <option value="investment">Dự án đầu tư</option>
                   <option value="procurement">Mua sắm tài sản</option>
                   <option value="service">Thuê dịch vụ</option>
                   <option value="maintenance">Bảo trì</option>
                 </select>
                 
                 <select className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                   <option value="">Tất cả</option>
                   <option value="new">Dự án mới</option>
                   <option value="existing">Dự án hiện có</option>
                   <option value="extension">Dự án mở rộng</option>
                 </select>
                 
                 <Button variant="outline" className="border-slate-300 hover:bg-slate-50">
                   Cột <ChevronDown className="w-4 h-4 ml-2" />
                 </Button>
               </div>
             </div>

             <Table>
              <TableHeader>
                <TableRow className="hover:bg-slate-50">
                  <TableHead className="font-semibold">Mã Dự án</TableHead>
                  <TableHead className="font-semibold">Tên Dự án</TableHead>
                  <TableHead className="font-semibold">Loại</TableHead>
                  <TableHead className="font-semibold">Trạng thái</TableHead>
                  <TableHead className="font-semibold">Ngày bắt đầu</TableHead>
                  <TableHead className="font-semibold">Giá trị</TableHead>
                  <TableHead className="font-semibold">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow 
                    key={project.code} 
                    className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                      selectedProject?.code === project.code ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => onProjectClick(project)}
                  >
                    <TableCell>
                      <div className="font-medium text-blue-600">{project.code}</div>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-xs">
                        {project.startDate.includes('2024') ? 'Mới' : 'Chuyển tiếp'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-slate-500">{project.department}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`${
                        project.type === 'Đầu tư' ? 'bg-blue-100 text-blue-700' :
                        project.type === 'Mua sắm' ? 'bg-green-100 text-green-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {project.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${
                        project.status === 'Chờ phê duyệt' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                        project.status === 'Đã phê duyệt' ? 'bg-green-100 text-green-700 border-green-200' :
                        'bg-red-100 text-red-700 border-red-200'
                      }`}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.startDate}</TableCell>
                    <TableCell className="font-semibold">{project.value}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-slate-100 rounded">
                          <Eye className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-1 hover:bg-slate-100 rounded">
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>
                        {project.status === 'Chờ phê duyệt' && (
                          <button className="p-1 hover:bg-slate-100 rounded">
                            <Send className="w-4 h-4 text-green-600" />
                          </button>
                        )}
                        {project.status === 'Từ chối' && (
                          <button className="p-1 hover:bg-slate-100 rounded">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Kanban Board</CardTitle>
            <p className="text-sm text-slate-500">Xem dự án theo trạng thái</p>
          </CardHeader>
          <CardContent>
            <KanbanBoard 
              projects={projects} 
              onProjectClick={onProjectClick} 
              selectedProject={selectedProject}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Stock Order Table Component
function StockOrderTable() {
  const orders = [
    {
      id: "#0S12K0S",
      items: 5,
      value: "35.2 triệu VND",
      created: "July 14, 2015",
      vendor: "Barone LLC",
      status: "PENDING",
      received: { current: 0, total: 3 },
      emailSent: true
    },
    {
      id: "#0S11K0S",
      items: 890,
      value: "29.9 triệu VND",
      created: "October 30, 2017",
      vendor: "Acme Co.",
      status: "PENDING",
      received: { current: 0, total: 3 },
      emailSent: true
    },
    {
      id: "#0S10K0S",
      items: 204,
      value: "26.4 triệu VND",
      created: "October 24, 2018",
      vendor: "Abstergo Ltd.",
      status: "COMPLETE",
      received: { current: 3, total: 3 },
      emailSent: true
    },
    {
      id: "#0S09K0S",
      items: 156,
      value: "20.9 triệu VND",
      created: "September 15, 2019",
      vendor: "TechCorp Inc.",
      status: "PARTIALLY RECEIVED",
      received: { current: 2, total: 4 },
      emailSent: true
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      'PENDING': 'bg-orange-100 text-orange-700 border-orange-200',
      'COMPLETE': 'bg-green-100 text-green-700 border-green-200',
      'PARTIALLY RECEIVED': 'bg-purple-100 text-purple-700 border-purple-200'
    }
    return variants[status] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const getProgressBar = (received: { current: number; total: number }) => {
    const percentage = (received.current / received.total) * 100
    return (
      <div className="flex items-center space-x-2">
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs text-gray-600">{received.current}/{received.total}</span>
      </div>
    )
  }

  return (
    <Card className="border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search Order" 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            + Order Stock
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-50">
              <TableHead className="font-semibold cursor-pointer">
                ORDER
                <ChevronDown className="w-4 h-4 ml-1 inline" />
              </TableHead>
              <TableHead className="font-semibold cursor-pointer">
                CREATED
                <ChevronDown className="w-4 h-4 ml-1 inline" />
              </TableHead>
              <TableHead className="font-semibold cursor-pointer">
                FROM VENDOR
                <ChevronDown className="w-4 h-4 ml-1 inline" />
              </TableHead>
              <TableHead className="font-semibold cursor-pointer">
                STATUS
                <ChevronDown className="w-4 h-4 ml-1 inline" />
              </TableHead>
              <TableHead className="font-semibold cursor-pointer">
                ITEM RECEIVED
                <ChevronDown className="w-4 h-4 ml-1 inline" />
              </TableHead>
              <TableHead className="font-semibold">SEND EMAIL</TableHead>
              <TableHead className="font-semibold">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="font-medium text-blue-600">{order.id}</div>
                  <div className="text-sm text-gray-500">{order.items} items, {order.value}</div>
                </TableCell>
                <TableCell className="text-gray-700">{order.created}</TableCell>
                <TableCell className="text-gray-700">{order.vendor}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadge(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {getProgressBar(order.received)}
                </TableCell>
                <TableCell>
                  {order.emailSent && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={order.status === 'COMPLETE'}
                      className={order.status === 'COMPLETE' ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      Receive
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Stock Summary Component
function StockSummary() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Total Asset Value */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Asset Value</p>
                             <p className="text-3xl font-bold text-gray-900">238.2 tỷ VND</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Summary */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Product Summary</p>
            <p className="text-2xl font-bold text-gray-900">32 products</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">In stock</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-3 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '62.5%' }} />
                </div>
                <span className="text-sm font-medium text-green-600">20</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Low stock</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-3 bg-orange-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '12.5%' }} />
                </div>
                <span className="text-sm font-medium text-orange-600">4</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Out of stock</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-3 bg-red-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '25%' }} />
                </div>
                <span className="text-sm font-medium text-red-600">8</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Quick Actions</p>
            <p className="text-lg font-semibold text-gray-900">Manage Stock</p>
          </div>
          
          <div className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Order
            </Button>
            <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
              <Package className="w-4 h-4 mr-2" />
              Check Inventory
            </Button>
            <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



export default function ProjectDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedView, setSelectedView] = useState("list")
  const [currentPage, setCurrentPage] = useState("dashboard") // "dashboard", "projects", or "clinic"
  const [selectedProject, setSelectedProject] = useState<any>(null) // Add state for selected project

  // Sample project data
  const projects = [
    {
      code: "DT-2024-001",
      name: "Dự án nâng cấp hệ thống IT",
      department: "Phòng IT",
      type: "Đầu tư",
      status: "Chờ phê duyệt",
      value: "58.8 tỷ VND",
      startDate: "15/01/2024",
      endDate: "15/12/2024",
      totalInvestment: "58.8 tỷ VND",
      yearlyBudget: "28.2 tỷ VND",
      manager: "Nguyễn Văn A",
      email: "nguyenvana@company.com",
      phone: "+84 123 456 789"
    },
    {
      code: "MS-2023-045",
      name: "Mua sắm thiết bị văn phòng",
      department: "Phòng Hành chính",
      type: "Mua sắm",
      status: "Đã phê duyệt",
      value: "3.5 tỷ VND",
      startDate: "01/12/2023",
      endDate: "01/06/2024",
      totalInvestment: "3.5 tỷ VND",
      yearlyBudget: "3.5 tỷ VND",
      manager: "Trần Thị B",
      email: "tranthib@company.com",
      phone: "+84 987 654 321"
    },
    {
      code: "DV-2024-012",
      name: "Thuê dịch vụ bảo mật",
      department: "Phòng An ninh",
      type: "Dịch vụ",
      status: "Từ chối",
      value: "11.8 tỷ VND",
      startDate: "20/02/2024",
      endDate: "20/02/2025",
      totalInvestment: "11.8 tỷ VND",
      yearlyBudget: "11.8 tỷ VND",
      manager: "Lê Văn C",
      email: "levanc@company.com",
      phone: "+84 555 123 456"
    }
  ]

  // Function to handle project selection
  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
  }

  // Function to close project details
  const closeProjectDetails = () => {
    setSelectedProject(null)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-white text-slate-800">
      {/* Collapsible Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-sm`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          {!sidebarCollapsed && (
            <h2 className="text-lg font-bold text-slate-900">DMDA System</h2>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <div className="flex flex-col space-y-2">
            <div 
              onClick={() => {
                setCurrentPage("dashboard")
                setSelectedProject(null) // Close project details when switching pages
              }}
              className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} ${
                currentPage === "dashboard" ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'
              }`}
            >
              <Home className={`w-5 h-5 flex-shrink-0 ${currentPage === "dashboard" ? 'text-blue-600' : 'text-slate-600'}`} />
              {!sidebarCollapsed && <span className={`text-sm ${currentPage === "dashboard" ? 'font-medium text-blue-700' : 'text-slate-700'}`}>Dashboard</span>}
            </div>
            <div 
              onClick={() => {
                setCurrentPage("projects")
                setSelectedProject(null) // Close project details when switching pages
              }}
              className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} ${
                currentPage === "projects" ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'
              }`}
            >
              <FolderOpen className={`w-5 h-5 flex-shrink-0 ${currentPage === "projects" ? 'text-blue-600' : 'text-slate-600'}`} />
              {!sidebarCollapsed && <span className={`text-sm ${currentPage === "projects" ? 'font-medium text-blue-700' : 'text-slate-700'}`}>Dự án</span>}
            </div>
            <div 
              onClick={() => {
                setCurrentPage("clinic")
                setSelectedProject(null) // Close project details when switching pages
              }}
              className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} ${
                currentPage === "clinic" ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'
              }`}
            >
              <Activity className={`w-5 h-5 flex-shrink-0 ${currentPage === "clinic" ? 'text-blue-600' : 'text-slate-600'}`} />
              {!sidebarCollapsed && <span className={`text-sm ${currentPage === "clinic" ? 'font-medium text-blue-700' : 'text-slate-700'}`}>Clinic</span>}
            </div>
            <div className={`flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <Gavel className="w-5 h-5 text-slate-600 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm text-slate-700">Đấu thầu</span>}
            </div>
            <div className={`flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <Users className="w-5 h-5 text-slate-600 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm text-slate-700">Nhân sự</span>}
            </div>
            <div className={`flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <BarChart3 className="w-5 h-5 text-slate-600 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm text-slate-700">Báo cáo</span>}
            </div>
            <div className={`flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <Settings className="w-5 h-5 text-slate-600 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm text-slate-700">Cài đặt</span>}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Breadcrumb + Header */}
        <div className="text-sm text-slate-500 mb-4 flex items-center space-x-2">
          <span>Dashboard</span>
          {currentPage === "projects" && (
            <>
              <span>/</span>
              <span className="text-blue-600 font-medium">Quản lý Dự án</span>
            </>
          )}
          {currentPage === "clinic" && (
            <>
              <span>/</span>
              <span className="text-blue-600 font-medium">Clinic Management</span>
            </>
          )}
        </div>

        {/* Render appropriate component based on current page */}
        {currentPage === "dashboard" ? (
          <DashboardHome />
        ) : currentPage === "projects" ? (
          <ProjectsManagement 
            projects={projects} 
            selectedView={selectedView} 
            setSelectedView={setSelectedView}
            onProjectClick={handleProjectClick}
            selectedProject={selectedProject}
          />
        ) : currentPage === "clinic" ? (
          <div className="space-y-6">
            {/* Clinic Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Clinic Management</h1>
                <p className="text-gray-600 mt-1">Manage your clinic's operations and inventory</p>
              </div>
            </div>

            {/* Clinic Navigation Tabs */}
            <div className="border-b border-gray-200">
              <Tabs defaultValue="stocks" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger value="stocks" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Stocks
                  </TabsTrigger>
                  <TabsTrigger value="patients" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Patients
                  </TabsTrigger>
                  <TabsTrigger value="appointments" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Appointments
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Clinic Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <StockSummary />
              <div className="mt-6">
                <StockOrderTable />
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {/* Project Details Modal - Show as centered popup with blurred background */}
      {currentPage === "projects" && selectedProject && (
        <>
          {/* Backdrop/Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeProjectDetails}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedProject.code}</h2>
                  <p className="text-slate-600 mt-1">{selectedProject.name}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className={`${
                    selectedProject.status === 'Chờ phê duyệt' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                    selectedProject.status === 'Đã phê duyệt' ? 'bg-green-100 text-green-700 border-green-200' :
                    'bg-red-100 text-red-700 border-red-200'
                  }`}>
                    {selectedProject.status}
                  </Badge>
                  <button
                    onClick={closeProjectDetails}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Project Information */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Thông tin Dự án</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm text-slate-600">Loại dự án:</span>
                        <span className="font-medium">{selectedProject.type}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm text-slate-600">Ngày bắt đầu:</span>
                        <span className="font-medium">{selectedProject.startDate}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm text-slate-600">Ngày kết thúc:</span>
                        <span className="font-medium">{selectedProject.endDate}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm text-slate-600">Tổng mức đầu tư:</span>
                        <span className="font-medium">{selectedProject.totalInvestment}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm text-slate-600">Kế hoạch vốn năm:</span>
                        <span className="font-medium">{selectedProject.yearlyBudget}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-slate-600">Giá trị:</span>
                        <span className="font-medium text-blue-600">{selectedProject.value}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Department Information */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Phòng ban phụ trách</h3>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-slate-700">Phòng:</span>
                        <p className="text-slate-600">{selectedProject.department}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Người phụ trách:</span>
                        <p className="text-slate-600">{selectedProject.manager}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Email:</span>
                        <p className="text-slate-600">{selectedProject.email}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Điện thoại:</span>
                        <p className="text-slate-600">{selectedProject.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity History */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Lịch sử hoạt động</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Dự án được tạo</p>
                        <p className="text-xs text-slate-500">{selectedProject.startDate} - {selectedProject.manager}</p>
                      </div>
                    </div>
                    {selectedProject.status === 'Chờ phê duyệt' && (
                      <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Gửi phê duyệt</p>
                          <p className="text-xs text-slate-500">Đang chờ xử lý</p>
                        </div>
                      </div>
                    )}
                    {selectedProject.status === 'Đã phê duyệt' && (
                      <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Dự án được phê duyệt</p>
                          <p className="text-xs text-slate-500">Đang thực hiện</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                  <Button 
                    variant="outline" 
                    onClick={closeProjectDetails}
                    className="border-slate-300 hover:bg-slate-50"
                  >
                    Đóng
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Edit className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
