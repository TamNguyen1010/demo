'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X,
  Building,
  Settings,
  MapPin,
  User,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface AssetsServicesSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

const AssetsServicesSearch: React.FC<AssetsServicesSearchProps> = ({ 
  onSearch, 
  onFilterChange 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: [] as string[],
    category: [] as string[],
    status: [] as string[],
    location: [] as string[],
    responsiblePerson: [] as string[],
    dateRange: {
      from: '',
      to: ''
    },
    valueRange: {
      min: '',
      max: ''
    }
  });

  const assetCategories = [
    'Hardware', 'Software', 'Office Equipment', 'Infrastructure', 'Vehicles', 'Furniture'
  ];

  const serviceCategories = [
    'IT Services', 'Cloud Services', 'Maintenance Services', 'Consulting Services', 'Support Services'
  ];

  const statusOptions = [
    { value: 'active', label: 'Đang hoạt động', icon: CheckCircle, color: 'text-green-600' },
    { value: 'inactive', label: 'Không hoạt động', icon: Clock, color: 'text-gray-600' },
    { value: 'maintenance', label: 'Bảo trì', icon: AlertTriangle, color: 'text-orange-600' },
    { value: 'retired', label: 'Đã thanh lý', icon: X, color: 'text-red-600' }
  ];

  const locationOptions = [
    'Data Center A', 'Data Center B', 'Văn phòng Tầng 1', 'Văn phòng Tầng 2', 
    'Kho hàng', 'Phòng Lab', 'Hà Nội', 'TP.HCM', 'Cloud'
  ];

  const responsiblePersonOptions = [
    'Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E'
  ];

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilterChange = (filterType: string, value: any) => {
    const newFilters = { ...filters };
    
    if (filterType === 'type' || filterType === 'category' || filterType === 'status' || 
        filterType === 'location' || filterType === 'responsiblePerson') {
      if (newFilters[filterType as keyof typeof filters].includes(value)) {
        newFilters[filterType as keyof typeof filters] = newFilters[filterType as keyof typeof filters].filter((item: string) => item !== value);
      } else {
        newFilters[filterType as keyof typeof filters] = [...newFilters[filterType as keyof typeof filters], value];
      }
    } else if (filterType === 'dateRange' || filterType === 'valueRange') {
      newFilters[filterType] = { ...newFilters[filterType], ...value };
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      type: [],
      category: [],
      status: [],
      location: [],
      responsiblePerson: [],
      dateRange: { from: '', to: '' },
      valueRange: { min: '', max: '' }
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return filters.type.length + filters.category.length + filters.status.length + 
           filters.location.length + filters.responsiblePerson.length + 
           (filters.dateRange.from ? 1 : 0) + (filters.dateRange.to ? 1 : 0) +
           (filters.valueRange.min ? 1 : 0) + (filters.valueRange.max ? 1 : 0);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Tìm kiếm Tài sản & Dịch vụ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm theo mã, tên, mô tả, người phụ trách..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getActiveFiltersCount()}
                </Badge>
              )}
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
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                Xóa tất cả
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Type Filter */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Loại
                </Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="type-asset"
                      checked={filters.type.includes('asset')}
                      onCheckedChange={() => handleFilterChange('type', 'asset')}
                    />
                    <Label htmlFor="type-asset" className="text-sm">Tài sản</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="type-service"
                      checked={filters.type.includes('service')}
                      onCheckedChange={() => handleFilterChange('type', 'service')}
                    />
                    <Label htmlFor="type-service" className="text-sm">Dịch vụ</Label>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <Label>Danh mục</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {[...assetCategories, ...serviceCategories].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.category.includes(category)}
                        onCheckedChange={() => handleFilterChange('category', category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-3">
                <Label>Trạng thái</Label>
                <div className="space-y-2">
                  {statusOptions.map((status) => (
                    <div key={status.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status.value}`}
                        checked={filters.status.includes(status.value)}
                        onCheckedChange={() => handleFilterChange('status', status.value)}
                      />
                      <Label htmlFor={`status-${status.value}`} className="text-sm flex items-center gap-1">
                        <status.icon className={`w-3 h-3 ${status.color}`} />
                        {status.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Vị trí
                </Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {locationOptions.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={filters.location.includes(location)}
                        onCheckedChange={() => handleFilterChange('location', location)}
                      />
                      <Label htmlFor={`location-${location}`} className="text-sm">
                        {location}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsible Person Filter */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Người phụ trách
                </Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {responsiblePersonOptions.map((person) => (
                    <div key={person} className="flex items-center space-x-2">
                      <Checkbox
                        id={`person-${person}`}
                        checked={filters.responsiblePerson.includes(person)}
                        onCheckedChange={() => handleFilterChange('responsiblePerson', person)}
                      />
                      <Label htmlFor={`person-${person}`} className="text-sm">
                        {person}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Range Filter */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Khoảng thời gian
                </Label>
                <div className="space-y-2">
                  <Input
                    type="date"
                    placeholder="Từ ngày"
                    value={filters.dateRange.from}
                    onChange={(e) => handleFilterChange('dateRange', { from: e.target.value })}
                  />
                  <Input
                    type="date"
                    placeholder="Đến ngày"
                    value={filters.dateRange.to}
                    onChange={(e) => handleFilterChange('dateRange', { to: e.target.value })}
                  />
                </div>
              </div>

              {/* Value Range Filter */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Khoảng giá trị
                </Label>
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Giá trị tối thiểu"
                    value={filters.valueRange.min}
                    onChange={(e) => handleFilterChange('valueRange', { min: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Giá trị tối đa"
                    value={filters.valueRange.max}
                    onChange={(e) => handleFilterChange('valueRange', { max: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {getActiveFiltersCount() > 0 && (
              <div className="mt-6 pt-4 border-t">
                <Label className="text-sm font-medium mb-2">Bộ lọc đang áp dụng:</Label>
                <div className="flex flex-wrap gap-2">
                  {filters.type.map((type) => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      Loại: {type === 'asset' ? 'Tài sản' : 'Dịch vụ'}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleFilterChange('type', type)}
                      />
                    </Badge>
                  ))}
                  {filters.category.map((category) => (
                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                      Danh mục: {category}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleFilterChange('category', category)}
                      />
                    </Badge>
                  ))}
                  {filters.status.map((status) => (
                    <Badge key={status} variant="secondary" className="flex items-center gap-1">
                      Trạng thái: {statusOptions.find(s => s.value === status)?.label}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleFilterChange('status', status)}
                      />
                    </Badge>
                  ))}
                  {filters.location.map((location) => (
                    <Badge key={location} variant="secondary" className="flex items-center gap-1">
                      Vị trí: {location}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleFilterChange('location', location)}
                      />
                    </Badge>
                  ))}
                  {filters.responsiblePerson.map((person) => (
                    <Badge key={person} variant="secondary" className="flex items-center gap-1">
                      Người phụ trách: {person}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleFilterChange('responsiblePerson', person)}
                      />
                    </Badge>
                  ))}
                  {(filters.dateRange.from || filters.dateRange.to) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Thời gian: {filters.dateRange.from} - {filters.dateRange.to}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleFilterChange('dateRange', { from: '', to: '' })}
                      />
                    </Badge>
                  )}
                  {(filters.valueRange.min || filters.valueRange.max) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Giá trị: {filters.valueRange.min} - {filters.valueRange.max}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => handleFilterChange('valueRange', { min: '', max: '' })}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Search Results Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Kết quả tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bắt đầu tìm kiếm</h3>
            <p className="text-gray-500">Nhập từ khóa hoặc sử dụng bộ lọc để tìm kiếm tài sản và dịch vụ</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetsServicesSearch;
