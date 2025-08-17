'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Download,
  FileText,
  X,
  Calendar,
  Filter
} from 'lucide-react';

interface CostExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CostExportModal: React.FC<CostExportModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [exportFormat, setExportFormat] = useState<'excel' | 'pdf'>('excel');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'costCode', 'costName', 'costCategory', 'totalAmount', 'paymentStatus'
  ]);
  const [loading, setLoading] = useState(false);

  const availableColumns = [
    { value: 'costCode', label: 'Mã chi phí' },
    { value: 'costName', label: 'Tên chi phí' },
    { value: 'costCategory', label: 'Danh mục' },
    { value: 'totalAmount', label: 'Tổng chi phí' },
    { value: 'paidAmount', label: 'Đã thanh toán' },
    { value: 'remainingAmount', label: 'Còn lại' },
    { value: 'paymentStatus', label: 'Trạng thái thanh toán' },
    { value: 'approvalStatus', label: 'Trạng thái phê duyệt' },
    { value: 'supplier', label: 'Nhà cung cấp' },
    { value: 'project', label: 'Dự án' },
    { value: 'contract', label: 'Hợp đồng' },
    { value: 'plannedStartDate', label: 'Ngày bắt đầu' },
    { value: 'plannedEndDate', label: 'Ngày kết thúc' },
    { value: 'createdAt', label: 'Ngày tạo' },
    { value: 'createdBy', label: 'Người tạo' }
  ];

  const handleExport = async () => {
    setLoading(true);

    try {
      // Mock API call - replace with actual API
      console.log('Exporting cost data:', {
        format: exportFormat,
        dateRange,
        includeCharts,
        includeDetails,
        selectedColumns
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock file download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `cost-report-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      link.click();
      
      onClose();
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleColumnToggle = (columnValue: string) => {
    if (selectedColumns.includes(columnValue)) {
      setSelectedColumns(selectedColumns.filter(col => col !== columnValue));
    } else {
      setSelectedColumns([...selectedColumns, columnValue]);
    }
  };

  const selectAllColumns = () => {
    setSelectedColumns(availableColumns.map(col => col.value));
  };

  const deselectAllColumns = () => {
    setSelectedColumns([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Xuất báo cáo Chi phí
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format */}
          <div className="space-y-2">
            <Label>Định dạng xuất</Label>
            <Select value={exportFormat} onValueChange={(value: 'excel' | 'pdf') => setExportFormat(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                <SelectItem value="pdf">PDF (.pdf)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Khoảng thời gian
            </Label>
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

          {/* Export Options */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Tùy chọn xuất</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeCharts"
                    checked={includeCharts}
                    onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
                  />
                  <Label htmlFor="includeCharts" className="text-sm">
                    Bao gồm biểu đồ và đồ thị
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeDetails"
                    checked={includeDetails}
                    onCheckedChange={(checked) => setIncludeDetails(checked as boolean)}
                  />
                  <Label htmlFor="includeDetails" className="text-sm">
                    Bao gồm chi tiết từng khoản mục
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Column Selection */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Chọn cột dữ liệu</h4>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={selectAllColumns}
                  >
                    Chọn tất cả
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={deselectAllColumns}
                  >
                    Bỏ chọn tất cả
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {availableColumns.map((column) => (
                  <div key={column.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`column-${column.value}`}
                      checked={selectedColumns.includes(column.value)}
                      onCheckedChange={() => handleColumnToggle(column.value)}
                    />
                    <Label htmlFor={`column-${column.value}`} className="text-sm">
                      {column.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Export Summary */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Tóm tắt xuất báo cáo</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Định dạng:</span>
                  <span className="font-medium">{exportFormat.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-medium">
                    {dateRange.from && dateRange.to 
                      ? `${dateRange.from} - ${dateRange.to}`
                      : 'Tất cả thời gian'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số cột được chọn:</span>
                  <span className="font-medium">{selectedColumns.length}/{availableColumns.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bao gồm biểu đồ:</span>
                  <span className="font-medium">{includeCharts ? 'Có' : 'Không'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bao gồm chi tiết:</span>
                  <span className="font-medium">{includeDetails ? 'Có' : 'Không'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
            <Button 
              type="button" 
              onClick={handleExport}
              disabled={loading || selectedColumns.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              {loading ? 'Đang xuất...' : 'Xuất báo cáo'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CostExportModal;
