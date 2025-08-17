"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Calendar, 
  Filter, 
  Download, 
  Eye, 
  Clock,
  User,
  AlertTriangle,
  Info,
  CheckCircle
} from "lucide-react"
import { ActivityLog, LogFilters } from "@/types/contract"

interface ActivityLogSystemProps {
  filters: LogFilters
  onFilterChange: (filters: LogFilters) => void
  onExport: () => void
}

export function ActivityLogSystem({
  filters,
  onFilterChange,
  onExport
}: ActivityLogSystemProps) {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(false)
  const [localFilters, setLocalFilters] = useState<LogFilters>({
    date_range: { start: undefined, end: undefined },
    action: [],
    user_id: undefined,
    severity: ['info']
  })

  // Mock data for development
  useEffect(() => {
    const mockLogs: ActivityLog[] = [
      {
        id: 1,
        contract_id: 1,
        action: "create",
        description: "Tạo hợp đồng mới HD-2024-001",
        before_values: null,
        after_values: { contract_number: "HD-2024-001", name: "Hợp đồng xây dựng" },
        user_id: 3,
        user_name: "Nguyễn Văn A",
        timestamp: "2024-01-05T09:00:00",
        severity: "info",
        ip_address: "192.168.1.100",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      {
        id: 2,
        contract_id: 1,
        action: "update",
        description: "Hợp đồng đã được ký kết",
        before_values: { status: "draft" },
        after_values: { status: "active" },
        user_id: 3,
        user_name: "Nguyễn Văn A",
        timestamp: "2024-01-10T14:30:00",
        severity: "warning",
        ip_address: "192.168.1.100",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      {
        id: 3,
        contract_id: 1,
        action: "update",
        description: "Thay đổi giá trị hợp đồng từ 45 tỷ lên 50 tỷ VND",
        before_values: { value: 45000000000 },
        after_values: { value: 50000000000 },
        user_id: 4,
        user_name: "Trần Thị B",
        timestamp: "2024-01-15T11:20:00",
        severity: "error",
        ip_address: "192.168.1.101",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    ]
    setLogs(mockLogs)
    setFilteredLogs(mockLogs)
  }, [])

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "info":
        return {
          label: "Thông tin",
          className: "bg-blue-100 text-blue-800 border-blue-300"
        }
      case "warning":
        return {
          label: "Cảnh báo",
          className: "bg-amber-100 text-amber-800 border-amber-300"
        }
      case "error":
        return {
          label: "Lỗi",
          className: "bg-red-100 text-red-800 border-red-300"
        }
      default:
        return {
          label: severity,
          className: "bg-slate-100 text-slate-800 border-slate-300"
        }
    }
  }

  const getActionConfig = (action: string) => {
    switch (action) {
      case "create":
        return {
          label: "Tạo mới",
          className: "bg-green-100 text-green-800 border-green-300"
        }
      case "update":
        return {
          label: "Cập nhật",
          className: "bg-blue-100 text-blue-800 border-blue-300"
        }
      case "delete":
        return {
          label: "Xóa",
          className: "bg-red-100 text-red-800 border-red-300"
        }
      default:
        return {
          label: action,
          className: "bg-slate-100 text-slate-800 border-slate-300"
        }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN')
  }

  const handleFilterChange = (key: keyof LogFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleExport = () => {
    onExport()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#800020] mx-auto mb-2"></div>
          <p className="text-slate-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <div className="p-2 bg-[#800020]/20 rounded-lg">
            <Activity className="w-5 h-5 text-[#800020]" />
          </div>
          Lịch sử hoạt động
        </CardTitle>
        <Button
          onClick={handleExport}
          variant="outline"
          className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
        >
          <Download className="w-4 h-4 mr-2" />
          Xuất báo cáo
        </Button>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="mb-6 p-4 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#800020]" />
                Từ ngày
              </Label>
              <Input
                type="date"
                value={localFilters.date_range?.start || ""}
                onChange={(e) => handleFilterChange("date_range", { 
                  ...localFilters.date_range, 
                  start: e.target.value || undefined 
                })}
                className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#800020]" />
                Đến ngày
              </Label>
              <Input
                type="date"
                value={localFilters.date_range?.end || ""}
                onChange={(e) => handleFilterChange("date_range", { 
                  ...localFilters.date_range, 
                  end: e.target.value || undefined 
                })}
                className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-[#800020]" />
                Người dùng
              </Label>
              <Input
                type="number"
                placeholder="ID người dùng"
                value={localFilters.user_id || ""}
                onChange={(e) => handleFilterChange("user_id", e.target.value ? Number(e.target.value) : undefined)}
                className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Logs List */}
        <div className="space-y-4">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Activity className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>Không có hoạt động nào được ghi nhận</p>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <Card key={log.id} className="border border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge className={getActionConfig(log.action).className}>
                          {getActionConfig(log.action).label}
                        </Badge>
                        <Badge className={getSeverityConfig(log.severity).className}>
                          {getSeverityConfig(log.severity).label}
                        </Badge>
                        <span className="text-sm text-slate-500">
                          {formatDate(log.timestamp)}
                        </span>
                      </div>
                      
                      <div>
                        <p className="font-medium text-slate-900">{log.description}</p>
                        <p className="text-sm text-slate-600 mt-1">
                          Bởi: <span className="font-medium">{log.user_name}</span>
                        </p>
                      </div>

                      {log.before_values && log.after_values && (
                        <div className="text-sm text-slate-600">
                          <p className="font-medium mb-1">Thay đổi:</p>
                          <div className="bg-slate-50 p-2 rounded border">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="font-medium text-red-600">Trước:</span>
                                <pre className="text-xs mt-1">{JSON.stringify(log.before_values, null, 2)}</pre>
                              </div>
                              <div>
                                <span className="font-medium text-green-600">Sau:</span>
                                <pre className="text-xs mt-1">{JSON.stringify(log.after_values, null, 2)}</pre>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-[#800020]/10 text-[#800020]"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
