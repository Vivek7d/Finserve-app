"use client";

import React, { useState } from "react";
import {
  PageHeader,
  DataTable,
  StatusBadge,
  SearchInput,
  FilterDropdown,
  DataCard,
} from "../../../components/ui/dashboard-components";
import {
  Video,
  Mic,
  Users,
  Calendar,
  BarChart2,
  Clock,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  CheckCircle,
  Filter,
  Download,
  RefreshCw,
  Play,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";

// Mock data for customer queries
const customerQueriesData = [
  {
    id: "VQ-1001",
    customer: {
      name: "Aditya Sharma",
      id: "10034593",
      segment: "Premium",
      photo: "/avatars/aditya.jpg",
    },
    type: "Video",
    topic: "Investment Portfolio Access Issue",
    duration: "00:08:42",
    timestamp: "2023-09-15T10:30:00Z",
    sentiment: {
      score: 65,
      label: "Neutral → Positive",
      initialFrustration: 60,
      finalSatisfaction: 75,
    },
    status: "Resolved",
    priority: "High",
    agent: "Rahul M.",
    notes:
      "Customer was unable to access investment dashboard after system upgrade. Provided temporary access and filed IT ticket.",
  },
  {
    id: "AQ-1002",
    customer: {
      name: "Meera Patel",
      id: "10089234",
      segment: "High Net Worth",
      photo: "/avatars/meera.jpg",
    },
    type: "Audio",
    topic: "International Transaction Authorization",
    duration: "00:06:15",
    timestamp: "2023-09-15T12:45:00Z",
    sentiment: {
      score: 40,
      label: "Negative → Neutral",
      initialFrustration: 85,
      finalSatisfaction: 60,
    },
    status: "Escalated",
    priority: "Critical",
    agent: "Priya R.",
    notes:
      "Customer upset about international transaction being declined. Verified identity and approved transaction, but escalated to ensure all future transactions proceed normally.",
  },
  {
    id: "VQ-1003",
    customer: {
      name: "Rajat Kapoor",
      id: "10045678",
      segment: "Regular",
      photo: "/avatars/rajat.jpg",
    },
    type: "Video",
    topic: "Loan Application Status Inquiry",
    duration: "00:04:30",
    timestamp: "2023-09-14T16:15:00Z",
    sentiment: {
      score: 85,
      label: "Positive",
      initialFrustration: 20,
      finalSatisfaction: 90,
    },
    status: "Resolved",
    priority: "Medium",
    agent: "Amit K.",
    notes:
      "Customer inquired about loan application status. Provided update that application is approved and explained next steps.",
  },
  {
    id: "AQ-1004",
    customer: {
      name: "Sanjana Desai",
      id: "10067890",
      segment: "Mass Affluent",
      photo: "/avatars/sanjana.jpg",
    },
    type: "Audio",
    topic: "Credit Card Statement Dispute",
    duration: "00:12:10",
    timestamp: "2023-09-14T11:20:00Z",
    sentiment: {
      score: 30,
      label: "Negative",
      initialFrustration: 90,
      finalSatisfaction: 40,
    },
    status: "In Progress",
    priority: "High",
    agent: "Neha S.",
    notes:
      "Customer disputing multiple transactions on credit card statement. Filed investigation request and temporarily credited disputed amount pending resolution.",
  },
  {
    id: "VQ-1005",
    customer: {
      name: "Vijay Reddy",
      id: "10023456",
      segment: "Regular",
      photo: "/avatars/vijay.jpg",
    },
    type: "Video",
    topic: "Mobile Banking App Technical Issue",
    duration: "00:05:25",
    timestamp: "2023-09-15T09:10:00Z",
    sentiment: {
      score: 60,
      label: "Neutral",
      initialFrustration: 70,
      finalSatisfaction: 65,
    },
    status: "Resolved",
    priority: "Low",
    agent: "Tech Support",
    notes:
      "Customer experiencing app crashes on Android device. Guided through app cache clearing and reinstallation process, issue resolved.",
  },
  {
    id: "AQ-1006",
    customer: {
      name: "Ananya Malhotra",
      id: "10078901",
      segment: "Premium",
      photo: "/avatars/ananya.jpg",
    },
    type: "Audio",
    topic: "Fixed Deposit Renewal Options",
    duration: "00:07:40",
    timestamp: "2023-09-13T14:30:00Z",
    sentiment: {
      score: 80,
      label: "Positive",
      initialFrustration: 10,
      finalSatisfaction: 85,
    },
    status: "Resolved",
    priority: "Medium",
    agent: "Suresh P.",
    notes:
      "Customer inquired about FD renewal options. Explained available interest rates and terms, customer decided to renew for 18 months at premium rate.",
  },
  {
    id: "VQ-1007",
    customer: {
      name: "Kiran Nair",
      id: "10056789",
      segment: "High Net Worth",
      photo: "/avatars/kiran.jpg",
    },
    type: "Video",
    topic: "Wealth Management Portfolio Review",
    duration: "00:15:20",
    timestamp: "2023-09-14T13:00:00Z",
    sentiment: {
      score: 90,
      label: "Very Positive",
      initialFrustration: 5,
      finalSatisfaction: 95,
    },
    status: "Resolved",
    priority: "High",
    agent: "Vikram S. (Wealth Advisor)",
    notes:
      "Quarterly portfolio review with detailed discussion of performance and rebalancing options. Customer very satisfied with investment growth and service.",
  },
  {
    id: "AQ-1008",
    customer: {
      name: "Arjun Mehta",
      id: "10034567",
      segment: "Regular",
      photo: "/avatars/arjun.jpg",
    },
    type: "Audio",
    topic: "Account Statement Request",
    duration: "00:03:15",
    timestamp: "2023-09-15T08:45:00Z",
    sentiment: {
      score: 75,
      label: "Positive",
      initialFrustration: 30,
      finalSatisfaction: 80,
    },
    status: "Resolved",
    priority: "Low",
    agent: "Automated System",
    notes:
      "Customer requested printed account statements for last 6 months. Processed request and arranged for delivery via courier.",
  },
  {
    id: "VQ-1009",
    customer: {
      name: "Priya Desai",
      id: "10067832",
      segment: "Mass Affluent",
      photo: "/avatars/priya.jpg",
    },
    type: "Video",
    topic: "Home Loan Interest Rate Reduction",
    duration: "00:09:30",
    timestamp: "2023-09-13T11:10:00Z",
    sentiment: {
      score: 50,
      label: "Neutral → Positive",
      initialFrustration: 65,
      finalSatisfaction: 70,
    },
    status: "In Progress",
    priority: "Medium",
    agent: "Amit K. (Loan Specialist)",
    notes:
      "Customer requested interest rate reduction on existing home loan. Checked eligibility and started paperwork for rate revision based on loyalty status.",
  },
];

// Get status color for status badges
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "resolved":
      return "success";
    case "in progress":
      return "info";
    case "escalated":
      return "error";
    case "pending":
      return "warning";
    default:
      return "default";
  }
};

