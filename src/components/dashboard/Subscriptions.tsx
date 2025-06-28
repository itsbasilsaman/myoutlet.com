"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Calendar, DollarSign, TrendingUp } from "lucide-react";

// Types
type Subscription = {
  id: string
  restaurantName: string
  plan: "basic" | "premium" | "enterprise"
  status: "active" | "expired" | "cancelled"
  startDate: string
  endDate: string
  revenue: number
  paymentMethod?: string
  nextBillingDate?: string
}

const Subscriptions = () => {
  // Sample data - replace with actual API call
  const [subscriptions] = useState<Subscription[]>([
    {
      id: "SUB001",
      restaurantName: "Burger Palace",
      plan: "premium",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      revenue: 2400,
      paymentMethod: "Credit Card",
      nextBillingDate: "2024-02-01",
    },
    {
      id: "SUB002",
      restaurantName: "Sushi World",
      plan: "basic",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2025-01-14",
      revenue: 1200,
      paymentMethod: "UPI",
      nextBillingDate: "2024-02-15",
    },
    {
      id: "SUB003",
      restaurantName: "Pizza Corner",
      plan: "enterprise",
      status: "active",
      startDate: "2023-12-01",
      endDate: "2024-11-30",
      revenue: 6000,
      paymentMethod: "Bank Transfer",
      nextBillingDate: "2024-02-01",
    },
    {
      id: "SUB004",
      restaurantName: "Spice Garden",
      plan: "basic",
      status: "expired",
      startDate: "2023-06-01",
      endDate: "2024-01-01",
      revenue: 800,
      paymentMethod: "Credit Card",
    },
    {
      id: "SUB005",
      restaurantName: "Coffee Bean",
      plan: "premium",
      status: "cancelled",
      startDate: "2023-09-01",
      endDate: "2024-01-10",
      revenue: 1000,
      paymentMethod: "UPI",
    },
  ]);

  const planPricing = {
    basic: 100,
    premium: 200,
    enterprise: 500,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "expired":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "basic":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "premium":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "enterprise":
        return "bg-gold-100 text-gold-800 border-gold-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const activeSubscriptions = subscriptions.filter(s => s.status === "active");
  const totalRevenue = subscriptions.reduce((sum, sub) => sum + sub.revenue, 0);
  const monthlyRecurringRevenue = activeSubscriptions.reduce((sum, sub) => {
    return sum + planPricing[sub.plan];
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <div className="flex space-x-2">
          <Badge variant="outline" className="px-3 py-1">
            <DollarSign className="h-4 w-4 mr-1" />
            Total Revenue: ₹{totalRevenue.toLocaleString()}
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            MRR: ₹{monthlyRecurringRevenue.toLocaleString()}
          </Badge>
        </div>
      </div>

      {/* Plan Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Basic Plan
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                ₹{planPricing.basic}/month
              </Badge>
            </CardTitle>
            <CardDescription>Essential features for small restaurants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {subscriptions.filter((s) => s.plan === "basic" && s.status === "active").length}
            </div>
            <p className="text-sm text-muted-foreground">
              Active subscriptions
            </p>
            <div className="text-xs text-muted-foreground mt-1">
              Total: {subscriptions.filter((s) => s.plan === "basic").length} (including inactive)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Premium Plan
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                ₹{planPricing.premium}/month
              </Badge>
            </CardTitle>
            <CardDescription>Advanced features for growing businesses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {subscriptions.filter((s) => s.plan === "premium" && s.status === "active").length}
            </div>
            <p className="text-sm text-muted-foreground">
              Active subscriptions
            </p>
            <div className="text-xs text-muted-foreground mt-1">
              Total: {subscriptions.filter((s) => s.plan === "premium").length} (including inactive)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Enterprise Plan
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                ₹{planPricing.enterprise}/month
              </Badge>
            </CardTitle>
            <CardDescription>Full-featured solution for large chains</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {subscriptions.filter((s) => s.plan === "enterprise" && s.status === "active").length}
            </div>
            <p className="text-sm text-muted-foreground">
              Active subscriptions
            </p>
            <div className="text-xs text-muted-foreground mt-1">
              Total: {subscriptions.filter((s) => s.plan === "enterprise").length} (including inactive)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Active Subscriptions</div>
            <div className="text-2xl font-bold text-green-600">{activeSubscriptions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Monthly Recurring Revenue</div>
            <div className="text-2xl font-bold text-blue-600">₹{monthlyRecurringRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Total Lifetime Revenue</div>
            <div className="text-2xl font-bold text-purple-600">₹{totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Average Revenue Per User</div>
            <div className="text-2xl font-bold text-orange-600">
              ₹{Math.round(totalRevenue / subscriptions.length).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
          <CardDescription>
            Monitor and manage restaurant subscriptions across all plans
          </CardDescription>
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
                <TableHead>Payment Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">
                    {subscription.restaurantName}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`capitalize ${getPlanColor(subscription.plan)}`}
                    >
                      {subscription.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(subscription.status)}>
                      {subscription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{formatDate(subscription.startDate)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{formatDate(subscription.endDate)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">₹{subscription.revenue.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {subscription.paymentMethod || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" title="Edit Subscription">
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
  );
};

export default Subscriptions;