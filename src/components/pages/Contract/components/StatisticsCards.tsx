"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  TrendingUp,
  AlertTriangle,
  XCircle
} from "lucide-react"

interface StatisticsCardsProps {
  total: number
  active: number
  draft: number
  completed: number
  totalValue: number
  currency?: string
}

export function StatisticsCards({
  total,
  active,
  draft,
  completed,
  totalValue,
  currency = "VND"
}: StatisticsCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency
    }).format(value)
  }

  const formatCompactCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)} tỷ ${currency}`
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)} triệu ${currency}`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)} nghìn ${currency}`
    }
    return formatCurrency(value)
  }

  const stats = [
    {
      title: "Tổng hợp đồng",
      value: total,
      icon: FileText,
      description: "Tất cả hợp đồng",
      color: "text-[#800020]",
      bgColor: "bg-gradient-to-br from-[#800020]/10 to-[#800020]/20"
    },
    {
      title: "Đang thực hiện",
      value: active,
      icon: Clock,
      description: "Hợp đồng đang hoạt động",
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-500/10 to-green-600/20"
    },
    {
      title: "Nháp",
      value: draft,
      icon: FileText,
      description: "Hợp đồng chưa hoàn thiện",
      color: "text-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-500/10 to-yellow-600/20"
    },
    {
      title: "Hoàn thành",
      value: completed,
      icon: CheckCircle,
      description: "Hợp đồng đã hoàn thành",
      color: "text-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-500/10 to-emerald-600/20"
    },
    {
      title: "Tổng giá trị",
      value: formatCompactCurrency(totalValue),
      icon: DollarSign,
      description: "Tổng giá trị tất cả hợp đồng",
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-purple-600/20"
    },
    {
      title: "Tỷ lệ hoàn thành",
      value: total > 0 ? `${Math.round((completed / total) * 100)}%` : "0%",
      icon: TrendingUp,
      description: "Tỷ lệ hợp đồng hoàn thành",
      color: "text-indigo-600",
      bgColor: "bg-gradient-to-br from-indigo-500/10 to-indigo-600/20"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
