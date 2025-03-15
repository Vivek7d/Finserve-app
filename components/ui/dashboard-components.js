import React from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

// Page header with title, description and optional action button
export function PageHeader({ title, description, actionLabel, actionUrl }) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>
      {actionLabel && actionUrl && (
        <Link href={actionUrl}>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
            {actionLabel}
            <ExternalLink size={16} className="ml-2" />
          </button>
        </Link>
      )}
    </div>
  );
}

// Data card for showing statistics
export function DataCard({
  title,
  value,
  description,
  icon,
  trend,
  trendDirection = "up",
  isPercentage = false,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">
            {isPercentage ? `${value}%` : value}
          </h3>
          {description && (
            <p className="text-xs text-gray-600 mt-1">{description}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs ${
                  trendDirection === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

// Table component for data lists
export function DataTable({ columns, data, onRowClick, isLoading }) {
  if (isLoading) {
    return <div className="text-center py-8">Loading data...</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No data available</div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={column.width ? { width: column.width } : {}}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={onRowClick ? "hover:bg-gray-50 cursor-pointer" : ""}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {column.cell ? column.cell(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Card with tabs
export function TabCard({ title, tabs, activeTab, setActiveTab, children }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === tab.id
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// Status Badge
export function StatusBadge({ status, text }) {
  const getStatusStyles = () => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "info":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles()}`}
    >
      {text}
    </span>
  );
}

// Search Input
export function SearchInput({ placeholder, value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <svg
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

// Filter Dropdown
export function FilterDropdown({ label, options, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Empty State
export function EmptyState({
  title,
  description,
  actionLabel,
  actionUrl,
  icon,
}) {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {actionLabel && actionUrl && (
        <div className="mt-6">
          <Link href={actionUrl}>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {actionLabel}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
