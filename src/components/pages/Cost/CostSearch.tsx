'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  X, 
  Save,
  Download,
  Calendar,
  DollarSign
} from 'lucide-react';

interface CostSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

const CostSearch: React.FC<CostSearchProps> = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    costCategory: [],
    costStatus: [],
    paymentStatus: [],
    approvalStatus: [],
    amountRange: { min: '', max: '' },
    dateRange: { from: '', to: '' },
    supplier: [],
    project: [],
    contract: []
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilterChange = (filterType: string, value: any) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      costCategory: [],
      costStatus: [],
      paymentStatus: [],
      approvalStatus: [],
      amountRange: { min: '', max: '' },
      dateRange: { from: '', to: '' },
      supplier: [],
      project: [],
      contract: []
    });
    onFilterChange({});
  };

  const saveSearchFilter = () => {
    // Save current search and filter combination
    console.log('Saving search filter:', { searchQuery, filters });
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Tìm kiếm Chi phí
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Search */}
          <div className="flex gap-2">
            <Input
              placeholder="Tìm kiếm theo mã chi phí, tên chi phí, mô tả..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc nâng cao
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleFilterChange('paymentStatus', ['overdue'])}
            >
              Quá hạn thanh toán
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleFilterChange('costStatus', ['active'])}
            >
              Đang hoạt động
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleFilterChange('approvalStatus', ['pending'])}
            >
              Chờ phê duyệt
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleFilterChange('paymentStatus', ['partial'])}
            >
              Thanh toán một phần
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Bộ lọc nâng cao
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={saveSearchFilter}>
                  <Save className="w-4 h-4 mr-2" />
                  Lưu bộ lọc
                </Button>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-2" />
                  Xóa bộ lọc
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div className="space-y-2">
                <Label>Danh mục chi phí</Label>
                <div className="space-y-2">
                  {['Thiết bị', 'Dịch vụ', 'Vật tư', 'Nhân sự', 'Văn phòng', 'Xây dựng'].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.costCategory.includes(category)}
                        onCheckedChange={(checked) => {
                          const newCategories = checked
                            ? [...filters.costCategory, category]
                            : filters.costCategory.filter(c => c !== category);
                          handleFilterChange('costCategory', newCategories);
                        }}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Filters */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Trạng thái chi phí</Label>
                  <Select
                    value={filters.costStatus.join(',')}
                    onValueChange={(value) => handleFilterChange('costStatus', value ? value.split(',') : [])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Đang hoạt động</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                      <SelectItem value="cancelled">Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Trạng thái thanh toán</Label>
                  <Select
                    value={filters.paymentStatus.join(',')}
                    onValueChange={(value) => handleFilterChange('paymentStatus', value ? value.split(',') : [])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái thanh toán" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Chờ thanh toán</SelectItem>
                      <SelectItem value="partial">Thanh toán một phần</SelectItem>
                      <SelectItem value="paid">Đã thanh toán</SelectItem>
                      <SelectItem value="overdue">Quá hạn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Trạng thái phê duyệt</Label>
                  <Select
                    value={filters.approvalStatus.join(',')}
                    onValueChange={(value) => handleFilterChange('approvalStatus', value ? value.split(',') : [])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái phê duyệt" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Nháp</SelectItem>
                      <SelectItem value="pending">Chờ phê duyệt</SelectItem>
                      <SelectItem value="approved">Đã phê duyệt</SelectItem>
                      <SelectItem value="rejected">Từ chối</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Amount and Date Range */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Khoảng số tiền
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Từ"
                      type="number"
                      value={filters.amountRange.min}
                      onChange={(e) => handleFilterChange('amountRange', {
                        ...filters.amountRange,
                        min: e.target.value
                      })}
                    />
                    <Input
                      placeholder="Đến"
                      type="number"
                      value={filters.amountRange.max}
                      onChange={(e) => handleFilterChange('amountRange', {
                        ...filters.amountRange,
                        max: e.target.value
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Khoảng thời gian
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      value={filters.dateRange.from}
                      onChange={(e) => handleFilterChange('dateRange', {
                        ...filters.dateRange,
                        from: e.target.value
                      })}
                    />
                    <Input
                      type="date"
                      value={filters.dateRange.to}
                      onChange={(e) => handleFilterChange('dateRange', {
                        ...filters.dateRange,
                        to: e.target.value
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Nhà cung cấp</Label>
                  <Select
                    value={filters.supplier.join(',')}
                    onValueChange={(value) => handleFilterChange('supplier', value ? value.split(',') : [])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhà cung cấp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supplier-1">Công ty ABC</SelectItem>
                      <SelectItem value="supplier-2">Công ty XYZ</SelectItem>
                      <SelectItem value="supplier-3">Công ty DEF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Dự án</Label>
                  <Select
                    value={filters.project.join(',')}
                    onValueChange={(value) => handleFilterChange('project', value ? value.split(',') : [])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn dự án" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project-1">Dự án A</SelectItem>
                      <SelectItem value="project-2">Dự án B</SelectItem>
                      <SelectItem value="project-3">Dự án C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Kết quả tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Tìm thấy <span className="font-semibold">1,250</span> khoản mục chi phí
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất kết quả
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostSearch;
