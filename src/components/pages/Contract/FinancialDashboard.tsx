"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Download,
  RefreshCw,
  Eye,
  PieChart,
  Activity,
  Target,
  AlertCircle,
  Plus,
  Settings
} from "lucide-react"
import { Contract } from "@/types/contract"

interface FinancialIndicator {
  id: number
  contract_id: number
  indicator_date: string
  
  // Contract Values
  total_contract_value: number
  original_budget: number
  revised_budget?: number
  contract_variations: number
  
  // Cumulative Values
  cumulative_implementation_value: number
  cumulative_acceptance_value: number
  cumulative_disbursement_value: number
  cumulative_payment_value: number
  
  // Remaining Values
  remaining_implementation_value: number
  remaining_acceptance_value: number
  remaining_disbursement_value: number
  remaining_payment_value: number
  
  // Progress Ratios
  implementation_progress_ratio: number
  acceptance_progress_ratio: number
  disbursement_progress_ratio: number
  payment_progress_ratio: number
  
  // Alert Status
  budget_alert_status: 'normal' | 'warning' | 'critical'
  payment_alert_status: 'normal' | 'warning' | 'critical'
}

interface CostLink {
  id: number
  contract_id: number
  cost_item_id: number
  cost_amount: number
  cost_status: 'pending' | 'implemented' | 'accepted' | 'disbursed' | 'paid' | 'cancelled'
  cost_category: string
  cost_description: string
  linked_at: string
}

interface FinancialAlert {
  id: number
  contract_id: number
  alert_type: 'budget_warning' | 'budget_critical' | 'payment_due' | 'completion_milestone'
  threshold_value?: number
  threshold_percentage?: number
  message: string
  severity: 'info' | 'warning' | 'critical'
  is_active: boolean
  created_at: string
}

interface FinancialDashboardProps {
  contract: Contract
  isOpen: boolean
  onClose: () => void
}

