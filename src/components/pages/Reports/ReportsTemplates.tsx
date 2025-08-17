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
  FileText,
  Calendar,
  Users,
  Heart,
  MoreHorizontal
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  usageCount: number;
  status: 'active' | 'draft' | 'archived';
  isPublic: boolean;
  tags: string[];
  dataSources: string[];
  charts: string[];
}

const ReportsTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    setTemplates([
      {
        id: '1',
        name: 'Báo cáo Tổng hợp Dự án',
        description: 'Template báo cáo tổng quan về tất cả dự án với biểu đồ và thống kê',
        category: 'Dự án',
        version: '2.1.0',
        createdBy: 'Nguyễn Văn A',
        createdAt: '2024-01-01',
        lastModified: '2024-01-15',
        usageCount: 45,
        status: 'active',
        isPublic: true,
        tags: ['dự án', 'tổng hợp', 'thống kê'],
        dataSources: ['projects', 'contracts', 'costs'],
        charts: ['bar', 'pie', 'line']
      },
      {
        id: '2',
        name: 'Báo cáo Tài chính Chi tiết',
        description: 'Template phân tích tài chính với các chỉ số KPI và xu hướng',
        category: 'Tài chính',
        version: '1.5.2',
        createdBy: 'Trần Thị B',
        createdAt: '2024-01-05',
        lastModified: '2024-01-12',
        usageCount: 32,
        status: 'active',
        isPublic: false,
        tags: ['tài chính', 'KPI', 'phân tích'],
        dataSources: ['costs', 'revenues', 'budgets'],
        charts: ['line', 'bar', 'area']
      },
      {
        id: '3',
        name: 'Báo cáo Tài sản & Dịch vụ',
        description: 'Template thống kê tài sản và dịch vụ với bảo trì và khấu hao',
        category: 'Tài sản',
        version: '1.2.1',
        createdBy: 'Lê Văn C',
        createdAt: '2024-01-08',
        lastModified: '2024-01-10',
        usageCount: 28,
        status: 'active',
        isPublic: true,
        tags: ['tài sản', 'dịch vụ', 'bảo trì'],
        dataSources: ['assets', 'services', 'maintenance'],
        charts: ['pie', 'bar', 'scatter']
      },
      {
        id: '4',
        name: 'Báo cáo Nhân sự',
        description: 'Template quản lý nhân sự với hiệu suất và phân bổ nguồn lực',
        category: 'Nhân sự',
        version: '1.0.3',
        createdBy: 'Phạm Thị D',
        createdAt: '2024-01-10',
        lastModified: '2024-01-14',
        usageCount: 15,
        status: 'draft',
        isPublic: false,
        tags: ['nhân sự', 'hiệu suất', 'nguồn lực'],
        dataSources: ['employees', 'departments', 'performance'],
        charts: ['bar', 'line', 'radar']
      },
      {
        id: '5',
        name: 'Báo cáo Tuân thủ',
        description: 'Template báo cáo tuân thủ và quản lý rủi ro',
        category: 'Tuân thủ',
        version: '1.1.0',
        createdBy: 'Hoàng Văn E',
        createdAt: '2024-01-12',
        lastModified: '2024-01-13',
        usageCount: 8,
        status: 'active',
        isPublic: true,
        tags: ['tuân thủ', 'rủi ro', 'kiểm soát'],
        dataSources: ['compliance', 'risks', 'audits'],
        charts: ['gauge', 'bar', 'heatmap']
      }
    ]);
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Dự án':
        return 'bg-blue-100 text-blue-800';
      case 'Tài chính':
        return 'bg-green-100 text-green-800';
      case 'Tài sản':
        return 'bg-purple-100 text-purple-800';
      case 'Nhân sự':
        return 'bg-orange-100 text-orange-800';
      case 'Tuân thủ':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || template.category === selectedCategory;
    const matchesStatus = !selectedStatus || selectedStatus === 'all' || template.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(templates.map(t => t.category))];
  const statuses = [...new Set(templates.map(t => t.status))];

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
            Tạo Template
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
                placeholder="Tìm template..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Danh mục</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả danh mục" />
                </SelectTrigger>
                                 <SelectContent>
                   <SelectItem value="all">Tất cả danh mục</SelectItem>
                   {categories.map(category => (
                     <SelectItem key={category} value={category}>{category}</SelectItem>
                   ))}
                 </SelectContent>
              </Select>
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
                       {status === 'active' ? 'Hoạt động' : 
                        status === 'draft' ? 'Nháp' : 'Lưu trữ'}
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

      {/* Templates Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getCategoryColor(template.category)}>
                        {template.category}
                      </Badge>
                      <Badge className={getStatusColor(template.status)}>
                        {template.status === 'active' ? 'Hoạt động' : 
                         template.status === 'draft' ? 'Nháp' : 'Lưu trữ'}
                      </Badge>
                      {template.isPublic && (
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
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Phiên bản:</span>
                    <span className="font-medium">{template.version}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Sử dụng:</span>
                    <span className="font-medium">{template.usageCount} lần</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Cập nhật:</span>
                    <span className="font-medium">{template.lastModified}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
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
                      Template
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Danh mục
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
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
                  {filteredTemplates.map((template) => (
                    <tr key={template.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{template.name}</div>
                          <div className="text-sm text-gray-500">{template.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getCategoryColor(template.category)}>
                          {template.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(template.status)}>
                          {template.status === 'active' ? 'Hoạt động' : 
                           template.status === 'draft' ? 'Nháp' : 'Lưu trữ'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {template.usageCount} lần
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {template.lastModified}
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
      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy template</h3>
            <p className="text-gray-500 mb-4">
              Không có template nào phù hợp với bộ lọc hiện tại
            </p>
            <Button className="bg-[#800020] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tạo template mới
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportsTemplates;
