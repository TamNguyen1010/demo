"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Activity, 
  Filter, 
  Download, 
  Search, 
  Eye, 
  RotateCcw,
  Clock,
  User,
  FileText,
  Globe,
  Settings,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react"

interface ActivityLog {
  id: number
  tender_package_id?: number
  user_id: number
  user_name: string
  user_avatar?: string
  action_type: string
  action_category: 'tender_package' | 'document' | 'api_integration' | 'permission' | 'system'
  action_description: string
  old_values?: Record<string, any>
  new_values?: Record<string, any>
  changed_fields?: string[]
  ip_address?: string
  user_agent?: string
  created_at: string
  severity: 'info' | 'warning' | 'error' | 'critical'
}

interface LogFilters {
  date_from?: string
  date_to?: string
  user_id?: number
  action_type?: string[]
  action_category?: string[]
  severity?: string[]
  tender_package_id?: number
}

interface ActivityLogSystemProps {
  tenderPackageId?: number
  onViewDetails: (logId: number) => void
  onRollback: (logId: number) => void
  onExport: (filters: LogFilters, format: 'pdf' | 'excel' | 'csv') => Promise<void>
}

export function ActivityLogSystem({
  tenderPackageId,
  onViewDetails,
  onRollback,
  onExport
}: ActivityLogSystemProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'details' | 'analytics'>('timeline')
  const [showFilters, setShowFilters] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [isRealTime, setIsRealTime] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  
  const [filters, setFilters] = useState<LogFilters>({
    date_from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    date_to: new Date().toISOString().split('T')[0]
  })

  const [logs, setLogs] = useState<ActivityLog[]>([
    {
      id: 1,
      tender_package_id: 123,
      user_id: 1,
      user_name: "Nguyễn Văn A",
      action_type: "UPDATE_TENDER_PACKAGE",
      action_category: "tender_package",
      action_description: "Cập nhật thông tin gói thầu GT-2024-001",
      old_values: { estimated_value: 1000000000, status: "draft" },
      new_values: { estimated_value: 1200000000, status: "created" },
      changed_fields: ["estimated_value", "status"],
      ip_address: "192.168.1.100",
      created_at: "2024-01-15T10:30:00Z",
      severity: "info"
    },
    {
      id: 2,
      tender_package_id: 123,
      user_id: 2,
      user_name: "Trần Thị B",
      action_type: "UPLOAD_DOCUMENT",
      action_category: "document",
      action_description: "Tải lên tài liệu phê duyệt HSMT",
      new_values: { document_name: "Quyet_dinh_phe_duyet_HSMT.pdf", file_size: 2048576 },
      changed_fields: ["documents"],
      ip_address: "192.168.1.101",
      created_at: "2024-01-15T11:15:00Z",
      severity: "info"
    },
    {
      id: 3,
      user_id: 3,
      user_name: "Lê Văn C",
      action_type: "API_CALL_ERROR",
      action_category: "api_integration",
      action_description: "Lỗi kết nối API Cổng thông tin đấu thầu",
      old_values: { api_status: "connected" },
      new_values: { api_status: "error", error_message: "Connection timeout" },
      changed_fields: ["api_status", "error_message"],
      ip_address: "192.168.1.102",
      created_at: "2024-01-15T12:00:00Z",
      severity: "error"
    },
    {
      id: 4,
      tender_package_id: 124,
      user_id: 1,
      user_name: "Nguyễn Văn A",
      action_type: "CREATE_TENDER_PACKAGE",
      action_category: "tender_package",
      action_description: "Tạo mới gói thầu GT-2024-002",
      new_values: { name: "Gói thầu mua sắm thiết bị IT", estimated_value: 800000000 },
      changed_fields: ["name", "estimated_value", "status"],
      ip_address: "192.168.1.100",
      created_at: "2024-01-15T14:20:00Z",
      severity: "info"
    },
    {
      id: 5,
      user_id: 4,
      user_name: "Phạm Thị D",
      action_type: "GRANT_PERMISSION",
      action_category: "permission",
      action_description: "Cấp quyền chỉnh sửa gói thầu cho user ID 5",
      new_values: { permission: "EDIT_TENDER_PACKAGE", user_id: 5 },
      changed_fields: ["permissions"],
      ip_address: "192.168.1.103",
      created_at: "2024-01-15T15:45:00Z",
      severity: "warning"
    }
  ])

  const actionTypeOptions = [
    { value: "CREATE_TENDER_PACKAGE", label: "Tạo gói thầu" },
    { value: "UPDATE_TENDER_PACKAGE", label: "Cập nhật gói thầu" },
    { value: "DELETE_TENDER_PACKAGE", label: "Xóa gói thầu" },
    { value: "UPLOAD_DOCUMENT", label: "Tải lên tài liệu" },
    { value: "DELETE_DOCUMENT", label: "Xóa tài liệu" },
    { value: "API_CALL_SUCCESS", label: "API thành công" },
    { value: "API_CALL_ERROR", label: "API lỗi" },
    { value: "GRANT_PERMISSION", label: "Cấp quyền" },
    { value: "REVOKE_PERMISSION", label: "Thu hồi quyền" }
  ]

  const severityOptions = [
    { value: "info", label: "Thông tin", color: "bg-blue-100 text-blue-800" },
    { value: "warning", label: "Cảnh báo", color: "bg-yellow-100 text-yellow-800" },
    { value: "error", label: "Lỗi", color: "bg-red-100 text-red-800" },
    { value: "critical", label: "Nghiêm trọng", color: "bg-purple-100 text-purple-800" }
  ]

  const getActionIcon = (actionType: string) => {
    if (actionType.includes('CREATE')) return <FileText className="w-4 h-4" />
    if (actionType.includes('UPDATE')) return <Settings className="w-4 h-4" />
    if (actionType.includes('DELETE')) return <XCircle className="w-4 h-4" />
    if (actionType.includes('UPLOAD')) return <FileText className="w-4 h-4" />
    if (actionType.includes('API')) return <Globe className="w-4 h-4" />
    if (actionType.includes('PERMISSION')) return <Settings className="w-4 h-4" />
    return <Info className="w-4 h-4" />
  }

  const getActionColor = (actionType: string) => {
    if (actionType.includes('CREATE')) return 'bg-green-100 text-green-800'
    if (actionType.includes('UPDATE')) return 'bg-blue-100 text-blue-800'
    if (actionType.includes('DELETE')) return 'bg-red-100 text-red-800'
    if (actionType.includes('UPLOAD')) return 'bg-orange-100 text-orange-800'
    if (actionType.includes('API')) return 'bg-purple-100 text-purple-800'
    if (actionType.includes('PERMISSION')) return 'bg-indigo-100 text-indigo-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'info': return <Info className="w-4 h-4" />
      case 'warning': return <AlertCircle className="w-4 h-4" />
      case 'error': return <XCircle className="w-4 h-4" />
      case 'critical': return <AlertCircle className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  const filteredLogs = logs.filter(log => {
    if (tenderPackageId && log.tender_package_id !== tenderPackageId) return false
    if (searchQuery && !log.action_description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (filters.action_type && filters.action_type.length > 0 && !filters.action_type.includes(log.action_type)) return false
    if (filters.severity && filters.severity.length > 0 && !filters.severity.includes(log.severity)) return false
    if (filters.date_from && new Date(log.created_at) < new Date(filters.date_from)) return false
    if (filters.date_to && new Date(log.created_at) > new Date(filters.date_to)) return false
    return true
  })

  const handleFilterChange = (key: keyof LogFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      date_from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      date_to: new Date().toISOString().split('T')[0]
    })
  }

  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    try {
      await onExport(filters, format)
      setShowExportModal(false)
    } catch (error) {
      console.error('Export error:', error)
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Vừa xong'
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#800020]/20 rounded-lg">
            <Activity className="w-6 h-6 text-[#800020]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Lịch sử hoạt động</h2>
            <p className="text-gray-600">Theo dõi tất cả các thao tác và thay đổi trong hệ thống</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
          >
            <Filter className="w-4 h-4 mr-2" />
            Bộ lọc
            {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </Button>

          <Button
            onClick={() => setShowExportModal(true)}
            variant="outline"
            className="border-blue-500/30 hover:bg-blue-500/10 text-blue-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>

          <Button
            onClick={() => setIsRealTime(!isRealTime)}
            variant={isRealTime ? "default" : "outline"}
            className={isRealTime ? "bg-green-600 hover:bg-green-700" : ""}
          >
            <Clock className="w-4 h-4 mr-2" />
            {isRealTime ? 'Real-time' : 'Manual'}
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#800020]" />
              Bộ lọc lịch sử
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Từ ngày
                </Label>
                <Input
                  type="date"
                  value={filters.date_from || ""}
                  onChange={(e) => handleFilterChange("date_from", e.target.value)}
                  className="border-gray-300 focus:border-[#800020] focus:ring-[#800020]/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Đến ngày
                </Label>
                <Input
                  type="date"
                  value={filters.date_to || ""}
                  onChange={(e) => handleFilterChange("date_to", e.target.value)}
                  className="border-gray-300 focus:border-[#800020] focus:ring-[#800020]/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Loại hành động
                </Label>
                <select
                  multiple
                  value={filters.action_type || []}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value)
                    handleFilterChange("action_type", selected)
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-[#800020] focus:ring-[#800020]/20"
                >
                  {actionTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Mức độ nghiêm trọng
                </Label>
                <div className="flex flex-wrap gap-2">
                  {severityOptions.map((severity) => (
                    <Badge
                      key={severity.value}
                      variant={filters.severity?.includes(severity.value) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        filters.severity?.includes(severity.value)
                          ? severity.color
                          : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                      onClick={() => handleFilterChange("severity", 
                        filters.severity?.includes(severity.value)
                          ? filters.severity?.filter(s => s !== severity.value)
                          : [...(filters.severity || []), severity.value]
                      )}
                    >
                      {severity.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Xóa bộ lọc
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Tìm kiếm trong lịch sử hoạt động..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20"
        />
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Hiển thị <span className="font-semibold text-[#800020]">{filteredLogs.length}</span> trong tổng số <span className="font-semibold">{logs.length}</span> bản ghi
          </span>
          {isRealTime && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Clock className="w-3 h-3 mr-1" />
              Real-time
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Cập nhật lần cuối:</span>
          <span className="text-sm font-medium">{new Date().toLocaleTimeString('vi-VN')}</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-lg">
          <TabsTrigger 
            value="timeline" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-[#800020] data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-slate-200"
          >
            <Clock className="w-4 h-4" /> Timeline
          </TabsTrigger>
          <TabsTrigger 
            value="details" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-[#800020] data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-slate-200"
          >
            <Eye className="w-4 h-4" /> Chi tiết
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-[#800020] data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-slate-200"
          >
            <Activity className="w-4 h-4" /> Phân tích
          </TabsTrigger>
        </TabsList>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="mt-6">
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <Card key={log.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-full flex items-center justify-center text-white font-semibold">
                        {log.user_name.charAt(0)}
                      </div>
                    </div>

                    {/* Log Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant="outline" 
                          className={`${getActionColor(log.action_type)}`}
                        >
                          {getActionIcon(log.action_type)}
                          {actionTypeOptions.find(opt => opt.value === log.action_type)?.label || log.action_type}
                        </Badge>
                        
                        <Badge 
                          variant="outline" 
                          className={`${severityOptions.find(s => s.value === log.severity)?.color}`}
                        >
                          {getSeverityIcon(log.severity)}
                          {severityOptions.find(s => s.value === log.severity)?.label}
                        </Badge>

                        {log.tender_package_id && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            GT-{log.tender_package_id}
                          </Badge>
                        )}
                      </div>

                      <p className="text-gray-900 font-medium mb-2">{log.action_description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {log.user_name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDateTime(log.created_at)}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {getTimeAgo(log.created_at)}
                        </span>
                        {log.ip_address && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            IP: {log.ip_address}
                          </span>
                        )}
                      </div>

                      {/* Changed Fields */}
                      {log.changed_fields && log.changed_fields.length > 0 && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm font-medium text-blue-900 mb-2">Các trường đã thay đổi:</p>
                          <div className="flex flex-wrap gap-2">
                            {log.changed_fields.map((field) => (
                              <Badge key={field} variant="outline" className="text-xs bg-blue-100 text-blue-800 border-blue-300">
                                {field}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <Button
                        onClick={() => onViewDetails(log.id)}
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {log.action_type.includes('UPDATE') && (
                        <Button
                          onClick={() => onRollback(log.id)}
                          variant="ghost"
                          size="sm"
                          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="mt-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Chi tiết thay đổi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Eye className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Chọn một bản ghi để xem chi tiết</p>
                <p className="text-sm">Sử dụng nút "Xem chi tiết" trong timeline</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{logs.length}</h3>
                  <p className="text-gray-600">Tổng số hoạt động</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {logs.filter(log => log.severity === 'info').length}
                  </h3>
                  <p className="text-gray-600">Hoạt động bình thường</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {logs.filter(log => log.severity === 'error' || log.severity === 'critical').length}
                  </h3>
                  <p className="text-gray-600">Lỗi và cảnh báo</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Xuất báo cáo lịch sử</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Định dạng xuất
                </Label>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleExport('excel')}
                    variant="outline"
                    className="flex-1 border-green-300 hover:bg-green-50 text-green-700"
                  >
                    Excel
                  </Button>
                  <Button
                    onClick={() => handleExport('pdf')}
                    variant="outline"
                    className="flex-1 border-red-300 hover:bg-red-50 text-red-700"
                  >
                    PDF
                  </Button>
                  <Button
                    onClick={() => handleExport('csv')}
                    variant="outline"
                    className="flex-1 border-blue-300 hover:bg-blue-50 text-blue-700"
                  >
                    CSV
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowExportModal(false)}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
