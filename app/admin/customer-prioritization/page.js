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
  UserCheck,
  Clock,
  ArrowUp,
  BarChart2,
  Users,
  DollarSign,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  RotateCw,
  Layers,
  Briefcase,
} from "lucide-react";

// Mock data for customer priority queue
const priorityQueueData = [
  {
    id: "CQ-1001",
    customer: {
      name: "Meera Patel",
      id: "10089234",
      segment: "High Net Worth",
      accountType: "Premium",
      photo: "/avatars/meera.jpg",
    },
    requestDetails: {
      type: "Account Issue",
      channel: "Video Call",
      timestamp: "2023-09-15T09:15:00Z",
      description:
        "Unable to access investment portfolio dashboard. Customer needs immediate assistance.",
      estimatedResolutionTime: 15,
    },
    priorityScore: 92,
    priorityLevel: "Critical",
    waitTime: 0,
    assignedTo: "Rahul M. (Premium Relationship Manager)",
    assets: {
      totalValue: 12500000,
      accounts: 4,
      products: [
        "Current Account",
        "Fixed Deposits",
        "Mutual Funds",
        "Home Loan",
      ],
    },
    riskLevel: "Low",
  },
  {
    id: "CQ-1002",
    customer: {
      name: "Sanjay Mehta",
      id: "10034987",
      segment: "High Net Worth",
      accountType: "Premium",
      photo: "/avatars/sanjay.jpg",
    },
    requestDetails: {
      type: "Investment Advice",
      channel: "Branch Visit",
      timestamp: "2023-09-15T09:45:00Z",
      description:
        "Seeking consultation on diversifying investment portfolio with focus on equity and bonds.",
      estimatedResolutionTime: 45,
    },
    priorityScore: 88,
    priorityLevel: "High",
    waitTime: 6,
    assignedTo: "Pending Assignment",
    assets: {
      totalValue: 8900000,
      accounts: 3,
      products: ["Savings Account", "Fixed Deposits", "Mutual Funds"],
    },
    riskLevel: "Low",
  },
  {
    id: "CQ-1003",
    customer: {
      name: "Priya Desai",
      id: "10067832",
      segment: "Mass Affluent",
      accountType: "Savings",
      photo: "/avatars/priya.jpg",
    },
    requestDetails: {
      type: "Loan Inquiry",
      channel: "Mobile App",
      timestamp: "2023-09-15T10:20:00Z",
      description:
        "Inquiring about home loan options and pre-approval process. Already has pre-approval from competitor bank.",
      estimatedResolutionTime: 30,
    },
    priorityScore: 78,
    priorityLevel: "High",
    waitTime: 10,
    assignedTo: "Amit K. (Loan Specialist)",
    assets: {
      totalValue: 450000,
      accounts: 2,
      products: ["Savings Account", "Credit Card"],
    },
    riskLevel: "Low",
  },
  {
    id: "CQ-1004",
    customer: {
      name: "Arun Kumar",
      id: "10045123",
      segment: "Regular",
      accountType: "Current",
      photo: "/avatars/arun.jpg",
    },
    requestDetails: {
      type: "Transaction Dispute",
      channel: "Phone Call",
      timestamp: "2023-09-15T09:10:00Z",
      description:
        "Disputing a transaction of ₹15,000 that customer claims was unauthorized. Card has been blocked.",
      estimatedResolutionTime: 20,
    },
    priorityScore: 65,
    priorityLevel: "Medium",
    waitTime: 15,
    assignedTo: "Neha S. (Card Services)",
    assets: {
      totalValue: 120000,
      accounts: 2,
      products: ["Current Account", "Credit Card"],
    },
    riskLevel: "Medium",
  },
  {
    id: "CQ-1005",
    customer: {
      name: "Vijay Reddy",
      id: "10023456",
      segment: "Regular",
      accountType: "Savings",
      photo: "/avatars/vijay.jpg",
    },
    requestDetails: {
      type: "Technical Support",
      channel: "Chat",
      timestamp: "2023-09-15T10:50:00Z",
      description:
        "Issues with mobile banking app crashes when trying to view statements. Using Android device.",
      estimatedResolutionTime: 15,
    },
    priorityScore: 42,
    priorityLevel: "Standard",
    waitTime: 22,
    assignedTo: "Tech Support Team",
    assets: {
      totalValue: 65000,
      accounts: 1,
      products: ["Savings Account"],
    },
    riskLevel: "High",
  },
  {
    id: "CQ-1006",
    customer: {
      name: "Ananya Malhotra",
      id: "10045678",
      segment: "Regular",
      accountType: "Savings",
      photo: "/avatars/ananya.jpg",
    },
    requestDetails: {
      type: "Account Information",
      channel: "Mobile App",
      timestamp: "2023-09-15T11:05:00Z",
      description:
        "Requesting information about upgrading to premium account and associated benefits.",
      estimatedResolutionTime: 10,
    },
    priorityScore: 38,
    priorityLevel: "Standard",
    waitTime: 25,
    assignedTo: "Customer Service Team",
    assets: {
      totalValue: 85000,
      accounts: 1,
      products: ["Savings Account", "Credit Card"],
    },
    riskLevel: "Low",
  },
  {
    id: "CQ-1007",
    customer: {
      name: "Rajat Kapoor",
      id: "10045678",
      segment: "Regular",
      accountType: "Current",
      photo: "/avatars/rajat.jpg",
    },
    requestDetails: {
      type: "Documentation",
      channel: "Branch Visit",
      timestamp: "2023-09-15T10:15:00Z",
      description:
        "Needs assistance with submitting business loan documentation. Has partial documentation ready.",
      estimatedResolutionTime: 30,
    },
    priorityScore: 55,
    priorityLevel: "Medium",
    waitTime: 18,
    assignedTo: "Suresh P. (Business Banking)",
    assets: {
      totalValue: 320000,
      accounts: 2,
      products: ["Current Account", "Business Loan"],
    },
    riskLevel: "Medium",
  },
];

