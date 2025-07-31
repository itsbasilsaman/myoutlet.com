"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription } from "../ui/alert";
import { Loader2, ExternalLink, Store, ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/hooks/useDispatch";
import { fetchAllRestaurants } from "@/store/actions/restaurants/fetchAllStoresAction";
import { blockRestaurantAction } from "@/store/actions/restaurants/blockRestaurantAction";

const RestaurantRegistration = () => {
  const dispatch = useAppDispatch();
  const [blockingIds, setBlockingIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isPageChanging, setIsPageChanging] = useState(false);


  const token =
    useSelector((state: RootState) => state.admin.token) ||
    Cookies.get("accessToken");

  const restaurantState = useSelector((state: RootState) => state.restaurant);
  const { data: storeData, loading, error, totalPages, totalCount } = restaurantState;

  useEffect(() => {
    if (!token) return;
    const fetchAllData = async () => {
      setIsPageChanging(true);
      try {
        const res = await dispatch(fetchAllRestaurants({ page: currentPage, limit: 10}));
        console.log("Fetched restaurants:", res);
        
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setIsPageChanging(false);
      }
    };
    fetchAllData();
  }, [token, dispatch, currentPage, itemsPerPage]);

  const handleBlock = async (
    restaurantId: string,
    currentStatus: boolean
  ) => {
    try {
      setBlockingIds((prev) => new Set(prev).add(restaurantId));
      const res = await dispatch(
        blockRestaurantAction({ id: restaurantId, isActive: !currentStatus })
      );
      console.log(res,"response after blocked");
    } catch (error) {
      console.error("Failed to toggle status:", error);
    } finally {
      setBlockingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(restaurantId);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

    const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (totalPages || 1) && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }

   const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const totalPagesCount = totalPages || 1;
    
    if (totalPagesCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPagesCount; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPagesCount, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  // Loading skeleton
  if (loading && currentPage === 1) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-80" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-8 w-[80px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Store className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">
              Restaurant Management
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage restaurant registrations and their status
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {totalCount || 0} Total Restaurants
        </Badge>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Main Content Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Restaurant Directory
                {isPageChanging && <Loader2 className="h-4 w-4 animate-spin" />}
              </CardTitle>
              <CardDescription>
                View and manage all registered restaurants and their information
              </CardDescription>
            </div>
            
            {/* Items per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm bg-background"
                disabled={isPageChanging}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-muted-foreground">per page</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!storeData || storeData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Store className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No restaurants found
              </h3>
              <p className="text-sm text-muted-foreground">
                Restaurants will appear here once they register.
              </p>
            </div>
          ) : (
            <>
              {/* Table with loading overlay */}
              <div className="relative">
                {isPageChanging && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-sm">Loading...</span>
                    </div>
                  </div>
                )}
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px]">Restaurant</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead className="min-w-[250px]">Subdomain (QR)</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="min-w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {storeData.map((restaurant) => (
                        <TableRow key={restaurant.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            {restaurant.name}
                          </TableCell>
                          
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {restaurant.currency}
                            </Badge>
                          </TableCell>
                          
                          <TableCell>
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-left justify-start"
                              asChild
                            >
                              <a
                                href={restaurant.qrcode}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                {restaurant.subdomain}.myoutlet.app
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            </Button>
                          </TableCell>
                          
                          <TableCell className="text-muted-foreground">
                            {formatDate(restaurant.created_at)}
                          </TableCell>
                          
                          <TableCell>
                            <Badge
                              variant={restaurant.is_active ? "default" : "secondary"}
                              className={
                                restaurant.is_active
                                  ? "bg-green-500 hover:bg-green-600"
                                  : "bg-red-500 hover:bg-red-600 text-white"
                              }
                            >
                              {restaurant.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          
                          <TableCell>
                            <Button
                              variant={restaurant.is_active ? "destructive" : "default"}
                              size="sm"
                              disabled={blockingIds.has(restaurant.id) || isPageChanging}
                              onClick={() =>
                                handleBlock(restaurant.id, restaurant.is_active)
                              }
                              className="min-w-[80px]"
                            >
                              {blockingIds.has(restaurant.id) ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : restaurant.is_active ? (
                                "Block"
                              ) : (
                                "Unblock"
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Pagination Controls */}
              {totalPages && totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
                  {/* Pagination Info */}
                  <div className="text-sm text-muted-foreground">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, totalCount || 0)} of{' '}
                    {totalCount || 0} restaurants
                  </div>

                  {/* Pagination Buttons */}
                  <div className="flex items-center gap-1">
                    {/* First Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1 || isPageChanging}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>

                    {/* Previous Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || isPageChanging}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {/* Page Numbers */}
                    {generatePageNumbers().map((page) => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        disabled={isPageChanging}
                        className="h-8 w-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}

                    {/* Next Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === (totalPages || 1) || isPageChanging}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    {/* Last Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(totalPages || 1)}
                      disabled={currentPage === (totalPages || 1) || isPageChanging}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantRegistration;