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
  DollarSign,
  Calendar,
  Download
} from 'lucide-react';

const CostStatistics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [statistics, setStatistics] = useState({
    totalCosts: 1250,
    totalAmount: 15000000000,
    paidAmount: 9000000000,
    overdueAmount: 500000000,
    pendingAmount: 5500000000,
    completionRate: 60,
    averageCost: 12000000,
    costByCategory: {
      'Thiết bị': 4000000000,
      'Dịch vụ': 3500000000,
      'Vật tư': 2500000000,
      'Nhân sự': 3000000000,
      'Văn phòng': 1000000000,
      'Khác': 1000000000
    },
    costByStatus: {
      'active': 800,
      'completed': 400,
      'cancelled': 50
    },
    costByPayment: {
      'paid': 600,
      'partial': 400,
      'pending': 200,
      'overdue': 50
    },
    monthlyTrend: [
      { month: 'T1', amount: 1200000000 },
      { month: 'T2', amount: 1350000000 },
      { month: 'T3', amount: 1100000000 },
      { month: 'T4', amount: 1400000000 },
      { month: 'T5', amount: 1600000000 },
      { month: 'T6', amount: 1500000000 }
    ]
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatShortAmount = (amount: number) => {
    return amount.toLocaleString('vi-VN');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Thống kê Chi phí</h2>
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
            <CardTitle className="text-sm font-medium">Tổng chi phí</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatShortAmount(statistics.totalAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              {statistics.totalCosts} khoản mục
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã thanh toán</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatShortAmount(statistics.paidAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              {statistics.completionRate}% hoàn thành
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ thanh toán</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatShortAmount(statistics.pendingAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              Cần xử lý
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quá hạn</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatShortAmount(statistics.overdueAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              Cần xử lý gấp
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Chi phí theo danh mục
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statistics.costByCategory).map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">{category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {formatShortAmount(amount)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {((amount / statistics.totalAmount) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cost by Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Chi phí theo trạng thái
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statistics.costByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      status === 'active' ? 'bg-blue-500' :
                      status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium capitalize">
                      {status === 'active' ? 'Đang hoạt động' :
                       status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{count}</div>
                    <div className="text-xs text-muted-foreground">
                      {((count / statistics.totalCosts) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Status Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Trạng thái thanh toán
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(statistics.costByPayment).map(([status, count]) => (
              <div key={status} className="text-center p-4 border rounded-lg">
                <div className={`text-2xl font-bold ${
                  status === 'paid' ? 'text-green-600' :
                  status === 'partial' ? 'text-orange-600' :
                  status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {count}
                </div>
                <div className="text-sm text-muted-foreground capitalize">
                  {status === 'paid' ? 'Đã thanh toán' :
                   status === 'partial' ? 'Thanh toán một phần' :
                   status === 'pending' ? 'Chờ thanh toán' : 'Quá hạn'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {((count / statistics.totalCosts) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Xu hướng chi phí theo tháng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-32">
            {statistics.monthlyTrend.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-blue-500 rounded-t w-8"
                  style={{ 
                    height: `${(item.amount / Math.max(...statistics.monthlyTrend.map(t => t.amount))) * 80}px` 
                  }}
                ></div>
                <div className="text-xs text-muted-foreground mt-2">
                  {item.month}
                </div>
                <div className="text-xs font-medium">
                  {formatShortAmount(item.amount)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostStatistics;
