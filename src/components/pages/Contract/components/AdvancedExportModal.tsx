"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { 
  Download, 
  FileText, 
  Table, 
  BarChart3, 
  Calendar, 
  DollarSign,
  Users,
  Building2,
  X,
  Check
} from "lucide-react"
import { ExportConfig, ExportColumn, ExportTemplate, Contract } from "@/types/contract"

interface AdvancedExportModalProps {
  isOpen: boolean
  onClose: () => void
  onExport: (config: ExportConfig) => Promise<void>
  contracts: Contract[]
}

const defaultColumns: ExportColumn[] = [
  { key: "contract_number", label: "Số hợp đồng", category: "basic", selected: true },
  { key: "name", label: "Tên hợp đồng", category: "basic", selected: true },
  { key: "type", label: "Loại hợp đồng", category: "basic", selected: true },
  { key: "status", label: "Trạng thái", category: "basic", selected: true },
  { key: "value", label: "Giá trị", category: "financial", selected: true },
  { key: "currency", label: "Tiền tệ", category: "financial", selected: true },
  { key: "start_date", label: "Ngày bắt đầu", category: "timeline", selected: true },
  { key: "end_date", label: "Ngày kết thúc", category: "timeline", selected: true },
  { key: "manager_name", label: "Người quản lý", category: "people", selected: true },
  { key: "contractor_name", label: "Nhà thầu", category: "people", selected: true },
  { key: "client_name", label: "Khách hàng", category: "people", selected: true },
  { key: "description", label: "Mô tả", category: "details", selected: false },
  { key: "progress", label: "Tiến độ", category: "details", selected: false },
  { key: "created_at", label: "Ngày tạo", category: "timeline", selected: false },
  { key: "updated_at", label: "Ngày cập nhật", category: "timeline", selected: false }
]

export function AdvancedExportModal({
  isOpen,
  onClose,
  onExport,
  contracts
}: AdvancedExportModalProps) {
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    format: "excel",
    data_scope: "all",
    columns: defaultColumns,
    template: undefined
  })
  
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [showTemplates, setShowTemplates] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)
    
    try {
      // Simulate progress
      const interval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + 10
        })
      }, 200)
      
      await onExport(exportConfig)
      
      setExportProgress(100)
      setTimeout(() => {
        setIsExporting(false)
        setExportProgress(0)
        onClose()
      }, 1000)
    } catch (error) {
      setIsExporting(false)
      setExportProgress(0)
      console.error("Export failed:", error)
    }
  }

  const handleColumnToggle = (columnKey: string, checked: boolean) => {
    setExportConfig(prev => ({
      ...prev,
      columns: prev.columns.map(col => 
        col.key === columnKey ? { ...col, selected: checked } : col
      )
    }))
  }

  const handleSelectAllColumns = (category: string, checked: boolean) => {
    setExportConfig(prev => ({
      ...prev,
      columns: prev.columns.map(col => 
        col.category === category ? { ...col, selected: checked } : col
      )
    }))
  }

  const getDataScopeCount = () => {
    switch (exportConfig.data_scope) {
      case "all":
        return contracts.length
      case "filtered":
        return contracts.length // This would be filtered count in real app
      case "selected":
        return 0 // This would be selected count in real app
      default:
        return 0
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "basic":
        return <FileText className="w-4 h-4" />
      case "financial":
        return <DollarSign className="w-4 h-4" />
      case "timeline":
        return <Calendar className="w-4 h-4" />
      case "people":
        return <Users className="w-4 h-4" />
      case "details":
        return <Table className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "basic":
        return "Thông tin cơ bản"
      case "financial":
        return "Thông tin tài chính"
      case "timeline":
        return "Thời gian"
      case "people":
        return "Nhân sự"
      case "details":
        return "Chi tiết"
      default:
        return category
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <div className="p-2 bg-[#800020]/20 rounded-lg">
              <Download className="w-5 h-5 text-[#800020]" />
            </div>
            Xuất dữ liệu nâng cao
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Format Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">Định dạng xuất</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "excel", label: "Excel", icon: FileText },
                  { value: "csv", label: "CSV", icon: Table },
                  { value: "pdf", label: "PDF", icon: BarChart3 }
                ].map((format) => (
                  <button
                    key={format.value}
                    onClick={() => setExportConfig(prev => ({ ...prev, format: format.value as any }))}
                    className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                      exportConfig.format === format.value
                        ? 'border-[#800020] bg-[#800020]/10 text-[#800020]'
                        : 'border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <format.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{format.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Data Scope Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">Phạm vi dữ liệu</Label>
              <div className="space-y-2">
                {[
                  { value: "all", label: "Tất cả hợp đồng", count: contracts.length },
                  { value: "filtered", label: "Kết quả lọc", count: contracts.length },
                  { value: "selected", label: "Đã chọn", count: 0 }
                ].map((scope) => (
                  <label key={scope.value} className="flex items-center space-x-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="data_scope"
                      value={scope.value}
                      checked={exportConfig.data_scope === scope.value}
                      onChange={(e) => setExportConfig(prev => ({ ...prev, data_scope: e.target.value as any }))}
                      className="w-4 h-4 text-[#800020] border-slate-300 focus:ring-[#800020]"
                    />
                    <span className="text-sm text-slate-700">{scope.label}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {scope.count}
                    </Badge>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Column Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-slate-700">Chọn cột xuất</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const allSelected = exportConfig.columns.every(col => col.selected)
                  exportConfig.columns.forEach(col => {
                    handleColumnToggle(col.key, !allSelected)
                  })
                }}
                className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
              >
                {exportConfig.columns.every(col => col.selected) ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from(new Set(exportConfig.columns.map(col => col.category))).map(category => (
                <div key={category} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      {getCategoryIcon(category)}
                      {getCategoryLabel(category)}
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const categoryColumns = exportConfig.columns.filter(col => col.category === category)
                        const allSelected = categoryColumns.every(col => col.selected)
                        handleSelectAllColumns(category, !allSelected)
                      }}
                      className="text-xs text-[#800020] hover:bg-[#800020]/10"
                    >
                      {exportConfig.columns.filter(col => col.category === category).every(col => col.selected) 
                        ? 'Bỏ chọn' 
                        : 'Chọn tất cả'
                      }
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {exportConfig.columns
                      .filter(col => col.category === category)
                      .map(column => (
                        <label key={column.key} className="flex items-center space-x-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                          <Checkbox
                            checked={column.selected}
                            onCheckedChange={(checked) => handleColumnToggle(column.key, checked as boolean)}
                            className="text-[#800020] border-slate-300 focus:ring-[#800020]"
                          />
                          <span className="text-sm text-slate-700">{column.label}</span>
                        </label>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Progress */}
          {isExporting && (
            <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Đang xuất dữ liệu...</span>
                <span className="font-medium text-[#800020]">{exportProgress}%</span>
              </div>
              <Progress value={exportProgress} className="h-2" />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <Button variant="outline" onClick={onClose} disabled={isExporting}>
              Hủy
            </Button>
            <Button 
              onClick={handleExport} 
              disabled={isExporting || getDataScopeCount() === 0}
              className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Đang xuất...' : 'Xuất dữ liệu'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
