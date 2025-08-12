"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Home, 
  Calendar,
  Users, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Filter,
  Search,
  Bell,
  Star,
  Flag,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Send,
  FileText,
  BarChart3,
  Target,
  Building2,
  Package,
  ShoppingCart,
  CreditCard,
  FileSpreadsheet,
  Headphones,
  Activity,
  MoreVertical
} from "lucide-react"
import { useState } from "react"

// Stock Order Table Component
function StockOrderTable() {
  const orders = [
    {
      id: "#0S12K0S",
      items: 5,
      value: "$1500",
      created: "July 14, 2015",
      vendor: "Barone LLC",
      status: "PENDING",
      received: { current: 0, total: 3 },
      emailSent: true
    },
    {
      id: "#0S11K0S",
      items: 890,
      value: "$1270",
      created: "October 30, 2017",
      vendor: "Acme Co.",
      status: "PENDING",
      received: { current: 0, total: 3 },
      emailSent: true
    },
    {
      id: "#0S10K0S",
      items: 204,
      value: "$1124",
      created: "October 24, 2018",
      vendor: "Abstergo Ltd.",
      status: "COMPLETE",
      received: { current: 3, total: 3 },
      emailSent: true
    },
    {
      id: "#0S09K0S",
      items: 156,
      value: "$890",
      created: "September 15, 2019",
      vendor: "TechCorp Inc.",
      status: "PARTIALLY RECEIVED",
      received: { current: 2, total: 4 },
      emailSent: true
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      'PENDING': 'bg-orange-100 text-orange-700 border-orange-200',
      'COMPLETE': 'bg-green-100 text-green-700 border-green-200',
      'PARTIALLY RECEIVED': 'bg-purple-100 text-purple-700 border-purple-200'
    }
    return variants[status] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const getProgressBar = (received: { current: number; total: number }) => {
    const percentage = (received.current / received.total) * 100
    return (
      <div className="flex items-center space-x-2">
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs text-gray-600">{received.current}/{received.total}</span>
      </div>
    )
  }

  return (
    <Card className="border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search Order" 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            + Order Stock
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-50">
              <TableHead className="font-semibold cursor-pointer">
                ORDER
                <ChevronDown className="w-4 h-4 ml-1 inline" />
              </TableHead>
              <TableHead className="font-semibold cursor-pointer">
                CREATED
                <ChevronDown className="w-4 h-4 ml-1 inline" />
              </TableHead>
              <TableHead className="font-semibold cursor-pointer">
                FROM VENDOR
                <ChevronDown className="w-4 h-4 ml-1 inline" />
              </TableHead>
              <TableHead className="font-semibold cursor-pointer">
                STATUS
                <ChevronDown className="w-4 h-4 ml-1 inline" />
              </TableHead>
              <TableHead className="font-semibold cursor-pointer">
                ITEM RECEIVED
                <ChevronDown className="w-4 h-4 ml-1 inline" />
              </TableHead>
              <TableHead className="font-semibold">SEND EMAIL</TableHead>
              <TableHead className="font-semibold">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="font-medium text-blue-600">{order.id}</div>
                  <div className="text-sm text-gray-500">{order.items} items, {order.value}</div>
                </TableCell>
                <TableCell className="text-gray-700">{order.created}</TableCell>
                <TableCell className="text-gray-700">{order.vendor}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadge(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {getProgressBar(order.received)}
                </TableCell>
                <TableCell>
                  {order.emailSent && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={order.status === 'COMPLETE'}
                      className={order.status === 'COMPLETE' ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      Receive
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Stock Summary Component
function StockSummary() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Total Asset Value */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Asset Value</p>
              <p className="text-3xl font-bold text-gray-900">$10,200,323</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Summary */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Product Summary</p>
            <p className="text-2xl font-bold text-gray-900">32 products</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">In stock</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-3 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '62.5%' }} />
                </div>
                <span className="text-sm font-medium text-green-600">20</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Low stock</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-3 bg-orange-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '12.5%' }} />
                </div>
                <span className="text-sm font-medium text-orange-600">4</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Out of stock</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-3 bg-red-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '25%' }} />
                </div>
                <span className="text-sm font-medium text-red-600">8</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Quick Actions</p>
            <p className="text-lg font-semibold text-gray-900">Manage Stock</p>
          </div>
          
          <div className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Order
            </Button>
            <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
              <Package className="w-4 h-4 mr-2" />
              Check Inventory
            </Button>
            <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main Content Component
function MainContent() {
  const [activeTab, setActiveTab] = useState("order-stock")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stocks</h1>
          <p className="text-gray-600 mt-1">Manage your clinic's inventory and stock orders</p>
        </div>
      </div>

      {/* Stock Summary */}
      <StockSummary />

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="inventory" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Inventory
            </TabsTrigger>
            <TabsTrigger 
              value="order-stock" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Order Stock
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content based on active tab */}
      {activeTab === "order-stock" && <StockOrderTable />}
      {activeTab === "inventory" && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <p className="text-center text-gray-500 py-8">Inventory management coming soon...</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Sidebar Navigation Component
function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const navigationItems = [
    {
      category: "Clinic",
      items: [
        { icon: Home, label: "Dashboard", active: false },
        { icon: Calendar, label: "Reservations", active: false },
        { icon: Users, label: "Patients", active: false },
        { icon: FileText, label: "Treatments", active: false },
        { icon: Users, label: "Staff List", active: false }
      ]
    },
    {
      category: "Finance",
      items: [
        { icon: DollarSign, label: "Accounts", active: false },
        { icon: TrendingUp, label: "Sales", active: false },
        { icon: ShoppingCart, label: "Purchases", active: false },
        { icon: CreditCard, label: "Payment Method", active: false }
      ]
    },
    {
      category: "Physical Asset",
      items: [
        { icon: Package, label: "Stocks", active: true },
        { icon: Building2, label: "Peripherals", active: false }
      ]
    },
    {
      category: "Report",
      items: [
        { icon: FileSpreadsheet, label: "Report", active: false },
        { icon: Headphones, label: "Customer Support", active: false }
      ]
    }
  ]

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}>
      {/* Logo and Clinic Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-gray-900">Zendenta</h2>
              <p className="text-xs text-gray-500">Avicena Clinic</p>
              <p className="text-xs text-gray-400">845 Euclid Avenue, CA</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {navigationItems.map((section) => (
          <div key={section.category}>
            {!collapsed && (
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {section.category}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
                    collapsed ? 'justify-center' : 'space-x-3'
                  } ${
                    item.active 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <item.icon 
                    className={`w-5 h-5 flex-shrink-0 ${
                      item.active ? 'text-blue-600' : 'text-gray-600'
                    }`} 
                  />
                  {!collapsed && (
                    <span className={`text-sm ${
                      item.active ? 'font-medium text-blue-700' : 'text-gray-700'
                    }`}>
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}

// Top Header Component
function TopHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Page title */}
        <div className="text-2xl font-semibold text-gray-900">Stocks</div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search for anything here..." 
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Right side - Actions and User */}
        <div className="flex items-center space-x-4">
          <Button className="w-10 h-10 p-0 bg-blue-600 hover:bg-blue-700 rounded-full">
            <Plus className="w-5 h-5" />
          </Button>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <Star className="w-5 h-5" />
          </Button>
          
          <Button variant="ghost" size="sm" className="relative">
            <Flag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              114
            </span>
          </Button>
          
          <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">Darrell Steward</p>
              <p className="text-xs text-gray-500">Super admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default function ClinicDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <TopHeader />
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <MainContent />
        </main>
      </div>
    </div>
  )
}
