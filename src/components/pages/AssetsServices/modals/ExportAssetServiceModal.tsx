'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  Download, 
  FileText, 
  X, 
  CheckCircle,
  Calendar,
  BarChart3,
  Building,
  Settings
} from 'lucide-react';

interface ExportAssetServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ExportAssetServiceModal: React.FC<ExportAssetServiceModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [exportType, setExportType] = useState('summary');
  const [exportFormat, setExportFormat] = useState('excel');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    includeDetails: true,
    includeCharts: false,
    includeFilters: true,
    groupByCategory: true
  });

  const exportTypes = [
    { value: 'summary', label: 'Báo cáo tổng hợp' },
    { value: 'assets', label: 'Báo cáo tài sản' },
    { value: 'services', label: 'Báo cáo dịch vụ' },
    { value: 'maintenance', label: 'Báo cáo bảo trì' },
    { value: 'warranty', label: 'Báo cáo bảo hành' },
    { value: 'custom', label: 'Báo cáo tùy chỉnh' }
  ];

  const exportFormats = [
    { value: 'excel', label: 'Excel (.xlsx)', icon: FileText },
    { value: 'pdf', label: 'PDF (.pdf)', icon: FileText },
    { value: 'csv', label: 'CSV (.csv)', icon: FileText }
  ];

  const assetCategories = [
    'Hardware', 'Software', 'Office Equipment', 'Infrastructure', 'Vehicles', 'Furniture'
  ];

  const serviceCategories = [
    'IT Services', 'Cloud Services', 'Maintenance Services', 'Consulting Services', 'Support Services'
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setExportProgress(i);
    }

    // Mock export completion
    setTimeout(() => {
      setIsExporting(false);
      onSuccess();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Xuất báo cáo Tài sản & Dịch vụ
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Type Selection */}
          <div className="space-y-2">
            <Label>Loại báo cáo</Label>
            <Select value={exportType} onValueChange={setExportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {exportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Export Format Selection */}
          <div className="space-y-2">
            <Label>Định dạng xuất</Label>
            <div className="grid grid-cols-3 gap-2">
              {exportFormats.map((format) => (
                <div
                  key={format.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    exportFormat === format.value
                      ? 'border-[#800020] bg-[#800020]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setExportFormat(format.value)}
                >
                  <div className="flex items-center gap-2">
                    <format.icon className="w-4 h-4" />
                    <span className="text-sm">{format.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label>Khoảng thời gian</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                placeholder="Từ ngày"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              />
              <Input
                type="date"
                placeholder="Đến ngày"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              />
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Chọn danh mục</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Tài sản
                </h4>
                <div className="space-y-2">
                  {assetCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`export-asset-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category));
                          }
                        }}
                      />
                      <Label htmlFor={`export-asset-${category}`} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Dịch vụ
                </h4>
                <div className="space-y-2">
                  {serviceCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`export-service-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category));
                          }
                        }}
                      />
                      <Label htmlFor={`export-service-${category}`} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <h3 className="font-semibold">Tùy chọn xuất</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-details"
                  checked={exportOptions.includeDetails}
                  onCheckedChange={(checked) => 
                    setExportOptions(prev => ({ ...prev, includeDetails: !!checked }))
                  }
                />
                <Label htmlFor="include-details">Bao gồm chi tiết</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-charts"
                  checked={exportOptions.includeCharts}
                  onCheckedChange={(checked) => 
                    setExportOptions(prev => ({ ...prev, includeCharts: !!checked }))
                  }
                />
                <Label htmlFor="include-charts">Bao gồm biểu đồ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-filters"
                  checked={exportOptions.includeFilters}
                  onCheckedChange={(checked) => 
                    setExportOptions(prev => ({ ...prev, includeFilters: !!checked }))
                  }
                />
                <Label htmlFor="include-filters">Bao gồm bộ lọc</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="group-by-category"
                  checked={exportOptions.groupByCategory}
                  onCheckedChange={(checked) => 
                    setExportOptions(prev => ({ ...prev, groupByCategory: !!checked }))
                  }
                />
                <Label htmlFor="group-by-category">Nhóm theo danh mục</Label>
              </div>
            </div>
          </div>

          {/* Export Progress */}
          {isExporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Đang xuất báo cáo...</span>
                <span>{exportProgress}%</span>
              </div>
              <Progress value={exportProgress} className="w-full" />
            </div>
          )}

          {/* Export Summary */}
          {!isExporting && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Tóm tắt xuất</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p>• Loại báo cáo: {exportTypes.find(t => t.value === exportType)?.label}</p>
                <p>• Định dạng: {exportFormats.find(f => f.value === exportFormat)?.label}</p>
                <p>• Danh mục đã chọn: {selectedCategories.length} danh mục</p>
                {dateRange.from && dateRange.to && (
                  <p>• Thời gian: {dateRange.from} đến {dateRange.to}</p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
            <Button 
              onClick={handleExport}
              disabled={isExporting}
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Đang xuất...' : 'Xuất báo cáo'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportAssetServiceModal;
