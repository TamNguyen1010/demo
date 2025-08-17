"use client"

import { useState } from "react"
import { 
  Home, 
  FolderOpen, 
  Gavel, 
  FileText, 
  DollarSign, 
  Package, 
  BarChart3,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "project-category", label: "Dự án", icon: FolderOpen },
    { id: "bidding-packages", label: "Gói thầu", icon: Gavel },
    { id: "contracts", label: "Hợp đồng", icon: FileText },
    { id: "costs", label: "Chi phí", icon: DollarSign },
    { id: "assets-services", label: "Tài sản & dịch vụ", icon: Package },
    { id: "reports", label: "Báo cáo", icon: BarChart3 }
  ]

  return (
    <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-sm`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        {!sidebarCollapsed && (
          <h2 className="text-lg font-bold text-slate-900">Agribank</h2>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <div className="flex flex-col space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <div 
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} ${
                  currentPage === item.id ? 'bg-[#800020]/10 border border-[#800020]/20' : 'hover:bg-slate-50'
                }`}
              >
                <IconComponent className={`w-5 h-5 flex-shrink-0 ${currentPage === item.id ? 'text-[#800020]' : 'text-slate-600'}`} />
                {!sidebarCollapsed && (
                  <span className={`text-sm ${currentPage === item.id ? 'font-medium text-[#800020]' : 'text-slate-700'}`}>
                    {item.label}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}
