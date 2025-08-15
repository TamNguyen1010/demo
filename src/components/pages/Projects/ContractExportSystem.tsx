"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  FileDown,
  Settings,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Mail,
  Calendar,
  Filter,
  Save,
  RefreshCw,
  MoreHorizontal,
  Play,
  Pause,
  Stop
} from "lucide-react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ExportTemplate {
  id: string
  name: string
  description: string
  type: 'basic' | 'financial' | 'management' | 'custom'
  config: {
    sheets: string[]
    columns: string[]
    includeFormatting: boolean
    includeCharts: boolean
  }
  isDefault: boolean
  isPublic: boolean
  createdBy: string
  createdAt: Date
  usageCount: number
}

interface ExportHistory {
  id: string
  exportName: string
  exportType: 'excel' | 'csv' | 'pdf'
  exportScope: 'all' | 'selected' | 'filtered' | 'search'
  recordCount: number
  fileSize: number
  exportStatus: 'pending' | 'processing' | 'completed' | 'failed'
  errorMessage?: string
  startedAt: Date
  completedAt?: Date
  downloadUrl?: string
}

interface ExportSchedule {
  id: string
  scheduleName: string
  description: string
  exportCriteria: any
  scheduleFrequency: 'daily' | 'weekly' | 'monthly'
  scheduleTime: string
  scheduleDay?: string
  isActive: boolean
  lastRunAt?: Date
  nextRunAt?: Date
  createdAt: Date
}

interface ContractExportSystemProps {
  projectId: string
}

