"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Trash2, 
  Search,
  Filter,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  File,
  Image,
  Archive,
  FileSpreadsheet,
  FileType
} from "lucide-react"
import { BiddingPackage } from "@/types/bidding"

interface DocumentManagementFormProps {
  biddingPackage: BiddingPackage
  onClose: () => void
}

interface TenderDocument {
  id: number
  file_name: string
  original_name: string
  file_size: number
  file_type: string
  mime_type: string
  document_category: 'approval' | 'tender' | 'contract' | 'other'
  document_type: string
  description: string
  tags: string[]
  version: number
  uploaded_by: string
  uploaded_at: string
}

interface DocumentCategory {
  id: number
  category_name: string
  category_code: string
  description: string
  is_required: boolean
  max_files: number
  allowed_file_types: string[]
  sort_order: number
}

const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  {
    id: 1,
    category_name: 'Quyết định phê duyệt',
    category_code: 'approval_decisions',
    description: 'Các quyết định phê duyệt liên quan đến gói thầu',
    is_required: true,
    max_files: 5,
    allowed_file_types: ['pdf', 'docx'],
    sort_order: 1
  },
  {
    id: 2,
    category_name: 'Hồ sơ mời thầu',
    category_code: 'tender_documents',
    description: 'Hồ sơ mời thầu và tài liệu liên quan',
    is_required: true,
    max_files: 10,
    allowed_file_types: ['pdf', 'docx', 'xlsx'],
    sort_order: 2
  },
  {
    id: 3,
    category_name: 'Hợp đồng',
    category_code: 'contract_documents',
    description: 'Hợp đồng và phụ lục',
    is_required: true,
    max_files: 5,
    allowed_file_types: ['pdf', 'docx'],
    sort_order: 3
  },
  {
    id: 4,
    category_name: 'Báo cáo đánh giá',
    category_code: 'evaluation_reports',
    description: 'Báo cáo đánh giá nhà thầu',
    is_required: false,
    max_files: 10,
    allowed_file_types: ['pdf', 'docx', 'xlsx'],
    sort_order: 4
  },
  {
    id: 5,
    category_name: 'Biên bản',
    category_code: 'meeting_minutes',
    description: 'Biên bản họp và mở thầu',
    is_required: false,
    max_files: 5,
    allowed_file_types: ['pdf', 'docx'],
    sort_order: 5
  },
  {
    id: 6,
    category_name: 'Tài liệu khác',
    category_code: 'other_documents',
    description: 'Các tài liệu khác',
    is_required: false,
    max_files: 20,
    allowed_file_types: ['pdf', 'docx', 'xlsx', 'jpg', 'png'],
    sort_order: 6
  }
]

// Mock documents data
const MOCK_DOCUMENTS: TenderDocument[] = [
  {
    id: 1,
    file_name: 'quyet_dinh_phe_duyet_hsmt.pdf',
    original_name: 'Quyết định phê duyệt HSMT.pdf',
    file_size: 2048576,
    file_type: 'pdf',
    mime_type: 'application/pdf',
    document_category: 'approval',
    document_type: 'Quyết định phê duyệt',
    description: 'Quyết định phê duyệt hồ sơ mời thầu gói thầu xây dựng trụ sở chính',
    tags: ['phê duyệt', 'HSMT', 'xây dựng'],
    version: 1,
    uploaded_by: 'Nguyễn Văn A',
    uploaded_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    file_name: 'ho_so_moi_thau.docx',
    original_name: 'Hồ sơ mời thầu.docx',
    file_size: 1048576,
    file_type: 'docx',
    mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    document_category: 'tender',
    document_type: 'Hồ sơ mời thầu',
    description: 'Hồ sơ mời thầu chi tiết cho gói thầu xây dựng trụ sở chính',
    tags: ['HSMT', 'xây dựng', 'trụ sở'],
    version: 2,
    uploaded_by: 'Trần Thị B',
    uploaded_at: '2024-01-16T14:20:00Z'
  }
]

