"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Package, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  X,
  Eye,
  Edit,
  Trash2,
  Send,
  Award,
  Filter,
  History
} from "lucide-react"
import { BiddingPackage } from "@/types/bidding"
import { formatCurrency } from "@/lib/utils"

interface BiddingListProps {
  biddingPackages: BiddingPackage[]
  viewMode: "list" | "kanban" | "analytics"
  onViewDetails: (biddingPackage: BiddingPackage) => void
  onEdit: (biddingPackage: BiddingPackage) => void
  onDelete: (biddingPackage: BiddingPackage) => void
  onDocuments: (biddingPackage: BiddingPackage) => void
  onHistory: (biddingPackage: BiddingPackage) => void
  onPublish: (id: number) => void
  onAward: (id: number, awardDate: string, notes?: string) => void
}

export function BiddingList({ 
  biddingPackages, 
  viewMode, 
  onViewDetails, 
  onEdit,
  onDelete,
  onDocuments,
  onHistory,
  onPublish, 
  onAward
}: BiddingListProps) {
  const [filters, setFilters] = useState({
    year: new Date().getFullYear().toString(),
    contractType: "all",
    biddingMethod: "all",
    status: "all",
    priority: "all",
    searchTerm: ""
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-700">Bản nháp</Badge>
      case 'created':
        return <Badge variant="default" className="bg-blue-100 text-blue-700">Đã tạo</Badge>
      case 'in_progress':
        return <Badge variant="default" className="bg-orange-100 text-orange-700">Đang triển khai</Badge>
      case 'published':
        return <Badge variant="default" className="bg-blue-100 text-blue-700">Đã công bố</Badge>
      case 'bidding':
        return <Badge variant="default" className="bg-orange-100 text-orange-700">Đang thầu</Badge>
      case 'evaluating':
        return <Badge variant="default" className="bg-purple-100 text-purple-700">Đánh giá</Badge>
      case 'awarded':
        return <Badge variant="default" className="bg-green-100 text-green-700">Đã trao thầu</Badge>
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-700">Hoàn thành</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Đã hủy</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="text-green-600 border-green-200">Thấp</Badge>
      case 'medium':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Trung bình</Badge>
      case 'high':
        return <Badge variant="outline" className="text-orange-600 border-orange-200">Cao</Badge>
      case 'critical':
        return <Badge variant="outline" className="text-red-600 border-red-200">Khẩn cấp</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getTenderMethodLabel = (method: string) => {
    switch (method) {
      case 'open_tender': return 'Đấu thầu rộng rãi'
      case 'limited_tender': return 'Đấu thầu hạn chế'
      case 'direct_appointment': return 'Chỉ định thầu'
      case 'competitive_consultation': return 'Tư vấn cạnh tranh'
      default: return method
    }
  }

  const filteredPackages = biddingPackages.filter(pkg => {
    if (filters.searchTerm && !pkg.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false
    }
    if (filters.status !== "all" && pkg.status !== filters.status) {
      return false
    }
    if (filters.priority !== "all" && pkg.priority !== filters.priority) {
      return false
    }
    return true
  })

  if (viewMode === "analytics") {
    return (
      <div className="text-center py-12 text-gray-500">
        <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-medium">Chuyển sang tab "Tổng quan" để xem thống kê</p>
        <p className="text-sm">Tính năng phân tích chi tiết đang phát triển</p>
      </div>
    )
  }

  if (viewMode === "kanban") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Draft Column */}
        <div className="space-y-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <h3 className="font-medium text-gray-700">Bản nháp ({filteredPackages.filter(p => p.status === 'draft').length})</h3>
          </div>
          {filteredPackages.filter(p => p.status === 'draft').map(pkg => (
            <Card key={pkg.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{pkg.package_code}</Badge>
                    {getPriorityBadge(pkg.priority)}
                  </div>
                  <h4 className="font-medium text-sm line-clamp-2">{pkg.name}</h4>
                  <p className="text-xs text-gray-600">{pkg.project_name}</p>
                  <p className="text-sm font-medium">{formatCurrency(pkg.estimated_value)}</p>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => onViewDetails(pkg)}>
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onPublish(pkg.id)}>
                      <Send className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* In Progress Column */}
        <div className="space-y-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <h3 className="font-medium text-blue-700">Đang thực hiện ({filteredPackages.filter(p => ['published', 'bidding', 'evaluating'].includes(p.status)).length})</h3>
          </div>
          {filteredPackages.filter(p => ['published', 'bidding', 'evaluating'].includes(p.status)).map(pkg => (
            <Card key={pkg.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{pkg.package_code}</Badge>
                    {getStatusBadge(pkg.status)}
                  </div>
                  <h4 className="font-medium text-sm line-clamp-2">{pkg.name}</h4>
                  <p className="text-xs text-gray-600">{pkg.project_name}</p>
                  <p className="text-sm font-medium">{formatCurrency(pkg.estimated_value)}</p>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => onViewDetails(pkg)}>
                      <Eye className="w-3 h-3" />
                    </Button>
                    {pkg.status === 'published' && (
                      <Button size="sm" variant="outline" onClick={() => onAward(pkg.id, new Date().toISOString())}>
                        <Award className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Awarded Column */}
        <div className="space-y-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <h3 className="font-medium text-green-700">Đã trao thầu ({filteredPackages.filter(p => p.status === 'awarded').length})</h3>
          </div>
          {filteredPackages.filter(p => p.status === 'awarded').map(pkg => (
            <Card key={pkg.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{pkg.package_code}</Badge>
                    {getStatusBadge(pkg.status)}
                  </div>
                  <h4 className="font-medium text-sm line-clamp-2">{pkg.name}</h4>
                  <p className="text-xs text-gray-600">{pkg.project_name}</p>
                  <p className="text-sm font-medium">{formatCurrency(pkg.estimated_value)}</p>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => onViewDetails(pkg)}>
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Completed Column */}
        <div className="space-y-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <h3 className="font-medium text-gray-700">Hoàn thành ({filteredPackages.filter(p => p.status === 'completed').length})</h3>
          </div>
          {filteredPackages.filter(p => p.status === 'completed').map(pkg => (
            <Card key={pkg.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{pkg.package_code}</Badge>
                    {getStatusBadge(pkg.status)}
                  </div>
                  <h4 className="font-medium text-sm line-clamp-2">{pkg.name}</h4>
                  <p className="text-xs text-gray-600">{pkg.project_name}</p>
                  <p className="text-sm font-medium">{formatCurrency(pkg.estimated_value)}</p>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => onViewDetails(pkg)}>
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // List View (default)
  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Bộ lọc
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Tìm kiếm</label>
              <Input
                placeholder="Tìm theo tên gói thầu..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Trạng thái</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="draft">Bản nháp</option>
                <option value="created">Đã tạo</option>
                <option value="in_progress">Đang triển khai</option>
                <option value="published">Đã công bố</option>
                <option value="bidding">Đang thầu</option>
                <option value="evaluating">Đánh giá</option>
                <option value="awarded">Đã trao thầu</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Mức độ ưu tiên</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
              >
                <option value="all">Tất cả mức độ</option>
                <option value="low">Thấp</option>
                <option value="medium">Trung bình</option>
                <option value="high">Cao</option>
                <option value="critical">Khẩn cấp</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Năm</label>
              <select
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bidding Packages List */}
      <div className="space-y-4">
        {filteredPackages.map((pkg) => (
          <Card key={pkg.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{pkg.package_code}</Badge>
                    {getStatusBadge(pkg.status)}
                    {getPriorityBadge(pkg.priority)}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                    {pkg.description && (
                      <p className="text-gray-600 mt-1 line-clamp-2">{pkg.description}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Dự án:</span>
                      <span className="ml-2 font-medium">{pkg.project_name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Giá trị:</span>
                      <span className="ml-2 font-medium">{formatCurrency(pkg.estimated_value)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Hình thức:</span>
                      <span className="ml-2 font-medium">{getTenderMethodLabel(pkg.tender_method)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(pkg)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Chi tiết
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(pkg)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Chỉnh sửa
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDocuments(pkg)}
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Tài liệu
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onHistory(pkg)}
                    className="flex items-center gap-2"
                  >
                    <History className="w-4 h-4" />
                    Lịch sử
                  </Button>
                  
                  {pkg.status === 'draft' && (
                    <Button
                      size="sm"
                      onClick={() => onPublish(pkg.id)}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Công bố
                    </Button>
                  )}
                  
                  {pkg.status === 'published' && (
                    <Button
                      size="sm"
                      onClick={() => onAward(pkg.id, new Date().toISOString())}
                      className="flex items-center gap-2"
                    >
                      <Award className="w-4 h-4" />
                      Trao thầu
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(pkg)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredPackages.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không có gói thầu nào</h3>
              <p className="text-gray-600">Không tìm thấy gói thầu nào phù hợp với bộ lọc hiện tại.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
