"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  FolderOpen, 
  Sparkles, 
  RefreshCw, 
  DollarSign, 
  CheckCircle, 
  Clock,
  BarChart3
} from "lucide-react"
import { Project } from "@/types/project"
import { getProjectType, isOfficialProject } from "@/lib/utils"

interface StatisticsCardsProps {
  projects: Project[]
  selectedYear: string
}

export function StatisticsCards({ projects, selectedYear }: StatisticsCardsProps) {
  const stats = {
    totalProjects: projects.length,
    newProjects: projects.filter(p => getProjectType(p) === 'new').length,
    carryoverProjects: projects.filter(p => getProjectType(p) === 'carryover').length,
    approvedProjects: projects.filter(p => p.approval_status === 'approved').length,
    pendingProjects: projects.filter(p => p.approval_status === 'pending_approval').length,
    totalBudget: projects.reduce((sum, p) => sum + p.planned_budget, 0),
    approvedBudget: projects.reduce((sum, p) => sum + p.approved_budget, 0),
    disbursedBudget: projects.reduce((sum, p) => sum + p.total_disbursed, 0)
  }

  const officialProjectsStats = {
    total: projects.filter(p => isOfficialProject(p)).length,
    approved: projects.filter(p => p.approval_status === 'approved').length,
    pending: projects.filter(p => p.approval_status === 'pending_approval').length
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#800020]/10 to-[#800020]/20 hover:from-[#800020]/20 hover:to-[#800020]/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#800020] mb-1">Tổng dự án</p>
                <p className="text-3xl font-bold text-[#800020]">{stats.totalProjects}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-full shadow-lg">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/20 hover:from-green-500/20 hover:to-green-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Dự án mới</p>
                <p className="text-3xl font-bold text-green-800">{stats.newProjects}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500/10 to-orange-600/20 hover:from-orange-500/20 hover:to-orange-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 mb-1">Dự án chuyển tiếp</p>
                <p className="text-3xl font-bold text-orange-800">{stats.carryoverProjects}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 to-purple-600/20 hover:from-purple-500/20 hover:to-purple-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 mb-1">Tổng ngân sách</p>
                <p className="text-3xl font-bold text-purple-800">
                  {stats.totalBudget.toLocaleString('vi-VN')}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
