"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
  Globe,
  ChevronDown,
  ChevronUp
} from "lucide-react"

interface SearchFilters {
  query: string
  status: string[]
  tender_method: string[]
  estimated_value_range: {
    min?: number
    max?: number
  }
  date_range: {
    start?: string
    end?: string
  }
  created_by: string[]
  assigned_to: string[]
  document_type: string[]
  portal_sync_status: string[]
}

interface SavedSearch {
  id: number
  name: string
  filters: SearchFilters
  created_at: string
  is_shared: boolean
}

interface SearchAndFilterProps {
  onSearch: (filters: SearchFilters) => void
  onClearFilters: () => void
  onSaveSearch: (name: string, filters: SearchFilters) => void
  onLoadSearch: (search: SavedSearch) => void
  resultCount: number
}

export function SearchAndFilter({
  onSearch,
  onClearFilters,
  onSaveSearch,
  onLoadSearch,
  resultCount
}: SearchAndFilterProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [showSavedSearches, setShowSavedSearches] = useState(false)
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false)
  const [searchName, setSearchName] = useState("")
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    status: [],
    tender_method: [],
    estimated_value_range: {},
    date_range: {},
    created_by: [],
    assigned_to: [],
    document_type: [],
    portal_sync_status: []
  })

  const [savedSearches] = useState<SavedSearch[]>([
    {
      id: 1,
      name: "Gói thầu IT năm 2024",
      filters: {
        query: "IT",
        status: ["in_progress", "completed"],
        tender_method: ["open_tender"],
        estimated_value_range: { min: 1000000000 },
        date_range: { start: "2024-01-01", end: "2024-12-31" },
        created_by: [],
        assigned_to: [],
        document_type: [],
        portal_sync_status: []
      },
      created_at: "2024-01-15",
      is_shared: true
    },
    {
      id: 2,
      name: "Gói thầu xây dựng",
      filters: {
        query: "xây dựng",
        status: ["draft", "created"],
        tender_method: ["limited_tender"],
        estimated_value_range: {},
        date_range: {},
        created_by: [],
        assigned_to: [],
        document_type: [],
        portal_sync_status: []
      },
      created_at: "2024-01-10",
      is_shared: false
    }
  ])

  const statusOptions = [
    { value: "draft", label: "Bản nháp" },
    { value: "created", label: "Đã tạo" },
    { value: "in_progress", label: "Đang thực hiện" },
    { value: "published", label: "Đã công bố" },
    { value: "bidding", label: "Đang thầu" },
    { value: "evaluating", label: "Đang đánh giá" },
    { value: "awarded", label: "Đã trao thầu" },
    { value: "completed", label: "Hoàn thành" },
    { value: "cancelled", label: "Đã hủy" }
  ]

  const tenderMethodOptions = [
    { value: "open_tender", label: "Đấu thầu rộng rãi" },
    { value: "limited_tender", label: "Đấu thầu hạn chế" },
    { value: "direct_appointment", label: "Chỉ định thầu" },
    { value: "competitive_consultation", label: "Tư vấn cạnh tranh" }
  ]

  const documentTypeOptions = [
    { value: "approval", label: "Quyết định phê duyệt" },
    { value: "tender", label: "Hồ sơ mời thầu" },
    { value: "contract", label: "Hợp đồng" },
    { value: "report", label: "Báo cáo" }
  ]

  const portalSyncOptions = [
    { value: "synced", label: "Đã đồng bộ" },
    { value: "pending", label: "Chờ đồng bộ" },
    { value: "failed", label: "Đồng bộ thất bại" }
  ]

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleStatusToggle = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }))
  }

  const handleTenderMethodToggle = (method: string) => {
    setFilters(prev => ({
      ...prev,
      tender_method: prev.tender_method.includes(method)
        ? prev.tender_method.filter(m => m !== method)
        : [...prev.tender_method, method]
    }))
  }

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleClearFilters = () => {
    setFilters({
      query: "",
      status: [],
      tender_method: [],
      estimated_value_range: {},
      date_range: {},
      created_by: [],
      assigned_to: [],
      document_type: [],
      portal_sync_status: []
    })
    onClearFilters()
  }

  const handleSaveSearch = () => {
    if (searchName.trim()) {
      onSaveSearch(searchName.trim(), filters)
      setSearchName("")
      setShowSaveSearchModal(false)
    }
  }

  const hasActiveFilters = () => {
    return (
      filters.query ||
      filters.status.length > 0 ||
      filters.tender_method.length > 0 ||
      filters.estimated_value_range.min ||
      filters.estimated_value_range.max ||
      filters.date_range.start ||
      filters.date_range.end ||
      filters.created_by.length > 0 ||
      filters.assigned_to.length > 0 ||
      filters.document_type.length > 0 ||
      filters.portal_sync_status.length > 0
    )
  }

  return (
    <div className="space-y-4">
      {/* Basic Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Tìm kiếm theo mã gói thầu, tên gói thầu, dự án..."
                value={filters.query}
                onChange={(e) => handleFilterChange("query", e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20"
              />
            </div>
            
            <Button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              variant="outline"
              className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
            >
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc nâng cao
              {isAdvancedOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>

            <Button
              onClick={() => setShowSavedSearches(!showSavedSearches)}
              variant="outline"
              className="border-blue-500/30 hover:bg-blue-500/10 text-blue-600"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Tìm kiếm đã lưu
            </Button>

            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white px-6 py-3"
            >
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>

          {/* Result Count */}
          {resultCount > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Tìm thấy <span className="font-semibold text-[#800020]">{resultCount}</span> kết quả
              </p>
              
              {hasActiveFilters() && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Bộ lọc đang hoạt động:</span>
                  <Button
                    onClick={handleClearFilters}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Xóa tất cả
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#800020]" />
              Bộ lọc nâng cao
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Filters */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Trạng thái gói thầu
              </Label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <Badge
                    key={status.value}
                    variant={filters.status.includes(status.value) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      filters.status.includes(status.value)
                        ? "bg-[#800020] text-white"
                        : "border-gray-300 text-gray-600 hover:border-[#800020] hover:text-[#800020]"
                    }`}
                    onClick={() => handleStatusToggle(status.value)}
                  >
                    {status.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tender Method Filters */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Hình thức lựa chọn nhà thầu
              </Label>
              <div className="flex flex-wrap gap-2">
                {tenderMethodOptions.map((method) => (
                  <Badge
                    key={method.value}
                    variant={filters.tender_method.includes(method.value) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      filters.tender_method.includes(method.value)
                        ? "bg-[#800020] text-white"
                        : "border-gray-300 text-gray-600 hover:border-[#800020] hover:text-[#800020]"
                    }`}
                    onClick={() => handleTenderMethodToggle(method.value)}
                  >
                    {method.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Value Range Filter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Giá trị dự kiến (VND)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Từ"
                    value={filters.estimated_value_range.min || ""}
                    onChange={(e) => handleFilterChange("estimated_value_range", {
                      ...filters.estimated_value_range,
                      min: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="border-gray-300 focus:border-[#800020] focus:ring-[#800020]/20"
                  />
                  <span className="text-gray-500">đến</span>
                  <Input
                    type="number"
                    placeholder="Đến"
                    value={filters.estimated_value_range.max || ""}
                    onChange={(e) => handleFilterChange("estimated_value_range", {
                      ...filters.estimated_value_range,
                      max: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="border-gray-300 focus:border-[#800020] focus:ring-[#800020]/20"
                  />
                </div>
              </div>

              {/* Date Range Filter */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Khoảng thời gian
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="date"
                    value={filters.date_range.start || ""}
                    onChange={(e) => handleFilterChange("date_range", {
                      ...filters.date_range,
                      start: e.target.value
                    })}
                    className="border-gray-300 focus:border-[#800020] focus:ring-[#800020]/20"
                  />
                  <span className="text-gray-500">đến</span>
                  <Input
                    type="date"
                    value={filters.date_range.end || ""}
                    onChange={(e) => handleFilterChange("date_range", {
                      ...filters.date_range,
                      end: e.target.value
                    })}
                    className="border-gray-300 focus:border-[#800020] focus:ring-[#800020]/20"
                  />
                </div>
              </div>
            </div>

            {/* Document Type & Portal Sync Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Loại tài liệu
                </Label>
                <div className="flex flex-wrap gap-2">
                  {documentTypeOptions.map((type) => (
                    <Badge
                      key={type.value}
                      variant={filters.document_type.includes(type.value) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        filters.document_type.includes(type.value)
                          ? "bg-blue-600 text-white"
                          : "border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600"
                      }`}
                      onClick={() => handleFilterChange("document_type", 
                        filters.document_type.includes(type.value)
                          ? filters.document_type.filter(t => t !== type.value)
                          : [...filters.document_type, type.value]
                      )}
                    >
                      {type.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Trạng thái đồng bộ cổng
                </Label>
                <div className="flex flex-wrap gap-2">
                  {portalSyncOptions.map((status) => (
                    <Badge
                      key={status.value}
                      variant={filters.portal_sync_status.includes(status.value) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        filters.portal_sync_status.includes(status.value)
                          ? "bg-green-600 text-white"
                          : "border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-600"
                      }`}
                      onClick={() => handleFilterChange("portal_sync_status", 
                        filters.portal_sync_status.includes(status.value)
                          ? filters.portal_sync_status.filter(s => s !== status.value)
                          : [...filters.portal_sync_status, status.value]
                      )}
                    >
                      {status.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowSaveSearchModal(true)}
                  variant="outline"
                  className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Lưu bộ lọc
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Xóa tất cả
                </Button>
                <Button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Áp dụng bộ lọc
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Searches */}
      {showSavedSearches && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-blue-600" />
              Tìm kiếm đã lưu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => onLoadSearch(search)}
                >
                  <div className="flex items-center gap-3">
                    <Bookmark className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{search.name}</p>
                      <p className="text-sm text-gray-500">
                        Tạo ngày {new Date(search.created_at).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {search.is_shared && (
                      <Badge variant="secondary" className="text-xs">
                        Chia sẻ
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onLoadSearch(search)
                      }}
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Search Modal */}
      {showSaveSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Lưu bộ lọc tìm kiếm</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tên bộ lọc
                </Label>
                <Input
                  placeholder="Nhập tên bộ lọc..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="border-gray-300 focus:border-[#800020] focus:ring-[#800020]/20"
                />
              </div>
              
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowSaveSearchModal(false)}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleSaveSearch}
                  disabled={!searchName.trim()}
                  className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
