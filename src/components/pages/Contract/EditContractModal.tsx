"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  X, 
  Save, 
  FileText,
  Calendar,
  DollarSign,
  User,
  Building
} from "lucide-react"
import { Contract } from "@/types/contract"

interface EditContractModalProps {
  isOpen: boolean
  onClose: () => void
  contract: Contract | null
  onSubmit: (contract: Contract) => void
}

export function EditContractModal({ isOpen, onClose, contract, onSubmit }: EditContractModalProps) {
  const [formData, setFormData] = useState<Partial<Contract>>({
    name: "",
    contract_number: "",
    type: "service",
    value: 0,
    currency: "VND",
    start_date: "",
    end_date: "",
    description: "",
    client_name: "",
    contractor_name: "",
    manager_name: "",
    status: "draft"
  })

  // Update form data when contract changes
  useEffect(() => {
    if (contract) {
      setFormData({
        name: contract.name || "",
        contract_number: contract.contract_number || "",
        type: contract.type || "service",
        value: contract.value || 0,
        currency: contract.currency || "VND",
        start_date: contract.start_date ? contract.start_date.split('T')[0] : "",
        end_date: contract.end_date ? contract.end_date.split('T')[0] : "",
        description: contract.description || "",
        client_name: contract.client_name || "",
        contractor_name: contract.contractor_name || "",
        manager_name: contract.manager_name || "",
        status: contract.status || "draft"
      })
    }
  }, [contract])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (contract) {
      const updatedContract = {
        ...contract,
        ...formData,
        updated_at: new Date().toISOString()
      }
      onSubmit(updatedContract)
      onClose()
    }
  }

  if (!isOpen || !contract) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#800020]" />
            Chỉnh sửa Hợp đồng
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Tên hợp đồng <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nhập tên hợp đồng"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contract_number" className="text-sm font-medium text-slate-700">
                    Số hợp đồng
                  </Label>
                  <Input
                    id="contract_number"
                    value={formData.contract_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, contract_number: e.target.value }))}
                    placeholder="HD-2024-001"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="type" className="text-sm font-medium text-slate-700">
                    Loại hợp đồng
                  </Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                  >
                    <option value="service">Dịch vụ</option>
                    <option value="construction">Xây dựng</option>
                    <option value="supply">Cung cấp</option>
                    <option value="consulting">Tư vấn</option>
                  </select>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="value" className="text-sm font-medium text-slate-700">
                    Giá trị hợp đồng <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="value"
                      type="number"
                      value={formData.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                      placeholder="0"
                      className="pl-10"
                      required
                    />
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="currency" className="text-sm font-medium text-slate-700">
                    Đơn vị tiền tệ
                  </Label>
                  <select
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                  >
                    <option value="VND">VND</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="status" className="text-sm font-medium text-slate-700">
                    Trạng thái
                  </Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                  >
                    <option value="draft">Nháp</option>
                    <option value="pending">Chờ duyệt</option>
                    <option value="active">Đang thực hiện</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="start_date" className="text-sm font-medium text-slate-700">
                  Ngày bắt đầu <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="end_date" className="text-sm font-medium text-slate-700">
                  Ngày kết thúc
                </Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="client_name" className="text-sm font-medium text-slate-700">
                  Tên khách hàng
                </Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                  placeholder="Tên khách hàng"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contractor_name" className="text-sm font-medium text-slate-700">
                  Tên nhà thầu
                </Label>
                <Input
                  id="contractor_name"
                  value={formData.contractor_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, contractor_name: e.target.value }))}
                  placeholder="Tên nhà thầu"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="manager_name" className="text-sm font-medium text-slate-700">
                  Người quản lý
                </Label>
                <Input
                  id="manager_name"
                  value={formData.manager_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, manager_name: e.target.value }))}
                  placeholder="Tên người quản lý"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                Mô tả hợp đồng
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Mô tả chi tiết về hợp đồng..."
                className="mt-1"
                rows={4}
              />
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 bg-white p-6 -mx-6 -mb-6">
              <div className="flex items-center justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
                >
                  Hủy
                </Button>
                <Button 
                  type="submit"
                  disabled={!formData.name || !formData.value}
                  className="bg-[#800020] hover:bg-[#700018] text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