// Get priority color for priority badges
const getPriorityColor = (priority) => {
  switch (priority.toLowerCase()) {
    case "critical":
      return "error";
    case "high":
      return "warning";
    case "medium":
      return "info";
    case "low":
      return "success";
    default:
      return "default";
  }
};

// Get sentiment color for sentiment score
const getSentimentColor = (score) => {
  if (score >= 80) return "success";
  if (score >= 60) return "info";
  if (score >= 40) return "warning";
  return "error";
};

export default function QueryHandling() {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [showQueryDetails, setShowQueryDetails] = useState(false);
  const [chatMessages, setChatMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");

  // Filter options
  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "Video", label: "Video" },
    { value: "Audio", label: "Audio" },
  ];

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "resolved", label: "Resolved" },
    { value: "in progress", label: "In Progress" },
    { value: "escalated", label: "Escalated" },
    { value: "pending", label: "Pending" },
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "critical", label: "Critical" },
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
  const filteredData = customerQueriesData.filter((query) => {
    // Search query filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      query.id.toLowerCase().includes(searchLower) ||
      query.customer.name.toLowerCase().includes(searchLower) ||
      query.topic.toLowerCase().includes(searchLower) ||
      query.agent?.toLowerCase().includes(searchLower);

    // Type filter
    const matchesType =
      typeFilter === "all" ||
      query.type.toLowerCase() === typeFilter.toLowerCase();

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      query.status.toLowerCase() === statusFilter.toLowerCase();

    // Priority filter
    const matchesPriority =
      priorityFilter === "all" ||
      query.priority.toLowerCase() === priorityFilter.toLowerCase();

    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  // Table columns configuration
  const columns = [
    {
      header: "Query ID",
      accessor: "id",
      width: "100px",
      cell: (row) => (
        <div className="flex items-center">
          {row.type === "Video" ? (
            <Video size={16} className="text-blue-500 mr-2" />
          ) : (
            <Mic size={16} className="text-indigo-500 mr-2" />
          )}
          <span className="font-medium">{row.id}</span>
        </div>
      ),
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
      header: "Topic",
      accessor: "topic",
      cell: (row) => (
        <div>
          <div className="font-medium truncate max-w-xs">{row.topic}</div>
          <div className="text-xs text-gray-500">Duration: {row.duration}</div>
        </div>
      ),
    },
    {
      header: "Sentiment",
      accessor: "sentiment.score",
      width: "160px",
      cell: (row) => (
        <div>
          <div className="flex items-center mb-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                row.sentiment.score >= 80
                  ? "bg-green-100 text-green-700"
                  : row.sentiment.score >= 60
                  ? "bg-blue-100 text-blue-700"
                  : row.sentiment.score >= 40
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {row.sentiment.score}
            </div>
            <span className="text-sm">{row.sentiment.label}</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                row.sentiment.score >= 80
                  ? "bg-green-500"
                  : row.sentiment.score >= 60
                  ? "bg-blue-500"
                  : row.sentiment.score >= 40
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${row.sentiment.score}%` }}
            ></div>
          </div>
        </div>
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
      header: "Priority",
      accessor: "priority",
      width: "110px",
      cell: (row) => (
        <StatusBadge
          status={getPriorityColor(row.priority)}
          text={row.priority}
        />
      ),
    },
    {
      header: "Agent",
      accessor: "agent",
      width: "140px",
    },
    {
      header: "Timestamp",
      accessor: "timestamp",
      width: "180px",
      cell: (row) => (
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(row.timestamp)}</span>
        </div>
      ),
    },
    {
      header: "",
      accessor: "actions",
      width: "80px",
      cell: (row) => (
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            handlePlayRecording(row);
          }}
        >
          <Play size={16} className="text-indigo-600" />
        </button>
      ),
    },
  ];

  // Handle row click to show detailed query view
  const handleRowClick = (query) => {
    setSelectedQuery(query);
    setShowQueryDetails(true);
  };

  // Handle play recording button click
  const handlePlayRecording = (query) => {
    console.log("Playing recording for", query.id);
    // Implement playback functionality
  };

  // Calculate stats
  const totalQueries = filteredData.length;
  const videoQueries = filteredData.filter((q) => q.type === "Video").length;
  const audioQueries = filteredData.filter((q) => q.type === "Audio").length;
  const resolvedQueries = filteredData.filter(
    (q) => q.status === "Resolved"
  ).length;
  const escalatedQueries = filteredData.filter(
    (q) => q.status === "Escalated"
  ).length;

  // Calculate average sentiment score
  const avgSentiment = Math.round(
    filteredData.reduce((acc, curr) => acc + curr.sentiment.score, 0) /
      (filteredData.length || 1)
  );

  // Calculate sentiment distribution
  const positiveSentiment = filteredData.filter(
    (q) => q.sentiment.score >= 70
  ).length;
  const neutralSentiment = filteredData.filter(
    (q) => q.sentiment.score >= 40 && q.sentiment.score < 70
  ).length;
  const negativeSentiment = filteredData.filter(
    (q) => q.sentiment.score < 40
  ).length;

  // Close detailed view
  const closeDetailView = () => {
    setShowQueryDetails(false);
    setSelectedQuery(null);
  };

  // Handle sending a chat message
  const handleSendMessage = (queryId) => {
    if (!newMessage.trim()) return;

    const newChatMessage = {
      id: Date.now(),
      message: newMessage,
      sender: "agent",
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => ({
      ...prev,
      [queryId]: [...(prev[queryId] || []), newChatMessage],
    }));

    setNewMessage("");
  };

  return (
    <div className="relative">
      <PageHeader
        title="Video & Audio Query Handling"
        description="Manage and analyze customer video and audio queries with sentiment analysis"
        actionLabel="View Analytics"
        actionUrl="/admin/query-handling/sentiment"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <DataCard
          title="Total Queries"
          value={totalQueries}
          icon={<MessageSquare className="text-indigo-600" />}
        />
        <DataCard
          title="Video Calls"
          value={videoQueries}
          icon={<Video className="text-blue-600" />}
        />
        <DataCard
          title="Audio Calls"
          value={audioQueries}
          icon={<Mic className="text-purple-600" />}
        />
        <DataCard
          title="Resolved"
          value={resolvedQueries}
          icon={<CheckCircle className="text-green-600" />}
        />
        <DataCard
          title="Escalated"
          value={escalatedQueries}
          icon={<AlertTriangle className="text-red-600" />}
        />
        <DataCard
          title="Avg. Sentiment"
          value={avgSentiment}
          isPercentage={false}
          icon={
            avgSentiment >= 70 ? (
              <ThumbsUp className="text-green-600" />
            ) : avgSentiment >= 40 ? (
              <BarChart2 className="text-blue-600" />
            ) : (
              <ThumbsDown className="text-red-600" />
            )
          }
        />
      </div>

      {/* Sentiment Distribution */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Sentiment Distribution</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500">Overall Health:</span>
            <span
              className={`ml-2 text-sm font-medium ${
                avgSentiment >= 70
                  ? "text-green-600"
                  : avgSentiment >= 50
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >
              {avgSentiment >= 70
                ? "Good"
                : avgSentiment >= 50
                ? "Average"
                : "Needs Attention"}
            </span>
          </div>
        </div>

        <div className="flex mb-2">
          <div
            className="h-6 bg-green-500 rounded-l-md"
            style={{ width: `${(positiveSentiment / totalQueries) * 100}%` }}
          ></div>
          <div
            className="h-6 bg-blue-500"
            style={{ width: `${(neutralSentiment / totalQueries) * 100}%` }}
          ></div>
          <div
            className="h-6 bg-red-500 rounded-r-md"
            style={{ width: `${(negativeSentiment / totalQueries) * 100}%` }}
          ></div>
        </div>

        <div className="flex text-sm justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            <span>Positive ({positiveSentiment})</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span>Neutral ({neutralSentiment})</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
            <span>Negative ({negativeSentiment})</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Search by ID, customer, or topic..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <FilterDropdown
              label="Type"
              options={typeOptions}
              value={typeFilter}
              onChange={setTypeFilter}
            />
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

      {/* Query Detail Panel */}
      {showQueryDetails && selectedQuery && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="text-lg font-medium text-gray-900 mr-3">
                  Query Details: {selectedQuery.id}
                </h3>
                <StatusBadge
                  status={getStatusColor(selectedQuery.status)}
                  text={selectedQuery.status}
                />
              </div>
              <button
                onClick={closeDetailView}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-73px)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Customer Information */}
                <div className="bg-indigo-50 p-4 rounded-md">
                  <h4 className="text-indigo-800 font-medium mb-3 flex items-center">
                    <Users size={16} className="mr-2" /> Customer Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-indigo-700">Name:</span>
                      <span className="text-sm font-medium">
                        {selectedQuery.customer.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-indigo-700">ID:</span>
                      <span className="text-sm font-medium">
                        {selectedQuery.customer.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-indigo-700">Segment:</span>
                      <span className="text-sm font-medium">
                        {selectedQuery.customer.segment}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-indigo-700">
                        Assigned To:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedQuery.agent}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Query Details */}
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="text-blue-800 font-medium mb-3 flex items-center">
                    {selectedQuery.type === "Video" ? (
                      <Video size={16} className="mr-2" />
                    ) : (
                      <Mic size={16} className="mr-2" />
                    )}
                    Query Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Type:</span>
                      <span className="text-sm font-medium">
                        {selectedQuery.type}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Topic:</span>
                      <span className="text-sm font-medium">
                        {selectedQuery.topic}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Duration:</span>
                      <span className="text-sm font-medium">
                        {selectedQuery.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Timestamp:</span>
                      <span className="text-sm font-medium">
                        {formatDate(selectedQuery.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sentiment Analysis */}
                <div className="bg-green-50 p-4 rounded-md">
                  <h4 className="text-green-800 font-medium mb-3 flex items-center">
                    <BarChart2 size={16} className="mr-2" /> Sentiment Analysis
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-green-700">
                          Overall Score:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedQuery.sentiment.score}/100
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            selectedQuery.sentiment.score >= 80
                              ? "bg-green-500"
                              : selectedQuery.sentiment.score >= 60
                              ? "bg-blue-500"
                              : selectedQuery.sentiment.score >= 40
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${selectedQuery.sentiment.score}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-green-700">
                          Initial Frustration:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedQuery.sentiment.initialFrustration}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500"
                          style={{
                            width: `${selectedQuery.sentiment.initialFrustration}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-green-700">
                          Final Satisfaction:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedQuery.sentiment.finalSatisfaction}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{
                            width: `${selectedQuery.sentiment.finalSatisfaction}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-green-700">
                        Sentiment Trend:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedQuery.sentiment.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recording Player */}
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-gray-800 font-medium flex items-center">
                    {selectedQuery.type === "Video" ? (
                      <Video size={16} className="mr-2" />
                    ) : (
                      <Mic size={16} className="mr-2" />
                    )}
                    {selectedQuery.type} Recording
                  </h4>
                  <div>
                    <button className="ml-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200">
                      Download
                    </button>
                  </div>
                </div>

                <div className="bg-black rounded-md aspect-video flex items-center justify-center mb-3">
                  {selectedQuery.type === "Video" ? (
                    <div className="text-white text-center">
                      <Play size={48} className="mx-auto mb-2 opacity-60" />
                      <p className="text-sm opacity-80">
                        Click to play video recording
                      </p>
                    </div>
                  ) : (
                    <div className="text-white text-center">
                      <div className="w-full max-w-md px-8">
                        <div className="w-full h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                          <div className="waveform-visualization">
                            <div className="flex items-end space-x-1">
                              {[...Array(40)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1 bg-indigo-400 opacity-75 rounded-sm"
                                  style={{
                                    height: `${Math.sin(i * 0.3) * 20 + 30}%`,
                                    animationDelay: `${i * 0.05}s`,
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs mt-2 text-gray-400">
                          <span>00:00</span>
                          <span>{selectedQuery.duration}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center justify-center">
                    <Play size={16} className="mr-1" /> Play Recording
                  </button>
                  <button className="py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center justify-center">
                    <MessageSquare size={16} className="mr-1" /> View Transcript
                  </button>
                </div>
              </div>

              {/* Notes & Actions */}
              <div className="bg-amber-50 p-4 rounded-md mb-6">
                <h4 className="text-amber-800 font-medium mb-3">Agent Notes</h4>
                <p className="text-amber-900 mb-4">{selectedQuery.notes}</p>

                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                  <button className="flex-1 py-2 bg-white border border-amber-500 text-amber-700 rounded hover:bg-amber-50 flex items-center justify-center">
                    Edit Notes
                  </button>
                  <button className="flex-1 py-2 bg-white border border-green-500 text-green-700 rounded hover:bg-green-50 flex items-center justify-center">
                    Mark as Resolved
                  </button>
                  <button className="flex-1 py-2 bg-white border border-red-500 text-red-700 rounded hover:bg-red-50 flex items-center justify-center">
                    Escalate Query
                  </button>
                </div>
              </div>

              {/* Chat Section */}
              <div className="bg-white p-4 rounded-md mb-6 border border-gray-200">
                <h4 className="text-gray-800 font-medium mb-3 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Live Chat
                </h4>

                <div className="h-[300px] overflow-y-auto mb-4 p-4 bg-gray-50 rounded-md">
                  {(chatMessages[selectedQuery.id] || []).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex mb-3 ${
                        msg.sender === "agent" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          msg.sender === "agent"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <span className="text-xs opacity-75 mt-1 block">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage(selectedQuery.id);
                      }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => handleSendMessage(selectedQuery.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Archive
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center">
                  View Full Analysis
                  <ArrowUpRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
