'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Building,
  Settings,
  Calendar,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

const AssetsServicesStatistics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [statistics, setStatistics] = useState({
    totalAssets: 850,
    totalServices: 420,
    totalValue: 25000000000,
    activeAssets: 720,
    maintenanceAssets: 80,
    expiredWarranty: 45,
    upcomingMaintenance: 25,
    completionRate: 85,
    assetsByCategory: {
      'Hardware': 400,
      'Software': 200,
      'Office Equipment': 150,
      'Infrastructure': 100
    },
    servicesByCategory: {
      'IT Services': 180,
      'Cloud Services': 120,
      'Maintenance Services': 80,
      'Consulting Services': 40
    },
    assetsByStatus: {
      'active': 720,
      'maintenance': 80,
      'inactive': 30,
      'retired': 20
    },
    servicesByStatus: {
      'active': 380,
      'pending': 25,
      'expired': 15
    },
    monthlyTrend: [
      { month: 'T1', assets: 800, services: 400, value: 24000000000 },
      { month: 'T2', assets: 820, services: 410, value: 24500000000 },
      { month: 'T3', assets: 830, services: 415, value: 24800000000 },
      { month: 'T4', assets: 840, services: 418, value: 24900000000 },
      { month: 'T5', assets: 845, services: 420, value: 25000000000 },
      { month: 'T6', assets: 850, services: 420, value: 25000000000 }
    ],
    maintenanceSchedule: [
      { month: 'T1', scheduled: 15, completed: 12, overdue: 3 },
      { month: 'T2', scheduled: 18, completed: 15, overdue: 3 },
      { month: 'T3', scheduled: 20, completed: 18, overdue: 2 },
      { month: 'T4', scheduled: 22, completed: 20, overdue: 2 },
      { month: 'T5', scheduled: 25, completed: 22, overdue: 3 },
      { month: 'T6', scheduled: 28, completed: 25, overdue: 3 }
    ]
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (number: number) => {
    return number.toLocaleString('vi-VN');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Thống kê Tài sản & Dịch vụ</h2>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần</SelectItem>
              <SelectItem value="month">Tháng</SelectItem>
              <SelectItem value="quarter">Quý</SelectItem>
              <SelectItem value="year">Năm</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng tài sản</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(statistics.totalAssets)}
            </div>
            <p className="text-xs text-muted-foreground">
              {statistics.activeAssets} đang hoạt động
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng dịch vụ</CardTitle>
            <Settings className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatNumber(statistics.totalServices)}
            </div>
            <p className="text-xs text-muted-foreground">
              {statistics.servicesByStatus.active} đang hoạt động
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng giá trị</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(statistics.totalValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Giá trị tài sản hiện tại
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cần bảo trì</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatNumber(statistics.upcomingMaintenance)}
            </div>
            <p className="text-xs text-muted-foreground">
              Trong tháng tới
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Tài sản theo danh mục
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statistics.assetsByCategory).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">{category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {formatNumber(count)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {((count / statistics.totalAssets) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Services by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Dịch vụ theo danh mục
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statistics.servicesByCategory).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">{category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {formatNumber(count)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {((count / statistics.totalServices) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets by Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Tài sản theo trạng thái
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statistics.assetsByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      status === 'active' ? 'bg-green-500' :
                      status === 'maintenance' ? 'bg-orange-500' :
                      status === 'inactive' ? 'bg-gray-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium capitalize">
                      {status === 'active' ? 'Đang hoạt động' :
                       status === 'maintenance' ? 'Bảo trì' :
                       status === 'inactive' ? 'Không hoạt động' : 'Đã thanh lý'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatNumber(count)}</div>
                    <div className="text-xs text-muted-foreground">
                      {((count / statistics.totalAssets) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Services by Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Dịch vụ theo trạng thái
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statistics.servicesByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      status === 'active' ? 'bg-green-500' :
                      status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium capitalize">
                      {status === 'active' ? 'Đang hoạt động' :
                       status === 'pending' ? 'Chờ xử lý' : 'Hết hạn'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatNumber(count)}</div>
                    <div className="text-xs text-muted-foreground">
                      {((count / statistics.totalServices) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Xu hướng tài sản & dịch vụ theo tháng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {statistics.monthlyTrend.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium mb-2">{item.month}</div>
                <div className="space-y-2">
                  <div className="bg-blue-100 rounded p-2">
                    <div className="text-xs text-blue-600">Tài sản</div>
                    <div className="text-sm font-bold">{formatNumber(item.assets)}</div>
                  </div>
                  <div className="bg-green-100 rounded p-2">
                    <div className="text-xs text-green-600">Dịch vụ</div>
                    <div className="text-sm font-bold">{formatNumber(item.services)}</div>
                  </div>
                  <div className="bg-purple-100 rounded p-2">
                    <div className="text-xs text-purple-600">Giá trị</div>
                    <div className="text-sm font-bold">{formatCurrency(item.value)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Lịch bảo trì theo tháng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {statistics.maintenanceSchedule.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium mb-2">{item.month}</div>
                <div className="space-y-2">
                  <div className="bg-blue-100 rounded p-2">
                    <div className="text-xs text-blue-600">Lên lịch</div>
                    <div className="text-sm font-bold">{formatNumber(item.scheduled)}</div>
                  </div>
                  <div className="bg-green-100 rounded p-2">
                    <div className="text-xs text-green-600">Hoàn thành</div>
                    <div className="text-sm font-bold">{formatNumber(item.completed)}</div>
                  </div>
                  <div className="bg-red-100 rounded p-2">
                    <div className="text-xs text-red-600">Quá hạn</div>
                    <div className="text-sm font-bold">{formatNumber(item.overdue)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts and Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-orange-500" />
              <div>
                <h3 className="font-semibold text-lg">Cần bảo trì</h3>
                <p className="text-2xl font-bold text-orange-600">{formatNumber(statistics.upcomingMaintenance)}</p>
                <p className="text-sm text-gray-600">Tài sản cần bảo trì trong tháng tới</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-red-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="font-semibold text-lg">Hết bảo hành</h3>
                <p className="text-2xl font-bold text-red-600">{formatNumber(statistics.expiredWarranty)}</p>
                <p className="text-sm text-gray-600">Tài sản đã hết bảo hành</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="font-semibold text-lg">Hoạt động tốt</h3>
                <p className="text-2xl font-bold text-green-600">{formatNumber(statistics.activeAssets)}</p>
                <p className="text-sm text-gray-600">Tài sản đang hoạt động bình thường</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssetsServicesStatistics;