// Get priority level color for badges
const getPriorityLevelColor = (priority) => {
  switch (priority.toLowerCase()) {
    case "critical":
      return "error";
    case "high":
      return "warning";
    case "medium":
      return "info";
    case "standard":
      return "default";
    default:
      return "default";
  }
};

// Get risk level color for badges
const getRiskLevelColor = (risk) => {
  switch (risk.toLowerCase()) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "success";
    default:
      return "default";
  }
};

export default function CustomerPriorityQueue() {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [orderBy, setOrderBy] = useState("priorityScore");
  const [orderDirection, setOrderDirection] = useState("desc");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Filter options
  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "critical", label: "Critical" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "standard", label: "Standard" },
  ];

  const channelOptions = [
    { value: "all", label: "All Channels" },
    { value: "video call", label: "Video Call" },
    { value: "mobile app", label: "Mobile App" },
    { value: "branch visit", label: "Branch Visit" },
    { value: "phone call", label: "Phone Call" },
    { value: "chat", label: "Chat" },
  ];

  const sortOptions = [
    { value: "priorityScore", label: "Priority Score" },
    { value: "waitTime", label: "Wait Time" },
    { value: "assets.totalValue", label: "Customer Assets" },
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

  // Format minutes to display as time
  const formatMinutes = (minutes) => {
    if (minutes === 0) return "Immediate";
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Format currency value
  const formatCurrency = (value) => {
    return `₹${(value / 100000).toFixed(2)} L`;
  };

  // Sort and filter the data based on search query, filters, and sorting
  const processedData = [...priorityQueueData]
    .filter((customer) => {
      // Search query filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        customer.id.toLowerCase().includes(searchLower) ||
        customer.customer.name.toLowerCase().includes(searchLower) ||
        customer.customer.id.toLowerCase().includes(searchLower) ||
        customer.requestDetails.type.toLowerCase().includes(searchLower);

      // Priority filter
      const matchesPriority =
        priorityFilter === "all" ||
        customer.priorityLevel.toLowerCase() === priorityFilter.toLowerCase();

      // Channel filter
      const matchesChannel =
        channelFilter === "all" ||
        customer.requestDetails.channel.toLowerCase() ===
          channelFilter.toLowerCase();

      return matchesSearch && matchesPriority && matchesChannel;
    })
    .sort((a, b) => {
      // Handle nested properties like 'assets.totalValue'
      const getValue = (obj, path) => {
        const parts = path.split(".");
        return parts.reduce(
          (o, key) => (o && o[key] !== undefined ? o[key] : null),
          obj
        );
      };

      const aValue = getValue(a, orderBy);
      const bValue = getValue(b, orderBy);

      if (orderDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Toggle sort direction
  const toggleSort = (field) => {
    if (orderBy === field) {
      setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(field);
      setOrderDirection("desc");
    }
  };

  // Table columns configuration
  const columns = [
    {
      header: "Queue #",
      accessor: "id",
      width: "100px",
      cell: (row) => <span className="font-medium">{row.id}</span>,
    },
    {
      header: "Customer",
      accessor: "customer.name",
      cell: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">
            <Users size={14} />
          </div>
          <div>
            <div className="font-medium">{row.customer.name}</div>
            <div className="text-xs text-gray-500">
              ID: {row.customer.id} | {row.customer.segment}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: () => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => toggleSort("priorityScore")}
        >
          Priority Score
          {orderBy === "priorityScore" &&
            (orderDirection === "asc" ? (
              <ChevronUp size={14} className="ml-1" />
            ) : (
              <ChevronDown size={14} className="ml-1" />
            ))}
        </div>
      ),
      accessor: "priorityScore",
      width: "120px",
      cell: (row) => (
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mr-2 ${
              row.priorityScore >= 80
                ? "bg-red-100 text-red-700"
                : row.priorityScore >= 60
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {row.priorityScore}
          </div>
          <StatusBadge
            status={getPriorityLevelColor(row.priorityLevel)}
            text={row.priorityLevel}
          />
        </div>
      ),
    },
    {
      header: "Request Type",
      accessor: "requestDetails.type",
      cell: (row) => (
        <div>
          <div className="font-medium">{row.requestDetails.type}</div>
          <div className="text-xs text-gray-500">
            Channel: {row.requestDetails.channel}
          </div>
        </div>
      ),
    },
    {
      header: () => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => toggleSort("waitTime")}
        >
          Wait Time
          {orderBy === "waitTime" &&
            (orderDirection === "asc" ? (
              <ChevronUp size={14} className="ml-1" />
            ) : (
              <ChevronDown size={14} className="ml-1" />
            ))}
        </div>
      ),
      accessor: "waitTime",
      width: "100px",
      cell: (row) => (
        <div>
          <div className="font-medium">{formatMinutes(row.waitTime)}</div>
          <div className="text-xs text-gray-500">
            Est. Resolution: {row.requestDetails.estimatedResolutionTime} mins
          </div>
        </div>
      ),
    },
    {
      header: () => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => toggleSort("assets.totalValue")}
        >
          Customer Assets
          {orderBy === "assets.totalValue" &&
            (orderDirection === "asc" ? (
              <ChevronUp size={14} className="ml-1" />
            ) : (
              <ChevronDown size={14} className="ml-1" />
            ))}
        </div>
      ),
      accessor: "assets.totalValue",
      width: "140px",
      cell: (row) => (
        <div className="flex items-center">
          <div>
            <div className="font-medium">
              {formatCurrency(row.assets.totalValue)}
            </div>
            <div className="text-xs text-gray-500">
              Products: {row.assets.products.length}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Risk Level",
      accessor: "riskLevel",
      width: "120px",
      cell: (row) => (
        <StatusBadge
          status={getRiskLevelColor(row.riskLevel)}
          text={row.riskLevel}
        />
      ),
    },
    {
      header: "Status",
      accessor: "assignedTo",
      width: "140px",
      cell: (row) => (
        <div>
          {row.assignedTo.includes("Pending") ? (
            <span className="text-amber-600 text-sm flex items-center">
              <RotateCw size={14} className="mr-1" /> Awaiting Assignment
            </span>
          ) : (
            <span className="text-green-600 text-sm flex items-center">
              <UserCheck size={14} className="mr-1" /> Assigned
            </span>
          )}
        </div>
      ),
    },
  ];

  // Handle row click
  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
  };

  // Calculate queue stats
  const totalInQueue = processedData.length;
  const criticalCustomers = processedData.filter(
    (c) => c.priorityLevel.toLowerCase() === "critical"
  ).length;
  const highPriorityCustomers = processedData.filter(
    (c) => c.priorityLevel.toLowerCase() === "high"
  ).length;
  const averageWaitTime = Math.round(
    processedData.reduce((acc, curr) => acc + curr.waitTime, 0) /
      processedData.length
  );

  // Determine queue health
  const queueHealth =
    averageWaitTime < 10
      ? "Good"
      : averageWaitTime < 20
      ? "Moderate"
      : "High Load";
  const queueHealthColor =
    queueHealth === "Good"
      ? "text-green-600"
      : queueHealth === "Moderate"
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div>
      <PageHeader
        title="Customer Priority Queue"
        description="Automated priority queue based on customer holdings, assets, and risk levels"
        actionLabel="Reset Queue"
        actionUrl="/admin/customer-prioritization/reset"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
              <Layers size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total In Queue</p>
              <p className="text-xl font-bold">{totalInQueue}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Critical Customers</p>
              <p className="text-xl font-bold">{criticalCustomers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
              <ArrowUp size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">High Priority</p>
              <p className="text-xl font-bold">{highPriorityCustomers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Wait Time</p>
              <p className="text-xl font-bold">
                {formatMinutes(averageWaitTime)}
              </p>
              <p className={`text-xs ${queueHealthColor}`}>
                Queue Health: {queueHealth}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Search by ID, customer name, or request type..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <FilterDropdown
              label="Priority Level"
              options={priorityOptions}
              value={priorityFilter}
              onChange={setPriorityFilter}
            />
            <FilterDropdown
              label="Channel"
              options={channelOptions}
              value={channelFilter}
              onChange={setChannelFilter}
            />
            <FilterDropdown
              label="Sort By"
              options={sortOptions}
              value={orderBy}
              onChange={setOrderBy}
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="mb-6">
        <DataTable
          columns={columns}
          data={processedData}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Customer Detail Panel - shown when a customer is selected */}
      {selectedCustomer && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="text-lg font-medium text-gray-800 mr-2">
                  Queue Item {selectedCustomer.id}
                </h3>
                <StatusBadge
                  status={getPriorityLevelColor(selectedCustomer.priorityLevel)}
                  text={selectedCustomer.priorityLevel}
                />
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">
                  Priority Score:
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    selectedCustomer.priorityScore >= 80
                      ? "bg-red-100 text-red-700"
                      : selectedCustomer.priorityScore >= 60
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {selectedCustomer.priorityScore}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Customer Information */}
              <div className="bg-indigo-50 p-4 rounded-md">
                <h4 className="text-indigo-800 font-medium mb-3 flex items-center">
                  <Users size={16} className="mr-2" /> Customer Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-700">Name:</span>
                    <span className="text-sm font-medium">
                      {selectedCustomer.customer.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-700">ID:</span>
                    <span className="text-sm font-medium">
                      {selectedCustomer.customer.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-700">Segment:</span>
                    <span className="text-sm font-medium">
                      {selectedCustomer.customer.segment}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-700">
                      Account Type:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedCustomer.customer.accountType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-700">Risk Level:</span>
                    <StatusBadge
                      status={getRiskLevelColor(selectedCustomer.riskLevel)}
                      text={selectedCustomer.riskLevel}
                    />
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="text-blue-800 font-medium mb-3 flex items-center">
                  <BarChart2 size={16} className="mr-2" /> Request Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Type:</span>
                    <span className="text-sm font-medium">
                      {selectedCustomer.requestDetails.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Channel:</span>
                    <span className="text-sm font-medium">
                      {selectedCustomer.requestDetails.channel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Timestamp:</span>
                    <span className="text-sm font-medium">
                      {formatDate(selectedCustomer.requestDetails.timestamp)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Wait Time:</span>
                    <span className="text-sm font-medium">
                      {formatMinutes(selectedCustomer.waitTime)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">
                      Est. Resolution:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedCustomer.requestDetails.estimatedResolutionTime}{" "}
                      mins
                    </span>
                  </div>
                </div>
              </div>

              {/* Assets Information */}
              <div className="bg-green-50 p-4 rounded-md">
                <h4 className="text-green-800 font-medium mb-3 flex items-center">
                  <Briefcase size={16} className="mr-2" /> Assets Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">Total Value:</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(selectedCustomer.assets.totalValue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">
                      Number of Accounts:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedCustomer.assets.accounts}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-green-700">Products:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCustomer.assets.products.map((product, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Request Description */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="text-gray-800 font-medium mb-2">
                Request Description
              </h4>
              <p className="text-gray-700">
                {selectedCustomer.requestDetails.description}
              </p>
            </div>

            {/* Assignment */}
            <div className="bg-amber-50 p-4 rounded-md mb-6">
              <h4 className="text-amber-800 font-medium mb-2 flex items-center">
                <UserCheck size={16} className="mr-2" /> Assignment
              </h4>
              <div>
                <p className="text-amber-900 mb-2">
                  {selectedCustomer.assignedTo.includes("Pending")
                    ? "This request is pending assignment to an agent."
                    : `This request is assigned to ${selectedCustomer.assignedTo}.`}
                </p>
                {selectedCustomer.assignedTo.includes("Pending") && (
                  <div className="flex items-center">
                    <span className="text-sm text-amber-800 mr-2">
                      AI Recommended Agent:
                    </span>
                    <span className="text-sm font-medium">
                      Priya R. (Premium Services)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Priority Factors */}
            <div className="bg-purple-50 p-4 rounded-md">
              <h4 className="text-purple-800 font-medium mb-3">
                AI-Calculated Priority Factors
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-purple-700">
                      Customer Segment Value
                    </span>
                    <span className="text-sm font-medium">35 points</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-purple-700">
                      Total Asset Value
                    </span>
                    <span className="text-sm font-medium">25 points</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-purple-700">
                      Request Urgency
                    </span>
                    <span className="text-sm font-medium">20 points</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-purple-700">
                      Customer Loyalty
                    </span>
                    <span className="text-sm font-medium">12 points</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500"
                      style={{ width: "24%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-6 space-x-3">
              <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">
                Modify Priority
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Assign Agent
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Start Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
