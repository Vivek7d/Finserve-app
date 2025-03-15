"use client";

import React, { useState } from "react";
import {
  PageHeader,
  DataTable,
  StatusBadge,
  SearchInput,
  FilterDropdown,
  TabCard,
} from "../../../../components/ui/dashboard-components";
import {
  User,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  BrainCircuit,
  ArrowRight,
  Sparkles,
  AlertCircle,
  BarChart2,
} from "lucide-react";

// Mock data for AI-generated service tickets
const serviceTickets = [
  {
    id: "AT-1001",
    customer: {
      name: "Aditya Sharma",
      id: "10034593",
      segment: "Premium",
      history: "4+ years with bank",
      creditScore: 760,
      riskLevel: "Low",
    },
    issue: {
      title: "Netbanking Access Issue",
      description:
        "Customer unable to log in to netbanking portal after recent password reset.",
      category: "Authentication",
      urgency: "Medium",
      reportedVia: "Mobile App",
      timestamp: "2023-09-15T10:30:00Z",
    },
    aiAnalysis: {
      summary:
        "Customer is a premium segment client with excellent standing. Issue appears to be related to the recent system maintenance that affected password resets.",
      rootCause:
        "System did not properly process the password reset request due to backend synchronization delay.",
      potentialImpact:
        "Customer unable to access account information and make transactions through netbanking.",
      recommendations: [
        "Reset customer password through backend system",
        "Verify mobile number for OTP delivery",
        "Guide customer through first-time login process",
      ],
      customerSentiment: "Frustrated but patient",
      similarIssuesCount: 8,
    },
    status: "Pending",
    assignedTo: "AI Routing",
    priority: "Medium",
  },
  {
    id: "AT-1002",
    customer: {
      name: "Meera Patel",
      id: "10089234",
      segment: "High Net Worth",
      history: "3+ years with bank",
      creditScore: 820,
      riskLevel: "Low",
    },
    issue: {
      title: "Disputed Credit Card Transaction",
      description:
        "Customer reports an unauthorized transaction of ₹45,000 on their premium credit card for an online purchase they did not make.",
      category: "Payment",
      urgency: "High",
      reportedVia: "Phone Call",
      timestamp: "2023-09-14T09:15:00Z",
    },
    aiAnalysis: {
      summary:
        "High value customer with perfect payment history. Transaction appears to be fraudulent based on deviation from regular spending patterns and geolocation mismatch.",
      rootCause:
        "Likely credit card information compromise through a third-party vendor.",
      potentialImpact:
        "Financial loss and trust erosion for a high-value customer if not resolved quickly.",
      recommendations: [
        "Immediately block the current card",
        "Issue a new credit card with priority delivery",
        "Credit the disputed amount while investigation is pending",
        "Reassure customer about zero liability policy",
      ],
      customerSentiment: "Anxious and concerned",
      similarIssuesCount: 3,
    },
    status: "In Progress",
    assignedTo: "Rahul M.",
    priority: "High",
  },
  {
    id: "AT-1003",
    customer: {
      name: "Rajat Kapoor",
      id: "10045678",
      segment: "Regular",
      history: "5+ years with bank",
      creditScore: 680,
      riskLevel: "Medium",
    },
    issue: {
      title: "KYC Document Update Problem",
      description:
        "Customer has submitted updated address proof and PAN card but they are not reflecting in the system.",
      category: "Documentation",
      urgency: "Low",
      reportedVia: "Branch Visit",
      timestamp: "2023-09-13T16:45:00Z",
    },
    aiAnalysis: {
      summary:
        "Long-term customer with moderate credit history. Documents were properly submitted but failed automated verification likely due to quality issues.",
      rootCause:
        "OCR system failed to properly read the submitted documents due to low scan quality.",
      potentialImpact:
        "Potential account restrictions if KYC update deadline passes.",
      recommendations: [
        "Manually verify and approve the submitted documents",
        "Update the customer profile with new information",
        "Advise customer to provide clearer copies for future updates",
      ],
      customerSentiment: "Slightly annoyed but understanding",
      similarIssuesCount: 12,
    },
    status: "Completed",
    assignedTo: "Neha S.",
    priority: "Low",
  },
  {
    id: "AT-1004",
    customer: {
      name: "Sanjana Desai",
      id: "10067890",
      segment: "Mass Affluent",
      history: "2+ years with bank",
      creditScore: 710,
      riskLevel: "Low",
    },
    issue: {
      title: "Loan Application Error",
      description:
        "Customer is unable to complete personal loan application process due to an error message on income verification step.",
      category: "Loan",
      urgency: "High",
      reportedVia: "Web Portal",
      timestamp: "2023-09-15T08:30:00Z",
    },
    aiAnalysis: {
      summary:
        "Growing relationship customer with good credit history. Income verification API is encountering errors when trying to verify the digital salary slips provided.",
      rootCause:
        "Third-party income verification service experiencing downtime.",
      potentialImpact:
        "Customer may abandon loan application and consider competitor offers.",
      recommendations: [
        "Switch to manual verification of income documents",
        "Expedite the application process with priority handling",
        "Offer special interest rate as goodwill gesture",
        "Follow up with customer proactively about application status",
      ],
      customerSentiment: "Frustrated and impatient",
      similarIssuesCount: 6,
    },
    status: "Pending",
    assignedTo: "Unassigned",
    priority: "High",
  },
  {
    id: "AT-1005",
    customer: {
      name: "Vijay Reddy",
      id: "10023456",
      segment: "Regular",
      history: "6+ years with bank",
      creditScore: 580,
      riskLevel: "High",
    },
    issue: {
      title: "Account Statement Access Issues",
      description:
        "Customer cannot download account statements from both web and mobile platforms.",
      category: "Statement",
      urgency: "Medium",
      reportedVia: "Phone Call",
      timestamp: "2023-09-14T14:20:00Z",
    },
    aiAnalysis: {
      summary:
        "Long-term customer with deteriorating credit history and recent payment issues. Statement download issue appears to be system-wide affecting multiple customers.",
      rootCause:
        "Recent update to the document generation service has a bug affecting statement downloads.",
      potentialImpact:
        "Customer needs statements for tax filing purposes; time-sensitive issue.",
      recommendations: [
        "Provide statements directly via secure email",
        "Escalate bug to IT development team",
        "Offer to mail physical copies of statements if required",
        "Note that this customer has other account issues that may need attention",
      ],
      customerSentiment: "Agitated and demanding",
      similarIssuesCount: 24,
    },
    status: "In Progress",
    assignedTo: "Amit K.",
    priority: "Medium",
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

export default function AIServiceTickets() {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");

  // Filter options
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "in progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "escalated", label: "Escalated" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "authentication", label: "Authentication" },
    { value: "payment", label: "Payment" },
    { value: "documentation", label: "Documentation" },
    { value: "loan", label: "Loan" },
    { value: "statement", label: "Statement" },
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
  const filteredData = serviceTickets.filter((ticket) => {
    // Search query filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchLower) ||
      ticket.customer.name.toLowerCase().includes(searchLower) ||
      ticket.issue.title.toLowerCase().includes(searchLower) ||
      ticket.issue.description.toLowerCase().includes(searchLower);

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      ticket.status.toLowerCase() === statusFilter.toLowerCase();

    // Category filter
    const matchesCategory =
      categoryFilter === "all" ||
      ticket.issue.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Table columns configuration
  const columns = [
    {
      header: "Ticket ID",
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
      header: "Issue",
      accessor: "issue.title",
      cell: (row) => (
        <div>
          <div className="font-medium">{row.issue.title}</div>
          <div className="text-xs text-gray-500">
            Category: {row.issue.category}
          </div>
        </div>
      ),
    },
    {
      header: "AI Analysis",
      accessor: "aiAnalysis",
      cell: (row) => (
        <div className="flex items-center text-sm">
          <BrainCircuit className="text-purple-500 mr-2" size={18} />
          <div className="line-clamp-2 text-gray-600">
            {row.aiAnalysis.summary.substring(0, 60)}...
          </div>
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
      header: "Reported",
      accessor: "issue.timestamp",
      width: "180px",
      cell: (row) => (
        <div className="flex items-center">
          <Calendar size={14} className="text-gray-400 mr-1" />
          <span>{formatDate(row.issue.timestamp)}</span>
        </div>
      ),
    },
  ];

  // Handle row click
  const handleRowClick = (ticket) => {
    setSelectedTicket(ticket);
    setActiveTab("summary");
  };

  // Tabs for the ticket details
  const ticketDetailTabs = [
    { id: "summary", label: "AI Summary" },
    { id: "customer", label: "Customer Profile" },
    { id: "issue", label: "Issue Details" },
    { id: "recommendations", label: "Recommendations" },
  ];

  return (
    <div>
      <PageHeader
        title="AI-Generated Service Tickets"
        description="AI-analyzed customer issues with financial background, issue summary, and recommended solutions"
        actionLabel="Generate Report"
        actionUrl="/admin/customer-service/tickets/report"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
              <BrainCircuit size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">AI-Analyzed Today</p>
              <p className="text-xl font-bold">37</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Need Attention</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
              <BarChart2 size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">AI Accuracy</p>
              <p className="text-xl font-bold">92%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Resolved with AI</p>
              <p className="text-xl font-bold">68%</p>
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
          <div className="flex space-x-4">
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
            <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 flex items-center mt-auto text-sm">
              <Filter size={16} className="mr-1" />
              More Filters
            </button>
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

      {/* Ticket Detail Panel - shown when a ticket is selected */}
      {selectedTicket && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="text-lg font-medium text-gray-800 mr-2">
                  Ticket {selectedTicket.id}
                </h3>
                <StatusBadge
                  status={getStatusColor(selectedTicket.status)}
                  text={selectedTicket.status}
                />
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  Reported: {formatDate(selectedTicket.issue.timestamp)}
                </span>
                <span className="text-sm text-gray-500">
                  Via: {selectedTicket.issue.reportedVia}
                </span>
              </div>
            </div>
            <p className="text-gray-700 mt-1 font-medium">
              {selectedTicket.issue.title}
            </p>
          </div>

          <TabCard
            title="AI-Powered Analysis"
            tabs={ticketDetailTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            {activeTab === "summary" && (
              <div>
                <div className="flex items-center mb-4">
                  <BrainCircuit className="text-purple-500 mr-2" size={20} />
                  <h4 className="text-lg font-medium">AI Analysis Summary</h4>
                </div>
                <p className="text-gray-700 mb-4">
                  {selectedTicket.aiAnalysis.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      Root Cause Identification
                    </h5>
                    <p className="bg-blue-50 p-3 rounded-md text-blue-800">
                      {selectedTicket.aiAnalysis.rootCause}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      Potential Impact
                    </h5>
                    <p className="bg-amber-50 p-3 rounded-md text-amber-800">
                      {selectedTicket.aiAnalysis.potentialImpact}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Customer Sentiment Analysis
                  </h5>
                  <div className="flex items-center p-3 bg-gray-50 rounded-md">
                    <div className="w-2 h-10 rounded-sm mr-3 bg-amber-500"></div>
                    <p className="text-gray-800">
                      {selectedTicket.aiAnalysis.customerSentiment}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-sm font-medium text-gray-700">
                      Similar Issues Detected
                    </h5>
                    <span className="text-sm text-blue-600 cursor-pointer hover:underline">
                      View All
                    </span>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-md text-indigo-800">
                    <div className="font-medium">
                      {selectedTicket.aiAnalysis.similarIssuesCount} similar
                      customer issues detected in the last 7 days
                    </div>
                    <div className="text-sm mt-1">
                      Pattern suggests a potential systemic issue that may need
                      broader attention.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "customer" && (
              <div>
                <div className="flex items-center mb-6">
                  <User className="text-blue-500 mr-2" size={20} />
                  <h4 className="text-lg font-medium">
                    Customer Financial Profile
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-md">
                    <div className="text-sm text-gray-500 mb-1">
                      Customer Name
                    </div>
                    <div className="font-medium text-lg">
                      {selectedTicket.customer.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-3 mb-1">
                      Customer ID
                    </div>
                    <div className="font-medium">
                      {selectedTicket.customer.id}
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="text-sm text-gray-500 mb-1">Segment</div>
                    <div className="font-medium">
                      {selectedTicket.customer.segment}
                    </div>
                    <div className="text-sm text-gray-500 mt-3 mb-1">
                      Relationship
                    </div>
                    <div className="font-medium">
                      {selectedTicket.customer.history}
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="text-sm text-gray-500 mb-1">
                      Credit Score
                    </div>
                    <div className="font-medium">
                      {selectedTicket.customer.creditScore}
                    </div>
                    <div className="text-sm text-gray-500 mt-3 mb-1">
                      Risk Level
                    </div>
                    <div className="font-medium">
                      {selectedTicket.customer.riskLevel}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 border rounded-md">
                  <h5 className="font-medium mb-3">Customer Value Analysis</h5>
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-700">
                      High-value customer worth priority handling
                    </span>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-gray-700">
                      Cross-sell opportunity score: 78/100
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-gray-700">
                      Retention priority: Medium
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "issue" && (
              <div>
                <div className="flex items-center mb-6">
                  <FileText className="text-orange-500 mr-2" size={20} />
                  <h4 className="text-lg font-medium">Issue Details</h4>
                </div>

                <div className="p-4 bg-gray-50 rounded-md mb-6">
                  <h5 className="font-medium mb-2">Problem Description</h5>
                  <p className="text-gray-700">
                    {selectedTicket.issue.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 border rounded-md">
                    <div className="text-sm text-gray-500 mb-1">Category</div>
                    <div className="font-medium">
                      {selectedTicket.issue.category}
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="text-sm text-gray-500 mb-1">Urgency</div>
                    <div className="font-medium">
                      {selectedTicket.issue.urgency}
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="text-sm text-gray-500 mb-1">
                      Reported Via
                    </div>
                    <div className="font-medium">
                      {selectedTicket.issue.reportedVia}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-md">
                  <h5 className="font-medium mb-2">Technical Analysis</h5>
                  <div className="text-amber-800 mb-4">
                    <p className="mb-2">
                      The AI system has detected that this issue is:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Likely to be related to recent system updates</li>
                      <li>
                        Affecting approximately{" "}
                        {selectedTicket.aiAnalysis.similarIssuesCount} other
                        customers
                      </li>
                      <li>
                        Medium complexity issue requiring technical intervention
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center text-amber-700 text-sm">
                    <AlertTriangle size={16} className="mr-1" />
                    <span>
                      Technical team has been notified of the pattern.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "recommendations" && (
              <div>
                <div className="flex items-center mb-6">
                  <Sparkles className="text-green-500 mr-2" size={20} />
                  <h4 className="text-lg font-medium">
                    AI Recommended Solutions
                  </h4>
                </div>

                <div className="mb-6">
                  <div className="p-4 bg-green-50 rounded-md">
                    <h5 className="font-medium mb-3">Recommended Actions</h5>
                    <ul className="space-y-3">
                      {selectedTicket.aiAnalysis.recommendations.map(
                        (recommendation, index) => (
                          <li key={index} className="flex items-start">
                            <div className="min-w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm flex-1">
                              {recommendation}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 border rounded-md">
                    <h5 className="font-medium mb-3">
                      Estimated Resolution Time
                    </h5>
                    <div className="flex items-center">
                      <Clock size={18} className="text-blue-500 mr-2" />
                      <span className="text-gray-700">15-20 minutes</span>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h5 className="font-medium mb-3">
                      Service Level Agreement
                    </h5>
                    <div className="flex items-center">
                      <CheckCircle size={18} className="text-green-500 mr-2" />
                      <span className="text-gray-700">Within SLA bounds</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">
                    Edit Recommendations
                  </button>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                    Apply All Recommendations
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            )}
          </TabCard>
        </div>
      )}
    </div>
  );
}
