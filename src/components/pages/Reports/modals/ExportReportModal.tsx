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
  X, 
  FileText,
  CheckCircle,
  Calendar,
  Settings,
  BarChart3,
  Mail,
  Share2
} from 'lucide-react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [exportType, setExportType] = useState('current');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [exportOptions, setExportOptions] = useState({
    includeCharts: true,
    includeData: true,
    includeSummary: true,
    includeFilters: false,
    compressFile: false
  });
  const [deliveryMethod, setDeliveryMethod] = useState('download');
  const [recipients, setRecipients] = useState('');
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const reportTypes = [
    { id: 'current', name: 'Báo cáo hiện tại', description: 'Xuất báo cáo đang xem' },
    { id: 'selected', name: 'Báo cáo đã chọn', description: 'Xuất các báo cáo đã chọn' },
    { id: 'all', name: 'Tất cả báo cáo', description: 'Xuất tất cả báo cáo' },
    { id: 'scheduled', name: 'Báo cáo theo lịch', description: 'Xuất báo cáo theo lịch trình' }
  ];

  const exportFormats = [
    { value: 'pdf', label: 'PDF (.pdf)', icon: FileText },
    { value: 'excel', label: 'Excel (.xlsx)', icon: FileText },
    { value: 'csv', label: 'CSV (.csv)', icon: FileText },
    { value: 'html', label: 'HTML (.html)', icon: FileText }
  ];

  const availableReports = [
    { id: '1', name: 'Báo cáo Tổng hợp Dự án Q1/2024', type: 'Dự án', date: '2024-01-15' },
    { id: '2', name: 'Báo cáo Tài chính Tháng 12/2023', type: 'Tài chính', date: '2024-01-10' },
    { id: '3', name: 'Báo cáo Tài sản & Dịch vụ Q4/2023', type: 'Tài sản', date: '2024-01-08' },
    { id: '4', name: 'Báo cáo Nhân sự Tháng 11/2023', type: 'Nhân sự', date: '2024-01-05' },
    { id: '5', name: 'Báo cáo Tuân thủ Q3/2023', type: 'Tuân thủ', date: '2024-01-03' }
  ];

  const handleReportToggle = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleOptionToggle = (option: keyof typeof exportOptions) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

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
            Xuất Báo cáo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Type Selection */}
          <div className="space-y-2">
            <Label>Loại xuất</Label>
            <Select value={exportType} onValueChange={setExportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {exportType && (
              <p className="text-sm text-gray-600">
                {reportTypes.find(t => t.id === exportType)?.description}
              </p>
            )}
          </div>

          {/* Report Selection */}
          {exportType === 'selected' && (
            <div className="space-y-3">
              <Label>Chọn báo cáo</Label>
              <div className="max-h-40 overflow-y-auto space-y-2 border rounded-lg p-3">
                {availableReports.map((report) => (
                  <div key={report.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`report-${report.id}`}
                      checked={selectedReports.includes(report.id)}
                      onCheckedChange={() => handleReportToggle(report.id)}
                    />
                    <Label htmlFor={`report-${report.id}`} className="text-sm flex-1">
                      <div className="font-medium">{report.name}</div>
                      <div className="text-gray-500 text-xs">
                        {report.type} • {report.date}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Export Format */}
          <div className="space-y-2">
            <Label>Định dạng xuất</Label>
            <div className="grid grid-cols-2 gap-2">
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

          {/* Export Options */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Tùy chọn Xuất
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-charts"
                  checked={exportOptions.includeCharts}
                  onCheckedChange={() => handleOptionToggle('includeCharts')}
                />
                <Label htmlFor="include-charts">Bao gồm biểu đồ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-data"
                  checked={exportOptions.includeData}
                  onCheckedChange={() => handleOptionToggle('includeData')}
                />
                <Label htmlFor="include-data">Bao gồm dữ liệu chi tiết</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-summary"
                  checked={exportOptions.includeSummary}
                  onCheckedChange={() => handleOptionToggle('includeSummary')}
                />
                <Label htmlFor="include-summary">Bao gồm tóm tắt</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-filters"
                  checked={exportOptions.includeFilters}
                  onCheckedChange={() => handleOptionToggle('includeFilters')}
                />
                <Label htmlFor="include-filters">Bao gồm bộ lọc đã áp dụng</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="compress-file"
                  checked={exportOptions.compressFile}
                  onCheckedChange={() => handleOptionToggle('compressFile')}
                />
                <Label htmlFor="compress-file">Nén file</Label>
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Phương thức Giao
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="delivery-download"
                  name="delivery"
                  value="download"
                  checked={deliveryMethod === 'download'}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />
                <Label htmlFor="delivery-download">Tải xuống trực tiếp</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="delivery-email"
                  name="delivery"
                  value="email"
                  checked={deliveryMethod === 'email'}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />
                <Label htmlFor="delivery-email">Gửi qua email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="delivery-share"
                  name="delivery"
                  value="share"
                  checked={deliveryMethod === 'share'}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />
                <Label htmlFor="delivery-share">Chia sẻ link</Label>
              </div>
            </div>

            {(deliveryMethod === 'email' || deliveryMethod === 'share') && (
              <div className="space-y-2">
                <Label>Người nhận (email, phân cách bằng dấu phẩy)</Label>
                <Input 
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  placeholder="admin@agribank.com, manager@agribank.com"
                />
              </div>
            )}
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
                <p>• Loại xuất: {reportTypes.find(t => t.id === exportType)?.name}</p>
                <p>• Định dạng: {exportFormats.find(f => f.value === exportFormat)?.label}</p>
                {exportType === 'selected' && (
                  <p>• Số báo cáo: {selectedReports.length} báo cáo</p>
                )}
                {dateRange.from && dateRange.to && (
                  <p>• Thời gian: {dateRange.from} đến {dateRange.to}</p>
                )}
                <p>• Phương thức: {
                  deliveryMethod === 'download' ? 'Tải xuống' :
                  deliveryMethod === 'email' ? 'Email' : 'Chia sẻ link'
                }</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
            <Button 
              onClick={handleExport}
              disabled={isExporting || (exportType === 'selected' && selectedReports.length === 0)}
              className="bg-[#800020] text-white hover:bg-[#700018]"
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

export default ExportReportModal;
