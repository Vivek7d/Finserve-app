"use client";

import React, { useState } from "react";
import {
  PageHeader,
  DataTable,
  StatusBadge,
  SearchInput,
  FilterDropdown,
} from "../../../../components/ui/dashboard-components";
import {
  AlertTriangle,
  Eye,
  Clock,
  Bell,
  Shield,
  Activity,
  Calendar,
  BrainCircuit,
  DollarSign,
  User,
  AlertOctagon,
  Lock,
} from "lucide-react";

// Mock data for suspicious activities
const suspiciousActivities = [
  {
    id: "SA-1001",
    customer: {
      name: "Vijay Reddy",
      id: "10023456",
      segment: "Regular",
      accountType: "Savings",
    },
    alertDetails: {
      title: "Unusual Login Location",
      timestamp: "2023-09-15T09:30:00Z",
      description:
        "Login attempt from an unusual location (Kolkata) when customer is primarily based in Bangalore. IP address flags as suspicious.",
      severity: "Medium",
      category: "Login Pattern",
      detectedBy: "AI Location Analysis",
    },
    status: "New",
    riskScore: 65,
    actionRequired:
      "Verify customer identity through additional authentication",
    assignedTo: "Security Team",
  },
  {
    id: "SA-1002",
    customer: {
      name: "Meera Patel",
      id: "10089234",
      segment: "High Net Worth",
      accountType: "Premium",
    },
    alertDetails: {
      title: "Multiple Failed Authentication Attempts",
      timestamp: "2023-09-15T08:15:00Z",
      description:
        "Five consecutive failed facial authentication attempts within 10 minutes from different IP addresses.",
      severity: "High",
      category: "Authentication",
      detectedBy: "Security Monitoring System",
    },
    status: "Under Investigation",
    riskScore: 85,
    actionRequired:
      "Account temporarily restricted. Contact customer through registered phone number.",
    assignedTo: "Fraud Investigation",
  },
  {
    id: "SA-1003",
    customer: {
      name: "Arun Kumar",
      id: "10045123",
      segment: "Regular",
      accountType: "Current",
    },
    alertDetails: {
      title: "Unusual Transaction Pattern",
      timestamp: "2023-09-14T16:45:00Z",
      description:
        "Multiple small transactions followed by a single large withdrawal, deviating from normal spending behavior.",
      severity: "High",
      category: "Transaction Behavior",
      detectedBy: "AI Transaction Analysis",
    },
    status: "Resolved",
    riskScore: 78,
    actionRequired:
      "Verified with customer. Transactions were legitimate for business payments.",
    assignedTo: "Transaction Monitoring",
  },
  {
    id: "SA-1004",
    customer: {
      name: "Priya Desai",
      id: "10067832",
      segment: "Mass Affluent",
      accountType: "Savings",
    },
    alertDetails: {
      title: "Device Switching",
      timestamp: "2023-09-15T07:30:00Z",
      description:
        "Multiple logins from 3 different devices within 30 minutes, across different locations.",
      severity: "Medium",
      category: "Login Pattern",
      detectedBy: "Security Monitoring System",
    },
    status: "New",
    riskScore: 58,
    actionRequired: "Send security alert to customer and verify recent logins",
    assignedTo: "Security Team",
  },
  {
    id: "SA-1005",
    customer: {
      name: "Rahul Sharma",
      id: "10012456",
      segment: "Premium",
      accountType: "Savings",
    },
    alertDetails: {
      title: "Unusual Transaction Timing",
      timestamp: "2023-09-14T02:20:00Z",
      description:
        "Large transaction at 2:20 AM, unusual timing based on customer's historical activity.",
      severity: "Medium",
      category: "Transaction Behavior",
      detectedBy: "AI Transaction Analysis",
    },
    status: "Under Investigation",
    riskScore: 68,
    actionRequired: "Contact customer to verify transaction legitimacy",
    assignedTo: "Transaction Monitoring",
  },
  {
    id: "SA-1006",
    customer: {
      name: "Kiran Rao",
      id: "10078654",
      segment: "Regular",
      accountType: "Savings",
    },
    alertDetails: {
      title: "Profile Data Changes",
      timestamp: "2023-09-14T14:15:00Z",
      description:
        "Multiple critical profile data changes in quick succession including email, phone number and address.",
      severity: "High",
      category: "Account Modification",
      detectedBy: "Security Monitoring System",
    },
    status: "Under Investigation",
    riskScore: 82,
    actionRequired:
      "Lock account for changes, contact customer via original contact details",
    assignedTo: "Fraud Investigation",
  },
  {
    id: "SA-1007",
    customer: {
      name: "Sanjay Mehta",
      id: "10034987",
      segment: "High Net Worth",
      accountType: "Premium",
    },
    alertDetails: {
      title: "Anomalous Transfer Pattern",
      timestamp: "2023-09-15T09:10:00Z",
      description:
        "International fund transfer to a previously unused destination with unusual amount.",
      severity: "High",
      category: "Transaction Behavior",
      detectedBy: "AI Transaction Analysis",
    },
    status: "New",
    riskScore: 88,
    actionRequired: "Hold transaction and verify with customer immediately",
    assignedTo: "Transaction Monitoring",
  },
];

