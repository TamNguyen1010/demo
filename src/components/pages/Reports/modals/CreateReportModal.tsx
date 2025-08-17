'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  X, 
  BarChart3,
  FileText,
  Calendar,
  Settings,
  Database,
  PieChart,
  LineChart,
  BarChart
} from 'lucide-react';

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateReportModal: React.FC<CreateReportModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [groupBy, setGroupBy] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [exportFormats, setExportFormats] = useState<string[]>([]);
  const [recipients, setRecipients] = useState('');
  const [scheduleType, setScheduleType] = useState('');

  const templates = [
    { id: '1', name: 'Báo cáo Tổng hợp Dự án', category: 'Dự án' },
    { id: '2', name: 'Báo cáo Tài chính Chi tiết', category: 'Tài chính' },
    { id: '3', name: 'Báo cáo Tài sản & Dịch vụ', category: 'Tài sản' },
    { id: '4', name: 'Báo cáo Nhân sự', category: 'Nhân sự' },
    { id: '5', name: 'Báo cáo Tuân thủ', category: 'Tuân thủ' }
  ];

  const dataSources = [
    'Dự án',
    'Hợp đồng', 
    'Chi phí',
    'Tài sản',
    'Dịch vụ',
    'Nhân sự',
    'Thời gian',
    'Phòng ban'
  ];

  const chartTypes = [
    'Biểu đồ cột',
    'Biểu đồ đường',
    'Biểu đồ tròn',
    'Biểu đồ vùng',
    'Biểu đồ phân tán',
    'Biểu đồ bong bóng',
    'Biểu đồ nhiệt',
    'Biểu đồ Gantt'
  ];

  const exportFormatsList = [
    'PDF',
    'Excel',
    'CSV',
    'HTML'
  ];

  const handleDataSourceToggle = (source: string) => {
    setSelectedDataSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const handleChartToggle = (chart: string) => {
    setSelectedCharts(prev => 
      prev.includes(chart) 
        ? prev.filter(c => c !== chart)
        : [...prev, chart]
    );
  };

  const handleExportFormatToggle = (format: string) => {
    setExportFormats(prev => 
      prev.includes(format) 
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const handleCreateReport = async () => {
    // Mock implementation
    console.log('Creating report:', {
      name: reportName,
      description: reportDescription,
      template: selectedTemplate,
      dataSources: selectedDataSources,
      charts: selectedCharts,
      dateRange,
      groupBy,
      sortBy,
      exportFormats,
      recipients,
      scheduleType
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSuccess();
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setReportName(template.name);
      setReportDescription(`Báo cáo ${template.name.toLowerCase()}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tạo Báo cáo Mới
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Thông tin Cơ bản
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tên báo cáo</Label>
                <Input 
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Nhập tên báo cáo"
                />
              </div>
              <div className="space-y-2">
                <Label>Template</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name} ({template.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea 
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Mô tả báo cáo"
                rows={3}
              />
            </div>
          </div>

          {/* Data Sources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Database className="w-5 h-5" />
              Nguồn Dữ liệu
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dataSources.map((source) => (
                <div key={source} className="flex items-center space-x-2">
                  <Checkbox
                    id={`source-${source}`}
                    checked={selectedDataSources.includes(source)}
                    onCheckedChange={() => handleDataSourceToggle(source)}
                  />
                  <Label htmlFor={`source-${source}`} className="text-sm">
                    {source}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Types */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Loại Biểu đồ
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {chartTypes.map((chart) => (
                <div key={chart} className="flex items-center space-x-2">
                  <Checkbox
                    id={`chart-${chart}`}
                    checked={selectedCharts.includes(chart)}
                    onCheckedChange={() => handleChartToggle(chart)}
                  />
                  <Label htmlFor={`chart-${chart}`} className="text-sm">
                    {chart}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Khoảng Thời gian
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Từ ngày</Label>
                <Input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Đến ngày</Label>
                <Input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Grouping and Sorting */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Nhóm và Sắp xếp
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nhóm theo</Label>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trường nhóm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project">Dự án</SelectItem>
                    <SelectItem value="department">Phòng ban</SelectItem>
                    <SelectItem value="status">Trạng thái</SelectItem>
                    <SelectItem value="type">Loại</SelectItem>
                    <SelectItem value="month">Tháng</SelectItem>
                    <SelectItem value="quarter">Quý</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sắp xếp theo</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trường sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Tên</SelectItem>
                    <SelectItem value="date">Ngày</SelectItem>
                    <SelectItem value="amount">Số tiền</SelectItem>
                    <SelectItem value="priority">Ưu tiên</SelectItem>
                    <SelectItem value="status">Trạng thái</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Tùy chọn Xuất
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label>Định dạng xuất</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {exportFormatsList.map((format) => (
                    <div key={format} className="flex items-center space-x-2">
                      <Checkbox
                        id={`format-${format}`}
                        checked={exportFormats.includes(format)}
                        onCheckedChange={() => handleExportFormatToggle(format)}
                      />
                      <Label htmlFor={`format-${format}`} className="text-sm">
                        {format}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Người nhận (email, phân cách bằng dấu phẩy)</Label>
                <Input 
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  placeholder="admin@agribank.com, manager@agribank.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Lịch trình</Label>
                <Select value={scheduleType} onValueChange={setScheduleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn lịch trình" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Một lần</SelectItem>
                    <SelectItem value="daily">Hàng ngày</SelectItem>
                    <SelectItem value="weekly">Hàng tuần</SelectItem>
                    <SelectItem value="monthly">Hàng tháng</SelectItem>
                    <SelectItem value="quarterly">Hàng quý</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
            <Button 
              onClick={handleCreateReport}
              className="bg-[#800020] text-white hover:bg-[#700018]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tạo báo cáo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReportModal;
