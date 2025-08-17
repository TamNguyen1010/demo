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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  History,
  Download,
  Upload,
  Building,
  Settings,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface AssetService {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'service';
  category: string;
  status: 'active' | 'inactive' | 'maintenance' | 'retired';
  responsiblePerson: string;
  location: string;
  purchaseCost?: number;
  currentValue?: number;
  purchaseDate?: string;
  warrantyExpiry?: string;
  nextMaintenance?: string;
  serviceProvider?: string;
  serviceCost?: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface AssetsServicesListProps {
  searchQuery?: string;
  filters?: any;
}

const AssetsServicesList: React.FC<AssetsServicesListProps> = ({ 
  searchQuery = '', 
  filters = {} 
}) => {
  const [assetsServices, setAssetsServices] = useState<AssetService[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    fetchAssetsServices();
  }, []);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const fetchAssetsServices = async () => {
    // Mock data - replace with actual API call
    const mockData: AssetService[] = [
      {
        id: '1',
        code: 'TS2024000001',
        name: 'Máy chủ Dell PowerEdge R740',
        type: 'asset',
        category: 'Hardware',
        status: 'active',
        responsiblePerson: 'Nguyễn Văn A',
        location: 'Data Center A',
        purchaseCost: 45000000,
        currentValue: 40000000,
        purchaseDate: '2024-01-15',
        warrantyExpiry: '2027-01-15',
        nextMaintenance: '2024-03-15',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-25T14:20:00Z'
      },
      {
        id: '2',
        code: 'DV2024000001',
        name: 'Dịch vụ bảo trì hệ thống ERP',
        type: 'service',
        category: 'IT Services',
        status: 'active',
        responsiblePerson: 'Trần Thị B',
        location: 'Hà Nội',
        serviceProvider: 'Công ty ABC',
        serviceCost: 12000000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        createdAt: '2024-01-01T09:00:00Z',
        updatedAt: '2024-01-20T16:45:00Z'
      },
      {
        id: '3',
        code: 'TS2024000002',
        name: 'Máy in HP LaserJet Pro',
        type: 'asset',
        category: 'Office Equipment',
        status: 'maintenance',
        responsiblePerson: 'Lê Văn C',
        location: 'Văn phòng Tầng 2',
        purchaseCost: 8000000,
        currentValue: 6000000,
        purchaseDate: '2023-06-20',
        warrantyExpiry: '2025-06-20',
        nextMaintenance: '2024-02-10',
        createdAt: '2023-06-20T11:15:00Z',
        updatedAt: '2024-01-22T10:30:00Z'
      },
      {
        id: '4',
        code: 'DV2024000002',
        name: 'Dịch vụ đám mây AWS',
        type: 'service',
        category: 'Cloud Services',
        status: 'active',
        responsiblePerson: 'Phạm Thị D',
        location: 'Cloud',
        serviceProvider: 'Amazon Web Services',
        serviceCost: 5000000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        createdAt: '2024-01-01T08:00:00Z',
        updatedAt: '2024-01-18T13:20:00Z'
      },
      {
        id: '5',
        code: 'TS2024000003',
        name: 'Máy tính xách tay Dell Latitude',
        type: 'asset',
        category: 'Hardware',
        status: 'active',
        responsiblePerson: 'Hoàng Văn E',
        location: 'Văn phòng Tầng 1',
        purchaseCost: 25000000,
        currentValue: 20000000,
        purchaseDate: '2023-12-10',
        warrantyExpiry: '2026-12-10',
        nextMaintenance: '2024-04-10',
        createdAt: '2023-12-10T14:45:00Z',
        updatedAt: '2024-01-24T09:15:00Z'
      }
    ];

    setAssetsServices(mockData);
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Đang hoạt động' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Không hoạt động' },
      maintenance: { color: 'bg-orange-100 text-orange-800', label: 'Bảo trì' },
      retired: { color: 'bg-red-100 text-red-800', label: 'Đã thanh lý' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    return type === 'asset' ? <Building className="w-4 h-4" /> : <Settings className="w-4 h-4" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleEdit = (id: string) => {
    console.log('Edit asset/service:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete asset/service:', id);
  };

  const handleView = (id: string) => {
    console.log('View asset/service:', id);
  };

  const handleHistory = (id: string) => {
    console.log('View history:', id);
  };

  const filteredAssetsServices = assetsServices.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.responsiblePerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Add more filter logic here based on filters prop
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#800020] mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm tài sản, dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Bộ lọc
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Nhập Excel
          </Button>
        </div>
      </div>

      {/* Assets/Services Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Danh sách Tài sản & Dịch vụ ({filteredAssetsServices.length})</span>
            <div className="flex items-center space-x-2">
              {selectedItems.length > 0 && (
                <Badge variant="secondary">
                  {selectedItems.length} mục đã chọn
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(filteredAssetsServices.map(item => item.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Mã</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Người phụ trách</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Giá trị</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="w-12">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssetsServices.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, item.id]);
                        } else {
                          setSelectedItems(selectedItems.filter(id => id !== item.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(item.type)}
                      <span>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.type === 'asset' ? 'Tài sản' : 'Dịch vụ'}</Badge>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.responsiblePerson}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    {item.type === 'asset' 
                      ? formatCurrency(item.currentValue || 0)
                      : formatCurrency(item.serviceCost || 0)
                    }
                  </TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleView(item.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleHistory(item.id)}>
                          <History className="w-4 h-4 mr-2" />
                          Lịch sử
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredAssetsServices.length === 0 && (
            <div className="text-center py-12">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không có dữ liệu</h3>
              <p className="text-gray-500">Không tìm thấy tài sản hoặc dịch vụ nào phù hợp</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetsServicesList;
