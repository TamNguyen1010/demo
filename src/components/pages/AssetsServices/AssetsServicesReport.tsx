'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  FileText, 
  Download, 
  BarChart3, 
  PieChart,
  TrendingUp,
  Calendar,
  Building,
  Settings,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const AssetsServicesReport: React.FC = () => {
  const [reportType, setReportType] = useState('summary');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [metrics, setMetrics] = useState<string[]>(['total_assets', 'total_services', 'total_value']);
  const [groupBy, setGroupBy] = useState<string[]>(['category']);

  const reportTypes = [
    { value: 'summary', label: 'Báo cáo tổng hợp' },
    { value: 'assets', label: 'Báo cáo tài sản' },
    { value: 'services', label: 'Báo cáo dịch vụ' },
    { value: 'maintenance', label: 'Báo cáo bảo trì' },
    { value: 'warranty', label: 'Báo cáo bảo hành' },
    { value: 'custom', label: 'Báo cáo tùy chỉnh' }
  ];

  const availableMetrics = [
    { value: 'total_assets', label: 'Tổng số tài sản' },
    { value: 'total_services', label: 'Tổng số dịch vụ' },
    { value: 'total_value', label: 'Tổng giá trị' },
    { value: 'active_assets', label: 'Tài sản đang hoạt động' },
    { value: 'maintenance_assets', label: 'Tài sản bảo trì' },
    { value: 'expired_warranty', label: 'Tài sản hết bảo hành' },
    { value: 'upcoming_maintenance', label: 'Tài sản cần bảo trì' },
    { value: 'service_costs', label: 'Chi phí dịch vụ' }
  ];

  const groupByOptions = [
    { value: 'category', label: 'Theo danh mục' },
    { value: 'status', label: 'Theo trạng thái' },
    { value: 'location', label: 'Theo vị trí' },
    { value: 'responsible_person', label: 'Theo người phụ trách' },
    { value: 'month', label: 'Theo tháng' },
    { value: 'quarter', label: 'Theo quý' }
  ];

  const assetCategories = [
    'Hardware', 'Software', 'Office Equipment', 'Infrastructure', 'Vehicles', 'Furniture'
  ];

  const serviceCategories = [
    'IT Services', 'Cloud Services', 'Maintenance Services', 'Consulting Services', 'Support Services'
  ];

  const generateReport = () => {
    console.log('Generating report:', {
      reportType,
      selectedCategories,
      dateRange,
      metrics,
      groupBy
    });
  };

  const exportReport = (format: 'excel' | 'pdf') => {
    console.log('Exporting report as:', format);
  };

  return (
    <div className="space-y-6">
      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Cấu hình Báo cáo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Loại báo cáo</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Thời gian</Label>
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
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Chọn danh mục</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Tài sản</h4>
                <div className="space-y-2">
                  {assetCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`asset-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category));
                          }
                        }}
                      />
                      <Label htmlFor={`asset-${category}`} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Dịch vụ</h4>
                <div className="space-y-2">
                  {serviceCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category));
                          }
                        }}
                      />
                      <Label htmlFor={`service-${category}`} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Selection */}
          <div className="space-y-2">
            <Label>Chỉ số cần báo cáo</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {availableMetrics.map((metric) => (
                <div key={metric.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`metric-${metric.value}`}
                    checked={metrics.includes(metric.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setMetrics([...metrics, metric.value]);
                      } else {
                        setMetrics(metrics.filter(m => m !== metric.value));
                      }
                    }}
                  />
                  <Label htmlFor={`metric-${metric.value}`} className="text-sm">
                    {metric.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Group By Selection */}
          <div className="space-y-2">
            <Label>Nhóm theo</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {groupByOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`group-${option.value}`}
                    checked={groupBy.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setGroupBy([...groupBy, option.value]);
                      } else {
                        setGroupBy(groupBy.filter(g => g !== option.value));
                      }
                    }}
                  />
                  <Label htmlFor={`group-${option.value}`} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={generateReport}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Tạo báo cáo
            </Button>
            <Button variant="outline" onClick={() => exportReport('excel')}>
              <Download className="w-4 h-4 mr-2" />
              Xuất Excel
            </Button>
            <Button variant="outline" onClick={() => exportReport('pdf')}>
              <FileText className="w-4 h-4 mr-2" />
              Xuất PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Xem trước Báo cáo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Tổng tài sản</p>
                      <p className="text-2xl font-bold">850</p>
                    </div>
                    <Building className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Tổng dịch vụ</p>
                      <p className="text-2xl font-bold text-green-600">420</p>
                    </div>
                    <Settings className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Tổng giá trị</p>
                      <p className="text-2xl font-bold text-purple-600">25,000,000,000</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Cần bảo trì</p>
                      <p className="text-2xl font-bold text-orange-600">25</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <h3 className="font-semibold">Đang hoạt động</h3>
                      <p className="text-2xl font-bold text-green-600">720</p>
                      <p className="text-sm text-gray-600">Tài sản</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                    <div>
                      <h3 className="font-semibold">Bảo trì</h3>
                      <p className="text-2xl font-bold text-orange-600">80</p>
                      <p className="text-sm text-gray-600">Tài sản</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-red-500">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-red-500" />
                    <div>
                      <h3 className="font-semibold">Hết bảo hành</h3>
                      <p className="text-2xl font-bold text-red-600">45</p>
                      <p className="text-sm text-gray-600">Tài sản</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Phân bố theo danh mục
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Biểu đồ tròn sẽ hiển thị ở đây
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Xu hướng theo thời gian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Biểu đồ cột sẽ hiển thị ở đây
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Table Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Dữ liệu chi tiết</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Bảng dữ liệu sẽ hiển thị ở đây
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetsServicesReport;
