'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  BarChart3, 
  FileText, 
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

import CostList from './CostList';
import CostStatistics from './CostStatistics';
import CostReport from './CostReport';
import CostSearch from './CostSearch';
import CreateCostModal from './modals/CreateCostModal';
import CostExportModal from './modals/CostExportModal';

interface CostPageProps {
  // Add props as needed
}

const CostPage: React.FC<CostPageProps> = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  // Mock data - replace with actual API calls
  const [costStats, setCostStats] = useState({
    totalCosts: 0,
    totalAmount: 0,
    paidAmount: 0,
    overdueAmount: 0,
    pendingAmount: 0,
    completionRate: 0
  });

  useEffect(() => {
    // Fetch initial data
    fetchCostStatistics();
  }, []);

  const fetchCostStatistics = async () => {
    // Mock data - replace with actual API call
    setCostStats({
      totalCosts: 1250,
      totalAmount: 15000000000,
      paidAmount: 9000000000,
      overdueAmount: 500000000,
      pendingAmount: 5500000000,
      completionRate: 60
    });
  };

  const handleCreateCost = () => {
    setIsCreateModalOpen(true);
  };

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-[#800020] flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-xl">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            Quản lý Chi phí
          </h1>
          <p className="text-slate-600 max-w-2xl mt-3 text-lg">
            Quản lý và theo dõi các khoản mục chi phí của dự án.
            <span className="ml-2 text-[#800020] font-medium">Hỗ trợ phân tích và báo cáo chi tiết.</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white transition-all duration-200 px-6 py-3"
          >
            <Download className="w-5 h-5 mr-2" />
            Xuất báo cáo
          </Button>
          <Button 
            onClick={handleCreateCost}
            className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Tạo chi phí mới
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tổng chi phí - Màu đỏ Agribank */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#800020]/10 to-[#800020]/20 hover:from-[#800020]/20 hover:to-[#800020]/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#800020] mb-1">Tổng chi phí</p>
                <p className="text-3xl font-bold text-[#800020]">
                  {costStats.totalCosts.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-[#800020] mt-1">Khoản mục chi phí</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-full shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tổng số tiền - Màu xanh lá */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/20 hover:from-green-500/20 hover:to-green-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Tổng số tiền</p>
                <p className="text-3xl font-bold text-green-800">
                  {costStats.totalAmount.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-green-600 mt-1">VND</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Đã thanh toán - Màu xanh dương */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-blue-600/20 hover:from-blue-500/20 hover:to-blue-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Đã thanh toán</p>
                <p className="text-3xl font-bold text-blue-800">
                  {costStats.paidAmount.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-blue-600 mt-1">{costStats.completionRate}% hoàn thành</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quá hạn - Màu đỏ */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500/10 to-red-600/20 hover:from-red-500/20 hover:to-red-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700 mb-1">Quá hạn</p>
                <p className="text-3xl font-bold text-red-800">
                  {costStats.overdueAmount.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-red-600 mt-1">Cần xử lý</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#800020]/5 to-[#A00030]/5 border-b border-[#800020]/10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[#800020] text-xl font-semibold">Danh sách Chi phí</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white">
                <Filter className="w-4 h-4 mr-2" />
                Bộ lọc
              </Button>
              <Button variant="outline" size="sm" className="border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white">
                <Search className="w-4 h-4 mr-2" />
                Tìm kiếm
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger 
                value="list" 
                className="data-[state=active]:bg-[#800020] data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Danh sách
              </TabsTrigger>
              <TabsTrigger 
                value="statistics" 
                className="data-[state=active]:bg-[#800020] data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Thống kê
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="data-[state=active]:bg-[#800020] data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Báo cáo
              </TabsTrigger>
              <TabsTrigger 
                value="search" 
                className="data-[state=active]:bg-[#800020] data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Tìm kiếm
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-6">
              <CostList 
                searchQuery={searchQuery}
                filters={filters}
              />
            </TabsContent>

            <TabsContent value="statistics" className="mt-6">
              <CostStatistics />
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <CostReport />
            </TabsContent>

            <TabsContent value="search" className="mt-6">
              <CostSearch 
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modals */}
      <CreateCostModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          fetchCostStatistics();
        }}
      />

      <CostExportModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};

export { CostPage };
