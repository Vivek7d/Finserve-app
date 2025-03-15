"use client";

import React, { useState } from "react";
import {
  PageHeader,
  DataTable,
  SearchInput,
  FilterDropdown,
  StatusBadge,
  DataCard,
} from "../../../../components/ui/dashboard-components";
import {
  User,
  CreditCard,
  BarChart2,
  FileText,
  Phone,
  Mail,
  Home,
  Calendar,
  DollarSign,
  ArrowUp,
  ArrowDown,
  PieChart,
} from "lucide-react";

// Mock data for customer profiles
const customers = [
  {
    id: "10034593",
    name: "Aditya Sharma",
    email: "aditya.sharma@example.com",
    phone: "+91 98765 43210",
    address: "B-12, Vasant Kunj, New Delhi",
    dateJoined: "2019-03-15T10:30:00Z",
    lastActivity: "2023-09-14T14:20:00Z",
    accountType: "Savings",
    accountStatus: "Active",
    creditScore: 760,
    totalBalance: 345000,
    loanApplications: 2,
    activeProducts: ["Savings Account", "Credit Card", "Fixed Deposit"],
    recentTransactions: 23,
    customerSegment: "Premium",
    riskLevel: "Low",
  },
  {
    id: "10089234",
    name: "Meera Patel",
    email: "meera.patel@example.com",
    phone: "+91 87654 32109",
    address: "204, Rose Apartments, Bandra West, Mumbai",
    dateJoined: "2020-06-22T09:15:00Z",
    lastActivity: "2023-09-15T11:30:00Z",
    accountType: "Current",
    accountStatus: "Active",
    creditScore: 820,
    totalBalance: 1250000,
    loanApplications: 1,
    activeProducts: [
      "Current Account",
      "Credit Card",
      "Home Loan",
      "Investment Portfolio",
    ],
    recentTransactions: 42,
    customerSegment: "High Net Worth",
    riskLevel: "Low",
  },
  {
    id: "10045678",
    name: "Rajat Kapoor",
    email: "rajat.kapoor@example.com",
    phone: "+91 76543 21098",
    address: "45, Green Park, Kolkata",
    dateJoined: "2018-11-08T16:45:00Z",
    lastActivity: "2023-09-14T10:20:00Z",
    accountType: "Savings",
    accountStatus: "Active",
    creditScore: 680,
    totalBalance: 78000,
    loanApplications: 3,
    activeProducts: ["Savings Account", "Personal Loan"],
    recentTransactions: 12,
    customerSegment: "Regular",
    riskLevel: "Medium",
  },
  {
    id: "10067890",
    name: "Sanjana Desai",
    email: "sanjana.desai@example.com",
    phone: "+91 65432 10987",
    address: "78, Jubilee Hills, Hyderabad",
    dateJoined: "2021-08-19T08:30:00Z",
    lastActivity: "2023-09-15T08:30:00Z",
    accountType: "Savings",
    accountStatus: "Active",
    creditScore: 710,
    totalBalance: 230000,
    loanApplications: 1,
    activeProducts: ["Savings Account", "Credit Card", "Auto Loan"],
    recentTransactions: 18,
    customerSegment: "Mass Affluent",
    riskLevel: "Low",
  },
  {
    id: "10023456",
    name: "Vijay Reddy",
    email: "vijay.reddy@example.com",
    phone: "+91 54321 09876",
    address: "123, Koramangala, Bangalore",
    dateJoined: "2017-05-11T14:20:00Z",
    lastActivity: "2023-09-15T09:15:00Z",
    accountType: "Current",
    accountStatus: "Suspended",
    creditScore: 580,
    totalBalance: 45000,
    loanApplications: 4,
    activeProducts: ["Current Account"],
    recentTransactions: 5,
    customerSegment: "Regular",
    riskLevel: "High",
  },
];

