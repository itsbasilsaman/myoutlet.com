"use client"

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { Bell, Menu, LogOut } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch } from "@/hooks/useDispatch";
import { clearAuth } from "@/store/slices/adminSlice";

interface AdminHeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  pendingCount?: number;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  darkMode,
  setDarkMode,
  sidebarOpen,
  setSidebarOpen,
  pendingCount = 0
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
    router.replace("/auth/login");
  }
  return (
    <header
      className={`h-16 border-b ${
        darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
      } flex items-center justify-between px-4 md:px-6 sticky top-0 z-30`}
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
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {pendingCount}
              </span>
            )}
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
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;