'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  DollarSign,
  Building,
  FileText,
  Save,
  X,
  Plus
} from 'lucide-react';

interface CreateCostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface CostFormData {
  // Basic Information
  costName: string;
  costDescription: string;
  costCategory: string;
  costSubcategory: string;
  
  // Financial Information
  totalAmount: number;
  currency: string;
  vatAmount: number;
  vatRate: number;
  
  // Timeline Information
  plannedStartDate: string;
  plannedEndDate: string;
  plannedPaymentDate: string;
  
  // Related Information
  projectId: string;
  tenderPackageId: string;
  contractId: string;
  supplierName: string;
  supplierContact: string;
  
  // Additional Information
  priority: string;
  riskLevel: string;
  notes: string;
  tags: string[];
  
  // Recurring Cost (if applicable)
  isRecurring: boolean;
  recurringFrequency: string;
  recurringPeriods: number;
  recurringStartDate: string;
}

const CreateCostModal: React.FC<CreateCostModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<CostFormData>({
    costName: '',
    costDescription: '',
    costCategory: '',
    costSubcategory: '',
    totalAmount: 0,
    currency: 'VND',
    vatAmount: 0,
    vatRate: 10,
    plannedStartDate: '',
    plannedEndDate: '',
    plannedPaymentDate: '',
    projectId: '',
    tenderPackageId: '',
    contractId: '',
    supplierName: '',
    supplierContact: '',
    priority: 'medium',
    riskLevel: 'low',
    notes: '',
    tags: [],
    isRecurring: false,
    recurringFrequency: 'monthly',
    recurringPeriods: 1,
    recurringStartDate: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof CostFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVATCalculation = () => {
    const vatAmount = (formData.totalAmount * formData.vatRate) / 100;
    setFormData(prev => ({
      ...prev,
      vatAmount: vatAmount
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call - replace with actual API
      console.log('Creating cost:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
    } catch (error) {
      console.error('Error creating cost:', error);
    } finally {
      setLoading(false);
    }
  };

  const costCategories = [
    'Thiết bị',
    'Dịch vụ',
    'Vật tư',
    'Nhân sự',
    'Văn phòng',
    'Xây dựng',
    'Khác'
  ];

  const currencies = ['VND', 'USD', 'EUR', 'JPY'];
  const priorities = ['low', 'medium', 'high', 'critical'];
  const riskLevels = ['low', 'medium', 'high'];
  const recurringFrequencies = ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tạo khoản mục chi phí mới
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="financial">Thông tin tài chính</TabsTrigger>
              <TabsTrigger value="related">Liên kết</TabsTrigger>
              <TabsTrigger value="additional">Bổ sung</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Thông tin cơ bản
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="costName">Tên chi phí *</Label>
                      <Input
                        id="costName"
                        value={formData.costName}
                        onChange={(e) => handleInputChange('costName', e.target.value)}
                        placeholder="Nhập tên chi phí"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="costCategory">Danh mục chi phí *</Label>
                      <Select
                        value={formData.costCategory}
                        onValueChange={(value) => handleInputChange('costCategory', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {costCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="costDescription">Mô tả chi phí</Label>
                    <Textarea
                      id="costDescription"
                      value={formData.costDescription}
                      onChange={(e) => handleInputChange('costDescription', e.target.value)}
                      placeholder="Mô tả chi tiết về khoản mục chi phí"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="plannedStartDate">Ngày bắt đầu dự kiến *</Label>
                      <Input
                        id="plannedStartDate"
                        type="date"
                        value={formData.plannedStartDate}
                        onChange={(e) => handleInputChange('plannedStartDate', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plannedEndDate">Ngày kết thúc dự kiến *</Label>
                      <Input
                        id="plannedEndDate"
                        type="date"
                        value={formData.plannedEndDate}
                        onChange={(e) => handleInputChange('plannedEndDate', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financial Information Tab */}
            <TabsContent value="financial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Thông tin tài chính
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalAmount">Tổng chi phí *</Label>
                      <Input
                        id="totalAmount"
                        type="number"
                        value={formData.totalAmount}
                        onChange={(e) => {
                          handleInputChange('totalAmount', parseFloat(e.target.value) || 0);
                          handleVATCalculation();
                        }}
                        placeholder="0"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                      <Select
                        value={formData.currency}
                        onValueChange={(value) => handleInputChange('currency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vatRate">Tỷ lệ VAT (%)</Label>
                      <Input
                        id="vatRate"
                        type="number"
                        value={formData.vatRate}
                        onChange={(e) => {
                          handleInputChange('vatRate', parseFloat(e.target.value) || 0);
                          handleVATCalculation();
                        }}
                        placeholder="10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vatAmount">Số tiền VAT</Label>
                      <Input
                        id="vatAmount"
                        type="number"
                        value={formData.vatAmount}
                        onChange={(e) => handleInputChange('vatAmount', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plannedPaymentDate">Ngày thanh toán dự kiến</Label>
                      <Input
                        id="plannedPaymentDate"
                        type="date"
                        value={formData.plannedPaymentDate}
                        onChange={(e) => handleInputChange('plannedPaymentDate', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Recurring Cost Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isRecurring"
                        checked={formData.isRecurring}
                        onChange={(e) => handleInputChange('isRecurring', e.target.checked)}
                      />
                      <Label htmlFor="isRecurring">Chi phí định kỳ</Label>
                    </div>

                    {formData.isRecurring && (
                      <div className="grid grid-cols-3 gap-4 pl-6">
                        <div className="space-y-2">
                          <Label htmlFor="recurringFrequency">Tần suất</Label>
                          <Select
                            value={formData.recurringFrequency}
                            onValueChange={(value) => handleInputChange('recurringFrequency', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {recurringFrequencies.map((frequency) => (
                                <SelectItem key={frequency} value={frequency}>
                                  {frequency}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recurringPeriods">Số kỳ</Label>
                          <Input
                            id="recurringPeriods"
                            type="number"
                            value={formData.recurringPeriods}
                            onChange={(e) => handleInputChange('recurringPeriods', parseInt(e.target.value) || 1)}
                            min="1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recurringStartDate">Ngày bắt đầu định kỳ</Label>
                          <Input
                            id="recurringStartDate"
                            type="date"
                            value={formData.recurringStartDate}
                            onChange={(e) => handleInputChange('recurringStartDate', e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Related Information Tab */}
            <TabsContent value="related" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Liên kết với dự án, gói thầu, hợp đồng
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectId">Dự án liên quan</Label>
                      <Select
                        value={formData.projectId}
                        onValueChange={(value) => handleInputChange('projectId', value)}
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
                    <div className="space-y-2">
                      <Label htmlFor="tenderPackageId">Gói thầu</Label>
                      <Select
                        value={formData.tenderPackageId}
                        onValueChange={(value) => handleInputChange('tenderPackageId', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn gói thầu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tender-1">Gói thầu 1</SelectItem>
                          <SelectItem value="tender-2">Gói thầu 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contractId">Hợp đồng</Label>
                      <Select
                        value={formData.contractId}
                        onValueChange={(value) => handleInputChange('contractId', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn hợp đồng" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contract-1">HĐ-2024-001</SelectItem>
                          <SelectItem value="contract-2">HĐ-2024-002</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supplierName">Nhà cung cấp *</Label>
                      <Input
                        id="supplierName"
                        value={formData.supplierName}
                        onChange={(e) => handleInputChange('supplierName', e.target.value)}
                        placeholder="Tên nhà cung cấp"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplierContact">Thông tin liên hệ nhà cung cấp</Label>
                    <Textarea
                      id="supplierContact"
                      value={formData.supplierContact}
                      onChange={(e) => handleInputChange('supplierContact', e.target.value)}
                      placeholder="Địa chỉ, số điện thoại, email..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Additional Information Tab */}
            <TabsContent value="additional" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin bổ sung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Mức độ ưu tiên</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) => handleInputChange('priority', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem key={priority} value={priority}>
                              {priority}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="riskLevel">Mức độ rủi ro</Label>
                      <Select
                        value={formData.riskLevel}
                        onValueChange={(value) => handleInputChange('riskLevel', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {riskLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Ghi chú</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Ghi chú bổ sung..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Thẻ (Tags)</Label>
                    <Input
                      id="tags"
                      value={formData.tags.join(', ')}
                      onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
                      placeholder="Nhập các thẻ, phân cách bằng dấu phẩy"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Form Actions */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Đang tạo...' : 'Tạo chi phí'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCostModal;
