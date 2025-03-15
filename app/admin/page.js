"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Users,
  Shield,
  BarChart3,
  MessageSquare,
  FileText,
  Star,
  Activity,
  AlertTriangle,
  Clock,
} from "lucide-react";

export default function AdminDashboard() {
  // Mock data for dashboard
  const dashboardStats = {
    pendingRequests: 23,
    activeUsers: 487,
    fraudAlerts: 8,
    customerSatisfaction: 92,
    pendingVerifications: 45,
    escalatedCases: 12,
  };

  const recentActivity = [
    {
      id: 1,
      type: "Authentication Failure",
      user: "Rahul M.",
      time: "10 minutes ago",
      status: "urgent",
    },
    {
      id: 2,
      type: "Loan Application",
      user: "Anjali S.",
      time: "25 minutes ago",
      status: "normal",
    },
    {
      id: 3,
      type: "Service Complaint",
      user: "Vikram P.",
      time: "1 hour ago",
      status: "high",
    },
    {
      id: 4,
      type: "Account Update",
      user: "Priya D.",
      time: "2 hours ago",
      status: "normal",
    },
    {
      id: 5,
      type: "New Customer",
      user: "Rajesh K.",
      time: "3 hours ago",
      status: "normal",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the FinServe Admin Dashboard</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Pending Service Requests"
          value={dashboardStats.pendingRequests}
          icon={<Clock className="text-blue-600" />}
          trend="+5% from yesterday"
          link="/admin/customer-service"
        />
        <StatsCard
          title="Active Users"
          value={dashboardStats.activeUsers}
          icon={<Users className="text-green-600" />}
          trend="+12% from last week"
          link="/admin/analytics"
        />
        <StatsCard
          title="Fraud Alerts"
          value={dashboardStats.fraudAlerts}
          icon={<AlertTriangle className="text-red-600" />}
          trend="-2% from yesterday"
          link="/admin/fraud-prevention"
        />
        <StatsCard
          title="Customer Satisfaction"
          value={`${dashboardStats.customerSatisfaction}%`}
          icon={<Star className="text-yellow-600" />}
          trend="+3% from last month"
          link="/admin/feedback"
        />
        <StatsCard
          title="Pending Verifications"
          value={dashboardStats.pendingVerifications}
          icon={<Shield className="text-purple-600" />}
          trend="+15% from yesterday"
          link="/admin/fraud-prevention/verification"
        />
        <StatsCard
          title="Escalated Cases"
          value={dashboardStats.escalatedCases}
          icon={<Activity className="text-orange-600" />}
          trend="-8% from yesterday"
          link="/admin/customer-prioritization"
        />
      </div>

      {/* Quick Access Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Activity
            </h2>
            <Link
              href="/admin/analytics"
              className="text-sm text-indigo-600 flex items-center"
            >
              View All <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md"
              >
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-3 ${
                      activity.status === "urgent"
                        ? "bg-red-500"
                        : activity.status === "high"
                        ? "bg-orange-500"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  <div>
                    <h3 className="text-sm font-medium">{activity.type}</h3>
                    <p className="text-xs text-gray-500">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
                <button className="text-xs text-indigo-600 hover:text-indigo-800">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              System Status
            </h2>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
              All Systems Operational
            </span>
          </div>
          <div className="space-y-3">
            <StatusItem
              name="Customer Service Portal"
              status="operational"
              uptime="99.9%"
            />
            <StatusItem
              name="Authentication Services"
              status="operational"
              uptime="99.8%"
            />
            <StatusItem
              name="Payment Processing"
              status="operational"
              uptime="100%"
            />
            <StatusItem
              name="Aadhaar Verification API"
              status="issue"
              uptime="95.2%"
            />
            <StatusItem
              name="Video Calling Service"
              status="operational"
              uptime="99.7%"
            />
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SectionCard
          title="Customer Service"
          description="Manage service requests, customer profiles and AI tickets"
          icon={<Users />}
          link="/admin/customer-service"
          stats={[
            { label: "Open Requests", value: "23" },
            { label: "Resolved Today", value: "47" },
          ]}
        />
        <SectionCard
          title="Fraud Prevention"
          description="Monitor authentication, suspicious activity and verifications"
          icon={<Shield />}
          link="/admin/fraud-prevention"
          stats={[
            { label: "Security Alerts", value: "8" },
            { label: "Pending Verification", value: "45" },
          ]}
        />
        <SectionCard
          title="Customer Prioritization"
          description="Manage priority queue, traffic analysis and service routing"
          icon={<Activity />}
          link="/admin/customer-prioritization"
          stats={[
            { label: "High Priority", value: "12" },
            { label: "Avg. Wait Time", value: "4.2m" },
          ]}
        />
        <SectionCard
          title="Query Handling"
          description="Review customer video/audio queries and sentiment analysis"
          icon={<MessageSquare />}
          link="/admin/query-handling"
          stats={[
            { label: "New Queries", value: "18" },
            { label: "Avg. Response", value: "3.5m" },
          ]}
        />
        <SectionCard
          title="Analytics"
          description="View customer engagement, compliance and branch performance"
          icon={<BarChart3 />}
          link="/admin/analytics"
          stats={[
            { label: "Customer Growth", value: "+8%" },
            { label: "Service Usage", value: "+12%" },
          ]}
        />
        <SectionCard
          title="Feedback & Insights"
          description="Monitor feedback analysis and service optimization"
          icon={<FileText />}
          link="/admin/feedback"
          stats={[
            { label: "Satisfaction", value: "92%" },
            { label: "NPS Score", value: "8.7" },
          ]}
        />
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({ title, value, icon, trend, link }) {
  return (
    <Link href={link}>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className="text-xs text-gray-500 mt-1">{trend}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Status Item Component
function StatusItem({ name, status, uptime }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div
          className={`w-2 h-2 rounded-full mr-2 ${
            status === "operational" ? "bg-green-500" : "bg-orange-500"
          }`}
        ></div>
        <span className="text-sm">{name}</span>
      </div>
      <div className="text-sm text-gray-500">{uptime} uptime</div>
    </div>
  );
}

// Section Card Component
function SectionCard({ title, description, icon, link, stats }) {
  return (
    <Link href={link}>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
            {icon}
          </div>
          <ArrowUpRight size={16} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="flex justify-between pt-4 border-t border-gray-100">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-base font-medium">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
