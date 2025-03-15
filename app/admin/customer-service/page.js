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
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";

// Mock data for service requests
const serviceRequestsData = [
  {
    id: "SR-1001",
    customer: "Aditya Sharma",
    customerId: "10034593",
    issue: "Unable to access netbanking account",
    priority: "High",
    status: "Pending",
    assignedTo: "Priya R.",
    submitted: "2023-09-15T10:30:00Z",
    lastUpdated: "2023-09-15T14:45:00Z",
    source: "Mobile App",
    category: "Authentication",
  },
  {
    id: "SR-1002",
    customer: "Meera Patel",
    customerId: "10089234",
    issue: "Dispute with credit card transaction",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Rahul M.",
    submitted: "2023-09-14T09:15:00Z",
    lastUpdated: "2023-09-15T11:30:00Z",
    source: "Web Portal",
    category: "Payment",
  },
  {
    id: "SR-1003",
    customer: "Rajat Kapoor",
    customerId: "10045678",
    issue: "Updated KYC documents not reflecting",
    priority: "Low",
    status: "Completed",
    assignedTo: "Neha S.",
    submitted: "2023-09-13T16:45:00Z",
    lastUpdated: "2023-09-14T10:20:00Z",
    source: "Branch Visit",
    category: "Documentation",
  },
  {
    id: "SR-1004",
    customer: "Sanjana Desai",
    customerId: "10067890",
    issue: "Unable to complete loan application",
    priority: "High",
    status: "Pending",
    assignedTo: "Unassigned",
    submitted: "2023-09-15T08:30:00Z",
    lastUpdated: "2023-09-15T08:30:00Z",
    source: "Web Portal",
    category: "Loan",
  },
  {
    id: "SR-1005",
    customer: "Vijay Reddy",
    customerId: "10023456",
    issue: "Cannot access account statement",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Amit K.",
    submitted: "2023-09-14T14:20:00Z",
    lastUpdated: "2023-09-15T09:15:00Z",
    source: "Phone Call",
    category: "Statement",
  },
  {
    id: "SR-1006",
    customer: "Lakshmi Narayan",
    customerId: "10078901",
    issue: "International transaction declined",
    priority: "High",
    status: "In Progress",
    assignedTo: "Suresh P.",
    submitted: "2023-09-14T23:10:00Z",
    lastUpdated: "2023-09-15T10:45:00Z",
    source: "Mobile App",
    category: "Card",
  },
  {
    id: "SR-1007",
    customer: "Anita Verma",
    customerId: "10056789",
    issue: "Feedback regarding mobile app experience",
    priority: "Low",
    status: "Completed",
    assignedTo: "Vikram S.",
    submitted: "2023-09-13T11:30:00Z",
    lastUpdated: "2023-09-14T15:20:00Z",
    source: "Mobile App",
    category: "Feedback",
  },
];

// Status colors for status badges
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "warning";
    case "in progress":
      return "info";
    case "completed":
      return "success";
    case "escalated":
      return "error";
    default:
      return "default";
  }
};

// Priority colors for priority badges
const getPriorityColor = (priority) => {
  switch (priority.toLowerCase()) {
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

export default function ServiceRequests() {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Filter options
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "in progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "escalated", label: "Escalated" },
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "authentication", label: "Authentication" },
    { value: "payment", label: "Payment" },
    { value: "documentation", label: "Documentation" },
    { value: "loan", label: "Loan" },
    { value: "statement", label: "Statement" },
    { value: "card", label: "Card" },
    { value: "feedback", label: "Feedback" },
  ];

  // Filter the data based on search query and filters
  const filteredData = serviceRequestsData.filter((request) => {
    // Search query filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      request.id.toLowerCase().includes(searchLower) ||
      request.customer.toLowerCase().includes(searchLower) ||
      request.issue.toLowerCase().includes(searchLower) ||
      request.assignedTo.toLowerCase().includes(searchLower);

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      request.status.toLowerCase() === statusFilter.toLowerCase();

    // Priority filter
    const matchesPriority =
      priorityFilter === "all" ||
      request.priority.toLowerCase() === priorityFilter.toLowerCase();

    // Category filter
    const matchesCategory =
      categoryFilter === "all" ||
      request.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

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

  // Table columns configuration
  const columns = [
    {
      header: "Request ID",
      accessor: "id",
      width: "100px",
      cell: (row) => <span className="font-medium">{row.id}</span>,
    },
    {
      header: "Customer",
      accessor: "customer",
      cell: (row) => (
        <div>
          <div className="font-medium">{row.customer}</div>
          <div className="text-xs text-gray-500">ID: {row.customerId}</div>
        </div>
      ),
    },
    {
      header: "Issue",
      accessor: "issue",
      cell: (row) => (
        <div>
          <div className="font-medium">{row.issue}</div>
          <div className="text-xs text-gray-500">Category: {row.category}</div>
        </div>
      ),
    },
    {
      header: "Priority",
      accessor: "priority",
      width: "100px",
      cell: (row) => (
        <StatusBadge
          status={getPriorityColor(row.priority)}
          text={row.priority}
        />
      ),
    },
    {
      header: "Status",
      accessor: "status",
      width: "120px",
      cell: (row) => (
        <StatusBadge status={getStatusColor(row.status)} text={row.status} />
      ),
    },
    {
      header: "Assigned To",
      accessor: "assignedTo",
      width: "150px",
      cell: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">
            <User size={14} />
          </div>
          <span>{row.assignedTo}</span>
        </div>
      ),
    },
    {
      header: "Submitted",
      accessor: "submitted",
      width: "180px",
      cell: (row) => (
        <div className="flex items-center">
          <Calendar size={14} className="text-gray-400 mr-1" />
          <span>{formatDate(row.submitted)}</span>
        </div>
      ),
    },
    {
      header: "Source",
      accessor: "source",
      width: "120px",
    },
  ];

  // Handle row click
  const handleRowClick = (row) => {
    console.log("Clicked on request:", row.id);
    // Navigate to request details or open modal
  };

  return (
    <div>
      <PageHeader
        title="Live Service Requests"
        description="View and manage pending, ongoing, and completed service requests"
        actionLabel="Create New Request"
        actionUrl="/admin/customer-service/create"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-xl font-bold">18</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-bold">47</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Escalated</p>
              <p className="text-xl font-bold">4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Search by ID, customer, or issue..."
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
              label="Priority"
              options={priorityOptions}
              value={priorityFilter}
              onChange={setPriorityFilter}
            />
            <FilterDropdown
              label="Category"
              options={categoryOptions}
              value={categoryFilter}
              onChange={setCategoryFilter}
            />
            <div className="flex items-end space-x-2">
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 flex items-center text-sm">
                <Filter size={16} className="mr-1" />
                More Filters
              </button>
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 flex items-center text-sm">
                <Download size={16} className="mr-1" />
                Export
              </button>
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 flex items-center text-sm">
                <RefreshCw size={16} className="mr-1" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
