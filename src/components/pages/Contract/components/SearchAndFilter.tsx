"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Filter, 
  X, 
  Save, 
  Bookmark, 
  Calendar, 
  DollarSign, 
  Users, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  Building2,
  Target,
  Clock,
  AlertTriangle,
  TrendingUp,
  Settings,
  Eye,
  Download,
  RefreshCw,
  Plus,
  Minus,
  Zap
} from "lucide-react"
import { SearchFilters, SavedSearch } from "@/types/contract"
import { ContractStatus, ContractType } from "@/types/contract"

interface SearchAndFilterProps {
  onSearch: (filters: SearchFilters) => Promise<void>
  onClearFilters: () => void
  onSaveSearch: (name: string, filters: SearchFilters) => Promise<void>
  onLoadSearch: (searchId: number) => Promise<void>
  resultCount: number
  savedSearches?: SavedSearch[]
}

export function SearchAndFilter({
  onSearch,
  onClearFilters,
  onSaveSearch,
  onLoadSearch,
  resultCount,
  savedSearches = []
}: SearchAndFilterProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [searchName, setSearchName] = useState("")
  const [searchDescription, setSearchDescription] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    status: [],
    type: [],
    value_range: { min: undefined, max: undefined },
    date_range: { start: undefined, end: undefined },
    manager_id: undefined,
    contractor_id: undefined,
    client_id: undefined,
    // Thêm các tiêu chí mới theo SRS HD-5.2
    signing_date_range: { start: undefined, end: undefined },
    effective_date_range: { start: undefined, end: undefined },
    expiry_date_range: { start: undefined, end: undefined },
    created_date_range: { start: undefined, end: undefined },
    updated_date_range: { start: undefined, end: undefined },
    priority: [],
    risk_level: [],
    tags: [],
    tender_package_id: undefined,
    project_id: undefined,
    category_id: undefined,
    created_by: undefined,
    updated_by: undefined
  })

  const contractTypes: { value: ContractType; label: string }[] = [
    { value: "construction", label: "Xây dựng" },
    { value: "service", label: "Dịch vụ" },
    { value: "supply", label: "Cung cấp" },
    { value: "consulting", label: "Tư vấn" },
    { value: "other", label: "Khác" }
  ]

  const contractStatuses: { value: ContractStatus; label: string }[] = [
    { value: "draft", label: "Nháp" },
    { value: "pending_approval", label: "Chờ phê duyệt" },
    { value: "approved", label: "Đã phê duyệt" },
    { value: "active", label: "Đang thực hiện" },
    { value: "completed", label: "Hoàn thành" },
    { value: "terminated", label: "Chấm dứt" },
    { value: "cancelled", label: "Đã hủy" }
  ]

  const priorityLevels = [
    { value: "low", label: "Thấp" },
    { value: "medium", label: "Trung bình" },
    { value: "high", label: "Cao" },
    { value: "urgent", label: "Khẩn cấp" }
  ]

  const riskLevels = [
    { value: "low", label: "Thấp" },
    { value: "medium", label: "Trung bình" },
    { value: "high", label: "Cao" },
    { value: "critical", label: "Nguy hiểm" }
  ]

  const commonTags = [
    "Xây dựng", "Dịch vụ", "Cung cấp", "Tư vấn", "Nghiên cứu", 
    "Đào tạo", "Bảo trì", "Vận chuyển", "Lắp đặt", "Kiểm định"
  ]

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleStatusChange = (status: ContractStatus, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      status: checked 
        ? [...prev.status, status]
        : prev.status.filter(s => s !== status)
    }))
  }

  const handleTypeChange = (type: ContractType, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      type: checked 
        ? [...prev.type, type]
        : prev.type.filter(t => t !== type)
    }))
  }

  const handlePriorityChange = (priority: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      priority: checked 
        ? [...prev.priority, priority]
        : prev.priority.filter(p => p !== priority)
    }))
  }

  const handleRiskLevelChange = (risk: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      risk_level: checked 
        ? [...prev.risk_level, risk]
        : prev.risk_level.filter(r => r !== risk)
    }))
  }

  const handleTagChange = (tag: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      tags: checked 
        ? [...prev.tags, tag]
        : prev.tags.filter(t => t !== tag)
    }))
  }

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleClearFilters = () => {
    setFilters({
      query: "",
      status: [],
      type: [],
      value_range: { min: undefined, max: undefined },
      date_range: { start: undefined, end: undefined },
      manager_id: undefined,
      contractor_id: undefined,
      client_id: undefined,
      signing_date_range: { start: undefined, end: undefined },
      effective_date_range: { start: undefined, end: undefined },
      expiry_date_range: { start: undefined, end: undefined },
      created_date_range: { start: undefined, end: undefined },
      updated_date_range: { start: undefined, end: undefined },
      priority: [],
      risk_level: [],
      tags: [],
      tender_package_id: undefined,
      project_id: undefined,
      category_id: undefined,
      created_by: undefined,
      updated_by: undefined
    })
    onClearFilters()
  }

  const handleSaveSearch = async () => {
    if (searchName.trim()) {
      await onSaveSearch(searchName.trim(), filters)
      setShowSaveDialog(false)
      setSearchName("")
      setSearchDescription("")
      setIsPublic(false)
    }
  }

  const hasActiveFilters = () => {
    return (
      filters.query ||
      filters.status.length > 0 ||
      filters.type.length > 0 ||
      filters.value_range.min !== undefined ||
      filters.value_range.max !== undefined ||
      filters.date_range.start ||
      filters.date_range.end ||
      filters.manager_id ||
      filters.contractor_id ||
      filters.client_id ||
      filters.signing_date_range.start ||
      filters.signing_date_range.end ||
      filters.effective_date_range.start ||
      filters.effective_date_range.end ||
      filters.expiry_date_range.start ||
      filters.expiry_date_range.end ||
      filters.created_date_range.start ||
      filters.created_date_range.end ||
      filters.updated_date_range.start ||
      filters.updated_date_range.end ||
      filters.priority.length > 0 ||
      filters.risk_level.length > 0 ||
      filters.tags.length > 0 ||
      filters.tender_package_id ||
      filters.project_id ||
      filters.category_id ||
      filters.created_by ||
      filters.updated_by
    )
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.query) count++
    if (filters.status.length > 0) count++
    if (filters.type.length > 0) count++
    if (filters.value_range.min !== undefined || filters.value_range.max !== undefined) count++
    if (filters.date_range.start || filters.date_range.end) count++
    if (filters.manager_id) count++
    if (filters.contractor_id) count++
    if (filters.client_id) count++
    if (filters.signing_date_range.start || filters.signing_date_range.end) count++
    if (filters.effective_date_range.start || filters.effective_date_range.end) count++
    if (filters.expiry_date_range.start || filters.expiry_date_range.end) count++
    if (filters.created_date_range.start || filters.created_date_range.end) count++
    if (filters.updated_date_range.start || filters.updated_date_range.end) count++
    if (filters.priority.length > 0) count++
    if (filters.risk_level.length > 0) count++
    if (filters.tags.length > 0) count++
    if (filters.tender_package_id) count++
    if (filters.project_id) count++
    if (filters.category_id) count++
    if (filters.created_by) count++
    if (filters.updated_by) count++
    return count
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <div className="p-2 bg-[#800020]/20 rounded-lg">
              <Search className="h-5 w-5 text-[#800020]" />
            </div>
            Tìm kiếm và Lọc Nâng cao
            {hasActiveFilters() && (
              <Badge variant="secondary" className="ml-2 bg-[#800020]/20 text-[#800020] border-[#800020]/30">
                {resultCount} kết quả
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters() && (
              <Badge variant="outline" className="border-[#800020]/30 text-[#800020]">
                {getActiveFiltersCount()} bộ lọc
              </Badge>
            )}
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
            >
              <Filter className="h-4 w-4 mr-2" />
              {isExpanded ? 'Thu gọn' : 'Mở rộng'}
              {isExpanded ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="🔍 Tìm kiếm theo tên, số hợp đồng, mô tả, gói thầu..."
              value={filters.query}
              onChange={(e) => handleFilterChange("query", e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent text-lg"
            />
          </div>
          <Button 
            onClick={handleSearch}
            className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6"
          >
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>
          {hasActiveFilters() && (
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              className="border-red-500/30 hover:bg-red-500/10 text-red-600"
            >
              <X className="h-4 w-4 mr-2" />
              Xóa bộ lọc
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-100">
                <TabsTrigger value="basic" className="data-[state=active]:bg-white data-[state=active]:text-[#800020]">
                  <FileText className="w-4 h-4 mr-2" />
                  Cơ bản
                </TabsTrigger>
                <TabsTrigger value="financial" className="data-[state=active]:bg-white data-[state=active]:text-[#800020]">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Tài chính
                </TabsTrigger>
                <TabsTrigger value="dates" className="data-[state=active]:bg-white data-[state=active]:text-[#800020]">
                  <Calendar className="w-4 h-4 mr-2" />
                  Thời gian
                </TabsTrigger>
                <TabsTrigger value="advanced" className="data-[state=active]:bg-white data-[state=active]:text-[#800020]">
                  <Settings className="w-4 h-4 mr-2" />
                  Nâng cao
                </TabsTrigger>
              </TabsList>

              {/* Basic Tab */}
              <TabsContent value="basic" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Status Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#800020] rounded-full"></div>
                      Trạng thái Hợp đồng
                    </Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-3">
                      {contractStatuses.map((status) => (
                        <div key={status.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`status-${status.value}`}
                            checked={filters.status.includes(status.value)}
                            onCheckedChange={(checked) => handleStatusChange(status.value as ContractStatus, checked as boolean)}
                            className="text-[#800020] border-slate-300 focus:ring-[#800020]"
                          />
                          <Label htmlFor={`status-${status.value}`} className="text-sm text-slate-700 cursor-pointer">
                            {status.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#800020] rounded-full"></div>
                      Loại Hợp đồng
                    </Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-3">
                      {contractTypes.map((type) => (
                        <div key={type.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type.value}`}
                            checked={filters.type.includes(type.value)}
                            onCheckedChange={(checked) => handleTypeChange(type.value as ContractType, checked as boolean)}
                            className="text-[#800020] border-slate-300 focus:ring-[#800020]"
                          />
                          <Label htmlFor={`type-${type.value}`} className="text-sm text-slate-700 cursor-pointer">
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Priority Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#800020]" />
                      Mức độ Ưu tiên
                    </Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-3">
                      {priorityLevels.map((priority) => (
                        <div key={priority.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`priority-${priority.value}`}
                            checked={filters.priority.includes(priority.value)}
                            onCheckedChange={(checked) => handlePriorityChange(priority.value, checked as boolean)}
                            className="text-[#800020] border-slate-300 focus:ring-[#800020]"
                          />
                          <Label htmlFor={`priority-${priority.value}`} className="text-sm text-slate-700 cursor-pointer">
                            {priority.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risk Level Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#800020]" />
                      Mức độ Rủi ro
                    </Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-3">
                      {riskLevels.map((risk) => (
                        <div key={risk.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`risk-${risk.value}`}
                            checked={filters.risk_level.includes(risk.value)}
                            onCheckedChange={(checked) => handleRiskLevelChange(risk.value, checked as boolean)}
                            className="text-[#800020] border-slate-300 focus:ring-[#800020]"
                          />
                          <Label htmlFor={`risk-${risk.value}`} className="text-sm text-slate-700 cursor-pointer">
                            {risk.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#800020]" />
                      Thẻ (Tags)
                    </Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-3">
                      {commonTags.map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tag-${tag}`}
                            checked={filters.tags.includes(tag)}
                            onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
                            className="text-[#800020] border-slate-300 focus:ring-[#800020]"
                          />
                          <Label htmlFor={`tag-${tag}`} className="text-sm text-slate-700 cursor-pointer">
                            {tag}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Users Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#800020]" />
                      Người dùng
                    </Label>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-slate-600">Người quản lý</Label>
                        <Input
                          type="number"
                          placeholder="ID người quản lý"
                          value={filters.manager_id || ""}
                          onChange={(e) => handleFilterChange("manager_id", e.target.value ? Number(e.target.value) : undefined)}
                          className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-600">Người tạo</Label>
                        <Input
                          type="number"
                          placeholder="ID người tạo"
                          value={filters.created_by || ""}
                          onChange={(e) => handleFilterChange("created_by", e.target.value ? Number(e.target.value) : undefined)}
                          className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Financial Tab */}
              <TabsContent value="financial" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Value Range Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#800020]" />
                      Khoảng Giá trị Hợp đồng
                    </Label>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        placeholder="Từ (VNĐ)"
                        value={filters.value_range.min || ""}
                        onChange={(e) => handleFilterChange("value_range", { 
                          ...filters.value_range, 
                          min: e.target.value ? Number(e.target.value) : undefined 
                        })}
                        className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                      />
                      <Input
                        type="number"
                        placeholder="Đến (VNĐ)"
                        value={filters.value_range.max || ""}
                        onChange={(e) => handleFilterChange("value_range", { 
                          ...filters.value_range, 
                          max: e.target.value ? Number(e.target.value) : undefined 
                        })}
                        className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Project & Tender Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#800020]" />
                      Dự án & Gói thầu
                    </Label>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-slate-600">Gói thầu</Label>
                        <Input
                          type="number"
                          placeholder="ID gói thầu"
                          value={filters.tender_package_id || ""}
                          onChange={(e) => handleFilterChange("tender_package_id", e.target.value ? Number(e.target.value) : undefined)}
                          className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-600">Dự án</Label>
                        <Input
                          type="number"
                          placeholder="ID dự án"
                          value={filters.project_id || ""}
                          onChange={(e) => handleFilterChange("project_id", e.target.value ? Number(e.target.value) : undefined)}
                          className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Parties Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#800020]" />
                      Các bên liên quan
                    </Label>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-slate-600">Nhà thầu</Label>
                        <Input
                          type="number"
                          placeholder="ID nhà thầu"
                          value={filters.contractor_id || ""}
                          onChange={(e) => handleFilterChange("contractor_id", e.target.value ? Number(e.target.value) : undefined)}
                          className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-600">Khách hàng</Label>
                        <Input
                          type="number"
                          placeholder="ID khách hàng"
                          value={filters.client_id || ""}
                          onChange={(e) => handleFilterChange("client_id", e.target.value ? Number(e.target.value) : undefined)}
                          className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Dates Tab */}
              <TabsContent value="dates" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Contract Dates */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#800020]" />
                      Thời gian Hợp đồng
                    </Label>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-slate-600">Ngày bắt đầu</Label>
                        <div className="flex gap-2">
                          <Input
                            type="date"
                            value={filters.date_range.start || ""}
                            onChange={(e) => handleFilterChange("date_range", { 
                              ...filters.date_range, 
                              start: e.target.value ? new Date(e.target.value) : undefined 
                            })}
                            className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                          />
                          <Input
                            type="date"
                            value={filters.date_range.end || ""}
                            onChange={(e) => handleFilterChange("date_range", { 
                              ...filters.date_range, 
                              end: e.target.value ? new Date(e.target.value) : undefined 
                            })}
                            className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Signing Dates */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#800020]" />
                      Ngày Ký kết
                    </Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          type="date"
                          value={filters.signing_date_range.start || ""}
                          onChange={(e) => handleFilterChange("signing_date_range", { 
                            ...filters.signing_date_range, 
                            start: e.target.value ? new Date(e.target.value) : undefined 
                          })}
                          className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        />
                        <Input
                          type="date"
                          value={filters.signing_date_range.end || ""}
                          onChange={(e) => handleFilterChange("signing_date_range", { 
                            ...filters.signing_date_range, 
                            end: e.target.value ? new Date(e.target.value) : undefined 
                          })}
                          className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Effective & Expiry Dates */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#800020]" />
                      Hiệu lực & Hết hạn
                    </Label>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-slate-600">Ngày hiệu lực</Label>
                        <div className="flex gap-2">
                          <Input
                            type="date"
                            value={filters.effective_date_range.start || ""}
                            onChange={(e) => handleFilterChange("effective_date_range", { 
                              ...filters.effective_date_range, 
                              start: e.target.value ? new Date(e.target.value) : undefined 
                            })}
                            className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                          />
                          <Input
                            type="date"
                            value={filters.effective_date_range.end || ""}
                            onChange={(e) => handleFilterChange("effective_date_range", { 
                              ...filters.effective_date_range, 
                              end: e.target.value ? new Date(e.target.value) : undefined 
                            })}
                            className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-slate-600">Ngày hết hạn</Label>
                        <div className="flex gap-2">
                          <Input
                            type="date"
                            value={filters.expiry_date_range.start || ""}
                            onChange={(e) => handleFilterChange("expiry_date_range", { 
                              ...filters.expiry_date_range, 
                              start: e.target.value ? new Date(e.target.value) : undefined 
                            })}
                            className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                          />
                          <Input
                            type="date"
                            value={filters.expiry_date_range.end || ""}
                            onChange={(e) => handleFilterChange("expiry_date_range", { 
                              ...filters.expiry_date_range, 
                              end: e.target.value ? new Date(e.target.value) : undefined 
                            })}
                            className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Dates */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#800020]" />
                      Thời gian Hệ thống
                    </Label>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-slate-600">Ngày tạo</Label>
                        <div className="flex gap-2">
                          <Input
                            type="date"
                            value={filters.created_date_range.start || ""}
                            onChange={(e) => handleFilterChange("created_date_range", { 
                              ...filters.created_date_range, 
                              start: e.target.value ? new Date(e.target.value) : undefined 
                            })}
                            className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                          />
                          <Input
                            type="date"
                            value={filters.created_date_range.end || ""}
                            onChange={(e) => handleFilterChange("created_date_range", { 
                              ...filters.created_date_range, 
                              end: e.target.value ? new Date(e.target.value) : undefined 
                            })}
                            className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-slate-600">Ngày cập nhật</Label>
                        <div className="flex gap-2">
                          <Input
                            type="date"
                            value={filters.updated_date_range.start || ""}
                            onChange={(e) => handleFilterChange("updated_date_range", { 
                              ...filters.updated_date_range, 
                              start: e.target.value ? new Date(e.target.value) : undefined 
                            })}
                            className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                          />
                          <Input
                            type="date"
                            value={filters.updated_date_range.end || ""}
                            onChange={(e) => handleFilterChange("updated_date_range", { 
                              ...filters.updated_date_range, 
                              end: e.target.value ? new Date(e.target.value) : undefined 
                            })}
                            className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Advanced Tab */}
              <TabsContent value="advanced" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#800020]" />
                      Danh mục
                    </Label>
                    <Input
                      type="number"
                      placeholder="ID danh mục"
                      value={filters.category_id || ""}
                      onChange={(e) => handleFilterChange("category_id", e.target.value ? Number(e.target.value) : undefined)}
                      className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                    />
                  </div>

                  {/* Updated By Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#800020]" />
                      Người cập nhật
                    </Label>
                    <Input
                      type="number"
                      placeholder="ID người cập nhật"
                      value={filters.updated_by || ""}
                      onChange={(e) => handleFilterChange("updated_by", e.target.value ? Number(e.target.value) : undefined)}
                      className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                    />
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#800020]" />
                      Thao tác Nhanh
                    </Label>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            status: ['active'],
                            priority: ['high', 'urgent']
                          }))
                        }}
                        className="w-full border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
                      >
                        <AlertTriangle className="w-3 h-3 mr-2" />
                        Hợp đồng Ưu tiên
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            status: ['active'],
                            risk_level: ['high', 'critical']
                          }))
                        }}
                        className="w-full border-red-500/30 hover:bg-red-500/10 text-red-600"
                      >
                        <AlertTriangle className="w-3 h-3 mr-2" />
                        Rủi ro Cao
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-slate-200">
              <Button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8"
              >
                <Search className="h-4 w-4 mr-2" />
                Áp dụng Bộ lọc
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowSaveDialog(true)}
                className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020] px-6"
              >
                <Save className="h-4 w-4 mr-2" />
                Lưu Bộ lọc
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
                className="border-slate-300 hover:bg-slate-50 text-slate-600 px-6"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Đặt lại
              </Button>
            </div>
          </div>
        )}

        {/* Saved Searches */}
        {savedSearches.length > 0 && (
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#800020]" />
                Bộ lọc đã lưu ({savedSearches.length})
              </Label>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[#800020] hover:bg-[#800020]/10"
              >
                <Eye className="w-3 h-3 mr-1" />
                Xem tất cả
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {savedSearches.slice(0, 5).map((search) => (
                <Button
                  key={search.id}
                  variant="outline"
                  size="sm"
                  onClick={() => onLoadSearch(search.id)}
                  className="text-xs border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
                >
                  <Bookmark className="h-3 w-3 mr-1" />
                  {search.name}
                </Button>
              ))}
              {savedSearches.length > 5 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  +{savedSearches.length - 5} khác
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>

      {/* Save Search Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl border border-slate-200">
            <h3 className="text-lg font-semibold mb-4 text-slate-900 flex items-center gap-2">
              <Save className="w-5 h-5 text-[#800020]" />
              Lưu Bộ lọc
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Tên bộ lọc *</Label>
                <Input
                  placeholder="Ví dụ: Hợp đồng Xây dựng Ưu tiên"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Mô tả</Label>
                <Input
                  placeholder="Mô tả ngắn về bộ lọc này"
                  value={searchDescription}
                  onChange={(e) => setSearchDescription(e.target.value)}
                  className="border-slate-300 focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPublic"
                  checked={isPublic}
                  onCheckedChange={(checked) => setIsPublic(checked as boolean)}
                  className="text-[#800020] border-slate-300 focus:ring-[#800020]"
                />
                <Label htmlFor="isPublic" className="text-sm text-slate-700 cursor-pointer">
                  Chia sẻ công khai
                </Label>
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowSaveDialog(false)}
                className="border-slate-300 hover:bg-slate-50"
              >
                Hủy
              </Button>
              <Button 
                onClick={handleSaveSearch} 
                disabled={!searchName.trim()}
                className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Save className="h-4 w-4 mr-2" />
                Lưu
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
