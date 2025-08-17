"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Trash2, 
  Search, 
  Filter,
  FolderOpen,
  FileImage,
  FileSpreadsheet,
  FileCode,
  AlertTriangle,
  CheckCircle,
  Clock,
  Tag,
  MoreHorizontal
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Document {
  id: string
  name: string
  originalFilename: string
  fileSize: number
  fileType: string
  mimeType: string
  category: 'contract' | 'supporting' | 'approval' | 'operational' | 'communication'
  subcategory: string
  description: string
  version: number
  isLatestVersion: boolean
  virusScanStatus: 'pending' | 'clean' | 'infected' | 'error'
  uploadedBy: string
  uploadedAt: Date
  tags: string[]
  checksum: string
}

interface DocumentManagementProps {
  projectId: string
}

export function DocumentManagement({ projectId }: DocumentManagementProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Hợp đồng gốc dự án",
      originalFilename: "hop-dong-goc.pdf",
      fileSize: 2.5,
      fileType: "pdf",
      mimeType: "application/pdf",
      category: "contract",
      subcategory: "original",
      description: "Bản hợp đồng gốc đã ký kết",
      version: 1,
      isLatestVersion: true,
      virusScanStatus: "clean",
      uploadedBy: "Nguyễn Văn A",
      uploadedAt: new Date("2024-01-15"),
      tags: ["quan trọng", "đã ký"],
      checksum: "abc123..."
    },
    {
      id: "2",
      name: "Phụ lục hợp đồng số 1",
      originalFilename: "phu-luc-1.docx",
      fileSize: 1.2,
      fileType: "docx",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      category: "contract",
      subcategory: "amendment",
      description: "Phụ lục điều chỉnh thời gian thực hiện",
      version: 1,
      isLatestVersion: true,
      virusScanStatus: "clean",
      uploadedBy: "Trần Thị B",
      uploadedAt: new Date("2024-01-20"),
      tags: ["phụ lục", "điều chỉnh"],
      checksum: "def456..."
    }
  ])

  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadMetadata, setUploadMetadata] = useState({
    category: "contract",
    subcategory: "",
    description: "",
    tags: ""
  })

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0])
    }
  }, [])

  const handleUpload = async () => {
    if (!selectedFile) return

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

    // Simulate upload completion
    setTimeout(() => {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: uploadMetadata.description || selectedFile.name,
        originalFilename: selectedFile.name,
        fileSize: selectedFile.size / (1024 * 1024), // Convert to MB
        fileType: selectedFile.name.split('.').pop() || "",
        mimeType: selectedFile.type,
        category: uploadMetadata.category as any,
        subcategory: uploadMetadata.subcategory,
        description: uploadMetadata.description,
        version: 1,
        isLatestVersion: true,
        virusScanStatus: "pending",
        uploadedBy: "Nguyễn Văn A",
        uploadedAt: new Date(),
        tags: uploadMetadata.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        checksum: "new-checksum..."
      }

      setDocuments(prev => [newDocument, ...prev])
      setIsUploading(false)
      setUploadProgress(0)
      setSelectedFile(null)
      setUploadMetadata({
        category: "contract",
        subcategory: "",
        description: "",
        tags: ""
      })
    }, 2000)
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-600" />
      case 'docx':
        return <FileText className="w-8 h-8 text-blue-600" />
      case 'xlsx':
        return <FileSpreadsheet className="w-8 h-8 text-green-600" />
      case 'jpg':
      case 'png':
        return <FileImage className="w-8 h-8 text-purple-600" />
      default:
        return <FileCode className="w-8 h-8 text-gray-600" />
    }
  }

  const getVirusScanIcon = (status: string) => {
    switch (status) {
      case 'clean':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'infected':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'contract':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'supporting':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'approval':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'operational':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'communication':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-[#800020]/5 to-[#800020]/10">
        <CardHeader>
          <CardTitle className="text-[#800020] flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Tải lên Tài liệu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="file-upload">Chọn tệp</Label>
              <Input
                id="file-upload"
                type="file"
                onChange={(e) => handleFileSelect(e.target.files)}
                accept=".pdf,.docx,.xlsx,.jpg,.png,.tiff"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="category">Phân loại</Label>
              <Select value={uploadMetadata.category} onValueChange={(value) => setUploadMetadata(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contract">Hợp đồng</SelectItem>
                  <SelectItem value="supporting">Hỗ trợ</SelectItem>
                  <SelectItem value="approval">Phê duyệt</SelectItem>
                  <SelectItem value="operational">Vận hành</SelectItem>
                  <SelectItem value="communication">Giao tiếp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subcategory">Phân loại con</Label>
              <Input
                id="subcategory"
                placeholder="Ví dụ: gốc, phụ lục, quyết định..."
                value={uploadMetadata.subcategory}
                onChange={(e) => setUploadMetadata(prev => ({ ...prev, subcategory: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="tags">Thẻ</Label>
              <Input
                id="tags"
                placeholder="Ví dụ: quan trọng, đã ký, phê duyệt..."
                value={uploadMetadata.tags}
                onChange={(e) => setUploadMetadata(prev => ({ ...prev, tags: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              placeholder="Mô tả chi tiết về tài liệu..."
              value={uploadMetadata.description}
              onChange={(e) => setUploadMetadata(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1"
              rows={3}
            />
          </div>

          {selectedFile && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Tệp đã chọn: {selectedFile.name}</p>
              <p className="text-sm text-gray-600">Kích thước: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          )}

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Đang tải lên...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#A00030] hover:to-[#800020]"
            >
              <Upload className="w-4 h-4 mr-2" />
              Tải lên
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedFile(null)
                setUploadMetadata({
                  category: "contract",
                  subcategory: "",
                  description: "",
                  tags: ""
                })
              }}
            >
              Hủy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm tài liệu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tất cả loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại</SelectItem>
                  <SelectItem value="contract">Hợp đồng</SelectItem>
                  <SelectItem value="supporting">Hỗ trợ</SelectItem>
                  <SelectItem value="approval">Phê duyệt</SelectItem>
                  <SelectItem value="operational">Vận hành</SelectItem>
                  <SelectItem value="communication">Giao tiếp</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#800020] flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            Danh sách Tài liệu ({filteredDocuments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  {getFileIcon(doc.fileType)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                    <Badge variant="outline" className={getCategoryColor(doc.category)}>
                      {doc.category}
                    </Badge>
                    {doc.isLatestVersion && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Mới nhất
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Tên gốc: {doc.originalFilename}</span>
                    <span>Kích thước: {doc.fileSize.toFixed(2)} MB</span>
                    <span>Phiên bản: {doc.version}</span>
                    <span>Ngày tải: {doc.uploadedAt.toLocaleDateString('vi-VN')}</span>
                    <span>Người tải: {doc.uploadedBy}</span>
                  </div>
                  
                  {doc.description && (
                    <p className="text-sm text-gray-600 mt-2">{doc.description}</p>
                  )}
                  
                  {doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {doc.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {getVirusScanIcon(doc.virusScanStatus)}
                    <span className="text-xs text-gray-500">
                      {doc.virusScanStatus === 'clean' && 'Sạch'}
                      {doc.virusScanStatus === 'infected' && 'Nhiễm virus'}
                      {doc.virusScanStatus === 'pending' && 'Đang kiểm tra'}
                      {doc.virusScanStatus === 'error' && 'Lỗi'}
                    </span>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredDocuments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Không tìm thấy tài liệu nào</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
