"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
  Eye,
  FileText,
  Calculator,
  Target,
  Calendar,
  Users,
  Building2
} from "lucide-react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FinancialData {
  totalContractValue: number
  originalBudget: number
  revisedBudget: number
  contractVariations: number
  
  // Cumulative Values
  cumulativeImplementation: number
  cumulativeAcceptance: number
  cumulativeDisbursement: number
  cumulativePayment: number
  
  // Remaining Values
  remainingImplementation: number
  remainingAcceptance: number
  remainingDisbursement: number
  remainingPayment: number
  
  // Progress Ratios
  implementationProgress: number
  acceptanceProgress: number
  disbursementProgress: number
  paymentProgress: number
  
  // Alert Status
  budgetAlertStatus: 'normal' | 'warning' | 'critical'
  paymentAlertStatus: 'normal' | 'warning' | 'critical'
}

interface CostLink {
  id: string
  costItemId: string
  costAmount: number
  costStatus: 'pending' | 'implemented' | 'accepted' | 'disbursed' | 'paid' | 'cancelled'
  costCategory: string
  costDescription: string
  linkedAt: Date
}

interface FinancialAlert {
  id: string
  type: 'budget_warning' | 'budget_critical' | 'payment_due' | 'completion_milestone'
  message: string
  severity: 'info' | 'warning' | 'critical'
  thresholdValue?: number
  thresholdPercentage?: number
  createdAt: Date
}

interface FinancialDashboardProps {
  projectId: string
}

