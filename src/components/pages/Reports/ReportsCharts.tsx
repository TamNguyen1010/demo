'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Edit,
  Copy,
  Trash2,
  Eye,
  Settings,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  MoreHorizontal,
  Grid3X3,
  List,
  FileText,
  Database,
  BarChart,
  LineChart
} from 'lucide-react';

interface Chart {
  id: string;
  name: string;
  description: string;
  type: string;
  dataSource: string;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  usageCount: number;
  status: 'active' | 'draft' | 'archived';
  isPublic: boolean;
  colors: string[];
  dimensions: string[];
  metrics: string[];
  filters: string[];
}

const ReportsCharts: React.FC = () => {
  const [charts, setCharts] = useState<Chart[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDataSource, setSelectedDataSource] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedChart, setSelectedChart] = useState<Chart | null>(null);

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    setCharts([
      {
        id: '1',
        name: 'Biểu đồ Tiến độ Dự án',
        description: 'Biểu đồ cột hiển thị tiến độ các dự án theo thời gian',
        type: 'bar',
        dataSource: 'projects',
        createdBy: 'Nguyễn Văn A',
        createdAt: '2024-01-01',
        lastModified: '2024-01-15',
        usageCount: 45,
        status: 'active',
        isPublic: true,
        colors: ['#800020', '#A00030', '#C00040'],
        dimensions: ['project_name', 'status'],
        metrics: ['progress', 'budget_used'],
        filters: ['date_range', 'department']
      },
      {
        id: '2',
        name: 'Phân bổ Chi phí',
        description: 'Biểu đồ tròn thể hiện phân bổ chi phí theo danh mục',
        type: 'pie',
        dataSource: 'costs',
        createdBy: 'Trần Thị B',
        createdAt: '2024-01-05',
        lastModified: '2024-01-12',
        usageCount: 32,
        status: 'active',
        isPublic: false,
        colors: ['#10B981', '#059669', '#047857', '#065F46'],
        dimensions: ['cost_category'],
        metrics: ['total_amount'],
        filters: ['date_range', 'project']
      },
      {
        id: '3',
        name: 'Xu hướng Doanh thu',
        description: 'Biểu đồ đường thể hiện xu hướng doanh thu theo tháng',
        type: 'line',
        dataSource: 'revenues',
        createdBy: 'Lê Văn C',
        createdAt: '2024-01-08',
        lastModified: '2024-01-10',
        usageCount: 28,
        status: 'active',
        isPublic: true,
        colors: ['#3B82F6', '#1D4ED8', '#1E40AF'],
        dimensions: ['month', 'year'],
        metrics: ['revenue', 'target'],
        filters: ['department', 'product']
      },
      {
        id: '4',
        name: 'Hiệu suất Nhân sự',
        description: 'Biểu đồ radar thể hiện hiệu suất nhân sự theo KPI',
        type: 'radar',
        dataSource: 'employees',
        createdBy: 'Phạm Thị D',
        createdAt: '2024-01-10',
        lastModified: '2024-01-14',
        usageCount: 15,
        status: 'draft',
        isPublic: false,
        colors: ['#F59E0B', '#D97706', '#B45309'],
        dimensions: ['employee_name', 'department'],
        metrics: ['productivity', 'quality', 'attendance'],
        filters: ['date_range', 'position']
      },
      {
        id: '5',
        name: 'Phân tích Tài sản',
        description: 'Biểu đồ phân tán thể hiện mối quan hệ giữa giá trị và tuổi thọ tài sản',
        type: 'scatter',
        dataSource: 'assets',
        createdBy: 'Hoàng Văn E',
        createdAt: '2024-01-12',
        lastModified: '2024-01-13',
        usageCount: 8,
        status: 'active',
        isPublic: true,
        colors: ['#8B5CF6', '#7C3AED', '#6D28D9'],
        dimensions: ['asset_type', 'location'],
        metrics: ['value', 'age', 'maintenance_cost'],
        filters: ['department', 'status']
      }
    ]);
  };

  const getChartTypeIcon = (type: string) => {
    switch (type) {
      case 'bar':
        return <BarChart className="w-5 h-5" />;
      case 'pie':
        return <PieChart className="w-5 h-5" />;
      case 'line':
        return <LineChart className="w-5 h-5" />;
      case 'scatter':
        return <BarChart3 className="w-5 h-5" />;
      case 'gantt':
        return <Calendar className="w-5 h-5" />;
      case 'radar':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <BarChart3 className="w-5 h-5" />;
    }
  };

  const getChartTypeName = (type: string) => {
    switch (type) {
      case 'bar':
        return 'Biểu đồ cột';
      case 'pie':
        return 'Biểu đồ tròn';
      case 'line':
        return 'Biểu đồ đường';
      case 'scatter':
        return 'Biểu đồ phân tán';
      case 'gantt':
        return 'Biểu đồ Gantt';
      case 'radar':
        return 'Biểu đồ radar';
      default:
        return 'Biểu đồ';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDataSourceColor = (source: string) => {
    switch (source) {
      case 'projects':
        return 'bg-blue-100 text-blue-800';
      case 'costs':
        return 'bg-green-100 text-green-800';
      case 'revenues':
        return 'bg-purple-100 text-purple-800';
      case 'employees':
        return 'bg-orange-100 text-orange-800';
      case 'assets':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCharts = charts.filter(chart => {
    const matchesSearch = chart.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chart.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || selectedType === 'all' || chart.type === selectedType;
    const matchesDataSource = !selectedDataSource || selectedDataSource === 'all' || chart.dataSource === selectedDataSource;
    
    return matchesSearch && matchesType && matchesDataSource;
  });

  const chartTypes = [...new Set(charts.map(c => c.type))];
  const dataSources = [...new Set(charts.map(c => c.dataSource))];

  const handleChartSelect = (chart: Chart) => {
    setSelectedChart(chart);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-[#800020] text-white' : ''}
          >
            Grid
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-[#800020] text-white' : ''}
          >
            List
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-[#800020] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Tạo Biểu đồ
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Tìm kiếm</Label>
              <Input
                placeholder="Tìm biểu đồ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Loại biểu đồ</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả loại" />
                </SelectTrigger>
                                 <SelectContent>
                   <SelectItem value="all">Tất cả loại</SelectItem>
                   {chartTypes.map(type => (
                     <SelectItem key={type} value={type}>
                       {getChartTypeName(type)}
                     </SelectItem>
                   ))}
                 </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nguồn dữ liệu</Label>
              <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả nguồn" />
                </SelectTrigger>
                                 <SelectContent>
                   <SelectItem value="all">Tất cả nguồn</SelectItem>
                   {dataSources.map(source => (
                     <SelectItem key={source} value={source}>
                       {source === 'projects' ? 'Dự án' :
                        source === 'costs' ? 'Chi phí' :
                        source === 'revenues' ? 'Doanh thu' :
                        source === 'employees' ? 'Nhân sự' :
                        source === 'assets' ? 'Tài sản' : source}
                     </SelectItem>
                   ))}
                 </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                Bộ lọc nâng cao
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharts.map((chart) => (
            <Card 
              key={chart.id} 
              className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => handleChartSelect(chart)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 flex items-center gap-2">
                      {getChartTypeIcon(chart.type)}
                      {chart.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getDataSourceColor(chart.dataSource)}>
                        {chart.dataSource === 'projects' ? 'Dự án' :
                         chart.dataSource === 'costs' ? 'Chi phí' :
                         chart.dataSource === 'revenues' ? 'Doanh thu' :
                         chart.dataSource === 'employees' ? 'Nhân sự' :
                         chart.dataSource === 'assets' ? 'Tài sản' : chart.dataSource}
                      </Badge>
                      <Badge className={getStatusColor(chart.status)}>
                        {chart.status === 'active' ? 'Hoạt động' : 
                         chart.status === 'draft' ? 'Nháp' : 'Lưu trữ'}
                      </Badge>
                      {chart.isPublic && (
                        <Badge variant="outline" className="text-xs">
                          Công khai
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4">{chart.description}</p>
                
                {/* Chart Preview */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-center h-32">
                    <div className="text-center">
                      {getChartTypeIcon(chart.type)}
                      <p className="text-sm text-gray-500 mt-2">
                        {getChartTypeName(chart.type)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Sử dụng:</span>
                    <span className="font-medium">{chart.usageCount} lần</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Cập nhật:</span>
                    <span className="font-medium">{chart.lastModified}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Kích thước:</span>
                    <span className="font-medium">{chart.dimensions.length}D x {chart.metrics.length}M</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Xem
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Sửa
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Biểu đồ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loại
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nguồn dữ liệu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sử dụng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cập nhật
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCharts.map((chart) => (
                    <tr key={chart.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            {getChartTypeIcon(chart.type)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{chart.name}</div>
                            <div className="text-sm text-gray-500">{chart.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline">
                          {getChartTypeName(chart.type)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getDataSourceColor(chart.dataSource)}>
                          {chart.dataSource === 'projects' ? 'Dự án' :
                           chart.dataSource === 'costs' ? 'Chi phí' :
                           chart.dataSource === 'revenues' ? 'Doanh thu' :
                           chart.dataSource === 'employees' ? 'Nhân sự' :
                           chart.dataSource === 'assets' ? 'Tài sản' : chart.dataSource}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {chart.usageCount} lần
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {chart.lastModified}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="w-4 h-4" />
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
      )}

      {/* Empty State */}
      {filteredCharts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy biểu đồ</h3>
            <p className="text-gray-500 mb-4">
              Không có biểu đồ nào phù hợp với bộ lọc hiện tại
            </p>
            <Button className="bg-[#800020] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tạo biểu đồ mới
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportsCharts;