export default function CustomerProfiles() {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Filter options
  const segmentOptions = [
    { value: "all", label: "All Segments" },
    { value: "Regular", label: "Regular" },
    { value: "Premium", label: "Premium" },
    { value: "Mass Affluent", label: "Mass Affluent" },
    { value: "High Net Worth", label: "High Net Worth" },
  ];

  const riskOptions = [
    { value: "all", label: "All Risk Levels" },
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  // Filter the data based on search query and filters
  const filteredData = customers.filter((customer) => {
    // Search query filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      customer.id.toLowerCase().includes(searchLower) ||
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.phone.toLowerCase().includes(searchLower);

    // Segment filter
    const matchesSegment =
      segmentFilter === "all" || customer.customerSegment === segmentFilter;

    // Risk filter
    const matchesRisk =
      riskFilter === "all" || customer.riskLevel === riskFilter;

    return matchesSearch && matchesSegment && matchesRisk;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // Get status color for risk level
  const getRiskColor = (risk) => {
    switch (risk) {
      case "Low":
        return "success";
      case "Medium":
        return "warning";
      case "High":
        return "error";
      default:
        return "default";
    }
  };

  // Table columns configuration
  const columns = [
    {
      header: "Customer ID",
      accessor: "id",
      width: "100px",
    },
    {
      header: "Name",
      accessor: "name",
      cell: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">
            <User size={14} />
          </div>
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      header: "Contact",
      accessor: "email",
      cell: (row) => (
        <div>
          <div className="flex items-center text-sm">
            <Mail size={14} className="text-gray-400 mr-1" />
            <span>{row.email}</span>
          </div>
          <div className="flex items-center text-sm mt-1">
            <Phone size={14} className="text-gray-400 mr-1" />
            <span>{row.phone}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Account",
      accessor: "accountType",
      cell: (row) => (
        <div>
          <div className="font-medium">{row.accountType}</div>
          <div className="text-xs text-gray-500">
            Status: {row.accountStatus}
          </div>
        </div>
      ),
    },
    {
      header: "Credit Score",
      accessor: "creditScore",
      width: "120px",
      cell: (row) => (
        <div className="flex items-center">
          <div
            className={`w-2 h-10 rounded-sm mr-2 ${
              row.creditScore >= 750
                ? "bg-green-500"
                : row.creditScore >= 650
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></div>
          <div>
            <div className="font-medium">{row.creditScore}</div>
            <div className="text-xs text-gray-500">
              {row.creditScore >= 750
                ? "Excellent"
                : row.creditScore >= 650
                ? "Good"
                : "Need Improvement"}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Segment",
      accessor: "customerSegment",
      width: "140px",
    },
    {
      header: "Risk Level",
      accessor: "riskLevel",
      width: "120px",
      cell: (row) => (
        <StatusBadge
          status={getRiskColor(row.riskLevel)}
          text={row.riskLevel}
        />
      ),
    },
    {
      header: "Balance",
      accessor: "totalBalance",
      width: "120px",
      cell: (row) => (
        <div className="font-medium">₹{row.totalBalance.toLocaleString()}</div>
      ),
    },
  ];

  // Handle row click to show detailed profile
  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div>
      <PageHeader
        title="Customer Profiles"
        description="Detailed customer information, including account history, credit score, and loan applications"
        actionLabel="Add New Customer"
        actionUrl="/admin/customer-service/profiles/new"
      />

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Search by ID, name, email, or phone..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className="flex space-x-4">
            <FilterDropdown
              label="Customer Segment"
              options={segmentOptions}
              value={segmentFilter}
              onChange={setSegmentFilter}
            />
            <FilterDropdown
              label="Risk Level"
              options={riskOptions}
              value={riskFilter}
              onChange={setRiskFilter}
            />
          </div>
        </div>
      </div>

      {/* Layout with table and details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <DataTable
            columns={columns}
            data={filteredData}
            onRowClick={handleRowClick}
          />
        </div>

        {/* Customer Detail Panel - shown when a customer is selected */}
        {selectedCustomer && (
          <>
            <div className="lg:col-span-3 mt-6">
              <h2 className="text-xl font-bold mb-4">
                Customer Profile: {selectedCustomer.name}
              </h2>
            </div>
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="text-gray-400 mr-2" size={16} />
                  <div>
                    <div className="text-sm text-gray-500">Full Name</div>
                    <div className="font-medium">{selectedCustomer.name}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="text-gray-400 mr-2" size={16} />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{selectedCustomer.email}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="text-gray-400 mr-2" size={16} />
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium">{selectedCustomer.phone}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Home className="text-gray-400 mr-2" size={16} />
                  <div>
                    <div className="text-sm text-gray-500">Address</div>
                    <div className="font-medium">
                      {selectedCustomer.address}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-gray-400 mr-2" size={16} />
                  <div>
                    <div className="text-sm text-gray-500">Date Joined</div>
                    <div className="font-medium">
                      {formatDate(selectedCustomer.dateJoined)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Account Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="text-sm text-gray-500">Account Type</div>
                  <div className="font-medium">
                    {selectedCustomer.accountType}
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="text-sm text-gray-500">Account Status</div>
                  <div className="font-medium">
                    {selectedCustomer.accountStatus}
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="text-sm text-gray-500">Total Balance</div>
                  <div className="font-medium">
                    ₹{selectedCustomer.totalBalance.toLocaleString()}
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="text-sm text-gray-500">
                    Recent Transactions
                  </div>
                  <div className="font-medium">
                    {selectedCustomer.recentTransactions}
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="text-sm text-gray-500">Customer Segment</div>
                  <div className="font-medium">
                    {selectedCustomer.customerSegment}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Risk Level</div>
                  <StatusBadge
                    status={getRiskColor(selectedCustomer.riskLevel)}
                    text={selectedCustomer.riskLevel}
                  />
                </div>
              </div>
            </div>

            {/* Financial Health */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Financial Health</h3>

              {/* Credit Score Indicator */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-500">Credit Score</div>
                  <div className="font-medium">
                    {selectedCustomer.creditScore}
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      selectedCustomer.creditScore >= 750
                        ? "bg-green-500"
                        : selectedCustomer.creditScore >= 650
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${(selectedCustomer.creditScore / 900) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>300</span>
                  <span>500</span>
                  <span>700</span>
                  <span>900</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="text-sm text-gray-500">Loan Applications</div>
                  <div className="font-medium">
                    {selectedCustomer.loanApplications}
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="text-sm text-gray-500">Active Products</div>
                  <div className="font-medium">
                    {selectedCustomer.activeProducts.length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">Products</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.activeProducts.map((product, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
