"use client"

import React from 'react'
import { Button } from '../ui/button'
import { Activity, AlertTriangle, DollarSign, RefreshCw, ShoppingCart, Users, UtensilsCrossed, XCircle } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

// Sample data that was missing
const platformMetrics = {
  totalRestaurants: 156,
  activeRestaurants: 142,
  totalUsers: 12847,
  totalOrders: 45623,
  totalRevenue: 2847592,
  ordersToday: 234,
  revenueToday: 15420,
  avgOrderValue: 65.8,
}

const pendingRegistrations = [
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
]

const OverReview = () => {
  return (
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
  )
}

export default OverReview