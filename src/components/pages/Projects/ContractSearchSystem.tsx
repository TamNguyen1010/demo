"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Save, 
  Bookmark,
  Calendar,
  DollarSign,
  User,
  Building2,
  FileText,
  MoreHorizontal,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Contract {
  id: string
  contractCode: string
  contractName: string
  contractType: string
  contractStatus: string
  contractValue: number
  currency: string
  contractStartDate: Date
  contractEndDate: Date
  effectiveDate: Date
  completionDate?: Date
  contractManager: string
  contractSupervisor?: string
  tenderPackage: string
  project: string
  category: string
  paymentTerms: string
  cumulativePayment: number
  remainingValue: number
  progressRatio: number
  createdAt: Date
  updatedAt: Date
}

interface SavedFilter {
  id: string
  name: string
  description: string
  criteria: any
  isPublic: boolean
  isDefault: boolean
  usageCount: number
  lastUsedAt: Date
  createdAt: Date
}

interface ContractSearchSystemProps {
  projectId: string
}

export function ContractSearchSystem({ projectId }: ContractSearchSystemProps) {
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "1",
      contractCode: "HD-2024-001",
      contractName: "Hợp đồng xây dựng cầu mới",
      contractType: "service",
      contractStatus: "active",
      contractValue: 1000000000,
      currency: "VND",
      contractStartDate: new Date("2024-01-01"),
      contractEndDate: new Date("2024-12-31"),
      effectiveDate: new Date("2024-01-15"),
      contractManager: "Nguyễn Văn A",
      contractSupervisor: "Trần Thị B",
      tenderPackage: "Gói thầu xây dựng cầu",
      project: "Dự án cầu mới",
      category: "Xây dựng",
      paymentTerms: "Thanh toán theo tiến độ",
      cumulativePayment: 500000000,
      remainingValue: 500000000,
      progressRatio: 50.0,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-15")
    },
    {
      id: "2",
      contractCode: "HD-2024-002",
      contractName: "Hợp đồng cung cấp vật liệu",
      contractType: "goods",
      contractStatus: "pending",
      contractValue: 200000000,
      currency: "VND",
      contractStartDate: new Date("2024-02-01"),
      contractEndDate: new Date("2024-08-31"),
      effectiveDate: new Date("2024-02-15"),
      contractManager: "Lê Văn C",
      tenderPackage: "Gói thầu vật liệu",
      project: "Dự án cầu mới",
      category: "Cung cấp",
      paymentTerms: "Thanh toán 30 ngày",
      cumulativePayment: 0,
      remainingValue: 200000000,
      progressRatio: 0.0,
      createdAt: new Date("2024-02-01"),
      updatedAt: new Date("2024-02-01")
    }
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Contract[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    contractType: "all",
    contractStatus: "all",
    contractValueMin: "",
    contractValueMax: "",
    tenderPackage: "all",
    contractManager: "all",
    signingDateFrom: "",
    signingDateTo: "",
    effectiveDateFrom: "",
    effectiveDateTo: "",
    expiryDateFrom: "",
    expiryDateTo: ""
  })
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([
    {
      id: "1",
      name: "Hợp đồng đang hoạt động",
      description: "Tất cả hợp đồng có trạng thái active",
      criteria: { contractStatus: "active" },
      isPublic: true,
      isDefault: true,
      usageCount: 25,
      lastUsedAt: new Date("2024-01-28"),
      createdAt: new Date("2024-01-01")
    },
    {
      id: "2",
      name: "Hợp đồng giá trị cao",
      description: "Hợp đồng có giá trị > 500 triệu",
      criteria: { contractValueMin: 500000000 },
      isPublic: false,
      isDefault: false,
      usageCount: 15,
      lastUsedAt: new Date("2024-01-25"),
      createdAt: new Date("2024-01-05")
    }
  ])
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [sortField, setSortField] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'expired':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'service':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'goods':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'construction':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getProgressColor = (ratio: number) => {
    if (ratio >= 80) return 'text-green-600'
    if (ratio >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleSearch = async () => {
    setIsSearching(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Filter contracts based on search criteria
    let filtered = contracts.filter(contract => {
      const matchesQuery = searchQuery === "" || 
        contract.contractCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.contractName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.description?.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesType = selectedFilters.contractType === "all" || 
        contract.contractType === selectedFilters.contractType
      
      const matchesStatus = selectedFilters.contractStatus === "all" || 
        contract.contractStatus === selectedFilters.contractStatus
      
      const matchesValue = (!selectedFilters.contractValueMin || contract.contractValue >= Number(selectedFilters.contractValueMin)) &&
        (!selectedFilters.contractValueMax || contract.contractValue <= Number(selectedFilters.contractValueMax))
      
      const matchesManager = selectedFilters.contractManager === "all" || 
        contract.contractManager === selectedFilters.contractManager
      
      return matchesQuery && matchesType && matchesStatus && matchesValue && matchesManager
    })
    
    // Sort results
    filtered.sort((a, b) => {
      let aValue = a[sortField as keyof Contract]
      let bValue = b[sortField as keyof Contract]
      
      if (typeof aValue === 'string') aValue = aValue.toLowerCase()
      if (typeof bValue === 'string') bValue = bValue.toLowerCase()
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
    
    setSearchResults(filtered)
    setIsSearching(false)
  }

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveFilter = () => {
    const filterName = prompt("Nhập tên bộ lọc:")
    if (filterName) {
      const newFilter: SavedFilter = {
        id: Date.now().toString(),
        name: filterName,
        description: `Bộ lọc tùy chỉnh - ${new Date().toLocaleDateString('vi-VN')}`,
        criteria: selectedFilters,
        isPublic: false,
        isDefault: false,
        usageCount: 0,
        lastUsedAt: new Date(),
        createdAt: new Date()
      }
      setSavedFilters(prev => [...prev, newFilter])
    }
  }

  const handleLoadFilter = (filter: SavedFilter) => {
    setSelectedFilters(filter.criteria)
    setSelectedFilter(filter.id)
    
    // Update usage count
    setSavedFilters(prev => prev.map(f => 
      f.id === filter.id 
        ? { ...f, usageCount: f.usageCount + 1, lastUsedAt: new Date() }
        : f
    ))
  }

  const handleExportResults = () => {
    // Implement export functionality
    console.log('Exporting search results...')
  }

  const handleViewContract = (contract: Contract) => {
    console.log('Viewing contract:', contract)
  }

  useEffect(() => {
    handleSearch()
  }, [selectedFilters, sortField, sortOrder])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#800020]">Tìm kiếm & Lọc Hợp đồng</h2>
          <p className="text-gray-600">Tìm kiếm và lọc hợp đồng theo nhiều tiêu chí</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleSaveFilter}
            variant="outline"
          >
            <Save className="w-4 h-4 mr-2" />
            Lưu bộ lọc
          </Button>
          <Button 
            onClick={handleExportResults}
            className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#A00030] hover:to-[#800020]"
          >
            <Download className="w-4 h-4 mr-2" />
            Xuất kết quả
          </Button>
        </div>
      </div>

      {/* Main Search Interface */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#800020]/10">
          <TabsTrigger 
            value="basic" 
            className="data-[state=active]:bg-[#800020] data-[state=active]:text-white"
          >
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm cơ bản
          </TabsTrigger>
          <TabsTrigger 
            value="advanced" 
            className="data-[state=active]:bg-[#800020] data-[state=active]:text-white"
          >
            <Filter className="w-4 h-4 mr-2" />
            Tìm kiếm nâng cao
          </TabsTrigger>
          <TabsTrigger 
            value="saved" 
            className="data-[state=active]:bg-[#800020] data-[state=active]:text-white"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Bộ lọc đã lưu
          </TabsTrigger>
        </TabsList>

        {/* Basic Search */}
        <TabsContent value="basic" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#800020] flex items-center gap-2">
                <Search className="w-5 h-5" />
                Tìm kiếm cơ bản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="search-query">Từ khóa tìm kiếm</Label>
                  <Input
                    id="search-query"
                    placeholder="Nhập mã hợp đồng, tên hợp đồng, mô tả..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contract-type">Loại hợp đồng</Label>
                  <Select value={selectedFilters.contractType} onValueChange={(value) => handleFilterChange('contractType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả loại</SelectItem>
                      <SelectItem value="service">Dịch vụ</SelectItem>
                      <SelectItem value="goods">Hàng hóa</SelectItem>
                      <SelectItem value="construction">Xây dựng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contract-status">Trạng thái</Label>
                  <Select value={selectedFilters.contractStatus} onValueChange={(value) => handleFilterChange('contractStatus', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="active">Đang hoạt động</SelectItem>
                      <SelectItem value="pending">Chờ xử lý</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                      <SelectItem value="cancelled">Đã hủy</SelectItem>
                      <SelectItem value="expired">Hết hạn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contract-manager">Người quản lý</Label>
                  <Select value={selectedFilters.contractManager} onValueChange={(value) => handleFilterChange('contractManager', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả người quản lý</SelectItem>
                      <SelectItem value="Nguyễn Văn A">Nguyễn Văn A</SelectItem>
                      <SelectItem value="Trần Thị B">Trần Thị B</SelectItem>
                      <SelectItem value="Lê Văn C">Lê Văn C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#A00030] hover:to-[#800020]"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isSearching ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Search */}
        <TabsContent value="advanced" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#800020] flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Tìm kiếm nâng cao
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="value-min">Giá trị tối thiểu (VND)</Label>
                  <Input
                    id="value-min"
                    type="number"
                    placeholder="0"
                    value={selectedFilters.contractValueMin}
                    onChange={(e) => handleFilterChange('contractValueMin', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="value-max">Giá trị tối đa (VND)</Label>
                  <Input
                    id="value-max"
                    type="number"
                    placeholder="1000000000"
                    value={selectedFilters.contractValueMax}
                    onChange={(e) => handleFilterChange('contractValueMax', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="signing-from">Từ ngày ký</Label>
                  <Input
                    id="signing-from"
                    type="date"
                    value={selectedFilters.signingDateFrom}
                    onChange={(e) => handleFilterChange('signingDateFrom', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="signing-to">Đến ngày ký</Label>
                  <Input
                    id="signing-to"
                    type="date"
                    value={selectedFilters.signingDateTo}
                    onChange={(e) => handleFilterChange('signingDateTo', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="effective-from">Từ ngày hiệu lực</Label>
                  <Input
                    id="effective-from"
                    type="date"
                    value={selectedFilters.effectiveDateFrom}
                    onChange={(e) => handleFilterChange('effectiveDateFrom', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="effective-to">Đến ngày hiệu lực</Label>
                  <Input
                    id="effective-to"
                    type="date"
                    value={selectedFilters.effectiveDateTo}
                    onChange={(e) => handleFilterChange('effectiveDateTo', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry-from">Từ ngày hết hạn</Label>
                  <Input
                    id="expiry-from"
                    type="date"
                    value={selectedFilters.expiryDateFrom}
                    onChange={(e) => handleFilterChange('expiryDateFrom', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="expiry-to">Đến ngày hết hạn</Label>
                  <Input
                    id="expiry-to"
                    type="date"
                    value={selectedFilters.expiryDateTo}
                    onChange={(e) => handleFilterChange('expiryDateTo', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saved Filters */}
        <TabsContent value="saved" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#800020] flex items-center gap-2">
                <Bookmark className="w-5 h-5" />
                Bộ lọc đã lưu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedFilters.map((filter) => (
                  <div key={filter.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-gray-900">{filter.name}</h4>
                        {filter.isDefault && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Mặc định
                          </Badge>
                        )}
                        {filter.isPublic && (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Công khai
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{filter.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Sử dụng: {filter.usageCount} lần</span>
                        <span>Lần cuối: {filter.lastUsedAt.toLocaleDateString('vi-VN')}</span>
                        <span>Tạo: {filter.createdAt.toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLoadFilter(filter)}
                      >
                        <Bookmark className="w-4 h-4 mr-2" />
                        Sử dụng
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {savedFilters.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Bookmark className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Chưa có bộ lọc nào được lưu</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sort Options */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Sắp xếp theo:</Label>
              <Select value={sortField} onValueChange={setSortField}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Ngày tạo</SelectItem>
                  <SelectItem value="contractValue">Giá trị hợp đồng</SelectItem>
                  <SelectItem value="contractName">Tên hợp đồng</SelectItem>
                  <SelectItem value="contractCode">Mã hợp đồng</SelectItem>
                  <SelectItem value="progressRatio">Tỷ lệ hoàn thành</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Thứ tự:</Label>
              <Button
                variant={sortOrder === 'asc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortOrder('asc')}
              >
                Tăng dần
              </Button>
              <Button
                variant={sortOrder === 'desc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortOrder('desc')}
              >
                Giảm dần
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#800020] flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Kết quả Tìm kiếm ({searchResults.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {searchResults.map((contract) => (
              <div key={contract.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">{contract.contractName}</h4>
                      <Badge variant="outline" className={getTypeColor(contract.contractType)}>
                        {contract.contractType === 'service' ? 'Dịch vụ' : 
                         contract.contractType === 'goods' ? 'Hàng hóa' : 'Xây dựng'}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(contract.contractStatus)}>
                        {contract.contractStatus === 'active' ? 'Đang hoạt động' :
                         contract.contractStatus === 'pending' ? 'Chờ xử lý' :
                         contract.contractStatus === 'completed' ? 'Hoàn thành' :
                         contract.contractStatus === 'cancelled' ? 'Đã hủy' : 'Hết hạn'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Mã HĐ:</span> {contract.contractCode}
                      </div>
                      <div>
                        <span className="font-medium">Giá trị:</span> {formatCurrency(contract.contractValue)}
                      </div>
                      <div>
                        <span className="font-medium">Người QL:</span> {contract.contractManager}
                      </div>
                      <div>
                        <span className="font-medium">Tiến độ:</span> 
                        <span className={`ml-1 font-medium ${getProgressColor(contract.progressRatio)}`}>
                          {contract.progressRatio.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Ngày bắt đầu:</span> {contract.contractStartDate.toLocaleDateString('vi-VN')}
                      </div>
                      <div>
                        <span className="font-medium">Ngày kết thúc:</span> {contract.contractEndDate.toLocaleDateString('vi-VN')}
                      </div>
                      <div>
                        <span className="font-medium">Dự án:</span> {contract.project}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewContract(contract)}
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
            
            {searchResults.length === 0 && !isSearching && (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Không tìm thấy hợp đồng nào phù hợp</p>
              </div>
            )}
            
            {isSearching && (
              <div className="text-center py-8 text-gray-500">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020] mx-auto mb-4"></div>
                <p>Đang tìm kiếm...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