// Get severity color for badges
const getSeverityColor = (severity) => {
  switch (severity.toLowerCase()) {
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

// Get status color for badges
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "new":
      return "error";
    case "under investigation":
      return "warning";
    case "resolved":
      return "success";
    default:
      return "default";
  }
};

export default function SuspiciousActivityAlerts() {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Filter options
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "new", label: "New" },
    { value: "under investigation", label: "Under Investigation" },
    { value: "resolved", label: "Resolved" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "login pattern", label: "Login Pattern" },
    { value: "authentication", label: "Authentication" },
    { value: "transaction behavior", label: "Transaction Behavior" },
    { value: "account modification", label: "Account Modification" },
  ];

  const severityOptions = [
    { value: "all", label: "All Severities" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
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
  const filteredData = suspiciousActivities.filter((alert) => {
    // Search query filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      alert.id.toLowerCase().includes(searchLower) ||
      alert.customer.name.toLowerCase().includes(searchLower) ||
      alert.customer.id.toLowerCase().includes(searchLower) ||
      alert.alertDetails.title.toLowerCase().includes(searchLower);

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      alert.status.toLowerCase() === statusFilter.toLowerCase();

    // Category filter
    const matchesCategory =
      categoryFilter === "all" ||
      alert.alertDetails.category.toLowerCase() ===
        categoryFilter.toLowerCase();

    // Severity filter
    const matchesSeverity =
      severityFilter === "all" ||
      alert.alertDetails.severity.toLowerCase() ===
        severityFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory && matchesSeverity;
  });

  // Table columns configuration
  const columns = [
    {
      header: "Alert ID",
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
            ID: {row.customer.id} | {row.customer.segment}
          </div>
        </div>
      ),
    },
    {
      header: "Alert",
      accessor: "alertDetails.title",
      cell: (row) => (
        <div>
          <div className="font-medium">{row.alertDetails.title}</div>
          <div className="text-xs text-gray-500">
            Category: {row.alertDetails.category}
          </div>
        </div>
      ),
    },
    {
      header: "Severity",
      accessor: "alertDetails.severity",
      width: "100px",
      cell: (row) => (
        <StatusBadge
          status={getSeverityColor(row.alertDetails.severity)}
          text={row.alertDetails.severity}
        />
      ),
    },
    {
      header: "Risk Score",
      accessor: "riskScore",
      width: "100px",
      cell: (row) => (
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mr-2 ${
              row.riskScore >= 80
                ? "bg-red-100 text-red-700"
                : row.riskScore >= 60
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {row.riskScore}
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      width: "140px",
      cell: (row) => (
        <StatusBadge status={getStatusColor(row.status)} text={row.status} />
      ),
    },
    {
      header: "Detection",
      accessor: "alertDetails.detectedBy",
      width: "180px",
      cell: (row) => (
        <div className="flex items-center">
          {row.alertDetails.detectedBy.includes("AI") ? (
            <BrainCircuit size={14} className="text-purple-500 mr-1" />
          ) : (
            <Shield size={14} className="text-blue-500 mr-1" />
          )}
          <span className="text-sm">{row.alertDetails.detectedBy}</span>
        </div>
      ),
    },
    {
      header: "Timestamp",
      accessor: "alertDetails.timestamp",
      width: "180px",
      cell: (row) => (
        <div className="flex items-center">
          <Clock size={14} className="text-gray-400 mr-1" />
          <span>{formatDate(row.alertDetails.timestamp)}</span>
        </div>
      ),
    },
  ];

  // Handle row click
  const handleRowClick = (alert) => {
    setSelectedAlert(alert);
  };

  // Calculate alert stats
  const totalAlerts = suspiciousActivities.length;
  const newAlerts = suspiciousActivities.filter(
    (alert) => alert.status.toLowerCase() === "new"
  ).length;
  const investigatingAlerts = suspiciousActivities.filter(
    (alert) => alert.status.toLowerCase() === "under investigation"
  ).length;
  const resolvedAlerts = suspiciousActivities.filter(
    (alert) => alert.status.toLowerCase() === "resolved"
  ).length;

  // Risk score color
  const getRiskScoreColor = (score) => {
    if (score >= 80) return "bg-red-100 text-red-700";
    if (score >= 60) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div>
      <PageHeader
        title="Suspicious Activity Alerts"
        description="AI-detected anomalies in login patterns, transaction behaviors, or multiple failed authentication attempts"
        actionLabel="Generate Report"
        actionUrl="/admin/fraud-prevention/report"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
              <Bell size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Alerts</p>
              <p className="text-xl font-bold">{totalAlerts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3">
              <AlertOctagon size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">New Alerts</p>
              <p className="text-xl font-bold">{newAlerts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Under Investigation</p>
              <p className="text-xl font-bold">{investigatingAlerts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Resolved</p>
              <p className="text-xl font-bold">{resolvedAlerts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Search by ID, customer, or alert title..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <FilterDropdown
              label="Status"
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
            />
            <FilterDropdown
              label="Category"
              options={categoryOptions}
              value={categoryFilter}
              onChange={setCategoryFilter}
            />
            <FilterDropdown
              label="Severity"
              options={severityOptions}
              value={severityFilter}
              onChange={setSeverityFilter}
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

      {/* Alert Detail Panel - shown when an alert is selected */}
      {selectedAlert && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="text-lg font-medium text-gray-800 mr-2">
                  Alert {selectedAlert.id}
                </h3>
                <StatusBadge
                  status={getStatusColor(selectedAlert.status)}
                  text={selectedAlert.status}
                />
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  Detected: {formatDate(selectedAlert.alertDetails.timestamp)}
                </span>
                <StatusBadge
                  status={getSeverityColor(selectedAlert.alertDetails.severity)}
                  text={selectedAlert.alertDetails.severity}
                />
              </div>
            </div>
            <p className="text-gray-700 mt-1 font-medium">
              {selectedAlert.alertDetails.title}
            </p>
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
                      {selectedAlert.customer.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-700">ID:</span>
                    <span className="text-sm font-medium">
                      {selectedAlert.customer.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-700">Segment:</span>
                    <span className="text-sm font-medium">
                      {selectedAlert.customer.segment}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-700">
                      Account Type:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedAlert.customer.accountType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Alert Details */}
              <div className="bg-amber-50 p-4 rounded-md">
                <h4 className="text-amber-800 font-medium mb-3 flex items-center">
                  <AlertTriangle size={16} className="mr-2" /> Alert Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-amber-700">Category:</span>
                    <span className="text-sm font-medium">
                      {selectedAlert.alertDetails.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-amber-700">Detected By:</span>
                    <span className="text-sm font-medium">
                      {selectedAlert.alertDetails.detectedBy}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-amber-700">Assigned To:</span>
                    <span className="text-sm font-medium">
                      {selectedAlert.assignedTo}
                    </span>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="bg-red-50 p-4 rounded-md">
                <h4 className="text-red-800 font-medium mb-3 flex items-center">
                  <Shield size={16} className="mr-2" /> Risk Assessment
                </h4>
                <div className="flex items-center justify-center mb-3">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${getRiskScoreColor(
                      selectedAlert.riskScore
                    )}`}
                  >
                    {selectedAlert.riskScore}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-red-700 mb-1">Risk Score</div>
                  <div className="text-xs">
                    {selectedAlert.riskScore >= 80
                      ? "High risk activity requires immediate attention"
                      : selectedAlert.riskScore >= 60
                      ? "Medium risk activity needs investigation"
                      : "Low risk activity should be monitored"}
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Description */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-gray-800 font-medium mb-2 flex items-center">
                <Eye size={16} className="mr-2" /> Alert Description
              </h4>
              <p className="text-gray-700">
                {selectedAlert.alertDetails.description}
              </p>
            </div>

            {/* Required Action */}
            <div className="bg-purple-50 p-4 rounded-md">
              <h4 className="text-purple-800 font-medium mb-2 flex items-center">
                <Lock size={16} className="mr-2" /> Required Action
              </h4>
              <p className="text-purple-900">{selectedAlert.actionRequired}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-6 space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700">
                Mark as Reviewed
              </button>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-md">
                Investigate
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md">
                Take Immediate Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
