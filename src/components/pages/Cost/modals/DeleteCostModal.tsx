'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Trash2,
  AlertTriangle,
  X,
  CheckCircle
} from 'lucide-react';

interface CostItem {
  id: number;
  costCode: string;
  costName: string;
  costCategory: string;
  totalAmount: number;
  currency: string;
  supplier: string;
  project?: string;
  contract?: string;
}

interface DeleteCostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cost: CostItem;
}

const DeleteCostModal: React.FC<DeleteCostModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  cost 
}) => {
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteType, setDeleteType] = useState<'soft' | 'hard'>('soft');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!deleteReason.trim()) {
      alert('Vui lòng nhập lý do xóa');
      return;
    }

    setLoading(true);

    try {
      // Mock API call - replace with actual API
      console.log('Deleting cost:', {
        costId: cost.id,
        deleteReason,
        deleteType
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
    } catch (error) {
      console.error('Error deleting cost:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Xác nhận xóa chi phí
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Cảnh báo</span>
            </div>
            <p className="text-red-700 text-sm mt-2">
              Hành động này sẽ xóa khoản mục chi phí khỏi hệ thống. 
              {deleteType === 'soft' 
                ? ' Dữ liệu sẽ được lưu trữ trong 30 ngày và có thể khôi phục.'
                : ' Dữ liệu sẽ bị xóa vĩnh viễn và không thể khôi phục.'
              }
            </p>
          </div>

          {/* Cost Information */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Thông tin chi phí sẽ bị xóa:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã chi phí:</span>
                  <span className="font-medium">{cost.costCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tên chi phí:</span>
                  <span className="font-medium">{cost.costName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Danh mục:</span>
                  <span className="font-medium">{cost.costCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số tiền:</span>
                  <span className="font-medium">{formatAmount(cost.totalAmount, cost.currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nhà cung cấp:</span>
                  <span className="font-medium">{cost.supplier}</span>
                </div>
                {cost.project && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dự án:</span>
                    <span className="font-medium">{cost.project}</span>
                  </div>
                )}
                {cost.contract && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hợp đồng:</span>
                    <span className="font-medium">{cost.contract}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Delete Type Selection */}
          <div className="space-y-2">
            <Label>Loại xóa</Label>
            <Select value={deleteType} onValueChange={(value: 'soft' | 'hard') => setDeleteType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soft">Xóa mềm (có thể khôi phục)</SelectItem>
                <SelectItem value="hard">Xóa vĩnh viễn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Delete Reason */}
          <div className="space-y-2">
            <Label htmlFor="deleteReason">Lý do xóa *</Label>
            <Input
              id="deleteReason"
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="Nhập lý do xóa khoản mục chi phí này..."
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete}
              disabled={loading || !deleteReason.trim()}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {loading ? 'Đang xóa...' : 'Xác nhận xóa'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCostModal;
