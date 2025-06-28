"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, RefreshCw } from "lucide-react";

// Types
type ExternalIntegration = {
  id: string
  platform: "swiggy" | "zomato" | "uber-eats"
  restaurantName: string
  apiKey: string
  status: "connected" | "disconnected" | "error"
  lastSync: string
  ordersToday: number
}

const Integrations = () => {
  // Sample data - replace with actual API call
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
    {
      id: "EXT003",
      platform: "uber-eats",
      restaurantName: "Pizza Corner",
      apiKey: "ue_live_***************",
      status: "connected",
      lastSync: "2024-01-15T11:45:00Z",
      ordersToday: 15,
    },
  ]);

  const handleRefreshIntegration = (id: string) => {
    // In real app, this would call an API to refresh the integration
    console.log(`Refreshing integration ${id}`)
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "swiggy":
        return "bg-orange-500"
      case "zomato":
        return "bg-red-500"
      case "uber-eats":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
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
            Manage integrations with Swiggy, Zomato, and other delivery
            platforms
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
                        className={`w-3 h-3 rounded-full ${getPlatformColor(integration.platform)}`}
                      ></div>
                      <span className="capitalize font-medium">
                        {integration.platform.replace('-', ' ')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{integration.restaurantName}</TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {integration.apiKey}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        integration.status === "connected"
                          ? "default"
                          : integration.status === "error"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {integration.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={integration.ordersToday > 0 ? "text-green-600 font-medium" : "text-muted-foreground"}>
                      {integration.ordersToday}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(integration.lastSync).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" title="Edit Integration">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRefreshIntegration(integration.id)}
                        title="Refresh Integration"
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

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Connected Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {externalIntegrations.filter(i => i.status === "connected").length}
            </div>
            <p className="text-sm text-muted-foreground">
              Active integrations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Orders Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {externalIntegrations.reduce((sum, i) => sum + i.ordersToday, 0)}
            </div>
            <p className="text-sm text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {externalIntegrations.filter(i => i.status === "error").length}
            </div>
            <p className="text-sm text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Integrations;