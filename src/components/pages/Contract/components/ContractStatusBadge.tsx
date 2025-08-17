"use client"

import { Badge } from "@/components/ui/badge"
import { ContractStatus } from "@/types/contract"
import { cn } from "@/lib/utils"

interface ContractStatusBadgeProps {
  status: ContractStatus
  className?: string
}

export function ContractStatusBadge({ status, className }: ContractStatusBadgeProps) {
  const getStatusConfig = (status: ContractStatus) => {
    switch (status) {
      case "draft":
        return {
          label: "Nháp",
          variant: "secondary" as const,
          className: "bg-slate-100 text-slate-800 border-slate-300"
        }
      case "pending_approval":
        return {
          label: "Chờ phê duyệt",
          variant: "default" as const,
          className: "bg-amber-100 text-amber-800 border-amber-300"
        }
      case "approved":
        return {
          label: "Đã phê duyệt",
          variant: "default" as const,
          className: "bg-[#800020]/20 text-[#800020] border-[#800020]/30"
        }
      case "active":
        return {
          label: "Đang thực hiện",
          variant: "default" as const,
          className: "bg-green-100 text-green-800 border-green-300"
        }
      case "completed":
        return {
          label: "Hoàn thành",
          variant: "default" as const,
          className: "bg-emerald-100 text-emerald-800 border-emerald-300"
        }
      case "terminated":
        return {
          label: "Chấm dứt",
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 border-red-300"
        }
      case "cancelled":
        return {
          label: "Đã hủy",
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 border-red-300"
        }
      case "hidden":
        return {
          label: "Đã ẩn",
          variant: "secondary" as const,
          className: "bg-slate-100 text-slate-600 border-slate-300"
        }
      case "deleted":
        return {
          label: "Đã xóa",
          variant: "destructive" as const,
          className: "bg-red-100 text-red-600 border-red-300"
        }
      default:
        return {
          label: status,
          variant: "secondary" as const,
          className: "bg-slate-100 text-slate-800 border-slate-300"
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge
      variant={config.variant}
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
