'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  Eye,
  Clock,
  FileText,
  Calendar,
  Users,
  BarChart3,
  Check,
  AlertTriangle,
  X,
  MoreHorizontal,
  RotateCcw,
  Trash2,
  Copy
} from 'lucide-react';

interface ReportHistory {
  id: string;
  reportName: string;
  templateName: string;
  generatedBy: string;
  generatedAt: string;
  status: 'completed' | 'failed' | 'processing' | 'cancelled';
  fileSize: string;
  fileFormat: string;
  downloadCount: number;
  lastDownloaded: string;
  recipients: string[];
  dataSources: string[];
  charts: string[];
}

const ReportsHistory: React.FC = () => {
  const [history, setHistory] = useState<ReportHistory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    setHistory([
      {
        id: '1',
        reportName: 'Báo cáo Tổng hợp Dự án Q1/2024',
        templateName: 'Báo cáo Tổng hợp Dự án',
        generatedBy: 'Nguyễn Văn A',
        generatedAt: '2024-01-15 14:30:00',
        status: 'completed',
        fileSize: '2.5 MB',
        fileFormat: 'PDF',
        downloadCount: 5,
        lastDownloaded: '2024-01-16 09:15:00',
        recipients: ['admin@agribank.com', 'manager@agribank.com'],
        dataSources: ['projects', 'contracts', 'costs'],
        charts: ['bar', 'pie', 'line']
      },
      {
        id: '2',
        reportName: 'Báo cáo Tài chính Tháng 12/2023',
        templateName: 'Báo cáo Tài chính Chi tiết',
        generatedBy: 'Trần Thị B',
        generatedAt: '2024-01-10 16:45:00',
        status: 'completed',
        fileSize: '1.8 MB',
        fileFormat: 'Excel',
        downloadCount: 3,
        lastDownloaded: '2024-01-12 11:20:00',
        recipients: ['finance@agribank.com'],
        dataSources: ['costs', 'revenues', 'budgets'],
        charts: ['line', 'bar', 'area']
      },
      {
        id: '3',
        reportName: 'Báo cáo Tài sản & Dịch vụ Q4/2023',
        templateName: 'Báo cáo Tài sản & Dịch vụ',
        generatedBy: 'Lê Văn C',
        generatedAt: '2024-01-08 10:20:00',
        status: 'failed',
        fileSize: '0 MB',
        fileFormat: 'PDF',
        downloadCount: 0,
        lastDownloaded: '-',
        recipients: ['assets@agribank.com'],
        dataSources: ['assets', 'services', 'maintenance'],
        charts: ['pie', 'bar', 'scatter']
      },
      {
        id: '4',
        reportName: 'Báo cáo Nhân sự Tháng 11/2023',
        templateName: 'Báo cáo Nhân sự',
        generatedBy: 'Phạm Thị D',
        generatedAt: '2024-01-05 13:15:00',
        status: 'completed',
        fileSize: '3.2 MB',
        fileFormat: 'PDF',
        downloadCount: 8,
        lastDownloaded: '2024-01-14 15:30:00',
        recipients: ['hr@agribank.com', 'director@agribank.com'],
        dataSources: ['employees', 'departments', 'performance'],
        charts: ['bar', 'line', 'radar']
      },
      {
        id: '5',
        reportName: 'Báo cáo Tuân thủ Q3/2023',
        templateName: 'Báo cáo Tuân thủ',
        generatedBy: 'Hoàng Văn E',
        generatedAt: '2024-01-03 09:45:00',
        status: 'processing',
        fileSize: '0 MB',
        fileFormat: 'PDF',
        downloadCount: 0,
        lastDownloaded: '-',
        recipients: ['compliance@agribank.com'],
        dataSources: ['compliance', 'risks', 'audits'],
        charts: ['gauge', 'bar', 'heatmap']
      },
      {
        id: '6',
        reportName: 'Báo cáo Chi phí Dự án ABC',
        templateName: 'Báo cáo Tài chính Chi tiết',
        generatedBy: 'Nguyễn Văn A',
        generatedAt: '2024-01-02 11:30:00',
        status: 'cancelled',
        fileSize: '0 MB',
        fileFormat: 'Excel',
        downloadCount: 0,
        lastDownloaded: '-',
        recipients: ['project@agribank.com'],
        dataSources: ['costs', 'projects'],
        charts: ['bar', 'line']
      }
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4" />;
      case 'failed':
        return <X className="w-4 h-4" />;
      case 'processing':
        return <RotateCcw className="w-4 h-4 animate-spin" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'failed':
        return 'Thất bại';
      case 'processing':
        return 'Đang xử lý';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'PDF':
        return 'bg-red-100 text-red-800';
      case 'Excel':
        return 'bg-green-100 text-green-800';
      case 'CSV':
        return 'bg-blue-100 text-blue-800';
      case 'HTML':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.reportName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.templateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.generatedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || selectedStatus === 'all' || item.status === selectedStatus;
    const matchesFormat = !selectedFormat || selectedFormat === 'all' || item.fileFormat === selectedFormat;
    
    return matchesSearch && matchesStatus && matchesFormat;
  });

  const statuses = [...new Set(history.map(h => h.status))];
  const formats = [...new Set(history.map(h => h.fileFormat))];

  const handleDownload = (item: ReportHistory) => {
    // Mock implementation
    console.log('Downloading report:', item.reportName);
  };

  const handleRegenerate = (item: ReportHistory) => {
    // Mock implementation
    console.log('Regenerating report:', item.reportName);
  };

  const handleDelete = (item: ReportHistory) => {
    // Mock implementation
    console.log('Deleting report:', item.reportName);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Lịch sử Báo cáo</h2>
          <p className="text-sm text-gray-600">Theo dõi các báo cáo đã được tạo và xuất</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất lịch sử
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Dọn dẹp
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label>Tìm kiếm</Label>
              <Input
                placeholder="Tìm báo cáo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                                 <SelectContent>
                   <SelectItem value="all">Tất cả trạng thái</SelectItem>
                   {statuses.map(status => (
                     <SelectItem key={status} value={status}>
                       {getStatusName(status)}
                     </SelectItem>
                   ))}
                 </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Định dạng</Label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả định dạng" />
                </SelectTrigger>
                                 <SelectContent>
                   <SelectItem value="all">Tất cả định dạng</SelectItem>
                   {formats.map(format => (
                     <SelectItem key={format} value={format}>{format}</SelectItem>
                   ))}
                 </SelectContent>
              </Select>
            </div>
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
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Báo cáo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Định dạng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kích thước
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tải xuống
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tạo bởi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.reportName}</div>
                        <div className="text-sm text-gray-500">Template: {item.templateName}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.dataSources.slice(0, 2).map((source, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                          {item.dataSources.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{item.dataSources.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusName(item.status)}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getFormatColor(item.fileFormat)}>
                        {item.fileFormat}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.fileSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.downloadCount} lần</div>
                      {item.lastDownloaded !== '-' && (
                        <div className="text-xs text-gray-500">{item.lastDownloaded}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.generatedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.generatedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {item.status === 'completed' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownload(item)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        {(item.status === 'failed' || item.status === 'cancelled') && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRegenerate(item)}
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(item)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không có lịch sử báo cáo</h3>
            <p className="text-gray-500 mb-4">
              Không có báo cáo nào phù hợp với bộ lọc hiện tại
            </p>
            <Button className="bg-[#800020] text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Tạo báo cáo mới
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng báo cáo</p>
                <p className="text-2xl font-bold text-gray-900">{history.length}</p>
              </div>
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hoàn thành</p>
                <p className="text-2xl font-bold text-green-600">
                  {history.filter(h => h.status === 'completed').length}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Thất bại</p>
                <p className="text-2xl font-bold text-red-600">
                  {history.filter(h => h.status === 'failed').length}
                </p>
              </div>
              <X className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng tải xuống</p>
                <p className="text-2xl font-bold text-blue-600">
                  {history.reduce((sum, h) => sum + h.downloadCount, 0)}
                </p>
              </div>
              <Download className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsHistory;
