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
  Upload,
  BarChart3, 
  FileText, 
  Calendar,
  Building,
  Settings,
  Bell,
  History,
  Trash2
} from 'lucide-react';

import AssetsServicesList from './AssetsServicesList';
import AssetsServicesStatistics from './AssetsServicesStatistics';
import AssetsServicesReport from './AssetsServicesReport';
import AssetsServicesSearch from './AssetsServicesSearch';
import CreateAssetServiceModal from './modals/CreateAssetServiceModal';
import ImportAssetServiceModal from './modals/ImportAssetServiceModal';
import ExportAssetServiceModal from './modals/ExportAssetServiceModal';

interface AssetsServicesPageProps {
  // Add props as needed
}

const AssetsServicesPage: React.FC<AssetsServicesPageProps> = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  // Mock data - replace with actual API calls
  const [assetsServicesStats, setAssetsServicesStats] = useState({
    totalAssets: 0,
    totalServices: 0,
    totalValue: 0,
    activeAssets: 0,
    maintenanceAssets: 0,
    expiredWarranty: 0,
    upcomingMaintenance: 0,
    completionRate: 0
  });

  useEffect(() => {
    // Fetch initial data
    fetchAssetsServicesStatistics();
  }, []);

  const fetchAssetsServicesStatistics = async () => {
    // Mock data - replace with actual API call
    setAssetsServicesStats({
      totalAssets: 850,
      totalServices: 420,
      totalValue: 25000000000,
      activeAssets: 720,
      maintenanceAssets: 80,
      expiredWarranty: 45,
      upcomingMaintenance: 25,
      completionRate: 85
    });
  };

  const handleCreateAssetService = () => {
    setIsCreateModalOpen(true);
  };

  const handleImport = () => {
    setIsImportModalOpen(true);
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
              <Building className="w-8 h-8 text-white" />
            </div>
            Quản lý Tài sản & Dịch vụ
          </h1>
          <p className="text-slate-600 max-w-2xl mt-3 text-lg">
            Quản lý và theo dõi tài sản, dịch vụ của dự án.
            <span className="ml-2 text-[#800020] font-medium">Hỗ trợ bảo trì, bảo hành và lịch sử sử dụng.</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleImport}
            className="border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white transition-all duration-200 px-6 py-3"
          >
            <Upload className="w-5 h-5 mr-2" />
            Nhập dữ liệu
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white transition-all duration-200 px-6 py-3"
          >
            <Download className="w-5 h-5 mr-2" />
            Xuất báo cáo
          </Button>
          <Button 
            onClick={handleCreateAssetService}
            className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Tạo mới
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tổng tài sản - Màu đỏ Agribank */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#800020]/10 to-[#800020]/20 hover:from-[#800020]/20 hover:to-[#800020]/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#800020] mb-1">Tổng tài sản</p>
                <p className="text-3xl font-bold text-[#800020]">
                  {assetsServicesStats.totalAssets.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-[#800020] mt-1">Tài sản vật lý</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-full shadow-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tổng dịch vụ - Màu xanh lá */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/20 hover:from-green-500/20 hover:to-green-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Tổng dịch vụ</p>
                <p className="text-3xl font-bold text-green-800">
                  {assetsServicesStats.totalServices.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-green-600 mt-1">Dịch vụ đang hoạt động</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tổng giá trị - Màu xanh dương */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-blue-600/20 hover:from-blue-500/20 hover:to-blue-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Tổng giá trị</p>
                <p className="text-3xl font-bold text-blue-800">
                  {assetsServicesStats.totalValue.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-blue-600 mt-1">VND</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cần bảo trì - Màu cam */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500/10 to-orange-600/20 hover:from-orange-500/20 hover:to-orange-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 mb-1">Cần bảo trì</p>
                <p className="text-3xl font-bold text-orange-800">
                  {assetsServicesStats.upcomingMaintenance.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-orange-600 mt-1">Tài sản cần xử lý</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#800020]/5 to-[#A00030]/5 border-b border-[#800020]/10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[#800020] text-xl font-semibold">Danh sách Tài sản & Dịch vụ</CardTitle>
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
            <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-lg">
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
              <TabsTrigger 
                value="history" 
                className="data-[state=active]:bg-[#800020] data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Lịch sử
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-6">
              <AssetsServicesList 
                searchQuery={searchQuery}
                filters={filters}
              />
            </TabsContent>

            <TabsContent value="statistics" className="mt-6">
              <AssetsServicesStatistics />
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <AssetsServicesReport />
            </TabsContent>

            <TabsContent value="search" className="mt-6">
              <AssetsServicesSearch 
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
              />
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <div className="text-center py-12">
                <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Lịch sử Tài sản & Dịch vụ</h3>
                <p className="text-gray-500">Theo dõi lịch sử sử dụng, bảo hành, bảo dưỡng</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modals */}
      <CreateAssetServiceModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          fetchAssetsServicesStatistics();
        }}
      />

      <ImportAssetServiceModal 
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSuccess={() => {
          setIsImportModalOpen(false);
          fetchAssetsServicesStatistics();
        }}
      />

      <ExportAssetServiceModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};

export { AssetsServicesPage };