export function DocumentManagementForm({ 
  biddingPackage, 
  onClose 
}: DocumentManagementFormProps) {
  const [documents, setDocuments] = useState<TenderDocument[]>(MOCK_DOCUMENTS)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFileType, setSelectedFileType] = useState<string>('all')
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    category: '',
    description: '',
    tags: '',
    version: '1.0'
  })
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredDocuments = documents.filter(doc => {
    if (selectedCategory !== 'all' && doc.document_category !== selectedCategory) return false
    if (searchQuery && !doc.original_name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !doc.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (selectedFileType !== 'all' && doc.file_type !== selectedFileType) return false
    return true
  })

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return
    
    const newFiles = Array.from(files)
    setUploadingFiles(prev => [...prev, ...newFiles])
    
    // Initialize progress for new files
    const newProgress: Record<string, number> = {}
    newFiles.forEach(file => {
      newProgress[file.name] = 0
    })
    setUploadProgress(prev => ({ ...prev, ...newProgress }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const removeFile = (fileName: string) => {
    setUploadingFiles(prev => prev.filter(file => file.name !== fileName))
    setUploadProgress(prev => {
      const newProgress = { ...prev }
      delete newProgress[fileName]
      return newProgress
    })
  }

  const simulateUpload = async (file: File) => {
    const fileName = file.name
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(prev => ({ ...prev, [fileName]: i }))
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    // Add to documents after upload
    const newDoc: TenderDocument = {
      id: Date.now(),
      file_name: fileName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, ''),
      original_name: fileName,
      file_size: file.size,
      file_type: fileName.split('.').pop() || 'unknown',
      mime_type: file.type || 'application/octet-stream',
      document_category: uploadForm.category as any || 'other',
      document_type: DOCUMENT_CATEGORIES.find(cat => cat.category_code === uploadForm.category)?.category_name || 'Tài liệu khác',
      description: uploadForm.description,
      tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      version: parseFloat(uploadForm.version),
      uploaded_by: 'Nguyễn Văn A', // Mock user
      uploaded_at: new Date().toISOString()
    }
    
    setDocuments(prev => [newDoc, ...prev])
    removeFile(fileName)
  }

  const handleUpload = async () => {
    if (uploadingFiles.length === 0 || !uploadForm.category) return
    
    for (const file of uploadingFiles) {
      await simulateUpload(file)
    }
    
    setShowUploadForm(false)
    setUploadForm({ category: '', description: '', tags: '', version: '1.0' })
  }

  const deleteDocument = (documentId: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId))
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />
      case 'docx':
      case 'doc': return <FileText className="w-5 h-5 text-blue-500" />
      case 'xlsx':
      case 'xls': return <FileSpreadsheet className="w-5 h-5 text-green-500" />
      case 'jpg':
      case 'jpeg':
      case 'png': return <Image className="w-5 h-5 text-purple-500" />
      case 'zip':
      case 'rar': return <Archive className="w-5 h-5 text-orange-500" />
      default: return <File className="w-5 h-5 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý tài liệu đính kèm</h2>
          <p className="text-gray-600">Gói thầu: {biddingPackage.package_code} - {biddingPackage.name}</p>
        </div>
        <Button onClick={onClose} variant="outline">
          <X className="w-4 h-4 mr-2" />
          Đóng
        </Button>
      </div>

      {/* Upload Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Tải lên tài liệu
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showUploadForm ? (
            <div className="text-center">
              <Button onClick={() => setShowUploadForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Thêm tài liệu mới
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Kéo thả file vào đây hoặc click để chọn
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Hỗ trợ: PDF, DOCX, XLSX, JPG, PNG (Tối đa 50MB/file)
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Chọn file
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </div>

              {/* Upload Form */}
              {uploadingFiles.length > 0 && (
                <div className="space-y-4">
                  <Separator />
                  <h4 className="font-medium">Thông tin tài liệu</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Loại tài liệu *</Label>
                      <select
                        id="category"
                        value={uploadForm.category}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                      >
                        <option value="">Chọn loại tài liệu</option>
                        {DOCUMENT_CATEGORIES.map(cat => (
                          <option key={cat.category_code} value={cat.category_code}>
                            {cat.category_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="version">Phiên bản</Label>
                      <Input
                        id="version"
                        value={uploadForm.version}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, version: e.target.value }))}
                        placeholder="v1.0"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Mô tả tài liệu..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (phân cách bằng dấu phẩy)</Label>
                    <Input
                      id="tags"
                      value={uploadForm.tags}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="phê duyệt, HSMT, xây dựng"
                      className="mt-1"
                    />
                  </div>

                  {/* File List */}
                  <div className="space-y-2">
                    <h5 className="font-medium">Files đã chọn:</h5>
                    {uploadingFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.name.split('.').pop() || '')}
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-gray-600">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {uploadProgress[file.name] !== undefined && (
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress[file.name]}%` }}
                              ></div>
                            </div>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFile(file.name)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <Button variant="outline" onClick={() => setShowUploadForm(false)}>
                      Hủy
                    </Button>
                    <Button 
                      onClick={handleUpload}
                      disabled={uploadingFiles.length === 0 || !uploadForm.category}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Tải lên ({uploadingFiles.length} files)
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Bộ lọc và tìm kiếm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Tìm kiếm</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Tìm theo tên hoặc mô tả..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="category-filter">Loại tài liệu</Label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
              >
                <option value="all">Tất cả loại</option>
                {DOCUMENT_CATEGORIES.map(cat => (
                  <option key={cat.category_code} value={cat.category_code}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="file-type-filter">Định dạng file</Label>
              <select
                id="file-type-filter"
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
              >
                <option value="all">Tất cả định dạng</option>
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="xlsx">XLSX</option>
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Danh sách tài liệu ({filteredDocuments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Không có tài liệu nào</p>
              <p className="text-sm">Không tìm thấy tài liệu nào phù hợp với bộ lọc hiện tại.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    {getFileIcon(doc.file_type)}
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.original_name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{formatFileSize(doc.file_size)}</span>
                        <span>•</span>
                        <span>{doc.document_type}</span>
                        <span>•</span>
                        <span>v{doc.version}</span>
                        <span>•</span>
                        <span>{formatDate(doc.uploaded_at)}</span>
                      </div>
                      {doc.description && (
                        <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                      )}
                      {doc.tags.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {doc.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteDocument(doc.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
