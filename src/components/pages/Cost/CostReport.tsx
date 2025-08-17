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
  DollarSign
} from 'lucide-react';

const CostReport: React.FC = () => {
  const [reportType, setReportType] = useState('project');
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [metrics, setMetrics] = useState<string[]>(['total_cost', 'paid_cost', 'remaining_cost']);
  const [groupBy, setGroupBy] = useState<string[]>(['cost_category']);

  const reportTypes = [
    { value: 'project', label: 'Theo Dự án' },
    { value: 'tender_package', label: 'Theo Gói thầu' },
    { value: 'contract', label: 'Theo Hợp đồng' },
    { value: 'comparative', label: 'So sánh' },
    { value: 'custom', label: 'Tùy chỉnh' }
  ];

  const availableMetrics = [
    { value: 'total_cost', label: 'Tổng chi phí' },
    { value: 'paid_cost', label: 'Chi phí đã thanh toán' },
    { value: 'remaining_cost', label: 'Chi phí còn lại' },
    { value: 'approved_cost', label: 'Chi phí đã phê duyệt' },
    { value: 'pending_cost', label: 'Chi phí chờ phê duyệt' },
    { value: 'overdue_cost', label: 'Chi phí quá hạn' }
  ];

  const groupByOptions = [
    { value: 'cost_category', label: 'Theo danh mục chi phí' },
    { value: 'supplier', label: 'Theo nhà cung cấp' },
    { value: 'payment_status', label: 'Theo trạng thái thanh toán' },
    { value: 'approval_status', label: 'Theo trạng thái phê duyệt' },
    { value: 'month', label: 'Theo tháng' },
    { value: 'quarter', label: 'Theo quý' }
  ];

  const generateReport = () => {
    console.log('Generating report:', {
      reportType,
      selectedEntities,
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

          {/* Entity Selection */}
          <div className="space-y-2">
            <Label>Chọn đối tượng</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Dự án A', 'Dự án B', 'Dự án C', 'Gói thầu 1', 'Gói thầu 2', 'HĐ-2024-001'].map((entity) => (
                <div key={entity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`entity-${entity}`}
                    checked={selectedEntities.includes(entity)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedEntities([...selectedEntities, entity]);
                      } else {
                        setSelectedEntities(selectedEntities.filter(e => e !== entity));
                      }
                    }}
                  />
                  <Label htmlFor={`entity-${entity}`} className="text-sm">
                    {entity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Selection */}
          <div className="space-y-2">
            <Label>Chỉ số cần báo cáo</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                      <p className="text-sm text-muted-foreground">Tổng chi phí</p>
                      <p className="text-2xl font-bold">15,000,000,000</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Đã thanh toán</p>
                      <p className="text-2xl font-bold text-green-600">9,000,000,000</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Còn lại</p>
                      <p className="text-2xl font-bold text-orange-600">6,000,000,000</p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Quá hạn</p>
                      <p className="text-2xl font-bold text-red-600">500,000,000</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-red-500" />
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
                    Chi phí theo danh mục
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
                    Xu hướng chi phí
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

export default CostReport;
