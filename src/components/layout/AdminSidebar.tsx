"use client"

import Image from 'next/image'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart2,
  FileText,
  Globe,
  Database,
  Settings,
  DollarSign,
  TrendingUp,
} from "lucide-react"

const menuItems = [
  { title: "Overview", icon: <BarChart2 className="h-5 w-5" />, path: "/admin" },
  { title: "Restaurant Registrations", icon: <FileText className="h-5 w-5" />, path: "/admin/registrations" },
  { title: "Subdomain Management", icon: <Globe className="h-5 w-5" />, path: "/admin/subdomains" },
  { title: "Google Sheets Monitor", icon: <Database className="h-5 w-5" />, path: "/admin/sheets" },
  { title: "External Integrations", icon: <Settings className="h-5 w-5" />, path: "/admin/integrations" },
  { title: "Subscriptions", icon: <DollarSign className="h-5 w-5" />, path: "/admin/subscriptions" },
  { title: "Platform Analytics", icon: <TrendingUp className="h-5 w-5" />, path: "/admin/analytics" },
];

interface AdminSidebarProps {
  darkMode: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

export function AdminSidebar({ darkMode, sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[45] md:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 border-r ${
          darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
        } flex-shrink-0 z-[50] transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <Link href="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/myoutlet.logo.png"
                alt="Logo"
                width={32}
                height={32}
              />
              <span className="font-bold text-lg">MyOutlet</span>
            </div>
          </Link>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>Super Admin</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => {
                    router.push(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center w-full p-3 rounded-md transition-all duration-200 text-left ${
                    pathname === item.path
                      ? "bg-yellow-400 text-black font-medium shadow-md"
                      : darkMode
                      ? "hover:bg-gray-800 text-gray-300"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-sm">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}