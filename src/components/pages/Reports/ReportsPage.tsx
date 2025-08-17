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
  PieChart,
  TrendingUp,
  Settings,
  Eye,
  Clock,
  Users,
  Database
} from 'lucide-react';

import ReportsBuilder from './ReportsBuilder';
import ReportsTemplates from './ReportsTemplates';
import ReportsCharts from './ReportsCharts';
import ReportsHistory from './ReportsHistory';
import CreateReportModal from './modals/CreateReportModal';
import ImportTemplateModal from './modals/ImportTemplateModal';
import ExportReportModal from './modals/ExportReportModal';

interface ReportsPageProps {
  // Add props as needed
}

const ReportsPage: React.FC<ReportsPageProps> = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  // Mock data - replace with actual API calls
  const [reportsStats, setReportsStats] = useState({
    totalReports: 0,
    totalTemplates: 0,
    totalCharts: 0,
    scheduledReports: 0,
    pendingApprovals: 0,
    completedReports: 0,
    activeUsers: 0,
    dataSources: 0
  });

  useEffect(() => {
    // Fetch initial data
    fetchReportsStatistics();
  }, []);

  const fetchReportsStatistics = async () => {
    // Mock data - replace with actual API call
    setReportsStats({
      totalReports: 1250,
      totalTemplates: 85,
      totalCharts: 420,
      scheduledReports: 45,
      pendingApprovals: 12,
      completedReports: 1180,
      activeUsers: 65,
      dataSources: 15
    });
  };

  const handleCreateReport = () => {
    setIsCreateModalOpen(true);
  };

  const handleImportTemplate = () => {
    setIsImportModalOpen(true);
  };

  const handleExportReport = () => {
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
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            Hệ thống Báo cáo
          </h1>
          <p className="text-slate-600 max-w-2xl mt-3 text-lg">
            Tạo và quản lý báo cáo tổng hợp với biểu đồ trực quan.
            <span className="ml-2 text-[#800020] font-medium">Hỗ trợ template tùy chỉnh và xuất đa định dạng.</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleImportTemplate}
            className="border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white transition-all duration-200 px-6 py-3"
          >
            <Upload className="w-5 h-5 mr-2" />
            Nhập Template
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExportReport}
            className="border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white transition-all duration-200 px-6 py-3"
          >
            <Download className="w-5 h-5 mr-2" />
            Xuất báo cáo
          </Button>
          <Button 
            onClick={handleCreateReport}
            className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Tạo báo cáo mới
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tổng báo cáo - Màu đỏ Agribank */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#800020]/10 to-[#800020]/20 hover:from-[#800020]/20 hover:to-[#800020]/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#800020] mb-1">Tổng báo cáo</p>
                <p className="text-3xl font-bold text-[#800020]">
                  {reportsStats.totalReports.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-[#800020] mt-1">Báo cáo đã tạo</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-full shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Template - Màu xanh lá */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/20 hover:from-green-500/20 hover:to-green-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Template</p>
                <p className="text-3xl font-bold text-green-800">
                  {reportsStats.totalTemplates.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-green-600 mt-1">Template có sẵn</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Biểu đồ - Màu xanh dương */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-blue-600/20 hover:from-blue-500/20 hover:to-blue-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Biểu đồ</p>
                <p className="text-3xl font-bold text-blue-800">
                  {reportsStats.totalCharts.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-blue-600 mt-1">Biểu đồ đã tạo</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
                <PieChart className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chờ duyệt - Màu cam */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500/10 to-orange-600/20 hover:from-orange-500/20 hover:to-orange-600/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 mb-1">Chờ duyệt</p>
                <p className="text-3xl font-bold text-orange-800">
                  {reportsStats.pendingApprovals.toLocaleString('vi-VN')}
                </p>
                <p className="text-xs text-orange-600 mt-1">Báo cáo cần xử lý</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#800020]/5 to-[#A00030]/5 border-b border-[#800020]/10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[#800020] text-xl font-semibold">Quản lý Báo cáo</CardTitle>
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
                value="builder" 
                className="data-[state=active]:bg-[#800020] data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Tạo báo cáo
              </TabsTrigger>
              <TabsTrigger 
                value="templates" 
                className="data-[state=active]:bg-[#800020] data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                <Settings className="w-4 h-4 mr-2" />
                Template
              </TabsTrigger>
              <TabsTrigger 
                value="charts" 
                className="data-[state=active]:bg-[#800020] data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                <PieChart className="w-4 h-4 mr-2" />
                Biểu đồ
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="data-[state=active]:bg-[#800020] data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                <Clock className="w-4 h-4 mr-2" />
                Lịch sử
              </TabsTrigger>
            </TabsList>

            <TabsContent value="builder" className="mt-6">
              <ReportsBuilder 
                searchQuery={searchQuery}
                filters={filters}
              />
            </TabsContent>

            <TabsContent value="templates" className="mt-6">
              <ReportsTemplates />
            </TabsContent>

            <TabsContent value="charts" className="mt-6">
              <ReportsCharts />
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <ReportsHistory />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modals */}
      <CreateReportModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          fetchReportsStatistics();
        }}
      />

      <ImportTemplateModal 
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSuccess={() => {
          setIsImportModalOpen(false);
          fetchReportsStatistics();
        }}
      />

      <ExportReportModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};

export { ReportsPage };
