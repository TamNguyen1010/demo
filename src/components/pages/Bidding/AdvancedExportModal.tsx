"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { 
  Download, 
  X, 
  Save, 
  FileSpreadsheet, 
  Settings, 
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  BarChart3,
  Calendar,
  DollarSign,
  Users,
  Globe,
  ChevronDown,
  ChevronUp
} from "lucide-react"

interface ExportColumn {
  key: string
  label: string
  category: string
  isDefault: boolean
  isRequired: boolean
}

interface ExportTemplate {
  id: number
  name: string
  description: string
  columns: string[]
  isDefault: boolean
}

interface ExportConfig {
  exportType: 'excel' | 'csv' | 'pdf'
  exportScope: 'all' | 'filtered' | 'selected'
  selectedColumns: string[]
  templateId?: number
  fileName: string
  formattingOptions: {
    headerStyle: boolean
    currencyFormat: string
    dateFormat: string
    includeCharts: boolean
  }
}

interface AdvancedExportModalProps {
  isVisible: boolean
  onClose: () => void
  onExport: (config: ExportConfig) => Promise<void>
  totalRecords: number
  filteredRecords: number
  selectedRecords: number
}

export function AdvancedExportModal({
  isVisible,
  onClose,
  onExport,
  totalRecords,
  filteredRecords,
  selectedRecords
}: AdvancedExportModalProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'templates'>('basic')
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [showColumnSelector, setShowColumnSelector] = useState(false)
  const [showFormattingOptions, setShowFormattingOptions] = useState(false)

  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    exportType: 'excel',
    exportScope: 'all',
    selectedColumns: [],
    fileName: `Bao_cao_goi_thau_${new Date().toISOString().split('T')[0]}`,
    formattingOptions: {
      headerStyle: true,
      currencyFormat: 'VND',
      dateFormat: 'dd/mm/yyyy',
      includeCharts: false
    }
  })

  const availableColumns: ExportColumn[] = [
    // Basic Information
    { key: 'package_code', label: 'Mã gói thầu', category: 'basic', isDefault: true, isRequired: true },
    { key: 'name', label: 'Tên gói thầu', category: 'basic', isDefault: true, isRequired: true },
    { key: 'description', label: 'Mô tả', category: 'basic', isDefault: false, isRequired: false },
    { key: 'project_name', label: 'Tên dự án', category: 'basic', isDefault: true, isRequired: true },
    { key: 'status', label: 'Trạng thái', category: 'basic', isDefault: true, isRequired: true },
    { key: 'tender_method', label: 'Hình thức lựa chọn', category: 'basic', isDefault: true, isRequired: true },
    
    // Financial Information
    { key: 'estimated_value', label: 'Giá trị dự kiến', category: 'financial', isDefault: true, isRequired: true },
    { key: 'winning_bid_value', label: 'Giá trúng thầu', category: 'financial', isDefault: false, isRequired: false },
    { key: 'currency', label: 'Đơn vị tiền tệ', category: 'financial', isDefault: true, isRequired: true },
    { key: 'budget_allocation', label: 'Phân bổ ngân sách', category: 'financial', isDefault: false, isRequired: false },
    
    // Timeline Information
    { key: 'start_date', label: 'Ngày bắt đầu', category: 'timeline', isDefault: true, isRequired: true },
    { key: 'end_date', label: 'Ngày kết thúc', category: 'timeline', isDefault: true, isRequired: true },
    { key: 'created_at', label: 'Ngày tạo', category: 'timeline', isDefault: false, isRequired: false },
    { key: 'updated_at', label: 'Ngày cập nhật', category: 'timeline', isDefault: false, isRequired: false },
    
    // Document Information
    { key: 'document_count', label: 'Số lượng tài liệu', category: 'documents', isDefault: false, isRequired: false },
    { key: 'document_types', label: 'Loại tài liệu', category: 'documents', isDefault: false, isRequired: false },
    { key: 'last_document_upload', label: 'Tài liệu cuối cùng', category: 'documents', isDefault: false, isRequired: false },
    
    // User Information
    { key: 'created_by_name', label: 'Người tạo', category: 'users', isDefault: false, isRequired: false },
    { key: 'assigned_to_name', label: 'Người phụ trách', category: 'users', isDefault: false, isRequired: false },
    { key: 'last_modified_by_name', label: 'Người sửa cuối', category: 'users', isDefault: false, isRequired: false },
    
    // API Integration Information
    { key: 'portal_sync_status', label: 'Trạng thái đồng bộ cổng', category: 'integration', isDefault: false, isRequired: false },
    { key: 'bitrix_workflow_status', label: 'Trạng thái workflow', category: 'integration', isDefault: false, isRequired: false },
    { key: 'api_call_count', label: 'Số lần gọi API', category: 'integration', isDefault: false, isRequired: false }
  ]

  const exportTemplates: ExportTemplate[] = [
    {
      id: 1,
      name: 'Tổng quan gói thầu',
      description: 'Template xuất thông tin cơ bản gói thầu',
      columns: ['package_code', 'name', 'project_name', 'status', 'tender_method', 'estimated_value', 'start_date', 'end_date'],
      isDefault: true
    },
    {
      id: 2,
      name: 'Chi tiết gói thầu',
      description: 'Template xuất thông tin chi tiết đầy đủ',
      columns: ['package_code', 'name', 'description', 'project_name', 'status', 'tender_method', 'estimated_value', 'winning_bid_value', 'start_date', 'end_date', 'created_by_name', 'assigned_to_name'],
      isDefault: false
    },
    {
      id: 3,
      name: 'Báo cáo tài chính',
      description: 'Template tập trung vào thông tin tài chính',
      columns: ['package_code', 'name', 'estimated_value', 'winning_bid_value', 'currency', 'budget_allocation', 'status'],
      isDefault: false
    },
    {
      id: 4,
      name: 'Theo dõi tiến độ',
      description: 'Template theo dõi tiến độ và timeline',
      columns: ['package_code', 'name', 'status', 'start_date', 'end_date', 'assigned_to_name', 'document_count'],
      isDefault: false
    }
  ]

  const getRecordCount = () => {
    switch (exportConfig.exportScope) {
      case 'all': return totalRecords
      case 'filtered': return filteredRecords
      case 'selected': return selectedRecords
      default: return 0
    }
  }

  const handleColumnToggle = (columnKey: string) => {
    setExportConfig(prev => ({
      ...prev,
      selectedColumns: prev.selectedColumns.includes(columnKey)
        ? prev.selectedColumns.filter(col => col !== columnKey)
        : [...prev.selectedColumns, columnKey]
    }))
  }

  const handleSelectAllColumns = () => {
    setExportConfig(prev => ({
      ...prev,
      selectedColumns: availableColumns.map(col => col.key)
    }))
  }

  const handleDeselectAllColumns = () => {
    setExportConfig(prev => ({
      ...prev,
      selectedColumns: availableColumns.filter(col => col.isRequired).map(col => col.key)
    }))
  }

  const handleTemplateSelect = (template: ExportTemplate) => {
    setExportConfig(prev => ({
      ...prev,
      templateId: template.id,
      selectedColumns: template.columns
    }))
  }

  const handleExport = async () => {
    if (exportConfig.selectedColumns.length === 0) {
      alert('Vui lòng chọn ít nhất một cột để xuất')
      return
    }

    setIsExporting(true)
    setExportProgress(0)

    try {
      // Simulate export progress
      const interval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 200)

      await onExport(exportConfig)
      
      setTimeout(() => {
        setIsExporting(false)
        setExportProgress(0)
        onClose()
      }, 1000)
    } catch (error) {
      console.error('Export error:', error)
      setIsExporting(false)
      setExportProgress(0)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basic': return <FileText className="w-4 h-4" />
      case 'financial': return <DollarSign className="w-4 h-4" />
      case 'timeline': return <Calendar className="w-4 h-4" />
      case 'documents': return <FileText className="w-4 h-4" />
      case 'users': return <Users className="w-4 h-4" />
      case 'integration': return <Globe className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return 'bg-blue-100 text-blue-800'
      case 'financial': return 'bg-green-100 text-green-800'
      case 'timeline': return 'bg-purple-100 text-purple-800'
      case 'documents': return 'bg-orange-100 text-orange-800'
      case 'users': return 'bg-indigo-100 text-indigo-800'
      case 'integration': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileSpreadsheet className="w-6 h-6 text-[#800020]" />
            Xuất dữ liệu gói thầu nâng cao
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('basic')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'basic'
                  ? 'bg-white text-[#800020] shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Cơ bản
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'advanced'
                  ? 'bg-white text-[#800020] shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Nâng cao
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'templates'
                  ? 'bg-white text-[#800020] shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Templates
            </button>
          </div>

          {/* Basic Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Định dạng xuất
                  </Label>
                  <select
                    value={exportConfig.exportType}
                    onChange={(e) => setExportConfig(prev => ({ ...prev, exportType: e.target.value as any }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#800020] focus:ring-[#800020]/20"
                  >
                    <option value="excel">Excel (.xlsx)</option>
                    <option value="csv">CSV (.csv)</option>
                    <option value="pdf">PDF (.pdf)</option>
                  </select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Phạm vi dữ liệu
                  </Label>
                  <select
                    value={exportConfig.exportScope}
                    onChange={(e) => setExportConfig(prev => ({ ...prev, exportScope: e.target.value as any }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#800020] focus:ring-[#800020]/20"
                  >
                    <option value="all">Tất cả gói thầu ({totalRecords})</option>
                    <option value="filtered">Đã lọc ({filteredRecords})</option>
                    <option value="selected">Đã chọn ({selectedRecords})</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tên file
                </Label>
                <Input
                  value={exportConfig.fileName}
                  onChange={(e) => setExportConfig(prev => ({ ...prev, fileName: e.target.value }))}
                  placeholder="Nhập tên file..."
                  className="border-gray-300 focus:border-[#800020] focus:ring-[#800020]/20"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#800020]">{getRecordCount()}</p>
                    <p className="text-sm text-gray-600">Bản ghi sẽ xuất</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{exportConfig.selectedColumns.length}</p>
                    <p className="text-sm text-gray-600">Cột được chọn</p>
                  </div>
                </div>
                
                <Button
                  onClick={() => setShowColumnSelector(!showColumnSelector)}
                  variant="outline"
                  className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
                >
                  {showColumnSelector ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                  Chọn cột xuất
                </Button>
              </div>

              {/* Column Selector */}
              {showColumnSelector && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Chọn cột xuất</h4>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleSelectAllColumns}
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-300 hover:bg-blue-50"
                      >
                        Chọn tất cả
                      </Button>
                      <Button
                        onClick={handleDeselectAllColumns}
                        variant="outline"
                        size="sm"
                        className="text-gray-600 border-gray-300 hover:bg-gray-50"
                      >
                        Bỏ chọn tất cả
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableColumns.map((column) => (
                      <div key={column.key} className="flex items-center space-x-2">
                        <Checkbox
                          id={column.key}
                          checked={exportConfig.selectedColumns.includes(column.key)}
                          onCheckedChange={() => handleColumnToggle(column.key)}
                          disabled={column.isRequired}
                        />
                        <Label
                          htmlFor={column.key}
                          className={`text-sm cursor-pointer ${
                            column.isRequired ? 'text-gray-500' : 'text-gray-700'
                          }`}
                        >
                          {column.label}
                          {column.isRequired && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <Badge variant="outline" className={`text-xs ${getCategoryColor(column.category)}`}>
                          {getCategoryIcon(column.category)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Advanced Tab */}
          {activeTab === 'advanced' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Tùy chọn định dạng</h4>
                <Button
                  onClick={() => setShowFormattingOptions(!showFormattingOptions)}
                  variant="outline"
                  size="sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {showFormattingOptions ? 'Ẩn' : 'Hiện'} tùy chọn
                </Button>
              </div>

              {showFormattingOptions && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Định dạng tiền tệ
                    </Label>
                    <select
                      value={exportConfig.formattingOptions.currencyFormat}
                      onChange={(e) => setExportConfig(prev => ({
                        ...prev,
                        formattingOptions: { ...prev.formattingOptions, currencyFormat: e.target.value }
                      }))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-[#800020] focus:ring-[#800020]/20"
                    >
                      <option value="VND">VND (Việt Nam Đồng)</option>
                      <option value="USD">USD (Đô la Mỹ)</option>
                      <option value="EUR">EUR (Euro)</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Định dạng ngày tháng
                    </Label>
                    <select
                      value={exportConfig.formattingOptions.dateFormat}
                      onChange={(e) => setExportConfig(prev => ({
                        ...prev,
                        formattingOptions: { ...prev.formattingOptions, dateFormat: e.target.value }
                      }))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-[#800020] focus:ring-[#800020]/20"
                    >
                      <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                      <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                      <option value="yyyy-mm-dd">yyyy-mm-dd</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="headerStyle"
                      checked={exportConfig.formattingOptions.headerStyle}
                      onCheckedChange={(checked) => setExportConfig(prev => ({
                        ...prev,
                        formattingOptions: { ...prev.formattingOptions, headerStyle: checked as boolean }
                      }))}
                    />
                    <Label htmlFor="headerStyle" className="text-sm text-gray-700">
                      Định dạng header đẹp
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeCharts"
                      checked={exportConfig.formattingOptions.includeCharts}
                      onCheckedChange={(checked) => setExportConfig(prev => ({
                        ...prev,
                        formattingOptions: { ...prev.formattingOptions, includeCharts: checked as boolean }
                      }))}
                    />
                    <Label htmlFor="includeCharts" className="text-sm text-gray-700">
                      Bao gồm biểu đồ
                    </Label>
                  </div>
                </div>
              )}

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900 mb-1">Lưu ý khi xuất dữ liệu</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Dữ liệu sẽ được xuất theo định dạng đã chọn</li>
                      <li>• Các cột bắt buộc sẽ luôn được bao gồm</li>
                      <li>• File Excel sẽ có định dạng chuyên nghiệp</li>
                      <li>• Có thể mất vài phút để xử lý file lớn</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exportTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      exportConfig.templateId === template.id
                        ? 'border-[#800020] bg-[#800020]/5'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      {template.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Mặc định
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {template.columns.length} cột
                      </span>
                      {exportConfig.templateId === template.id && (
                        <CheckCircle className="w-5 h-5 text-[#800020]" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {exportConfig.templateId && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <h5 className="font-medium text-green-900">
                        Template "{exportTemplates.find(t => t.id === exportConfig.templateId)?.name}" đã được chọn
                      </h5>
                      <p className="text-sm text-green-700">
                        {exportConfig.selectedColumns.length} cột sẽ được xuất
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Export Progress */}
          {isExporting && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <h5 className="font-medium text-blue-900">Đang xuất dữ liệu...</h5>
                  <p className="text-sm text-blue-700">Vui lòng đợi trong khi hệ thống xử lý</p>
                </div>
              </div>
              <Progress value={exportProgress} className="w-full" />
              <p className="text-sm text-blue-600 mt-2 text-center">
                {exportProgress}% hoàn thành
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={isExporting}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => setExportConfig(prev => ({ ...prev, fileName: `Bao_cao_goi_thau_${new Date().toISOString().split('T')[0]}` }))}
                variant="outline"
                disabled={isExporting}
              >
                <Save className="w-4 h-4 mr-2" />
                Lưu cấu hình
              </Button>
              
              <Button
                onClick={handleExport}
                disabled={isExporting || exportConfig.selectedColumns.length === 0}
                className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white"
              >
                {isExporting ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Đang xuất...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Xuất dữ liệu
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