export function FinancialDashboard({ contract, isOpen, onClose }: FinancialDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const [financialData, setFinancialData] = useState<FinancialIndicator | null>(null)
  const [costLinks, setCostLinks] = useState<CostLink[]>([])
  const [alerts, setAlerts] = useState<FinancialAlert[]>([])

  // Mock data - sẽ được thay thế bằng API call
  useEffect(() => {
    if (isOpen) {
      loadFinancialData()
    }
  }, [isOpen])

  const loadFinancialData = async () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setFinancialData({
        id: 1,
        contract_id: contract.id,
        indicator_date: new Date().toISOString().split('T')[0],
        total_contract_value: contract.value,
        original_budget: contract.value,
        revised_budget: contract.value,
        contract_variations: 0,
        cumulative_implementation_value: contract.value * 0.75,
        cumulative_acceptance_value: contract.value * 0.60,
        cumulative_disbursement_value: contract.value * 0.50,
        cumulative_payment_value: contract.value * 0.45,
        remaining_implementation_value: contract.value * 0.25,
        remaining_acceptance_value: contract.value * 0.40,
        remaining_disbursement_value: contract.value * 0.50,
        remaining_payment_value: contract.value * 0.55,
        implementation_progress_ratio: 75.00,
        acceptance_progress_ratio: 60.00,
        disbursement_progress_ratio: 50.00,
        payment_progress_ratio: 45.00,
        budget_alert_status: 'warning',
        payment_alert_status: 'normal'
      })

      setCostLinks([
        {
          id: 1,
          contract_id: contract.id,
          cost_item_id: 101,
          cost_amount: 250000000,
          cost_status: 'implemented',
          cost_category: 'Vật liệu xây dựng',
          cost_description: 'Cung cấp vật liệu xây dựng cho giai đoạn 1',
          linked_at: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          contract_id: contract.id,
          cost_item_id: 102,
          cost_amount: 200000000,
          cost_status: 'accepted',
          cost_category: 'Nhân công',
          cost_description: 'Chi phí nhân công tháng 1-2/2024',
          linked_at: '2024-02-01T14:20:00Z'
        },
        {
          id: 3,
          contract_id: contract.id,
          cost_item_id: 103,
          cost_amount: 150000000,
          cost_status: 'disbursed',
          cost_category: 'Thiết bị',
          cost_description: 'Mua sắm thiết bị thi công',
          linked_at: '2024-01-20T09:15:00Z'
        }
      ])

      setAlerts([
        {
          id: 1,
          contract_id: contract.id,
          alert_type: 'budget_warning',
          threshold_percentage: 80.00,
          message: 'Hợp đồng đã sử dụng 80% ngân sách',
          severity: 'warning',
          is_active: true,
          created_at: '2024-01-25T08:00:00Z'
        },
        {
          id: 2,
          contract_id: contract.id,
          alert_type: 'completion_milestone',
          threshold_percentage: 50.00,
          message: 'Đã hoàn thành 50% giá trị hợp đồng',
          severity: 'info',
          is_active: true,
          created_at: '2024-01-20T10:00:00Z'
        }
      ])

      setIsLoading(false)
    }, 1000)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: contract.currency || 'VND'
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'critical': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getCostStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-slate-100 text-slate-800'
      case 'implemented': return 'bg-blue-100 text-blue-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'disbursed': return 'bg-purple-100 text-purple-800'
      case 'paid': return 'bg-emerald-100 text-emerald-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getCostStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ thực hiện'
      case 'implemented': return 'Đã thực hiện'
      case 'accepted': return 'Đã nghiệm thu'
      case 'disbursed': return 'Đã giải ngân'
      case 'paid': return 'Đã thanh toán'
      case 'cancelled': return 'Đã hủy'
      default: return status
    }
  }

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'bg-blue-100 text-blue-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#800020]" />
            Dashboard Tài chính Hợp đồng: {contract.name}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadFinancialData}
              disabled={isLoading}
              className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Làm mới
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
            >
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-100">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-[#800020]">
                <BarChart3 className="w-4 h-4 mr-2" />
                Tổng quan
              </TabsTrigger>
              <TabsTrigger value="costs" className="data-[state=active]:bg-white data-[state=active]:text-[#800020]">
                <Activity className="w-4 h-4 mr-2" />
                Chi phí ({costLinks.length})
              </TabsTrigger>
              <TabsTrigger value="alerts" className="data-[state=active]:bg-white data-[state=active]:text-[#800020]">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Cảnh báo ({alerts.length})
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-white data-[state=active]:text-[#800020]">
                <PieChart className="w-4 h-4 mr-2" />
                Báo cáo
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020] mx-auto mb-4"></div>
                  <p className="text-slate-600">Đang tải dữ liệu tài chính...</p>
                </div>
              ) : financialData ? (
                <div className="space-y-6">
                  {/* Key Financial Indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-600">Tổng giá trị HĐ</p>
                            <p className="text-2xl font-bold text-slate-900">
                              {formatCurrency(financialData.total_contract_value)}
                            </p>
                          </div>
                          <DollarSign className="w-8 h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-600">Đã thực hiện</p>
                            <p className="text-2xl font-bold text-slate-900">
                              {formatCurrency(financialData.cumulative_implementation_value)}
                            </p>
                            <p className="text-sm text-green-600">
                              {formatPercentage(financialData.implementation_progress_ratio)}
                            </p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-purple-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-600">Đã giải ngân</p>
                            <p className="text-2xl font-bold text-slate-900">
                              {formatCurrency(financialData.cumulative_disbursement_value)}
                            </p>
                            <p className="text-sm text-purple-600">
                              {formatPercentage(financialData.disbursement_progress_ratio)}
                            </p>
                          </div>
                          <Target className="w-8 h-8 text-purple-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-orange-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-600">Còn lại</p>
                            <p className="text-2xl font-bold text-slate-900">
                              {formatCurrency(financialData.remaining_disbursement_value)}
                            </p>
                            <p className="text-sm text-orange-600">
                              {formatPercentage(100 - financialData.disbursement_progress_ratio)}
                            </p>
                          </div>
                          <TrendingDown className="w-8 h-8 text-orange-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Progress Bars */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-[#800020]" />
                          Tiến độ Thực hiện
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Thực hiện</span>
                            <span>{formatPercentage(financialData.implementation_progress_ratio)}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-3">
                            <div 
                              className="bg-green-500 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${financialData.implementation_progress_ratio}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Nghiệm thu</span>
                            <span>{formatPercentage(financialData.acceptance_progress_ratio)}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-3">
                            <div 
                              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${financialData.acceptance_progress_ratio}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Giải ngân</span>
                            <span>{formatPercentage(financialData.disbursement_progress_ratio)}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-3">
                            <div 
                              className="bg-purple-500 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${financialData.disbursement_progress_ratio}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-[#800020]" />
                          Trạng thái Cảnh báo
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Ngân sách:</span>
                          <Badge className={getStatusColor(financialData.budget_alert_status)}>
                            {getStatusIcon(financialData.budget_alert_status)}
                            {financialData.budget_alert_status === 'normal' && 'Bình thường'}
                            {financialData.budget_alert_status === 'warning' && 'Cảnh báo'}
                            {financialData.budget_alert_status === 'critical' && 'Nguy hiểm'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Thanh toán:</span>
                          <Badge className={getStatusColor(financialData.payment_alert_status)}>
                            {getStatusIcon(financialData.payment_alert_status)}
                            {financialData.payment_alert_status === 'normal' && 'Bình thường'}
                            {financialData.payment_alert_status === 'warning' && 'Cảnh báo'}
                            {financialData.payment_alert_status === 'critical' && 'Nguy hiểm'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertTriangle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Không có dữ liệu tài chính</h3>
                  <p className="text-slate-600">Hãy liên kết với Module Chi phí để xem thông tin tài chính</p>
                </div>
              )}
            </TabsContent>

            {/* Costs Tab */}
            <TabsContent value="costs" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Chi phí Liên kết</h3>
                  <Button size="sm" className="bg-[#800020] hover:bg-[#700018] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Liên kết Chi phí
                  </Button>
                </div>

                <div className="space-y-3">
                  {costLinks.map((cost) => (
                    <Card key={cost.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-medium text-slate-900">{cost.cost_description}</h4>
                              <Badge className={getCostStatusColor(cost.cost_status)}>
                                {getCostStatusLabel(cost.cost_status)}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-1">
                              Danh mục: {cost.cost_category}
                            </p>
                            <p className="text-xs text-slate-500">
                              Liên kết: {new Date(cost.linked_at).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-[#800020]">
                              {formatCurrency(cost.cost_amount)}
                            </p>
                            <Button variant="ghost" size="sm" className="text-[#800020]">
                              <Eye className="w-3 h-3 mr-1" />
                              Chi tiết
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Cảnh báo Tài chính</h3>
                  <Button size="sm" variant="outline" className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]">
                    <Settings className="w-4 h-4 mr-2" />
                    Cấu hình
                  </Button>
                </div>

                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <Card key={alert.id} className={`border-l-4 ${
                      alert.severity === 'critical' ? 'border-l-red-500' :
                      alert.severity === 'warning' ? 'border-l-yellow-500' :
                      'border-l-blue-500'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getAlertSeverityColor(alert.severity)}>
                                {alert.alert_type === 'budget_warning' && 'Cảnh báo Ngân sách'}
                                {alert.alert_type === 'budget_critical' && 'Nguy hiểm Ngân sách'}
                                {alert.alert_type === 'payment_due' && 'Đến hạn Thanh toán'}
                                {alert.alert_type === 'completion_milestone' && 'Cột mốc Hoàn thành'}
                              </Badge>
                              {alert.threshold_percentage && (
                                <span className="text-sm text-slate-600">
                                  Ngưỡng: {alert.threshold_percentage}%
                                </span>
                              )}
                            </div>
                            <p className="text-slate-900 mb-2">{alert.message}</p>
                            <p className="text-xs text-slate-500">
                              Tạo: {new Date(alert.created_at).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="mt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Báo cáo Tài chính</h3>
                  <p className="text-slate-600">
                    Tạo và xuất báo cáo tài chính chi tiết cho hợp đồng
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h4 className="font-medium text-slate-900 mb-2">Báo cáo Hàng ngày</h4>
                    <p className="text-sm text-slate-600 mb-4">Tổng hợp tình hình tài chính hàng ngày</p>
                    <Button size="sm" className="bg-[#800020] hover:bg-[#700018] text-white">
                      Tạo báo cáo
                    </Button>
                  </Card>

                  <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h4 className="font-medium text-slate-900 mb-2">Báo cáo Hàng tháng</h4>
                    <p className="text-sm text-slate-600 mb-4">Phân tích xu hướng tài chính hàng tháng</p>
                    <Button size="sm" className="bg-[#800020] hover:bg-[#700018] text-white">
                      Tạo báo cáo
                    </Button>
                  </Card>

                  <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <PieChart className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                    <h4 className="font-medium text-slate-900 mb-2">Báo cáo So sánh</h4>
                    <p className="text-sm text-slate-600 mb-4">So sánh kế hoạch và thực tế</p>
                    <Button size="sm" className="bg-[#800020] hover:bg-[#700018] text-white">
                      Tạo báo cáo
                    </Button>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
