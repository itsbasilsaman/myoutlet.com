"use client";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { RefreshCw, Eye, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

// Types
type GoogleSheetIntegration = {
  id: string
  restaurantName: string
  sheetId: string
  lastSync: string
  status: "healthy" | "warning" | "error"
  errorMessage?: string
  menuItems: number
}

// Sample data for Google Sheets integrations
const googleSheetIntegrations: GoogleSheetIntegration[] = [
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
  {
    id: "GS003",
    restaurantName: "Pizza Corner",
    sheetId: "1DxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    lastSync: "2024-01-14T18:45:00Z",
    status: "error",
    errorMessage: "Authentication failed - reconnect required",
    menuItems: 0,
  },
  {
    id: "GS004",
    restaurantName: "Spice Garden",
    sheetId: "1ExiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    lastSync: "2024-01-15T11:20:00Z",
    status: "healthy",
    menuItems: 58,
  },
  {
    id: "GS005",
    restaurantName: "Taco Bell Express",
    sheetId: "1FxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    lastSync: "2024-01-15T09:15:00Z",
    status: "warning",
    errorMessage: "Duplicate menu items detected",
    menuItems: 28,
  },
];

const GoogleSheet = () => {
  const handleRefreshIntegration = (id: string) => {
    console.log(`Refreshing Google Sheets integration ${id}`);
    // In real app, this would call an API to refresh the specific integration
  };

  const handleRefreshAll = () => {
    console.log("Refreshing all Google Sheets integrations");
    // In real app, this would call an API to refresh all integrations
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "healthy":
        return "default" as const;
      case "warning":
        return "secondary" as const;
      case "error":
        return "destructive" as const;
      default:
        return "outline" as const;
    }
  };

  const healthyCount = googleSheetIntegrations.filter(i => i.status === "healthy").length;
  const warningCount = googleSheetIntegrations.filter(i => i.status === "warning").length;
  const errorCount = googleSheetIntegrations.filter(i => i.status === "error").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Google Sheets Monitor</h1>
        <Button onClick={handleRefreshAll}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh All
        </Button>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Connections</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{healthyCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((healthyCount / googleSheetIntegrations.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Connections</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{errorCount}</div>
            <p className="text-xs text-muted-foreground">Need immediate fix</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Integration Health</CardTitle>
          <CardDescription>
            Monitor Google Sheets API connections and data sync
          </CardDescription>
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
                  <TableCell className="font-medium">
                    {integration.restaurantName}
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {integration.sheetId.substring(0, 20)}...
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{integration.menuItems}</span>
                      {integration.menuItems === 0 && (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(integration.lastSync).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(integration.lastSync).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(integration.status)}
                        <Badge variant={getStatusVariant(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>
                      {integration.errorMessage && (
                        <div className="text-xs text-muted-foreground max-w-[200px]">
                          {integration.errorMessage}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" title="View Details">
                        <Eye className="h-4 w-4" />
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

      {/* Additional Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Guidelines</CardTitle>
          <CardDescription>
            Best practices for Google Sheets integration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Healthy Status</p>
              <p className="text-xs text-muted-foreground">
                Sheet is accessible, all menu items have required fields (name, price, description)
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Warning Status</p>
              <p className="text-xs text-muted-foreground">
                Minor issues detected - missing prices, duplicate items, or formatting problems
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Error Status</p>
              <p className="text-xs text-muted-foreground">
                Cannot access sheet - authentication failed or sheet permissions changed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleSheet;