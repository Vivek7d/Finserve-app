"use client";

import React, { useState } from "react";
import {
  PageHeader,
  DataTable,
  StatusBadge,
  SearchInput,
  FilterDropdown,
} from "../../../components/ui/dashboard-components";
import {
  User,
  Calendar,
  Shield,
  AlertTriangle,
  Check,
  X,
  Camera,
  Scan,
  UserCheck,
  Map,
  Clock,
} from "lucide-react";

// Mock data for facial authentication logs
const authLogs = [
  {
    id: "AL-1001",
    customer: {
      name: "Rajesh Gupta",
      id: "10023451",
      accountType: "Savings",
    },
    authDetails: {
      type: "Facial Recognition",
      timestamp: "2023-09-15T10:30:00Z",
      device: "iPhone 13 Pro",
      location: "Mumbai, Maharashtra",
      ipAddress: "103.156.xx.xx",
      status: "Success",
      confidenceScore: 98.7,
    },
    actionTaken: "Authentication approved, account access granted",
    riskLevel: "Low",
  },
  {
    id: "AL-1002",
    customer: {
      name: "Priya Sharma",
      id: "10078932",
      accountType: "Current",
    },
    authDetails: {
      type: "Facial Recognition",
      timestamp: "2023-09-15T11:15:00Z",
      device: "Samsung Galaxy S22",
      location: "Delhi, NCR",
      ipAddress: "49.37.xx.xx",
      status: "Failure",
      confidenceScore: 45.3,
    },
    actionTaken:
      "Authentication denied, account locked after 3 failed attempts",
    riskLevel: "High",
  },
  {
    id: "AL-1003",
    customer: {
      name: "Arun Patel",
      id: "10056789",
      accountType: "Savings",
    },
    authDetails: {
      type: "Facial Recognition",
      timestamp: "2023-09-15T09:45:00Z",
      device: "OnePlus 10",
      location: "Bangalore, Karnataka",
      ipAddress: "182.71.xx.xx",
      status: "Success",
      confidenceScore: 96.2,
    },
    actionTaken: "Authentication approved, account access granted",
    riskLevel: "Low",
  },
  {
    id: "AL-1004",
    customer: {
      name: "Sunita Reddy",
      id: "10034567",
      accountType: "Premium",
    },
    authDetails: {
      type: "Facial Recognition",
      timestamp: "2023-09-15T08:30:00Z",
      device: "iPhone 12",
      location: "Hyderabad, Telangana",
      ipAddress: "157.44.xx.xx",
      status: "Warning",
      confidenceScore: 76.5,
    },
    actionTaken: "Authentication approved with additional OTP verification",
    riskLevel: "Medium",
  },
  {
    id: "AL-1005",
    customer: {
      name: "Vikram Desai",
      id: "10091234",
      accountType: "Current",
    },
    authDetails: {
      type: "Facial Recognition",
      timestamp: "2023-09-15T12:10:00Z",
      device: "Xiaomi Mi 11",
      location: "Chennai, Tamil Nadu",
      ipAddress: "203.192.xx.xx",
      status: "Success",
      confidenceScore: 93.8,
    },
    actionTaken: "Authentication approved, account access granted",
    riskLevel: "Low",
  },
  {
    id: "AL-1006",
    customer: {
      name: "Ananya Malhotra",
      id: "10045678",
      accountType: "Savings",
    },
    authDetails: {
      type: "Facial Recognition",
      timestamp: "2023-09-14T16:45:00Z",
      device: "iPhone SE",
      location: "Kolkata, West Bengal",
      ipAddress: "122.176.xx.xx",
      status: "Failure",
      confidenceScore: 32.1,
    },
    actionTaken:
      "Authentication denied, suspicious IP detected, security team notified",
    riskLevel: "High",
  },
  {
    id: "AL-1007",
    customer: {
      name: "Ravi Kumar",
      id: "10067890",
      accountType: "Premium",
    },
    authDetails: {
      type: "Facial Recognition",
      timestamp: "2023-09-15T10:05:00Z",
      device: "Google Pixel 6",
      location: "Pune, Maharashtra",
      ipAddress: "106.51.xx.xx",
      status: "Warning",
      confidenceScore: 82.4,
    },
    actionTaken: "Authentication approved with additional security questions",
    riskLevel: "Medium",
  },
];

