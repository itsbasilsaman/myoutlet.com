"use client"

import { useState, useEffect } from "react"
import Image from 'next/image';
import {
  Bell,
  BarChart2,
  FileText,
  Plus,
  UtensilsCrossed,
  LogOut,
  Menu,
  Settings,
  Globe,
  Database,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  Eye,
  Edit,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Types for Super Admin Dashboard
type RestaurantRegistration = {
  id: string
  name: string
  ownerName: string
  email: string
  phone: string
  address: string
  cuisine: string
  requestedSubdomain: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  documents: string[]
}

type SubdomainMapping = {
  id: string
  restaurantName: string
  subdomain: string
  customDomain?: string
  status: "active" | "inactive" | "pending"
  sslStatus: "active" | "pending" | "failed"
  lastChecked: string
}

type GoogleSheetIntegration = {
  id: string
  restaurantName: string
  sheetId: string
  lastSync: string
  status: "healthy" | "warning" | "error"
  errorMessage?: string
  menuItems: number
}

type ExternalIntegration = {
  id: string
  platform: "swiggy" | "zomato" | "uber-eats"
  restaurantName: string
  apiKey: string
  status: "connected" | "disconnected" | "error"
  lastSync: string
  ordersToday: number
}

type Subscription = {
  id: string
  restaurantName: string
  plan: "basic" | "premium" | "enterprise"
  status: "active" | "expired" | "cancelled"
  startDate: string
  endDate: string
  revenue: number
}

type PlatformMetrics = {
  totalRestaurants: number
  activeRestaurants: number
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  ordersToday: number
  revenueToday: number
  avgOrderValue: number
}

export default function SuperAdminDashboard() {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState("overview")

  // Sample data - In real app, this would come from APIs
  const [platformMetrics] = useState<PlatformMetrics>({
    totalRestaurants: 156,
    activeRestaurants: 142,
    totalUsers: 12847,
    totalOrders: 45623,
    totalRevenue: 2847592,
    ordersToday: 234,
    revenueToday: 15420,
    avgOrderValue: 65.8,
  })

  const [pendingRegistrations] = useState<RestaurantRegistration[]>([
    {
      id: "REG001",
      name: "Spice Garden",
      ownerName: "Rajesh Kumar",
      email: "rajesh@spicegarden.com",
      phone: "+91 98765 43210",
      address: "123 MG Road, Bangalore",
      cuisine: "Indian",
      requestedSubdomain: "spicegarden",
      status: "pending",
      submittedAt: "2024-01-15T10:30:00Z",
      documents: ["license.pdf", "tax_certificate.pdf"],
    },
    {
      id: "REG002",
      name: "Pizza Corner",
      ownerName: "Marco Rossi",
      email: "marco@pizzacorner.com",
      phone: "+91 87654 32109",
      address: "456 Brigade Road, Bangalore",
      cuisine: "Italian",
      requestedSubdomain: "pizzacorner",
      status: "pending",
      submittedAt: "2024-01-14T15:45:00Z",
      documents: ["license.pdf", "health_certificate.pdf"],
    },
  ])

  const [subdomainMappings] = useState<SubdomainMapping[]>([
    {
      id: "SUB001",
      restaurantName: "Burger Palace",
      subdomain: "burgerpalace.myoutlet.com",
      customDomain: "burgerpalace.com",
      status: "active",
      sslStatus: "active",
      lastChecked: "2024-01-15T12:00:00Z",
    },
    {
      id: "SUB002",
      restaurantName: "Sushi World",
      subdomain: "sushiworld.myoutlet.com",
      status: "active",
      sslStatus: "pending",
      lastChecked: "2024-01-15T11:30:00Z",
    },
  ])

  const [googleSheetIntegrations] = useState<GoogleSheetIntegration[]>([
    {
      id: "GS001",
      restaurantName: "Burger Palace",
      sheetId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
      lastSync: "2024-01-15T12:15:00Z",
      status: "healthy",
      menuItems: 45,
    },
    {
      id: "GS002",
      restaurantName: "Sushi World",
      sheetId: "1CxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
      lastSync: "2024-01-15T10:30:00Z",
      status: "warning",
      errorMessage: "Some menu items missing prices",
      menuItems: 32,
    },
  ])

  const [externalIntegrations] = useState<ExternalIntegration[]>([
    {
      id: "EXT001",
      platform: "swiggy",
      restaurantName: "Burger Palace",
      apiKey: "sk_live_***************",
      status: "connected",
      lastSync: "2024-01-15T12:00:00Z",
      ordersToday: 23,
    },
    {
      id: "EXT002",
      platform: "zomato",
      restaurantName: "Sushi World",
      apiKey: "zk_live_***************",
      status: "error",
      lastSync: "2024-01-14T18:30:00Z",
      ordersToday: 0,
    },
  ])

  const [subscriptions] = useState<Subscription[]>([
    {
      id: "SUB001",
      restaurantName: "Burger Palace",
      plan: "premium",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      revenue: 2400,
    },
    {
      id: "SUB002",
      restaurantName: "Sushi World",
      plan: "basic",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2025-01-14",
      revenue: 1200,
    },
  ])

  const menuItems = [
    {
      title: "Overview",
      icon: <BarChart2 className="h-5 w-5" />,
      path: "overview",
      active: activeSection === "overview",
    },
    {
      title: "Restaurant Registrations",
      icon: <FileText className="h-5 w-5" />,
      path: "registrations",
      active: activeSection === "registrations",
    },
    {
      title: "Subdomain Management",
      icon: <Globe className="h-5 w-5" />,
      path: "subdomains",
      active: activeSection === "subdomains",
    },
    {
      title: "Google Sheets Monitor",
      icon: <Database className="h-5 w-5" />,
      path: "sheets",
      active: activeSection === "sheets",
    },
    {
      title: "External Integrations",
      icon: <Settings className="h-5 w-5" />,
      path: "integrations",
      active: activeSection === "integrations",
    },
    {
      title: "Subscriptions",
      icon: <DollarSign className="h-5 w-5" />,
      path: "subscriptions",
      active: activeSection === "subscriptions",
    },
    {
      title: "Platform Analytics",
      icon: <TrendingUp className="h-5 w-5" />,
      path: "analytics",
      active: activeSection === "analytics",
    },
  ]

  const handleApproveRegistration = (id: string) => {
    // In real app, this would call an API
    console.log(`Approving registration ${id}`)
    // Update state or refetch data
  }

  const handleRejectRegistration = (id: string) => {
    // In real app, this would call an API
    console.log(`Rejecting registration ${id}`)
    // Update state or refetch data
  }

  const handleRefreshIntegration = (id: string) => {
    // In real app, this would call an API to refresh the integration
    console.log(`Refreshing integration ${id}`)
  }

  const navigateToSection = (section: string) => {
    setActiveSection(section)
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}
    >
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-[60] p-2 rounded-md bg-gray-800 text-white dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[45] md:hidden" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <div
        className={`${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 border-r ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"} flex-shrink-0 z-[50] transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center">
            <div className="flex items-center space-x-2">
               
               <Image
                src="/images/myoutlet.logo.png"
                alt="Logo"
                width={32}
                height={32} // Adjust size as needed
             
              />
            </div>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Super Admin</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => navigateToSection(item.path)}
                  className={`flex items-center w-full p-3 rounded-md transition-all duration-200 text-left ${
                    item.active
                      ? darkMode
                        ? "bg-yellow-500 text-black"
                        : "bg-yellow-400 text-black"
                      : darkMode
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-100"
                  } ${item.active ? "font-medium" : ""}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-sm">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className={`h-16 border-b ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"} flex items-center justify-between px-4 md:px-6 sticky top-0 z-30`}
        >
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {pendingRegistrations.length}
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
              <span className="text-sm hidden sm:inline">Dark mode</span>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-yellow-500"
              />
            </div>

            <button
              className="flex items-center space-x-1 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={() => router.push("/logout")}
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeSection === "overview" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Platform Overview</h1>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </div>

              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Restaurants</CardTitle>
                    <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{platformMetrics.totalRestaurants}</div>
                    <p className="text-xs text-muted-foreground">{platformMetrics.activeRestaurants} active</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{platformMetrics.totalUsers.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{platformMetrics.totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      ₹{platformMetrics.revenueToday.toLocaleString()} today
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{platformMetrics.ordersToday}</div>
                    <p className="text-xs text-muted-foreground">Avg: ₹{platformMetrics.avgOrderValue}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Actions</CardTitle>
                    <CardDescription>Items requiring your attention</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span>Restaurant Registrations</span>
                      </div>
                      <Badge variant="secondary">{pendingRegistrations.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span>Failed Integrations</span>
                      </div>
                      <Badge variant="destructive">2</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <span>System Health Checks</span>
                      </div>
                      <Badge variant="outline">All Good</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest platform events</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">New restaurant registered</p>
                        <p className="text-xs text-muted-foreground">Spice Garden - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Integration updated</p>
                        <p className="text-xs text-muted-foreground">Swiggy API - 4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Subscription renewed</p>
                        <p className="text-xs text-muted-foreground">Burger Palace - 6 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === "registrations" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Restaurant Registrations</h1>
                <Badge variant="secondary">{pendingRegistrations.length} Pending</Badge>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                  <CardDescription>Review and approve new restaurant registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Restaurant</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Cuisine</TableHead>
                        <TableHead>Subdomain</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRegistrations.map((registration) => (
                        <TableRow key={registration.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{registration.name}</div>
                              <div className="text-sm text-muted-foreground">{registration.address}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{registration.ownerName}</div>
                              <div className="text-sm text-muted-foreground">{registration.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{registration.cuisine}</TableCell>
                          <TableCell>
                            <code className="text-sm bg-muted px-2 py-1 rounded">
                              {registration.requestedSubdomain}.myoutlet.com
                            </code>
                          </TableCell>
                          <TableCell>{new Date(registration.submittedAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleApproveRegistration(registration.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectRegistration(registration.id)}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "subdomains" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Subdomain Management</h1>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Mapping
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Domain Mappings</CardTitle>
                  <CardDescription>Manage restaurant subdomains and custom domains</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Restaurant</TableHead>
                        <TableHead>Subdomain</TableHead>
                        <TableHead>Custom Domain</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>SSL</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subdomainMappings.map((mapping) => (
                        <TableRow key={mapping.id}>
                          <TableCell className="font-medium">{mapping.restaurantName}</TableCell>
                          <TableCell>
                            <code className="text-sm bg-muted px-2 py-1 rounded">{mapping.subdomain}</code>
                          </TableCell>
                          <TableCell>
                            {mapping.customDomain ? (
                              <code className="text-sm bg-muted px-2 py-1 rounded">{mapping.customDomain}</code>
                            ) : (
                              <span className="text-muted-foreground">None</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={mapping.status === "active" ? "default" : "secondary"}>
                              {mapping.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                mapping.sslStatus === "active"
                                  ? "default"
                                  : mapping.sslStatus === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {mapping.sslStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "sheets" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Google Sheets Monitor</h1>
                <Button>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh All
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Integration Health</CardTitle>
                  <CardDescription>Monitor Google Sheets API connections and data sync</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Restaurant</TableHead>
                        <TableHead>Sheet ID</TableHead>
                        <TableHead>Menu Items</TableHead>
                        <TableHead>Last Sync</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {googleSheetIntegrations.map((integration) => (
                        <TableRow key={integration.id}>
                          <TableCell className="font-medium">{integration.restaurantName}</TableCell>
                          <TableCell>
                            <code className="text-sm bg-muted px-2 py-1 rounded">
                              {integration.sheetId.substring(0, 20)}...
                            </code>
                          </TableCell>
                          <TableCell>{integration.menuItems}</TableCell>
                          <TableCell>{new Date(integration.lastSync).toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  integration.status === "healthy"
                                    ? "default"
                                    : integration.status === "warning"
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {integration.status}
                              </Badge>
                              {integration.errorMessage && (
                                <span className="text-xs text-muted-foreground">{integration.errorMessage}</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRefreshIntegration(integration.id)}
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "integrations" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">External Integrations</h1>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Integration
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Third-Party Platforms</CardTitle>
                  <CardDescription>
                    Manage integrations with Swiggy, Zomato, and other delivery platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Platform</TableHead>
                        <TableHead>Restaurant</TableHead>
                        <TableHead>API Key</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Orders Today</TableHead>
                        <TableHead>Last Sync</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {externalIntegrations.map((integration) => (
                        <TableRow key={integration.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  integration.platform === "swiggy"
                                    ? "bg-orange-500"
                                    : integration.platform === "zomato"
                                      ? "bg-red-500"
                                      : "bg-green-500"
                                }`}
                              ></div>
                              <span className="capitalize font-medium">{integration.platform}</span>
                            </div>
                          </TableCell>
                          <TableCell>{integration.restaurantName}</TableCell>
                          <TableCell>
                            <code className="text-sm bg-muted px-2 py-1 rounded">{integration.apiKey}</code>
                          </TableCell>
                          <TableCell>
                            <Badge variant={integration.status === "connected" ? "default" : "destructive"}>
                              {integration.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{integration.ordersToday}</TableCell>
                          <TableCell>{new Date(integration.lastSync).toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRefreshIntegration(integration.id)}
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "subscriptions" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Subscription Management</h1>
                <div className="flex space-x-2">
                  <Badge variant="outline">
                    Total Revenue: ₹{subscriptions.reduce((sum, sub) => sum + sub.revenue, 0).toLocaleString()}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Basic Plan</CardTitle>
                    <CardDescription>₹100/month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{subscriptions.filter((s) => s.plan === "basic").length}</div>
                    <p className="text-sm text-muted-foreground">Active subscriptions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Premium Plan</CardTitle>
                    <CardDescription>₹200/month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{subscriptions.filter((s) => s.plan === "premium").length}</div>
                    <p className="text-sm text-muted-foreground">Active subscriptions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Enterprise Plan</CardTitle>
                    <CardDescription>₹500/month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {subscriptions.filter((s) => s.plan === "enterprise").length}
                    </div>
                    <p className="text-sm text-muted-foreground">Active subscriptions</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Subscriptions</CardTitle>
                  <CardDescription>Monitor and manage restaurant subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Restaurant</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscriptions.map((subscription) => (
                        <TableRow key={subscription.id}>
                          <TableCell className="font-medium">{subscription.restaurantName}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {subscription.plan}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={subscription.status === "active" ? "default" : "destructive"}>
                              {subscription.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{subscription.startDate}</TableCell>
                          <TableCell>{subscription.endDate}</TableCell>
                          <TableCell>₹{subscription.revenue.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "analytics" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Platform Analytics</h1>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Last 7 days
                  </Button>
                  <Button variant="outline" size="sm">
                    Last 30 days
                  </Button>
                  <Button variant="outline" size="sm">
                    Last 90 days
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Growth Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">+12.5%</div>
                    <Progress value={75} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">New restaurants this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Order Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45,623</div>
                    <Progress value={85} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Total orders processed</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Revenue Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">+18.2%</div>
                    <Progress value={90} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Compared to last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Customer Satisfaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.8/5</div>
                    <Progress value={96} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Average rating</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Restaurants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Burger Palace", orders: 1234, revenue: 45600 },
                        { name: "Sushi World", orders: 987, revenue: 38900 },
                        { name: "Pizza Corner", orders: 876, revenue: 32100 },
                        { name: "Spice Garden", orders: 654, revenue: 28700 },
                      ].map((restaurant, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{restaurant.name}</div>
                            <div className="text-sm text-muted-foreground">{restaurant.orders} orders</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹{restaurant.revenue.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Revenue</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Platform Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>API Response Time</span>
                        <Badge variant="default">125ms</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Uptime</span>
                        <Badge variant="default">99.9%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Active Integrations</span>
                        <Badge variant="default">98%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Error Rate</span>
                        <Badge variant="secondary">0.1%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
