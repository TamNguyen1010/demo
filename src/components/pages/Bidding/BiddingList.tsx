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
  Award
} from "lucide-react"
import { BiddingPackage } from "@/types/bidding"
import { formatCurrency } from "@/lib/utils"

interface BiddingListProps {
  biddingPackages: BiddingPackage[]
  viewMode: "list" | "kanban"
  onViewDetails: (biddingPackage: BiddingPackage) => void
  onPublish: (id: number) => void
  onAward: (id: number, awardDate: string, notes?: string) => void
  onDelete: (id: number, reason: string) => void
}

export function BiddingList({ 
  biddingPackages, 
  viewMode, 
  onViewDetails, 
  onPublish, 
  onAward, 
  onDelete 
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
      case 'published':
        return <Badge variant="default" className="bg-blue-100 text-blue-700">Đã công bố</Badge>
      case 'bidding':
        return <Badge variant="default" className="bg-orange-100 text-orange-700">Đang thầu</Badge>
      case 'evaluating':
        return <Badge variant="default" className="bg-purple-100 text-purple-700">Đánh giá</Badge>
      case 'awarded':
        return <Badge variant="default" className="bg-green-100 text-green-700">Đã trao thầu</Badge>
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
      case 'urgent':
        return <Badge variant="outline" className="text-red-600 border-red-200">Khẩn cấp</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getContractTypeLabel = (type: string) => {
    switch (type) {
      case 'construction': return 'Xây dựng'
      case 'supply': return 'Cung cấp'
      case 'service': return 'Dịch vụ'
      case 'mixed': return 'Hỗn hợp'
      default: return type
    }
  }

  const getBiddingMethodLabel = (method: string) => {
    switch (method) {
      case 'open': return 'Mở thầu'
      case 'limited': return 'Hạn chế'
      case 'direct': return 'Chỉ định thầu'
      case 'competitive': return 'Cạnh tranh'
      default: return method
    }
  }

  const filteredPackages = biddingPackages.filter(biddingPackage => {
    const packageYear = biddingPackage.created_at.split('-')[0]
    const matchesYear = packageYear === filters.year
    const matchesType = filters.contractType === "all" || biddingPackage.contract_type === filters.contractType
    const matchesMethod = filters.biddingMethod === "all" || biddingPackage.bidding_method === filters.biddingMethod
    const matchesStatus = filters.status === "all" || biddingPackage.status === filters.status
    const matchesPriority = filters.priority === "all" || biddingPackage.priority === filters.priority
    const matchesSearch = biddingPackage.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) || 
                         biddingPackage.package_code.toLowerCase().includes(filters.searchTerm.toLowerCase())

    return matchesYear && matchesType && matchesMethod && matchesStatus && matchesPriority && matchesSearch
  })

  if (viewMode === "list") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Package className="w-5 h-5 text-[#800020]" />
            Danh sách Gói thầu
          </CardTitle>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Năm</label>
              <select
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700">Loại hợp đồng</label>
              <select
                value={filters.contractType}
                onChange={(e) => setFilters({ ...filters, contractType: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="construction">Xây dựng</option>
                <option value="supply">Cung cấp</option>
                <option value="service">Dịch vụ</option>
                <option value="mixed">Hỗn hợp</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700">Phương thức</label>
              <select
                value={filters.biddingMethod}
                onChange={(e) => setFilters({ ...filters, biddingMethod: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="open">Mở thầu</option>
                <option value="limited">Hạn chế</option>
                <option value="direct">Chỉ định thầu</option>
                <option value="competitive">Cạnh tranh</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700">Trạng thái</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="draft">Bản nháp</option>
                <option value="published">Đã công bố</option>
                <option value="bidding">Đang thầu</option>
                <option value="evaluating">Đánh giá</option>
                <option value="awarded">Đã trao thầu</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700">Độ ưu tiên</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="low">Thấp</option>
                <option value="medium">Trung bình</option>
                <option value="high">Cao</option>
                <option value="urgent">Khẩn cấp</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700">Tìm kiếm</label>
              <Input
                placeholder="Tìm kiếm..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredPackages.map((biddingPackage) => (
              <div
                key={biddingPackage.id}
                className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onViewDetails(biddingPackage)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{biddingPackage.name}</h3>
                      {getStatusBadge(biddingPackage.status)}
                      {getPriorityBadge(biddingPackage.priority)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                      <div>
                        <span className="font-medium">Mã gói:</span> {biddingPackage.package_code}
                      </div>
                      <div>
                        <span className="font-medium">Giá trị:</span> {formatCurrency(biddingPackage.estimated_value)}
                      </div>
                      <div>
                        <span className="font-medium">Loại:</span> {getContractTypeLabel(biddingPackage.contract_type)}
                      </div>
                      <div>
                        <span className="font-medium">Phương thức:</span> {getBiddingMethodLabel(biddingPackage.bidding_method)}
                      </div>
                      <div>
                        <span className="font-medium">Quản lý:</span> {biddingPackage.package_manager}
                      </div>
                      <div>
                        <span className="font-medium">Phòng ban:</span> {biddingPackage.department}
                      </div>
                    </div>
                    
                    {biddingPackage.notes && (
                      <p className="text-sm text-slate-500 mt-2 italic">"{biddingPackage.notes}"</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {biddingPackage.status === 'draft' && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onPublish(biddingPackage.id)
                        }}
                        className="flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        Công bố
                      </Button>
                    )}
                    
                    {biddingPackage.status === 'evaluating' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          const awardDate = prompt("Nhập ngày trao thầu (YYYY-MM-DD):")
                          const notes = prompt("Nhập ghi chú (tùy chọn):")
                          if (awardDate) {
                            onAward(biddingPackage.id, awardDate, notes || undefined)
                          }
                        }}
                        className="flex items-center gap-1"
                      >
                        <Award className="w-3 h-3" />
                        Trao thầu
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewDetails(biddingPackage)
                      }}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPackages.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">Không có gói thầu nào</h3>
                <p className="text-slate-500">Không tìm thấy gói thầu nào phù hợp với bộ lọc hiện tại.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Kanban view (placeholder for now)
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Package className="w-5 h-5 text-[#800020]" />
          Bảng Kanban - Gói thầu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">Chế độ Kanban</h3>
          <p className="text-slate-500">Chế độ xem Kanban cho gói thầu đang được phát triển.</p>
        </div>
      </CardContent>
    </Card>
  )
}
