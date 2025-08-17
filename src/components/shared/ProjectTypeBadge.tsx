"use client"

import { Badge } from "@/components/ui/badge"
import { 
  Target, 
  Package, 
  FileText, 
  Settings, 
  Info 
} from "lucide-react"

interface ProjectTypeBadgeProps {
  category: string
}

export function ProjectTypeBadge({ category }: ProjectTypeBadgeProps) {
  const types: Record<string, { label: string, icon: any, color: string }> = {
    'INV': { 
      label: 'Dự án Đầu tư', 
      icon: Target, 
      color: 'bg-[#800020]/20 text-[#800020] border border-[#800020]/30 hover:bg-[#800020]/30' 
    },
    'PUR': { 
      label: 'Dự án Mua sắm', 
      icon: Package, 
      color: 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' 
    },
    'SER': { 
      label: 'Dự án Thuê dịch vụ', 
      icon: FileText, 
      color: 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100' 
    },
    'MAI': { 
      label: 'Dự án Bảo trì', 
      icon: Settings, 
      color: 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100' 
    }
  }
  
  const type = types[category] || { 
    label: category, 
    icon: Info, 
    color: 'bg-[#800020]/20 text-[#800020] border border-[#800020]/30 hover:bg-[#800020]/30' 
  }
  const IconComponent = type.icon
  
  return (
    <Badge variant="outline" className={`text-xs flex items-center gap-1 overflow-hidden ${type.color}`}>
      <IconComponent className="w-3 h-3 flex-shrink-0" />
      <span className="truncate">{type.label}</span>
    </Badge>
  )
}