// Status colors for authentication status badges
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "failure":
      return "error";
    default:
      return "default";
  }
};

// Risk level colors for risk badges
const getRiskColor = (risk) => {
  switch (risk.toLowerCase()) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "info";
    default:
      return "default";
  }
};

export default function FacialAuthenticationLogs() {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("today");
  const [selectedLog, setSelectedLog] = useState(null);

  // Filter options
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "success", label: "Success" },
    { value: "warning", label: "Warning" },
    { value: "failure", label: "Failure" },
  ];

  const riskOptions = [
    { value: "all", label: "All Risk Levels" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const timeOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ];

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  // Filter the data based on search query and filters
  const filteredData = authLogs.filter((log) => {
    // Search query filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      log.id.toLowerCase().includes(searchLower) ||
      log.customer.name.toLowerCase().includes(searchLower) ||
      log.customer.id.toLowerCase().includes(searchLower) ||
      log.authDetails.location.toLowerCase().includes(searchLower);

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      log.authDetails.status.toLowerCase() === statusFilter.toLowerCase();

    // Risk filter
    const matchesRisk =
      riskFilter === "all" ||
      log.riskLevel.toLowerCase() === riskFilter.toLowerCase();

    // Simple time filter implementation (just for demonstration)
    const matchesTime = true; // In a real implementation, filter based on the date

    return matchesSearch && matchesStatus && matchesRisk && matchesTime;
  });

  // Table columns configuration
  const columns = [
    {
      header: "Log ID",
      accessor: "id",
      width: "100px",
      cell: (row) => <span className="font-medium">{row.id}</span>,
    },
    {
      header: "Customer",
      accessor: "customer.name",
      cell: (row) => (
        <div>
          <div className="font-medium">{row.customer.name}</div>
          <div className="text-xs text-gray-500">
            ID: {row.customer.id} | {row.customer.accountType}
          </div>
        </div>
      ),
    },
    {
      header: "Authentication",
      accessor: "authDetails.status",
      width: "120px",
      cell: (row) => (
        <StatusBadge
          status={getStatusColor(row.authDetails.status)}
          text={row.authDetails.status}
        />
      ),
    },
    {
      header: "Risk Level",
      accessor: "riskLevel",
      width: "100px",
      cell: (row) => (
        <StatusBadge
          status={getRiskColor(row.riskLevel)}
          text={row.riskLevel}
        />
      ),
    },
    {
      header: "Confidence Score",
      accessor: "authDetails.confidenceScore",
      width: "140px",
      cell: (row) => (
        <div className="flex items-center">
          <div
            className={`w-16 h-2 rounded-full mr-2 overflow-hidden bg-gray-200`}
          >
            <div
              className={`h-full ${
                row.authDetails.confidenceScore >= 90
                  ? "bg-green-500"
                  : row.authDetails.confidenceScore >= 70
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${row.authDetails.confidenceScore}%` }}
            ></div>
          </div>
          <span>{row.authDetails.confidenceScore}%</span>
        </div>
      ),
    },
    {
      header: "Device",
      accessor: "authDetails.device",
      width: "140px",
    },
    {
      header: "Location",
      accessor: "authDetails.location",
      width: "180px",
      cell: (row) => (
        <div className="flex items-center">
          <Map size={14} className="text-gray-400 mr-1" />
          <span>{row.authDetails.location}</span>
        </div>
      ),
    },
    {
      header: "Timestamp",
      accessor: "authDetails.timestamp",
      width: "180px",
      cell: (row) => (
        <div className="flex items-center">
          <Clock size={14} className="text-gray-400 mr-1" />
          <span>{formatDate(row.authDetails.timestamp)}</span>
        </div>
      ),
    },
  ];

  // Handle row click
  const handleRowClick = (log) => {
    setSelectedLog(log);
  };

  // Calculate authentication stats
  const totalLogs = authLogs.length;
  const successfulAuths = authLogs.filter(
    (log) => log.authDetails.status.toLowerCase() === "success"
  ).length;
  const warningAuths = authLogs.filter(
    (log) => log.authDetails.status.toLowerCase() === "warning"
  ).length;
  const failedAuths = authLogs.filter(
    (log) => log.authDetails.status.toLowerCase() === "failure"
  ).length;
  const successRate = Math.round((successfulAuths / totalLogs) * 100);

  return (
    <div>
      <PageHeader
        title="Facial Authentication Logs"
        description="Monitor facial recognition authentication attempts (successful/failed)"
        actionLabel="Generate Report"
        actionUrl="/admin/fraud-prevention/report"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Auth Attempts Today</p>
              <p className="text-xl font-bold">{totalLogs}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
              <Check size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Successful</p>
              <p className="text-xl font-bold">
                {successfulAuths}{" "}
                <span className="text-xs text-gray-500">({successRate}%)</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Warnings</p>
              <p className="text-xl font-bold">{warningAuths}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3">
              <X size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Failed</p>
              <p className="text-xl font-bold">{failedAuths}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Search by ID, customer name, or location..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className="flex space-x-4">
            <FilterDropdown
              label="Status"
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
            />
            <FilterDropdown
              label="Risk Level"
              options={riskOptions}
              value={riskFilter}
              onChange={setRiskFilter}
            />
            <FilterDropdown
              label="Time Period"
              options={timeOptions}
              value={timeFilter}
              onChange={setTimeFilter}
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="mb-6">
        <DataTable
          columns={columns}
          data={filteredData}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Authentication Detail Panel - shown when a log is selected */}
      {selectedLog && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="text-lg font-medium text-gray-800 mr-2">
                  Authentication Log {selectedLog.id}
                </h3>
                <StatusBadge
                  status={getStatusColor(selectedLog.authDetails.status)}
                  text={selectedLog.authDetails.status}
                />
              </div>
              <div>
                <span className="text-sm text-gray-500">
                  {formatDate(selectedLog.authDetails.timestamp)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Customer Information */}
              <div className="bg-indigo-50 p-4 rounded-md">
                <h4 className="text-indigo-800 font-medium mb-3 flex items-center">
                  <User size={16} className="mr-2" /> Customer Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-700">Name:</span>
                    <span className="text-sm font-medium">
                      {selectedLog.customer.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-700">ID:</span>
                    <span className="text-sm font-medium">
                      {selectedLog.customer.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-700">
                      Account Type:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedLog.customer.accountType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Authentication Details */}
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="text-blue-800 font-medium mb-3 flex items-center">
                  <Scan size={16} className="mr-2" /> Authentication Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Type:</span>
                    <span className="text-sm font-medium">
                      {selectedLog.authDetails.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Confidence:</span>
                    <span className="text-sm font-medium">
                      {selectedLog.authDetails.confidenceScore}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Status:</span>
                    <StatusBadge
                      status={getStatusColor(selectedLog.authDetails.status)}
                      text={selectedLog.authDetails.status}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Risk Level:</span>
                    <StatusBadge
                      status={getRiskColor(selectedLog.riskLevel)}
                      text={selectedLog.riskLevel}
                    />
                  </div>
                </div>
              </div>

              {/* Device & Location */}
              <div className="bg-green-50 p-4 rounded-md">
                <h4 className="text-green-800 font-medium mb-3 flex items-center">
                  <Camera size={16} className="mr-2" /> Device & Location
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">Device:</span>
                    <span className="text-sm font-medium">
                      {selectedLog.authDetails.device}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">Location:</span>
                    <span className="text-sm font-medium">
                      {selectedLog.authDetails.location}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">IP Address:</span>
                    <span className="text-sm font-medium">
                      {selectedLog.authDetails.ipAddress}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Taken */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-gray-800 font-medium mb-2 flex items-center">
                <UserCheck size={16} className="mr-2" /> Action Taken
              </h4>
              <p className="text-gray-700">{selectedLog.actionTaken}</p>
            </div>

            {/* Authentication Image Preview (Mock) */}
            <div className="border rounded-md p-4">
              <h4 className="text-gray-800 font-medium mb-3">
                Authentication Image Preview
              </h4>
              <div className="flex items-center justify-center bg-gray-100 h-56 rounded-md">
                <div className="text-center">
                  <Camera size={48} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    Image preview is available only to authorized personnel with
                    security clearance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
