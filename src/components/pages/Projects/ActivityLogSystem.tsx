"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Clock, 
  User, 
  FileText,
  DollarSign,
  Shield,
  Settings,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  MoreHorizontal
} from "lucide-react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ActivityLog {
  id: string
  contractId: string
  actionType: 'create' | 'update' | 'delete' | 'restore' | 'status_change' | 'budget_update' | 'payment_record' | 'cost_link' | 'document_upload' | 'document_modify' | 'document_delete' | 'permission_grant' | 'permission_revoke' | 'role_assignment' | 'external_sync' | 'api_call' | 'data_import' | 'data_export'
  actionCategory: 'lifecycle' | 'financial' | 'document' | 'permission' | 'integration'
  actionDescription: string
  oldValues?: any
  newValues?: any
  changedFields?: any
  ipAddress?: string
  userAgent?: string
  sessionId?: string
  performedBy: string
  performedAt: Date
  metadata?: Record<string, any>
}

interface ActivityLogSystemProps {
  projectId: string
}

export function ActivityLogSystem({ projectId }: ActivityLogSystemProps) {
  const [logs, setLogs] = useState<ActivityLog[]>([
    {
      id: "1",
      contractId: "contract-001",
      actionType: "create",
      actionCategory: "lifecycle",
      actionDescription: "Tạo mới hợp đồng dự án xây dựng cầu",
      performedBy: "Nguyễn Văn A",
      performedAt: new Date("2024-01-15T09:00:00"),
      ipAddress: "192.168.1.100",
      userAgent: "Chrome/120.0.0.0",
      sessionId: "sess_123456"
    },
    {
      id: "2",
      contractId: "contract-001",
      actionType: "budget_update",
      actionCategory: "financial",
      actionDescription: "Cập nhật ngân sách từ 800 triệu lên 1 tỷ VND",
      oldValues: { budget: 800000000 },
      newValues: { budget: 1000000000 },
      changedFields: ["budget"],
      performedBy: "Trần Thị B",
      performedAt: new Date("2024-01-16T14:30:00"),
      ipAddress: "192.168.1.101",
      userAgent: "Firefox/121.0.0",
      sessionId: "sess_123457"
    },
    {
      id: "3",
      contractId: "contract-001",
      actionType: "document_upload",
      actionCategory: "document",
      actionDescription: "Tải lên tài liệu hợp đồng gốc",
      newValues: { documentName: "hop-dong-goc.pdf", fileSize: "2.5MB" },
      performedBy: "Lê Văn C",
      performedAt: new Date("2024-01-17T11:15:00"),
      ipAddress: "192.168.1.102",
      userAgent: "Edge/120.0.0.0",
      sessionId: "sess_123458"
    },
    {
      id: "4",
      contractId: "contract-001",
      actionType: "status_change",
      actionCategory: "lifecycle",
      actionDescription: "Thay đổi trạng thái từ 'draft' sang 'approved'",
      oldValues: { status: "draft" },
      newValues: { status: "approved" },
      changedFields: ["status"],
      performedBy: "Phạm Văn D",
      performedAt: new Date("2024-01-18T16:45:00"),
      ipAddress: "192.168.1.103",
      userAgent: "Safari/17.0.0",
      sessionId: "sess_123459"
    }
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedActionType, setSelectedActionType] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<string>("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null)

  const getActionTypeIcon = (actionType: string) => {
    switch (actionType) {
      case 'create':
        return <FileText className="w-4 h-4 text-green-600" />
      case 'update':
        return <FileText className="w-4 h-4 text-blue-600" />
      case 'delete':
        return <FileText className="w-4 h-4 text-red-600" />
      case 'status_change':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />
      case 'budget_update':
        return <DollarSign className="w-4 h-4 text-purple-600" />
      case 'document_upload':
        return <FileText className="w-4 h-4 text-indigo-600" />
      case 'permission_grant':
        return <Shield className="w-4 h-4 text-green-600" />
      default:
        return <Info className="w-4 h-4 text-gray-600" />
    }
  }

  const getActionTypeColor = (actionType: string) => {
    switch (actionType) {
      case 'create':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'update':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'delete':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'status_change':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'budget_update':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'document_upload':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'permission_grant':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lifecycle':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'financial':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'document':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'permission':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'integration':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getActionTypeLabel = (actionType: string) => {
    switch (actionType) {
      case 'create':
        return 'Tạo mới'
      case 'update':
        return 'Cập nhật'
      case 'delete':
        return 'Xóa'
      case 'restore':
        return 'Khôi phục'
      case 'status_change':
        return 'Thay đổi trạng thái'
      case 'budget_update':
        return 'Cập nhật ngân sách'
      case 'payment_record':
        return 'Ghi nhận thanh toán'
      case 'cost_link':
        return 'Liên kết chi phí'
      case 'document_upload':
        return 'Tải lên tài liệu'
      case 'document_modify':
        return 'Chỉnh sửa tài liệu'
      case 'document_delete':
        return 'Xóa tài liệu'
      case 'permission_grant':
        return 'Cấp quyền'
      case 'permission_revoke':
        return 'Thu hồi quyền'
      case 'role_assignment':
        return 'Phân công vai trò'
      case 'external_sync':
        return 'Đồng bộ bên ngoài'
      case 'api_call':
        return 'Gọi API'
      case 'data_import':
        return 'Nhập dữ liệu'
      case 'data_export':
        return 'Xuất dữ liệu'
      default:
        return actionType
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'lifecycle':
        return 'Vòng đời'
      case 'financial':
        return 'Tài chính'
      case 'document':
        return 'Tài liệu'
      case 'permission':
        return 'Phân quyền'
      case 'integration':
        return 'Tích hợp'
      default:
        return category
    }
  }

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.actionDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.performedBy.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesActionType = selectedActionType === "all" || log.actionType === selectedActionType
    const matchesCategory = selectedCategory === "all" || log.actionCategory === selectedCategory
    const matchesUser = selectedUser === "all" || log.performedBy === selectedUser
    
    let matchesDate = true
    if (dateFrom && log.performedAt < new Date(dateFrom)) matchesDate = false
    if (dateTo && log.performedAt > new Date(dateTo)) matchesDate = false
    
    return matchesSearch && matchesActionType && matchesCategory && matchesUser && matchesDate
  })

  const handleExportLogs = () => {
    // Implement export functionality
    console.log('Exporting activity logs...')
  }

  const handleViewLogDetail = (log: ActivityLog) => {
    setSelectedLog(log)
  }

  const handleCloseLogDetail = () => {
    setSelectedLog(null)
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#800020]">Lịch sử Hoạt động</h2>
          <p className="text-gray-600">Theo dõi toàn bộ lịch sử thao tác hợp đồng</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleRefresh}
            disabled={isLoading}
            variant="outline"
            size="icon"
          >
            <History className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            onClick={handleExportLogs}
            className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#A00030] hover:to-[#800020]"
          >
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#800020] flex items-center gap-2">
            <Search className="w-5 h-5" />
            Tìm kiếm và Lọc
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Tìm kiếm</Label>
              <Input
                id="search"
                placeholder="Tìm kiếm theo mô tả hoặc người thực hiện..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="action-type">Loại hành động</Label>
              <Select value={selectedActionType} onValueChange={setSelectedActionType}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Tất cả loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại</SelectItem>
                  <SelectItem value="create">Tạo mới</SelectItem>
                  <SelectItem value="update">Cập nhật</SelectItem>
                  <SelectItem value="delete">Xóa</SelectItem>
                  <SelectItem value="status_change">Thay đổi trạng thái</SelectItem>
                  <SelectItem value="budget_update">Cập nhật ngân sách</SelectItem>
                  <SelectItem value="document_upload">Tải lên tài liệu</SelectItem>
                  <SelectItem value="permission_grant">Cấp quyền</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="category">Danh mục</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Tất cả danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  <SelectItem value="lifecycle">Vòng đời</SelectItem>
                  <SelectItem value="financial">Tài chính</SelectItem>
                  <SelectItem value="document">Tài liệu</SelectItem>
                  <SelectItem value="permission">Phân quyền</SelectItem>
                  <SelectItem value="integration">Tích hợp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="user">Người thực hiện</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Tất cả người dùng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả người dùng</SelectItem>
                  <SelectItem value="Nguyễn Văn A">Nguyễn Văn A</SelectItem>
                  <SelectItem value="Trần Thị B">Trần Thị B</SelectItem>
                  <SelectItem value="Lê Văn C">Lê Văn C</SelectItem>
                  <SelectItem value="Phạm Văn D">Phạm Văn D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date-from">Từ ngày</Label>
              <Input
                id="date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="date-to">Đến ngày</Label>
              <Input
                id="date-to"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Logs List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#800020] flex items-center gap-2">
            <History className="w-5 h-5" />
            Danh sách Hoạt động ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getActionTypeIcon(log.actionType)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">{log.actionDescription}</h4>
                      <Badge variant="outline" className={getActionTypeColor(log.actionType)}>
                        {getActionTypeLabel(log.actionType)}
                      </Badge>
                      <Badge variant="outline" className={getCategoryColor(log.actionCategory)}>
                        {getCategoryLabel(log.actionCategory)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {log.performedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {log.performedAt.toLocaleString('vi-VN')}
                      </span>
                      {log.ipAddress && (
                        <span className="flex items-center gap-1">
                          <Shield className="w-4 h-4" />
                          {log.ipAddress}
                        </span>
                      )}
                    </div>
                    
                    {log.changedFields && log.changedFields.length > 0 && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Trường thay đổi:</span> {log.changedFields.join(', ')}
                      </div>
                    )}
                    
                    {log.oldValues && log.newValues && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-red-600">Giá trị cũ:</span>
                            <pre className="mt-1 text-xs bg-white p-2 rounded border overflow-x-auto">
                              {JSON.stringify(log.oldValues, null, 2)}
                            </pre>
                          </div>
                          <div>
                            <span className="font-medium text-green-600">Giá trị mới:</span>
                            <pre className="mt-1 text-xs bg-white p-2 rounded border overflow-x-auto">
                              {JSON.stringify(log.newValues, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewLogDetail(log)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredLogs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Không tìm thấy hoạt động nào</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Log Detail Modal */}
      {selectedLog && (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#800020]/5 to-[#800020]/10">
          <CardHeader>
            <CardTitle className="text-[#800020] flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Chi tiết Hoạt động
              </span>
              <Button variant="ghost" size="sm" onClick={handleCloseLogDetail}>
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Mô tả</Label>
                <p className="text-gray-900 mt-1">{selectedLog.actionDescription}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Loại hành động</Label>
                <div className="flex items-center gap-2 mt-1">
                  {getActionTypeIcon(selectedLog.actionType)}
                  <Badge variant="outline" className={getActionTypeColor(selectedLog.actionType)}>
                    {getActionTypeLabel(selectedLog.actionType)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Người thực hiện</Label>
                <p className="text-gray-900 mt-1">{selectedLog.performedBy}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Thời gian</Label>
                <p className="text-gray-900 mt-1">{selectedLog.performedAt.toLocaleString('vi-VN')}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">IP Address</Label>
                <p className="text-gray-900 mt-1">{selectedLog.ipAddress || 'Không có'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">User Agent</Label>
                <p className="text-gray-900 mt-1 text-sm">{selectedLog.userAgent || 'Không có'}</p>
              </div>
            </div>
            
            {selectedLog.metadata && Object.keys(selectedLog.metadata).length > 0 && (
              <div>
                <Label className="text-sm font-medium text-gray-700">Metadata</Label>
                <pre className="mt-1 text-xs bg-white p-3 rounded border overflow-x-auto">
                  {JSON.stringify(selectedLog.metadata, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
