"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Analytics: React.FC = () => {
  return (
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
            <p className="text-xs text-muted-foreground mt-2">
              New restaurants this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Order Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,623</div>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Total orders processed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+18.2%</div>
            <Progress value={90} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Compared to last month
            </p>
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
                    <div className="text-sm text-muted-foreground">
                      {restaurant.orders} orders
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      ₹{restaurant.revenue.toLocaleString()}
                    </div>
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
  );
};

export default Analytics;