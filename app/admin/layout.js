"use client";

// Define the sidebar background color as oklch(0.95 0.052 163.051)
// This will be used in the layout component

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Bell, 
  ChevronDown, 
  Menu, 
  Search, 
  X, 
  LayoutDashboard, 
  HeadphonesIcon, 
  ShieldAlert, 
  Users, 
  MessageSquare, 
  BarChart2, 
  LineChart 
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
  {
    title: "Customer Service",
    path: "/admin/customer-service",
    icon: <HeadphonesIcon size={20} />,
    submenu: [
      { title: "Service Requests", path: "/admin/customer-service" },
      { title: "Customer Profiles", path: "/admin/customer-service/profiles" },
      { title: "AI Service Tickets", path: "/admin/customer-service/tickets" },
    ],
  },
  {
    title: "Fraud Prevention",
    path: "/admin/fraud-prevention",
    icon: <ShieldAlert size={20} />,
    submenu: [
      { title: "Facial Authentication", path: "/admin/fraud-prevention" },
      {
        title: "Suspicious Activity",
        path: "/admin/fraud-prevention/suspicious",
      },
      {
        title: "Aadhaar Verification",
        path: "/admin/fraud-prevention/verification",
      },
    ],
  },
  {
    title: "Customer Prioritization",
    path: "/admin/customer-prioritization",
    icon: <Users size={20} />,
    submenu: [],
  },
  {
    title: "Query Handling",
    path: "/admin/query-handling",
    icon: <MessageSquare size={20} />,
    submenu: [],
  },
  {
    title: "Analytics",
    path: "/admin/analytics",
    icon: <BarChart2 size={20} />,
    submenu: [],
  },
  {
    title: "Feedback & Insights",
    path: "/admin/feedback",
    icon: <LineChart size={20} />,
    submenu: [],
  },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({});
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubmenu = (title) => {
    setExpandedMenus({
      ...expandedMenus,
      [title]: !expandedMenus[title],
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-[oklch(0.882_0.059_254.128)] text-black transition-all duration-300 flex flex-col shadow-lg`}
      >
        <div className="p-4 flex items-center justify-between border-b border-indigo-800">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">FinServe Admin</h1>
          ) : (
            <h1 className="text-xl font-bold">FS</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className="overflow-y-auto flex-grow">
          <nav className="mt-5 px-2">
            {menuItems.map((item) => (
              <div key={item.title} className="mb-2">
                <Link href={item.path}>
                  <div
                    className={`flex items-center rounded-md ${
                      pathname === item.path
                        ? "bg-[oklch(0.707_0.165_254.624)] text-black"
                        : "text-black"
                    } px-4 py-3 cursor-pointer transition-colors`}
                  >
                    <div className="text-black">
                      {item.icon}
                    </div>
                    {sidebarOpen && (
                      <>
                        <span className="ml-3 font-medium">{item.title}</span>
                        {sidebarOpen && item.submenu && item.submenu.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleSubmenu(item.title);
                            }}
                            className="ml-auto focus:outline-none"
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-200 ${
                                expandedMenus[item.title] ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </Link>
                {sidebarOpen && item.submenu && expandedMenus[item.title] && (
                  <div className="mt-1 ml-2 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link key={subItem.title} href={subItem.path}>
                        <div
                          className={`flex rounded-md pl-9 py-2 text-sm ${
                            pathname === subItem.path
                              ? "bg-[oklch(0.707_0.165_254.624)] text-black"
                              : "text-black"
                          } transition-colors`}
                        >
                          {subItem.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                A
              </div>
              <span className="text-sm font-medium">Admin User</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