export function ContractExportSystem({ projectId }: ContractExportSystemProps) {
  const [exportTemplates, setExportTemplates] = useState<ExportTemplate[]>([
    {
      id: "1",
      name: "Template Cơ bản",
      description: "Template xuất thông tin cơ bản hợp đồng",
      type: "basic",
      config: {
        sheets: ["Contracts"],
        columns: ["contract_code", "contract_name", "contract_type", "contract_status", "contract_value", "contract_manager"],
        includeFormatting: true,
        includeCharts: false
      },
      isDefault: true,
      isPublic: true,
      createdBy: "System",
      createdAt: new Date("2024-01-01"),
      usageCount: 150
    }
  ])

  const [exportHistory, setExportHistory] = useState<ExportHistory[]>([
    {
      id: "1",
      exportName: "Xuất hợp đồng tháng 1/2024",
      exportType: "excel",
      exportScope: "filtered",
      recordCount: 150,
      fileSize: 2.5,
      exportStatus: "completed",
      startedAt: new Date("2024-01-28T09:00:00"),
      completedAt: new Date("2024-01-28T09:05:00"),
      downloadUrl: "/downloads/contracts-2024-01.xlsx"
    }
  ])

  const [selectedTemplate, setSelectedTemplate] = useState<string>("1")
  const [exportType, setExportType] = useState<'excel' | 'csv' | 'pdf'>('excel')
  const [exportScope, setExportScope] = useState<'all' | 'selected' | 'filtered' | 'search'>('filtered')
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "contract_code", "contract_name", "contract_type", "contract_status", "contract_value"
  ])
  const [includeFormatting, setIncludeFormatting] = useState(true)
  const [includeCharts, setIncludeCharts] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const availableColumns = [
    { key: "contract_code", name: "Mã hợp đồng", description: "Contract code" },
    { key: "contract_name", name: "Tên hợp đồng", description: "Contract name" },
    { key: "contract_type", name: "Loại hợp đồng", description: "Contract type" },
    { key: "contract_status", name: "Trạng thái", description: "Contract status" },
    { key: "contract_value", name: "Giá trị hợp đồng", description: "Contract value" }
  ]

  const handleColumnToggle = (columnKey: string) => {
    setSelectedColumns(prev => 
      prev.includes(columnKey) 
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    )
  }

  const handleExport = async () => {
    if (selectedColumns.length === 0) {
      alert('Vui lòng chọn ít nhất một cột để xuất')
      return
    }

    setIsExporting(true)
    setExportProgress(0)
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          setExportProgress(0)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#800020]">Xuất Dữ liệu Hợp đồng</h2>
          <p className="text-gray-600">Xuất dữ liệu hợp đồng ra Excel, CSV hoặc PDF</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setSelectedColumns(availableColumns.map(col => col.key))}
            variant="outline"
          >
            <Eye className="w-4 h-4 mr-2" />
            Xem trước
          </Button>
          <Button 
            onClick={handleExport}
            disabled={isExporting || selectedColumns.length === 0}
            className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#A00030] hover:to-[#800020]"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'Đang xuất...' : 'Xuất dữ liệu'}
          </Button>
        </div>
      </div>

      {/* Export Progress */}
      {isExporting && (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#800020]/5 to-[#800020]/10">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#800020]">Đang xuất dữ liệu...</h3>
                <span className="text-sm text-gray-600">{exportProgress}%</span>
              </div>
              <Progress value={exportProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Export Interface */}
      <Tabs defaultValue="export" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#800020]/10">
          <TabsTrigger value="export" className="data-[state=active]:bg-[#800020] data-[state=active]:text-white">
            <Download className="w-4 h-4 mr-2" />
            Xuất dữ liệu
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-[#800020] data-[state=active]:text-white">
            <FileText className="w-4 h-4 mr-2" />
            Template
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-[#800020] data-[state=active]:text-white">
            <Clock className="w-4 h-4 mr-2" />
            Lịch sử
          </TabsTrigger>
        </TabsList>

        {/* Export Configuration */}
        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Export Options */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#800020] flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Tùy chọn Xuất
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="export-type">Định dạng xuất</Label>
                  <Select value={exportType} onValueChange={(value: any) => setExportType(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                      <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="export-scope">Phạm vi xuất</Label>
                  <Select value={exportScope} onValueChange={(value: any) => setExportScope(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả hợp đồng</SelectItem>
                      <SelectItem value="selected">Hợp đồng đã chọn</SelectItem>
                      <SelectItem value="filtered">Theo bộ lọc hiện tại</SelectItem>
                      <SelectItem value="search">Kết quả tìm kiếm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-formatting" 
                      checked={includeFormatting}
                      onCheckedChange={(checked) => setIncludeFormatting(checked as boolean)}
                    />
                    <Label htmlFor="include-formatting">Bao gồm định dạng</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-charts" 
                      checked={includeCharts}
                      onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
                    />
                    <Label htmlFor="include-charts">Bao gồm biểu đồ</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Column Selection */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#800020] flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Chọn Cột Xuất
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {availableColumns.map((column) => (
                    <div key={column.key} className="flex items-center space-x-2">
                      <Checkbox 
                        id={column.key} 
                        checked={selectedColumns.includes(column.key)}
                        onCheckedChange={() => handleColumnToggle(column.key)}
                      />
                      <Label htmlFor={column.key} className="text-sm">
                        {column.name}
                        <span className="text-gray-500 ml-2">({column.description})</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Export Templates */}
        <TabsContent value="templates" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#800020] flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Template Xuất
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exportTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{template.name}</h4>
                          {template.isDefault && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              Mặc định
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(template.id)
                        setSelectedColumns(template.config.columns)
                      }}
                    >
                      Sử dụng
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Export History */}
        <TabsContent value="history" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#800020] flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Lịch sử Xuất
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exportHistory.map((exportRecord) => (
                  <div key={exportRecord.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{exportRecord.exportName}</h4>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                            Hoàn thành
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          Định dạng: {exportRecord.exportType.toUpperCase()} | 
                          Bản ghi: {exportRecord.recordCount} | 
                          Kích thước: {exportRecord.fileSize} MB
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileDown className="w-4 h-4 mr-2" />
                      Tải xuống
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
