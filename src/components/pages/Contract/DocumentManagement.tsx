"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Trash2, 
  Search,
  Filter,
  Plus,
  FolderOpen,
  Image,
  FileSpreadsheet,
  FileCode,
  Archive,
  Clock,
  CheckCircle,
  AlertTriangle,
  X
} from "lucide-react"
import { Contract } from "@/types/contract"

interface ContractDocument {
  id: number
  name: string
  original_filename: string
  file_size: number
  file_type: string
  mime_type: string
  document_category: 'contract' | 'supporting' | 'approval' | 'operational' | 'communication'
  document_subcategory?: string
  description?: string
  version_number: number
  is_latest_version: boolean
  virus_scan_status: 'pending' | 'clean' | 'infected' | 'error'
  uploaded_by: number
  uploaded_at: string
  tags: string[]
}

interface DocumentManagementProps {
  contract: Contract
  isOpen: boolean
  onClose: () => void
}

export function DocumentManagement({ contract, isOpen, onClose }: DocumentManagementProps) {
  const [activeTab, setActiveTab] = useState("documents")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [documents, setDocuments] = useState<ContractDocument[]>([
    // Mock data - sẽ được thay thế bằng API call
    {
      id: 1,
      name: "Hợp đồng gốc",
      original_filename: "contract_original.pdf",
      file_size: 2048576, // 2MB
      file_type: "pdf",
      mime_type: "application/pdf",
      document_category: "contract",
      document_subcategory: "original",
      description: "Bản hợp đồng gốc đã ký",
      version_number: 1,
      is_latest_version: true,
      virus_scan_status: "clean",
      uploaded_by: 1,
      uploaded_at: "2024-01-15T10:30:00Z",
      tags: ["important", "signed"]
    },
    {
      id: 2,
      name: "Phụ lục 1 - Đặc tả kỹ thuật",
      original_filename: "technical_specs.docx",
      file_size: 1048576, // 1MB
      file_type: "docx",
      mime_type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      document_category: "supporting",
      document_subcategory: "technical",
      description: "Đặc tả kỹ thuật chi tiết",
      version_number: 1,
      is_latest_version: true,
      virus_scan_status: "clean",
      uploaded_by: 1,
      uploaded_at: "2024-01-16T14:20:00Z",
      tags: ["technical", "specs"]
    }
  ])

  const handleFileUpload = useCallback(async (files: FileList) => {
    setIsUploading(true)
    setUploadProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      setIsUploading(false)
      
      // Add new documents (mock)
      const newDocs: ContractDocument[] = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name.split('.')[0],
        original_filename: file.name,
        file_size: file.size,
        file_type: file.name.split('.').pop() || 'unknown',
        mime_type: file.type,
        document_category: 'supporting' as const,
        document_subcategory: 'other',
        description: '',
        version_number: 1,
        is_latest_version: true,
        virus_scan_status: 'pending' as const,
        uploaded_by: 1,
        uploaded_at: new Date().toISOString(),
        tags: []
      }))
      
      setDocuments(prev => [...prev, ...newDocs])
    }, 2000)
  }, [])

  const handleDeleteDocument = (documentId: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId))
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />
      case 'docx': return <FileText className="w-5 h-5 text-blue-500" />
      case 'xlsx': return <FileSpreadsheet className="w-5 h-5 text-green-500" />
      case 'jpg':
      case 'jpeg':
      case 'png': return <Image className="w-5 h-5 text-purple-500" />
      case 'zip':
      case 'rar': return <Archive className="w-5 h-5 text-orange-500" />
      default: return <FileCode className="w-5 h-5 text-gray-500" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'contract': return 'Hợp đồng'
      case 'supporting': return 'Hỗ trợ'
      case 'approval': return 'Phê duyệt'
      case 'operational': return 'Vận hành'
      case 'communication': return 'Giao tiếp'
      default: return category
    }
  }

  const getVirusScanStatusIcon = (status: string) => {
    switch (status) {
      case 'clean': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'infected': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'error': return <X className="w-4 h-4 text-gray-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.document_category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-[#800020]" />
            Quản lý Tài liệu Hợp đồng: {contract.name}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100">
              <TabsTrigger value="documents" className="data-[state=active]:bg-white data-[state=active]:text-[#800020]">
                <FileText className="w-4 h-4 mr-2" />
                Tài liệu ({documents.length})
              </TabsTrigger>
              <TabsTrigger value="upload" className="data-[state=active]:bg-white data-[state=active]:text-[#800020]">
                <Upload className="w-4 h-4 mr-2" />
                Tải lên
              </TabsTrigger>
              <TabsTrigger value="search" className="data-[state=active]:bg-white data-[state=active]:text-[#800020]">
                <Search className="w-4 h-4 mr-2" />
                Tìm kiếm
              </TabsTrigger>
            </TabsList>

            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-6">
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Tìm kiếm tài liệu..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-md"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                  >
                    <option value="all">Tất cả loại</option>
                    <option value="contract">Hợp đồng</option>
                    <option value="supporting">Hỗ trợ</option>
                    <option value="approval">Phê duyệt</option>
                    <option value="operational">Vận hành</option>
                    <option value="communication">Giao tiếp</option>
                  </select>
                </div>

                {/* Documents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getFileIcon(doc.file_type)}
                            <div>
                              <h4 className="font-medium text-slate-900 text-sm line-clamp-2">
                                {doc.name}
                              </h4>
                              <p className="text-xs text-slate-500">
                                {doc.original_filename}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {getVirusScanStatusIcon(doc.virus_scan_status)}
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">Kích thước:</span>
                            <span className="font-medium">{formatFileSize(doc.file_size)}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">Loại:</span>
                            <Badge variant="outline" className="text-xs">
                              {getCategoryLabel(doc.document_category)}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">Phiên bản:</span>
                            <span className="font-medium">v{doc.version_number}</span>
                          </div>
                        </div>

                        {doc.description && (
                          <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                            {doc.description}
                          </p>
                        )}

                        {doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {doc.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>Upload: {new Date(doc.uploaded_at).toLocaleDateString('vi-VN')}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-3 h-3 mr-1" />
                            Xem
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Download className="w-3 h-3 mr-1" />
                            Tải
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredDocuments.length === 0 && (
                  <div className="text-center py-12">
                    <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Không có tài liệu nào</h3>
                    <p className="text-slate-600">
                      {searchQuery || selectedCategory !== "all" 
                        ? "Không tìm thấy tài liệu phù hợp với bộ lọc"
                        : "Hãy tải lên tài liệu đầu tiên cho hợp đồng này"
                      }
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Upload Tab */}
            <TabsContent value="upload" className="mt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Tải lên Tài liệu</h3>
                  <p className="text-slate-600">
                    Kéo thả file hoặc click để chọn file. Hỗ trợ PDF, DOCX, XLSX, JPG, PNG, TIFF (tối đa 50MB/file)
                  </p>
                </div>

                {/* Upload Zone */}
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-[#800020] transition-colors">
                  <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-slate-900 mb-2">
                    Kéo thả file vào đây hoặc click để chọn
                  </h4>
                  <p className="text-slate-600 mb-4">
                    Hỗ trợ nhiều file cùng lúc
                  </p>
                  <Button 
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="bg-[#800020] hover:bg-[#700018] text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Chọn File
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png,.tiff"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Đang tải lên...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-[#800020] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Upload Info */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium text-slate-900 mb-2">Thông tin Upload</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Kích thước tối đa: 50MB mỗi file</li>
                    <li>• Định dạng hỗ trợ: PDF, DOCX, XLSX, JPG, PNG, TIFF</li>
                    <li>• Tất cả file sẽ được quét virus tự động</li>
                    <li>• File sẽ được mã hóa và lưu trữ an toàn</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Search Tab */}
            <TabsContent value="search" className="mt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Tìm kiếm Nâng cao</h3>
                  <p className="text-slate-600">
                    Tìm kiếm tài liệu theo nhiều tiêu chí khác nhau
                  </p>
                </div>

                {/* Advanced Search Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="search-name">Tên tài liệu</Label>
                    <Input
                      id="search-name"
                      placeholder="Nhập tên tài liệu..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="search-category">Loại tài liệu</Label>
                    <select
                      id="search-category"
                      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                    >
                      <option value="">Tất cả loại</option>
                      <option value="contract">Hợp đồng</option>
                      <option value="supporting">Hỗ trợ</option>
                      <option value="approval">Phê duyệt</option>
                      <option value="operational">Vận hành</option>
                      <option value="communication">Giao tiếp</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="search-date-from">Từ ngày</Label>
                    <Input
                      id="search-date-from"
                      type="date"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="search-date-to">Đến ngày</Label>
                    <Input
                      id="search-date-to"
                      type="date"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <Button className="bg-[#800020] hover:bg-[#700018] text-white">
                    <Search className="w-4 h-4 mr-2" />
                    Tìm kiếm
                  </Button>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Làm mới
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
