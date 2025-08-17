'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter
} from 'lucide-react';

import CostStatusBadge from './components/CostStatusBadge';
import CostPaymentBadge from './components/CostPaymentBadge';
import CostCategoryBadge from './components/CostCategoryBadge';
import CostAmountDisplay from './components/CostAmountDisplay';
import EditCostModal from './modals/EditCostModal';
import DeleteCostModal from './modals/DeleteCostModal';

interface CostItem {
  id: number;
  costCode: string;
  costName: string;
  costCategory: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  currency: string;
  costStatus: 'active' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'partial' | 'paid' | 'overdue';
  approvalStatus: 'draft' | 'pending' | 'approved' | 'rejected';
  plannedStartDate: string;
  plannedEndDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  supplier: string;
  project?: string;
  contract?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface CostListProps {
  searchQuery?: string;
  filters?: any;
}

const CostList: React.FC<CostListProps> = ({ searchQuery = '', filters = {} }) => {
  const [costs, setCosts] = useState<CostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCost, setSelectedCost] = useState<CostItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchCosts();
  }, [searchQuery, filters, currentPage]);

  const fetchCosts = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockCosts: CostItem[] = [
        {
          id: 1,
          costCode: 'CP-2024-0001',
          costName: 'Chi phí thiết bị văn phòng',
          costCategory: 'Thiết bị',
          totalAmount: 50000000,
          paidAmount: 30000000,
          remainingAmount: 20000000,
          currency: 'VND',
          costStatus: 'active',
          paymentStatus: 'partial',
          approvalStatus: 'approved',
          plannedStartDate: '2024-01-15',
          plannedEndDate: '2024-02-15',
          actualStartDate: '2024-01-15',
          supplier: 'Công ty ABC',
          project: 'Dự án A',
          contract: 'HĐ-2024-001',
          createdBy: 'Nguyễn Văn A',
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-25T15:30:00Z'
        },
        {
          id: 2,
          costCode: 'CP-2024-0002',
          costName: 'Chi phí dịch vụ tư vấn',
          costCategory: 'Dịch vụ',
          totalAmount: 100000000,
          paidAmount: 100000000,
          remainingAmount: 0,
          currency: 'VND',
          costStatus: 'completed',
          paymentStatus: 'paid',
          approvalStatus: 'approved',
          plannedStartDate: '2024-01-01',
          plannedEndDate: '2024-01-31',
          actualStartDate: '2024-01-01',
          actualEndDate: '2024-01-31',
          supplier: 'Công ty Tư vấn XYZ',
          project: 'Dự án B',
          createdBy: 'Trần Thị B',
          createdAt: '2024-01-05T09:00:00Z',
          updatedAt: '2024-01-31T16:00:00Z'
        },
        {
          id: 3,
          costCode: 'CP-2024-0003',
          costName: 'Chi phí vật tư xây dựng',
          costCategory: 'Vật tư',
          totalAmount: 75000000,
          paidAmount: 0,
          remainingAmount: 75000000,
          currency: 'VND',
          costStatus: 'active',
          paymentStatus: 'overdue',
          approvalStatus: 'approved',
          plannedStartDate: '2024-01-20',
          plannedEndDate: '2024-02-20',
          supplier: 'Công ty Vật tư DEF',
          project: 'Dự án C',
          createdBy: 'Lê Văn C',
          createdAt: '2024-01-15T14:00:00Z',
          updatedAt: '2024-01-25T11:00:00Z'
        }
      ];

      setCosts(mockCosts);
    } catch (error) {
      console.error('Error fetching costs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cost: CostItem) => {
    setSelectedCost(cost);
    setIsEditModalOpen(true);
  };

  const handleDelete = (cost: CostItem) => {
    setSelectedCost(cost);
    setIsDeleteModalOpen(true);
  };

  const handleView = (cost: CostItem) => {
    // Navigate to cost detail page
    console.log('View cost:', cost);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    fetchCosts();
  };

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false);
    fetchCosts();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Input
            placeholder="Tìm kiếm theo mã, tên chi phí..."
            className="w-64"
            value={searchQuery}
            onChange={(e) => console.log('Search:', e.target.value)}
          />
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Bộ lọc
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          Hiển thị {costs.length} khoản mục chi phí
        </div>
      </div>

      {/* Cost Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Chi phí</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã chi phí</TableHead>
                <TableHead>Tên chi phí</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thanh toán</TableHead>
                <TableHead>Nhà cung cấp</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costs.map((cost) => (
                <TableRow key={cost.id}>
                  <TableCell className="font-medium">
                    {cost.costCode}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{cost.costName}</div>
                      {cost.project && (
                        <div className="text-sm text-gray-500">
                          Dự án: {cost.project}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <CostCategoryBadge category={cost.costCategory} />
                  </TableCell>
                  <TableCell>
                    <CostAmountDisplay 
                      amount={cost.totalAmount}
                      currency={cost.currency}
                      paidAmount={cost.paidAmount}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(cost.costStatus)}
                      <CostStatusBadge status={cost.costStatus} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <CostPaymentBadge status={cost.paymentStatus} />
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{cost.supplier}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(cost.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Mở menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(cost)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(cost)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(cost)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {costs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Không có dữ liệu chi phí nào
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {costs.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Hiển thị {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, costs.length)} của {costs.length} kết quả
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage * itemsPerPage >= costs.length}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Sau
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedCost && (
        <>
          <EditCostModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSuccess={handleEditSuccess}
            cost={selectedCost}
          />

          <DeleteCostModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onSuccess={handleDeleteSuccess}
            cost={selectedCost}
          />
        </>
      )}
    </div>
  );
};

export default CostList;
