"use client"

import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  X, 
  TrendingUp, 
  Edit, 
  Info 
} from "lucide-react"
import { Project } from "@/types/project"

interface StatusBadgeProps {
  status: string
  type: 'approval' | 'execution' | 'edit'
  project?: Project
}

export function StatusBadge({ status, type, project }: StatusBadgeProps) {
  const variants: Record<string, { label: string, className: string, icon: any }> = {
    // Approval status - Concept màu Agribank với đa dạng
    'initialized': { 
      label: 'Khởi tạo', 
      className: 'bg-[#800020]/10 text-[#800020] border border-[#800020]/20 hover:bg-[#800020]/20', 
      icon: Clock 
    },
    'pending_approval': { 
      label: 'Chờ phê duyệt', 
      className: 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100', 
      icon: AlertCircle 
    },
    'approved': { 
      label: 'Đã phê duyệt', 
      className: 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100', 
      icon: CheckCircle 
    },
    'rejected': { 
      label: 'Từ chối phê duyệt', 
      className: 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100', 
      icon: X 
    },
    
    // Execution status - Concept màu Agribank với đa dạng
    'not_started': { 
      label: 'Chưa bắt đầu', 
      className: 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100', 
      icon: Clock 
    },
    'in_progress': { 
      label: 'Đang thực hiện', 
      className: 'bg-[#800020]/10 text-[#800020] border border-[#800020]/20 hover:bg-[#800020]/20', 
      icon: TrendingUp 
    },
    'suspended': { 
      label: 'Tạm dừng', 
      className: 'bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100', 
      icon: AlertCircle 
    },
    'completed': { 
      label: 'Hoàn thành', 
      className: 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100', 
      icon: CheckCircle 
    },
    
    // Edit request status - Concept màu Agribank với đa dạng
    'none': { 
      label: 'Không có yêu cầu', 
      className: 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100', 
      icon: CheckCircle 
    },
    'edit_requested': { 
      label: 'Yêu cầu chỉnh sửa', 
      className: 'bg-[#800020]/10 text-[#800020] border border-[#800020]/20 hover:bg-[#800020]/20', 
      icon: Edit 
    }
  }

  const variant = variants[status] || { 
    label: status, 
    className: 'bg-[#800020]/10 text-[#800020] border border-[#800020]/20', 
    icon: Info 
  }
  
  const IconComponent = variant.icon

  return (
    <div className="flex items-center gap-1 flex-wrap overflow-hidden">
      <Badge variant="outline" className={`text-xs flex items-center gap-1 max-w-full overflow-hidden ${variant.className}`}>
        <IconComponent className="w-3 h-3 flex-shrink-0" />
        <span className="truncate">{variant.label}</span>
      </Badge>
      
      {/* Official Project Badge */}
      {type === 'approval' && project && project.approval_status === 'approved' && (
        <Badge variant="outline" className="text-xs flex items-center gap-1 bg-[#800020]/20 text-[#800020] border border-[#800020]/30 flex-shrink-0 overflow-hidden">
          <span className="text-sm flex-shrink-0">🏛️</span>
          <span className="truncate">Chính thức</span>
        </Badge>
      )}
    </div>
  )
}
