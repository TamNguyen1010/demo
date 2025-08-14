"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  FolderOpen, 
  Sparkles, 
  RefreshCw, 
  DollarSign, 
  CheckCircle, 
  Clock,
  BarChart3
} from "lucide-react"
import { DashboardStats } from "@/types/project"

interface DashboardPageProps {
  stats: DashboardStats
  selectedYear: string
  onShowReports: () => void
}

export function DashboardPage({ stats, selectedYear, onShowReports }: DashboardPageProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-[#800020] flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            Dashboard Dự án
          </h1>
          <p className="text-slate-600 max-w-2xl mt-3 text-lg">
            Tổng quan thống kê và báo cáo dự án theo năm và phân loại.
            <span className="ml-2 text-[#800020] font-medium">Hỗ trợ phân tích và báo cáo chi tiết.</span>
          </p>
        </div>
        <Button 
          onClick={onShowReports}
          className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-lg"
        >
          <BarChart3 className="w-5 h-5 mr-2" />
          Báo cáo chi tiết
        </Button>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tổng dự án - Màu đỏ Agribank (concept chính) */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#800020]/10 to-[#800020]/20 hover:from-[#800020]/20 hover:to-[#800020]/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#800020] mb-1">Tổng dự án</p>
                <p className="text-3xl font-bold text-[#800020]">{stats.totalProjects}</p>
                <p className="text-xs text-[#800020] mt-1">Tất cả dự án</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-full shadow-lg">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dự án mới - Màu xanh lá */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/20 hover:from-green-500/20 hover:to-green-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Dự án mới</p>
                <p className="text-3xl font-bold text-green-800">{stats.newProjects}</p>
                <p className="text-xs text-green-600 mt-1">Năm {selectedYear}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dự án chuyển tiếp - Màu cam */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500/10 to-orange-600/20 hover:from-orange-500/20 hover:to-orange-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 mb-1">Dự án chuyển tiếp</p>
                <p className="text-3xl font-bold text-orange-800">{stats.carryoverProjects}</p>
                <p className="text-xs text-orange-600 mt-1">Từ năm trước</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tổng ngân sách - Màu tím */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 to-purple-600/20 hover:from-purple-500/20 hover:to-purple-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 mb-1">Tổng ngân sách</p>
                <p className="text-3xl font-bold text-purple-800">
                  {stats.totalBudget.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-purple-600 mt-1">VND</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dự án đã phê duyệt - Màu xanh lá đậm */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 hover:from-emerald-500/20 hover:to-emerald-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700 mb-1">Đã phê duyệt</p>
                <p className="text-3xl font-bold text-emerald-800">{stats.approvedProjects}</p>
                <p className="text-xs text-emerald-600 mt-1">Sẵn sàng thực hiện</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dự án chờ phê duyệt - Màu vàng */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 hover:from-yellow-500/20 hover:to-yellow-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700 mb-1">Chờ phê duyệt</p>
                <p className="text-3xl font-bold text-yellow-800">{stats.pendingProjects}</p>
                <p className="text-xs text-yellow-600 mt-1">Đang xử lý</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ngân sách đã phê duyệt - Màu xanh dương */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-blue-600/20 hover:from-blue-500/20 hover:to-blue-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Ngân sách đã phê duyệt</p>
                <p className="text-3xl font-bold text-blue-800">
                  {stats.approvedBudget.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-blue-600 mt-1">VND</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
