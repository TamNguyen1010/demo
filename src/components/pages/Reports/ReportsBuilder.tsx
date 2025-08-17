'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye,
  BarChart3, 
  FileText, 
  Calendar,
  Database,
  Settings,
  Users,
  Building,
  DollarSign,
  TrendingUp,
  PieChart,
  LineChart,
  BarChart
} from 'lucide-react';

interface ReportsBuilderProps {
  searchQuery?: string;
  filters?: any;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  dataSources: string[];
  charts: string[];
  lastUsed: string;
  usageCount: number;
}

const ReportsBuilder: React.FC<ReportsBuilderProps> = ({ searchQuery, filters: initialFilters }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [groupBy, setGroupBy] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [filters, setFilters] = useState<any>(initialFilters || {});
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Mock data
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [dataSources, setDataSources] = useState<string[]>([]);
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [chartTypes, setChartTypes] = useState<string[]>([]);

  useEffect(() => {
    // Load mock data
    loadMockData();
  }, []);

  const loadMockData = () => {
    setTemplates([
      {
        id: '1',
        name: 'Báo cáo Tổng hợp Dự án',
        description: 'Báo cáo tổng quan về tất cả dự án',
        category: 'Dự án',
        dataSources: ['projects', 'contracts', 'costs'],
        charts: ['bar', 'pie', 'line'],
        lastUsed: '2024-01-15',
        usageCount: 45
      },
      {
        id: '2',
        name: 'Báo cáo Tài chính',
        description: 'Phân tích tài chính chi tiết',
        category: 'Tài chính',
        dataSources: ['costs', 'revenues', 'budgets'],
        charts: ['line', 'bar', 'area'],
        lastUsed: '2024-01-10',
        usageCount: 32
      },
      {
        id: '3',
        name: 'Báo cáo Tài sản & Dịch vụ',
        description: 'Thống kê tài sản và dịch vụ',
        category: 'Tài sản',
        dataSources: ['assets', 'services', 'maintenance'],
        charts: ['pie', 'bar', 'scatter'],
        lastUsed: '2024-01-12',
        usageCount: 28
      }
    ]);

    setDataSources([
      'Dự án',
      'Hợp đồng', 
      'Chi phí',
      'Tài sản',
      'Dịch vụ',
      'Nhân sự',
      'Thời gian',
      'Phòng ban'
    ]);

    setAvailableFields([
      'Tên dự án',
      'Mã dự án',
      'Trạng thái',
      'Ngân sách',
      'Chi phí thực tế',
      'Tiến độ',
      'Ngày bắt đầu',
      'Ngày kết thúc',
      'Phòng ban',
      'Người quản lý',
      'Loại dự án',
      'Ưu tiên'
    ]);

    setChartTypes([
      'Biểu đồ cột',
      'Biểu đồ đường',
      'Biểu đồ tròn',
      'Biểu đồ vùng',
      'Biểu đồ phân tán',
      'Biểu đồ bong bóng',
      'Biểu đồ nhiệt',
      'Biểu đồ Gantt'
    ]);
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setReportName(template.name);
      setReportDescription(template.description);
      setSelectedDataSources(template.dataSources);
      setSelectedCharts(template.charts);
    }
  };

  const handleDataSourceToggle = (source: string) => {
    setSelectedDataSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const handleFieldToggle = (field: string) => {
    setSelectedFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const handleChartToggle = (chart: string) => {
    setSelectedCharts(prev => 
      prev.includes(chart) 
        ? prev.filter(c => c !== chart)
        : [...prev, chart]
    );
  };

  const handleCreateReport = () => {
    // Mock implementation
    console.log('Creating report:', {
      name: reportName,
      description: reportDescription,
      dataSources: selectedDataSources,
      fields: selectedFields,
      charts: selectedCharts,
      dateRange,
      groupBy,
      sortBy,
      filters
    });
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Chọn Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedTemplate === template.id 
                    ? 'border-[#800020] bg-[#800020]/5' 
                    : 'border-gray-200'
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm">{template.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {template.usageCount} lần
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {template.lastUsed}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Cấu hình Báo cáo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
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
              <Label>Mô tả</Label>
              <Input 
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Mô tả báo cáo"
              />
            </div>
          </div>

          {/* Data Sources */}
          <div className="space-y-3">
            <Label>Nguồn dữ liệu</Label>
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

          {/* Fields Selection */}
          <div className="space-y-3">
            <Label>Trường dữ liệu</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableFields.map((field) => (
                <div key={field} className="flex items-center space-x-2">
                  <Checkbox
                    id={`field-${field}`}
                    checked={selectedFields.includes(field)}
                    onCheckedChange={() => handleFieldToggle(field)}
                  />
                  <Label htmlFor={`field-${field}`} className="text-sm">
                    {field}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Types */}
          <div className="space-y-3">
            <Label>Loại biểu đồ</Label>
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

          {/* Grouping and Sorting */}
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
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      {isPreviewMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Xem trước Báo cáo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {reportName || 'Báo cáo mới'}
              </h3>
              <p className="text-gray-600 mb-4">
                {reportDescription || 'Mô tả báo cáo sẽ hiển thị ở đây'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium">Nguồn dữ liệu</p>
                  <p className="text-gray-600">{selectedDataSources.length}</p>
                </div>
                <div>
                  <p className="font-medium">Trường dữ liệu</p>
                  <p className="text-gray-600">{selectedFields.length}</p>
                </div>
                <div>
                  <p className="font-medium">Biểu đồ</p>
                  <p className="text-gray-600">{selectedCharts.length}</p>
                </div>
                <div>
                  <p className="font-medium">Nhóm theo</p>
                  <p className="text-gray-600">{groupBy || 'Không'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          onClick={handlePreview}
          className="border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white"
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewMode ? 'Ẩn xem trước' : 'Xem trước'}
        </Button>
        <Button 
          onClick={handleCreateReport}
          className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tạo báo cáo
        </Button>
      </div>
    </div>
  );
};

export default ReportsBuilder;
