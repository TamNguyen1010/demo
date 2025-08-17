"use client"

import { Badge } from "@/components/ui/badge"
import { ContractType } from "@/types/contract"
import { cn } from "@/lib/utils"

interface ContractTypeBadgeProps {
  type: ContractType
  className?: string
}

export function ContractTypeBadge({ type, className }: ContractTypeBadgeProps) {
  const getTypeConfig = (type: ContractType) => {
    switch (type) {
      case "construction":
        return {
          label: "Xây dựng",
          className: "bg-blue-100 text-blue-800 border-blue-300"
        }
      case "service":
        return {
          label: "Dịch vụ",
          className: "bg-purple-100 text-purple-800 border-purple-300"
        }
      case "supply":
        return {
          label: "Cung cấp",
          className: "bg-orange-100 text-orange-800 border-orange-300"
        }
      case "consulting":
        return {
          label: "Tư vấn",
          className: "bg-indigo-100 text-indigo-800 border-indigo-300"
        }
      case "other":
        return {
          label: "Khác",
          className: "bg-slate-100 text-slate-800 border-slate-300"
        }
      default:
        return {
          label: type,
          className: "bg-slate-100 text-slate-800 border-slate-300"
        }
    }
  }

  const config = getTypeConfig(type)

  return (
    <Badge
      variant="outline"
      className={cn(
        "px-2 py-1 text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  )
}
