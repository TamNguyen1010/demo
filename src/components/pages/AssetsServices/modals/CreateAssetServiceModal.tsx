'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Settings, 
  Save, 
  X, 
  Upload,
  Calendar,
  DollarSign,
  MapPin,
  User
} from 'lucide-react';

interface CreateAssetServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateAssetServiceModal: React.FC<CreateAssetServiceModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState('asset');
  const [formData, setFormData] = useState({
    // Common fields
    name: '',
    description: '',
    category: '',
    subcategory: '',
    responsiblePerson: '',
    location: '',
    status: 'draft',
    priority: 'medium',
    
    // Asset specific fields
    model: '',
    specifications: '',
    serialNumber: '',
    manufacturer: '',
    supplier: '',
    purchaseDate: '',
    purchaseCost: '',
    currentValue: '',
    warrantyStartDate: '',
    warrantyEndDate: '',
    warrantyTerms: '',
    
    // Service specific fields
    serviceProvider: '',
    serviceContact: '',
    servicePhone: '',
    serviceEmail: '',
    startDate: '',
    endDate: '',
    serviceCost: '',
    billingFrequency: 'monthly',
    serviceLevelAgreement: '',
    performanceMetrics: ''
  });

  const assetCategories = [
    'Hardware', 'Software', 'Office Equipment', 'Infrastructure', 'Vehicles', 'Furniture'
  ];

  const serviceCategories = [
    'IT Services', 'Cloud Services', 'Maintenance Services', 'Consulting Services', 'Support Services'
  ];

  const statusOptions = [
    { value: 'draft', label: 'Bản nháp' },
    { value: 'active', label: 'Đang hoạt động' },
    { value: 'inactive', label: 'Không hoạt động' },
    { value: 'maintenance', label: 'Bảo trì' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Thấp' },
    { value: 'medium', label: 'Trung bình' },
    { value: 'high', label: 'Cao' },
    { value: 'critical', label: 'Quan trọng' }
  ];

  const billingFrequencyOptions = [
    { value: 'monthly', label: 'Hàng tháng' },
    { value: 'quarterly', label: 'Hàng quý' },
    { value: 'annually', label: 'Hàng năm' },
    { value: 'one_time', label: 'Một lần' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Mock API call - replace with actual API
      console.log('Creating asset/service:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
    } catch (error) {
      console.error('Error creating asset/service:', error);
    }
  };

  const generateCode = () => {
    const prefix = activeTab === 'asset' ? 'TS' : 'DV';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${year}${random}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {activeTab === 'asset' ? <Building className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
            Tạo mới {activeTab === 'asset' ? 'Tài sản' : 'Dịch vụ'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selection */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="asset" className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Tài sản
              </TabsTrigger>
              <TabsTrigger value="service" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Dịch vụ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="asset" className="space-y-6">
              {/* Asset Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Thông tin cơ bản</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="asset-name">Tên tài sản *</Label>
                    <Input
                      id="asset-name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Nhập tên tài sản"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset-description">Mô tả</Label>
                    <Textarea
                      id="asset-description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Mô tả chi tiết về tài sản"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset-category">Danh mục *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {assetCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset-subcategory">Danh mục con</Label>
                    <Input
                      id="asset-subcategory"
                      value={formData.subcategory}
                      onChange={(e) => handleInputChange('subcategory', e.target.value)}
                      placeholder="Danh mục con (nếu có)"
                    />
                  </div>
                </div>

                {/* Technical Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Thông tin kỹ thuật</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="asset-model">Model</Label>
                    <Input
                      id="asset-model"
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      placeholder="Model tài sản"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset-specifications">Thông số kỹ thuật</Label>
                    <Textarea
                      id="asset-specifications"
                      value={formData.specifications}
                      onChange={(e) => handleInputChange('specifications', e.target.value)}
                      placeholder="Thông số kỹ thuật chi tiết"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset-serial">Số serial</Label>
                    <Input
                      id="asset-serial"
                      value={formData.serialNumber}
                      onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                      placeholder="Số serial"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset-manufacturer">Nhà sản xuất</Label>
                    <Input
                      id="asset-manufacturer"
                      value={formData.manufacturer}
                      onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                      placeholder="Nhà sản xuất"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Thông tin tài chính</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="asset-purchase-date">Ngày mua</Label>
                    <Input
                      id="asset-purchase-date"
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset-purchase-cost">Giá mua</Label>
                    <Input
                      id="asset-purchase-cost"
                      type="number"
                      value={formData.purchaseCost}
                      onChange={(e) => handleInputChange('purchaseCost', e.target.value)}
                      placeholder="Giá mua (VND)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset-current-value">Giá trị hiện tại</Label>
                    <Input
                      id="asset-current-value"
                      type="number"
                      value={formData.currentValue}
                      onChange={(e) => handleInputChange('currentValue', e.target.value)}
                      placeholder="Giá trị hiện tại (VND)"
                    />
                  </div>
                </div>
              </div>

              {/* Warranty Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Thông tin bảo hành</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="asset-warranty-start">Ngày bắt đầu bảo hành</Label>
                    <Input
                      id="asset-warranty-start"
                      type="date"
                      value={formData.warrantyStartDate}
                      onChange={(e) => handleInputChange('warrantyStartDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset-warranty-end">Ngày kết thúc bảo hành</Label>
                    <Input
                      id="asset-warranty-end"
                      type="date"
                      value={formData.warrantyEndDate}
                      onChange={(e) => handleInputChange('warrantyEndDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asset-warranty-terms">Điều khoản bảo hành</Label>
                  <Textarea
                    id="asset-warranty-terms"
                    value={formData.warrantyTerms}
                    onChange={(e) => handleInputChange('warrantyTerms', e.target.value)}
                    placeholder="Điều khoản bảo hành"
                    rows={2}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="service" className="space-y-6">
              {/* Service Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Thông tin cơ bản</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service-name">Tên dịch vụ *</Label>
                    <Input
                      id="service-name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Nhập tên dịch vụ"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service-description">Mô tả</Label>
                    <Textarea
                      id="service-description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Mô tả chi tiết về dịch vụ"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service-category">Danh mục *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service-subcategory">Danh mục con</Label>
                    <Input
                      id="service-subcategory"
                      value={formData.subcategory}
                      onChange={(e) => handleInputChange('subcategory', e.target.value)}
                      placeholder="Danh mục con (nếu có)"
                    />
                  </div>
                </div>

                {/* Service Provider Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Thông tin nhà cung cấp</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service-provider">Nhà cung cấp dịch vụ</Label>
                    <Input
                      id="service-provider"
                      value={formData.serviceProvider}
                      onChange={(e) => handleInputChange('serviceProvider', e.target.value)}
                      placeholder="Tên nhà cung cấp"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service-contact">Người liên hệ</Label>
                    <Input
                      id="service-contact"
                      value={formData.serviceContact}
                      onChange={(e) => handleInputChange('serviceContact', e.target.value)}
                      placeholder="Tên người liên hệ"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service-phone">Số điện thoại</Label>
                    <Input
                      id="service-phone"
                      value={formData.servicePhone}
                      onChange={(e) => handleInputChange('servicePhone', e.target.value)}
                      placeholder="Số điện thoại"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service-email">Email</Label>
                    <Input
                      id="service-email"
                      type="email"
                      value={formData.serviceEmail}
                      onChange={(e) => handleInputChange('serviceEmail', e.target.value)}
                      placeholder="Email liên hệ"
                    />
                  </div>
                </div>
              </div>

              {/* Service Period */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Thời gian dịch vụ</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-start-date">Ngày bắt đầu</Label>
                    <Input
                      id="service-start-date"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service-end-date">Ngày kết thúc</Label>
                    <Input
                      id="service-end-date"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service-cost">Chi phí dịch vụ</Label>
                    <Input
                      id="service-cost"
                      type="number"
                      value={formData.serviceCost}
                      onChange={(e) => handleInputChange('serviceCost', e.target.value)}
                      placeholder="Chi phí (VND)"
                    />
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Chi tiết dịch vụ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-billing">Tần suất thanh toán</Label>
                    <Select value={formData.billingFrequency} onValueChange={(value) => handleInputChange('billingFrequency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {billingFrequencyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service-sla">Thỏa thuận mức dịch vụ (SLA)</Label>
                    <Textarea
                      id="service-sla"
                      value={formData.serviceLevelAgreement}
                      onChange={(e) => handleInputChange('serviceLevelAgreement', e.target.value)}
                      placeholder="Mô tả SLA"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-metrics">Chỉ số hiệu suất</Label>
                  <Textarea
                    id="service-metrics"
                    value={formData.performanceMetrics}
                    onChange={(e) => handleInputChange('performanceMetrics', e.target.value)}
                    placeholder="Các chỉ số hiệu suất cần theo dõi"
                    rows={2}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Common Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thông tin chung</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="responsible-person">Người phụ trách</Label>
                <Input
                  id="responsible-person"
                  value={formData.responsiblePerson}
                  onChange={(e) => handleInputChange('responsiblePerson', e.target.value)}
                  placeholder="Tên người phụ trách"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Vị trí</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Vị trí đặt"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Mức độ ưu tiên</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Tạo mới
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssetServiceModal;
