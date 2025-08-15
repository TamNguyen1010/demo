"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  X, 
  Trash2, 
  AlertTriangle,
  FileText
} from "lucide-react"
import { Contract } from "@/types/contract"

interface DeleteContractModalProps {
  isOpen: boolean
  onClose: () => void
  contract: Contract | null
  onConfirm: (contract: Contract) => void
}

export function DeleteContractModal({ isOpen, onClose, contract, onConfirm }: DeleteContractModalProps) {
  if (!isOpen || !contract) return null

  const handleConfirm = () => {
    onConfirm(contract)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Xác nhận xóa hợp đồng
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-slate-600">
              Bạn có chắc chắn muốn xóa hợp đồng này không?
            </p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-medium">
                <FileText className="w-4 h-4 text-[#800020]" />
                {contract.name}
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Số hợp đồng: {contract.contract_number || 'Chưa có'}
              </p>
              <p className="text-sm text-slate-600">
                Loại: {contract.type === 'service' ? 'Dịch vụ' : 
                       contract.type === 'construction' ? 'Xây dựng' :
                       contract.type === 'supply' ? 'Cung cấp' :
                       contract.type === 'consulting' ? 'Tư vấn' : contract.type}
              </p>
            </div>
            <p className="text-sm text-red-600 font-medium">
              ⚠️ Hành động này không thể hoàn tác!
            </p>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-slate-300 hover:bg-slate-50 text-slate-700"
            >
              Hủy
            </Button>
            <Button 
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa hợp đồng
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
