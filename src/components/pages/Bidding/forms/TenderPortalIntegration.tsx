"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Globe, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  ExternalLink,
  RefreshCw,
  FileText
} from "lucide-react"

interface TenderPortalData {
  ma_goi_thau: string
  ten_goi_thau: string
  gia_goi_thau: number
  hinh_thuc_lua_chon: string
  ma_tbmt: string
  so_luong_nha_thau: number
  ngay_mo_thau: string
  ngay_dong_thau: string
  mo_ta_chi_tiet: string
  dia_diem_thuc_hien: string
  chu_dau_tu: string
  trang_thai: string
}

interface TenderPortalIntegrationProps {
  onDataFetched: (data: Partial<TenderPortalData>) => void
  onCancel: () => void
}

export function TenderPortalIntegration({ onDataFetched, onCancel }: TenderPortalIntegrationProps) {
  const [portalUrl, setPortalUrl] = useState("")
  const [tenderId, setTenderId] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    message: string
  } | null>(null)
  const [fetchedData, setFetchedData] = useState<TenderPortalData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'success' | 'failed'>('idle')

  const validatePortalUrl = async () => {
    if (!portalUrl.trim()) {
      setValidationResult({ isValid: false, message: 'Vui lòng nhập URL gói thầu' })
      return
    }

    // Kiểm tra domain muasamcong.mpi.gov.vn
    if (!portalUrl.includes('muasamcong.mpi.gov.vn')) {
      setValidationResult({ 
        isValid: false, 
        message: 'URL không hợp lệ hoặc không phải Cổng thông tin đấu thầu Quốc gia' 
      })
      return
    }

    setIsValidating(true)
    setError(null)

    try {
      // Giả lập API call để validate URL
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Trích xuất tender ID từ URL
      const urlParts = portalUrl.split('/')
      const extractedId = urlParts[urlParts.length - 1] || ''
      
      if (extractedId) {
        setTenderId(extractedId)
        setValidationResult({ 
          isValid: true, 
          message: 'URL hợp lệ! Mã gói thầu: ' + extractedId 
        })
      } else {
        setValidationResult({ 
          isValid: false, 
          message: 'Không thể trích xuất mã gói thầu từ URL' 
        })
      }
    } catch (err) {
      setValidationResult({ 
        isValid: false, 
        message: 'Lỗi khi kiểm tra URL' 
      })
    } finally {
      setIsValidating(false)
    }
  }

  const fetchTenderData = async () => {
    if (!validationResult?.isValid) {
      setError('Vui lòng kiểm tra URL trước khi lấy dữ liệu')
      return
    }

    setIsFetching(true)
    setError(null)
    setConnectionStatus('connecting')

    try {
      // Giả lập API call để lấy dữ liệu từ Cổng thông tin
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Dữ liệu mẫu từ Cổng thông tin
      const mockData: TenderPortalData = {
        ma_goi_thau: tenderId || 'GT-2024-001',
        ten_goi_thau: 'Gói thầu mua sắm thiết bị IT cho dự án số hóa',
        gia_goi_thau: 2500000000,
        hinh_thuc_lua_chon: 'Đấu thầu rộng rãi',
        ma_tbmt: 'TBMT-2024-001',
        so_luong_nha_thau: 8,
        ngay_mo_thau: '2024-02-01',
        ngay_dong_thau: '2024-02-15',
        mo_ta_chi_tiet: 'Mua sắm thiết bị IT bao gồm máy tính, máy in, phần mềm và các thiết bị mạng cho dự án số hóa doanh nghiệp',
        dia_diem_thuc_hien: 'Hà Nội',
        chu_dau_tu: 'Công ty TNHH ABC',
        trang_thai: 'Đang mời thầu'
      }

      setFetchedData(mockData)
      setConnectionStatus('success')
    } catch (err) {
      setError('Không thể kết nối với Cổng thông tin đấu thầu')
      setConnectionStatus('failed')
    } finally {
      setIsFetching(false)
    }
  }

  const handleConfirmData = () => {
    if (fetchedData) {
      // Map dữ liệu từ Cổng thông tin sang form
      const mappedData = {
        name: fetchedData.ten_goi_thau,
        description: fetchedData.mo_ta_chi_tiet,
        estimated_value: fetchedData.gia_goi_thau,
        tbmt_code: fetchedData.ma_tbmt,
        participant_count: fetchedData.so_luong_nha_thau,
        start_date: fetchedData.ngay_mo_thau,
        end_date: fetchedData.ngay_dong_thau,
        // Map các trường khác theo yêu cầu
      }
      
      onDataFetched(mappedData)
    }
  }

  const handleRetry = () => {
    setError(null)
    setConnectionStatus('idle')
    setFetchedData(null)
  }

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connecting':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Globe className="w-4 h-4 text-gray-400" />
    }
  }

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connecting':
        return 'Đang kết nối...'
      case 'success':
        return 'Kết nối thành công'
      case 'failed':
        return 'Kết nối thất bại'
      default:
        return 'Chưa kết nối'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Kết nối Cổng thông tin đấu thầu Quốc gia</h2>
        <p className="text-gray-600 mt-2">
          Tự động lấy thông tin gói thầu từ muasamcong.mpi.gov.vn
        </p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getConnectionStatusIcon()}
            Trạng thái kết nối
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{getConnectionStatusText()}</span>
            {connectionStatus === 'failed' && (
              <Button variant="outline" size="sm" onClick={handleRetry}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Thử lại
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* URL Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Nhập thông tin gói thầu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="portal_url" className="text-sm font-medium">
              URL gói thầu trên Cổng thông tin <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="portal_url"
                value={portalUrl}
                onChange={(e) => setPortalUrl(e.target.value)}
                placeholder="https://muasamcong.mpi.gov.vn/tender/12345"
                className="flex-1"
              />
              <Button 
                onClick={validatePortalUrl} 
                disabled={isValidating || !portalUrl.trim()}
                variant="outline"
              >
                {isValidating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Kiểm tra'
                )}
              </Button>
            </div>
            {validationResult && (
              <div className={`mt-2 p-2 rounded-md text-sm ${
                validationResult.isValid 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {validationResult.message}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="tender_id" className="text-sm font-medium">
              Mã ID gói thầu
            </Label>
            <Input
              id="tender_id"
              value={tenderId}
              onChange={(e) => setTenderId(e.target.value)}
              placeholder="GT-2024-001"
              className="mt-2"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={fetchTenderData}
              disabled={!validationResult?.isValid || isFetching}
              className="flex-1"
            >
              {isFetching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Đang lấy dữ liệu...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Lấy thông tin từ Cổng
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">Lỗi:</span>
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Preview */}
      {fetchedData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Dữ liệu từ Cổng thông tin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Mã gói thầu</Label>
                  <p className="text-sm font-medium">{fetchedData.ma_goi_thau}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Tên gói thầu</Label>
                  <p className="text-sm font-medium">{fetchedData.ten_goi_thau}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Giá gói thầu</Label>
                  <p className="text-sm font-medium">
                    {fetchedData.gia_goi_thau.toLocaleString()} VND
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Hình thức lựa chọn</Label>
                  <p className="text-sm font-medium">{fetchedData.hinh_thuc_lua_chon}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Mã TBMT</Label>
                  <p className="text-sm font-medium">{fetchedData.ma_tbmt}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Số lượng nhà thầu</Label>
                  <p className="text-sm font-medium">{fetchedData.so_luong_nha_thau}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Ngày mở thầu</Label>
                  <p className="text-sm font-medium">{fetchedData.ngay_mo_thau}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Ngày đóng thầu</Label>
                  <p className="text-sm font-medium">{fetchedData.ngay_dong_thau}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Mô tả chi tiết</Label>
                <p className="text-sm mt-1">{fetchedData.mo_ta_chi_tiet}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Địa điểm thực hiện</Label>
                  <p className="text-sm font-medium">{fetchedData.dia_diem_thuc_hien}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Chủ đầu tư</Label>
                  <p className="text-sm font-medium">{fetchedData.chu_dau_tu}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Trạng thái</Label>
                <Badge variant="outline" className="mt-1">
                  {fetchedData.trang_thai}
                </Badge>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Dữ liệu đã sẵn sàng</span>
              </div>
              <p className="text-sm text-blue-700">
                Dữ liệu từ Cổng thông tin đấu thầu đã được lấy thành công. 
                Bạn có thể xem lại và chỉnh sửa trước khi áp dụng vào form.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        
        {fetchedData && (
          <Button onClick={handleConfirmData} className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            Áp dụng dữ liệu vào form
          </Button>
        )}
      </div>
    </div>
  )
}