export function FinancialDashboard({ projectId }: FinancialDashboardProps) {
  const [financialData, setFinancialData] = useState<FinancialData>({
    totalContractValue: 1000000000, // 1 tỷ VND
    originalBudget: 1000000000,
    revisedBudget: 1000000000,
    contractVariations: 0,
    
    cumulativeImplementation: 750000000, // 750 triệu VND
    cumulativeAcceptance: 600000000,    // 600 triệu VND
    cumulativeDisbursement: 500000000,  // 500 triệu VND
    cumulativePayment: 450000000,       // 450 triệu VND
    
    remainingImplementation: 250000000,
    remainingAcceptance: 400000000,
    remainingDisbursement: 500000000,
    remainingPayment: 550000000,
    
    implementationProgress: 75.0,
    acceptanceProgress: 60.0,
    disbursementProgress: 50.0,
    paymentProgress: 45.0,
    
    budgetAlertStatus: 'warning',
    paymentAlertStatus: 'normal'
  })

  const [costLinks, setCostLinks] = useState<CostLink[]>([
    {
      id: "1",
      costItemId: "cost-001",
      costAmount: 200000000,
      costStatus: "implemented",
      costCategory: "Vật liệu xây dựng",
      costDescription: "Xi măng, sắt thép, gạch đá",
      linkedAt: new Date("2024-01-15")
    },
    {
      id: "2",
      costItemId: "cost-002",
      costAmount: 150000000,
      costStatus: "accepted",
      costCategory: "Nhân công",
      costDescription: "Chi phí nhân công xây dựng",
      linkedAt: new Date("2024-01-20")
    },
    {
      id: "3",
      costItemId: "cost-003",
      costAmount: 100000000,
      costStatus: "disbursed",
      costCategory: "Thiết bị",
      costDescription: "Máy móc thiết bị thi công",
      linkedAt: new Date("2024-01-25")
    }
  ])

  const [alerts, setAlerts] = useState<FinancialAlert[]>([
    {
      id: "1",
      type: "budget_warning",
      message: "Dự án đã sử dụng 75% ngân sách",
      severity: "warning",
      thresholdPercentage: 75.0,
      createdAt: new Date("2024-01-28")
    },
    {
      id: "2",
      type: "completion_milestone",
      message: "Đã hoàn thành 50% giá trị giải ngân",
      severity: "info",
      thresholdPercentage: 50.0,
      createdAt: new Date("2024-01-25")
    }
  ])

  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const [isLoading, setIsLoading] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-100'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'critical':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getCostStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      case 'implemented':
        return 'bg-blue-100 text-blue-800'
      case 'accepted':
        return 'bg-green-100 text-green-800'
      case 'disbursed':
        return 'bg-purple-100 text-purple-800'
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'budget_warning':
      case 'budget_critical':
        return <AlertTriangle className="w-4 h-4" />
      case 'payment_due':
        return <Clock className="w-4 h-4" />
      case 'completion_milestone':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const handleExportReport = () => {
    // Implement export functionality
    console.log('Exporting financial report...')
  }

  return (
    <div className="space-y-6">
      {/* Header with Period Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#800020]">Dashboard Tài chính</h2>
          <p className="text-gray-600">Theo dõi tình hình tài chính và tiến độ dự án</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Hiện tại</SelectItem>
              <SelectItem value="monthly">Theo tháng</SelectItem>
              <SelectItem value="quarterly">Theo quý</SelectItem>
              <SelectItem value="annual">Theo năm</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleRefresh}
            disabled={isLoading}
            variant="outline"
            size="icon"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            onClick={handleExportReport}
            className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#A00030] hover:to-[#800020]"
          >
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Key Financial Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#800020]/10 to-[#800020]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#800020] mb-1">Tổng giá trị HĐ</p>
                <p className="text-2xl font-bold text-[#800020]">
                  {formatCurrency(financialData.totalContractValue)}
                </p>
                <p className="text-xs text-gray-600 mt-1">Ngân sách ban đầu</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-full">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Thực hiện lũy kế</p>
                <p className="text-2xl font-bold text-green-800">
                  {formatCurrency(financialData.cumulativeImplementation)}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={financialData.implementationProgress} className="w-16 h-2" />
                  <span className="text-xs text-green-600 font-medium">
                    {formatPercentage(financialData.implementationProgress)}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-blue-600/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Nghiệm thu lũy kế</p>
                <p className="text-2xl font-bold text-blue-800">
                  {formatCurrency(financialData.cumulativeAcceptance)}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={financialData.acceptanceProgress} className="w-16 h-2" />
                  <span className="text-xs text-blue-600 font-medium">
                    {formatPercentage(financialData.acceptanceProgress)}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 to-purple-600/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 mb-1">Giải ngân lũy kế</p>
                <p className="text-2xl font-bold text-purple-800">
                  {formatCurrency(financialData.cumulativeDisbursement)}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={financialData.disbursementProgress} className="w-16 h-2" />
                  <span className="text-xs text-purple-600 font-medium">
                    {formatPercentage(financialData.disbursementProgress)}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Remaining Values */}
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-[#800020] flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Giá trị Còn lại
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium text-red-700">Thực hiện còn lại</span>
                  <span className="text-lg font-bold text-red-800">
                    {formatCurrency(financialData.remainingImplementation)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm font-medium text-orange-700">Nghiệm thu còn lại</span>
                  <span className="text-lg font-bold text-orange-800">
                    {formatCurrency(financialData.remainingAcceptance)}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-purple-700">Giải ngân còn lại</span>
                  <span className="text-lg font-bold text-purple-800">
                    {formatCurrency(financialData.remainingDisbursement)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-700">Thanh toán còn lại</span>
                  <span className="text-lg font-bold text-blue-800">
                    {formatCurrency(financialData.remainingPayment)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#800020] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Cảnh báo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border ${
                  alert.severity === 'critical' ? 'bg-red-50 border-red-200' :
                  alert.severity === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-start gap-2">
                    <div className={`mt-0.5 ${
                      alert.severity === 'critical' ? 'text-red-600' :
                      alert.severity === 'warning' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        alert.severity === 'critical' ? 'text-red-800' :
                        alert.severity === 'warning' ? 'text-yellow-800' :
                        'text-blue-800'
                      }`}>
                        {alert.message}
                      </p>
                      {alert.thresholdPercentage && (
                        <p className="text-xs text-gray-600 mt-1">
                          Ngưỡng: {alert.thresholdPercentage}%
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {alerts.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="text-sm">Không có cảnh báo nào</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Links */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#800020] flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Chi phí Liên kết
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costLinks.map((cost) => (
              <div key={cost.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900">{cost.costDescription}</h4>
                    <Badge className={getCostStatusColor(cost.costStatus)}>
                      {cost.costStatus === 'pending' && 'Chờ xử lý'}
                      {cost.costStatus === 'implemented' && 'Đã thực hiện'}
                      {cost.costStatus === 'accepted' && 'Đã nghiệm thu'}
                      {cost.costStatus === 'disbursed' && 'Đã giải ngân'}
                      {cost.costStatus === 'paid' && 'Đã thanh toán'}
                      {cost.costStatus === 'cancelled' && 'Đã hủy'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Danh mục: {cost.costCategory}</span>
                    <span>Ngày liên kết: {cost.linkedAt.toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-[#800020]">
                    {formatCurrency(cost.costAmount)}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {costLinks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Chưa có chi phí nào được liên kết</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#800020] flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Tổng quan Tiến độ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - financialData.implementationProgress / 100)}`}
                    className="text-green-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-green-600">
                    {formatPercentage(financialData.implementationProgress)}
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700">Thực hiện</p>
            </div>

            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - financialData.acceptanceProgress / 100)}`}
                    className="text-blue-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">
                    {formatPercentage(financialData.acceptanceProgress)}
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700">Nghiệm thu</p>
            </div>

            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - financialData.disbursementProgress / 100)}`}
                    className="text-purple-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-purple-600">
                    {formatPercentage(financialData.disbursementProgress)}
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700">Giải ngân</p>
            </div>

            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - financialData.paymentProgress / 100)}`}
                    className="text-orange-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-orange-600">
                    {formatPercentage(financialData.paymentProgress)}
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700">Thanh toán</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
