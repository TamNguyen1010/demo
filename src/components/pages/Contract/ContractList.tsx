"use client"

import { useState } from "react"
import { Contract } from "@/types/contract"
import { ContractStatusBadge } from "./components/ContractStatusBadge"
import { ContractTypeBadge } from "./components/ContractTypeBadge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  Calendar, 
  DollarSign,
  Building2,
  User
} from "lucide-react"

interface ContractListProps {
  contracts: Contract[]
  onViewContract: (contract: Contract) => void
  onEditContract: (contract: Contract) => void
  onDeleteContract: (contract: Contract) => void
  onSelectContract: (contractId: number, selected: boolean) => void
  selectedContracts: number[]
}

export function ContractList({
  contracts,
  onViewContract,
  onEditContract,
  onDeleteContract,
  onSelectContract,
  selectedContracts
}: ContractListProps) {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency
    }).format(value)
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('vi-VN').format(dateObj)
  }

  const getProgressPercentage = (contract: Contract) => {
    if (contract.status === 'completed') return 100
    if (contract.status === 'draft') return 0
    
    const start = new Date(contract.start_date).getTime()
    const end = new Date(contract.end_date).getTime()
    const now = new Date().getTime()
    
    if (now < start) return 0
    if (now > end) return 100
    
    return Math.round(((now - start) / (end - start)) * 100)
  }

  if (viewMode === 'card') {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">Danh sách hợp đồng ({contracts.length})</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('table')}
              className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
            >
              Bảng
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setViewMode('card')}
              className="bg-[#800020] hover:bg-[#700018] text-white"
            >
              Thẻ
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contracts.map((contract) => (
            <Card key={contract.id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-base text-slate-900">{contract.name}</CardTitle>
                    <div className="flex gap-2">
                      <ContractStatusBadge status={contract.status} />
                      <ContractTypeBadge type={contract.type} />
                    </div>
                  </div>
                  <Checkbox
                    checked={selectedContracts.includes(contract.id)}
                    onCheckedChange={(checked) => onSelectContract(contract.id, checked as boolean)}
                    className="text-[#800020] border-slate-300 focus:ring-[#800020]"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <FileText className="h-4 w-4 text-[#800020]" />
                    <span>{contract.contract_number}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <DollarSign className="h-4 w-4 text-[#800020]" />
                    <span>{formatCurrency(contract.value, contract.currency)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="h-4 w-4 text-[#800020]" />
                    <span>{formatDate(new Date(contract.start_date))} - {formatDate(new Date(contract.end_date))}</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Tiến độ</span>
                    <span>{getProgressPercentage(contract)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#800020] to-[#A00030] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(contract)}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewContract(contract)}
                    className="flex-1 border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
                  >
                    <Eye className="h-4 h-4 mr-1" />
                    Xem
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditContract(contract)}
                    className="flex-1 border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Sửa
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteContract(contract)}
                    className="border-red-500/30 hover:bg-red-500/10 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900">Danh sách hợp đồng ({contracts.length})</h3>
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => setViewMode('table')}
            className="bg-[#800020] hover:bg-[#700018] text-white"
          >
            Bảng
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('card')}
            className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
          >
            Thẻ
          </Button>
        </div>
      </div>
      
      <div className="border border-slate-200 rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-100">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedContracts.length === contracts.length && contracts.length > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      contracts.forEach(c => onSelectContract(c.id, true))
                    } else {
                      contracts.forEach(c => onSelectContract(c.id, false))
                    }
                  }}
                  className="text-[#800020] border-slate-300 focus:ring-[#800020]"
                />
              </TableHead>
              <TableHead className="font-semibold text-slate-700">Số hợp đồng</TableHead>
              <TableHead className="font-semibold text-slate-700">Tên hợp đồng</TableHead>
              <TableHead className="font-semibold text-slate-700">Loại</TableHead>
              <TableHead className="font-semibold text-slate-700">Trạng thái</TableHead>
              <TableHead className="font-semibold text-slate-700">Giá trị</TableHead>
              <TableHead className="font-semibold text-slate-700">Thời gian</TableHead>
              <TableHead className="w-32 font-semibold text-slate-700">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.id} className="hover:bg-slate-50 transition-colors duration-200">
                <TableCell>
                  <Checkbox
                    checked={selectedContracts.includes(contract.id)}
                    onCheckedChange={(checked) => onSelectContract(contract.id, checked as boolean)}
                    className="text-[#800020] border-slate-300 focus:ring-[#800020]"
                  />
                </TableCell>
                <TableCell className="font-medium text-slate-900">{contract.contract_number}</TableCell>
                <TableCell>
                  <div className="max-w-xs truncate" title={contract.name}>
                    {contract.name}
                  </div>
                </TableCell>
                <TableCell>
                  <ContractTypeBadge type={contract.type} />
                </TableCell>
                <TableCell>
                  <ContractStatusBadge status={contract.status} />
                </TableCell>
                <TableCell className="font-medium text-slate-900">
                  {formatCurrency(contract.value, contract.currency)}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{formatDate(new Date(contract.start_date))}</div>
                    <div className="text-slate-500">đến {formatDate(new Date(contract.end_date))}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewContract(contract)}
                      className="hover:bg-[#800020]/10 text-[#800020]"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditContract(contract)}
                      className="hover:bg-[#800020]/10 text-[#800020]"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteContract(contract)}
                      className="hover:bg-red-500/10 text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
