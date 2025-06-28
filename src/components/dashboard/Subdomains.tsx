"use client";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Plus, Edit, RefreshCw } from "lucide-react";

// Sample data for subdomain mappings
const subdomainMappings = [
  {
    id: "SUB001",
    restaurantName: "Burger Palace",
    subdomain: "burgerpalace.myoutlet.com",
    customDomain: "burgerpalace.com",
    status: "active" as const,
    sslStatus: "active" as const,
    lastChecked: "2024-01-15T12:00:00Z",
  },
  {
    id: "SUB002",
    restaurantName: "Sushi World",
    subdomain: "sushiworld.myoutlet.com",
    customDomain: undefined,
    status: "active" as const,
    sslStatus: "pending" as const,
    lastChecked: "2024-01-15T11:30:00Z",
  },
  {
    id: "SUB003",
    restaurantName: "Pizza Corner",
    subdomain: "pizzacorner.myoutlet.com",
    customDomain: "pizzacorner.in",
    status: "inactive" as const,
    sslStatus: "failed" as const,
    lastChecked: "2024-01-15T09:15:00Z",
  },
  {
    id: "SUB004",
    restaurantName: "Spice Garden",
    subdomain: "spicegarden.myoutlet.com",
    customDomain: undefined,
    status: "pending" as const,
    sslStatus: "pending" as const,
    lastChecked: "2024-01-15T08:45:00Z",
  },
];

const Subdomains = () => {
  const handleEditMapping = (id: string) => {
    console.log(`Editing mapping ${id}`);
    // In real app, this would open a modal or navigate to edit page
  };

  const handleRefreshMapping = (id: string) => {
    console.log(`Refreshing mapping ${id}`);
    // In real app, this would call an API to refresh SSL/DNS status
  };

  const handleAddMapping = () => {
    console.log("Adding new mapping");
    // In real app, this would open a modal to add new mapping
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Subdomain Management</h1>
        <Button onClick={handleAddMapping}>
          <Plus className="h-4 w-4 mr-2" />
          Add Mapping
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Domain Mappings</CardTitle>
          <CardDescription>
            Manage restaurant subdomains and custom domains
          </CardDescription>
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
                <TableHead>Last Checked</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subdomainMappings.map((mapping) => (
                <TableRow key={mapping.id}>
                  <TableCell className="font-medium">
                    {mapping.restaurantName}
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {mapping.subdomain}
                    </code>
                  </TableCell>
                  <TableCell>
                    {mapping.customDomain ? (
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {mapping.customDomain}
                      </code>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        mapping.status === "active" 
                          ? "default" 
                          : mapping.status === "pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
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
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(mapping.lastChecked).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditMapping(mapping.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRefreshMapping(mapping.id)}
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

      {/* Additional Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subdomains</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subdomainMappings.length}</div>
            <p className="text-xs text-muted-foreground">
              {subdomainMappings.filter(m => m.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Domains</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subdomainMappings.filter(m => m.customDomain).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {subdomainMappings.filter(m => m.customDomain && m.sslStatus === 'active').length} with SSL
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SSL Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subdomainMappings.filter(m => m.sslStatus === 'failed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {subdomainMappings.filter(m => m.sslStatus === 'pending').length} pending
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subdomains;