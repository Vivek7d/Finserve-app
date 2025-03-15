"use client";

import React, { useState } from "react";
import {
  BarChart3,
  LineChart,
  Users,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Clock,
  Lightbulb,
  Filter,
  ChevronDown,
  Download,
  Search,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";

// Reusable Components
function PageHeader({ title, description, actionLabel, actionUrl }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
      {actionLabel && (
        <a
          href={actionUrl}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          {actionLabel}
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </a>
      )}
    </div>
  );
}

function DataCard({
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

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Dropdown({ label, options, value, onChange }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 border rounded-md p-2 cursor-pointer bg-white">
        <span className="text-sm">{label}</span>
        <ChevronDown className="h-4 w-4" />
      </div>
      {/* Dropdown content would go here */}
    </div>
  );
}

function TopIssue({ rank, issue, sentiment, trend, count }) {
  return (
    <div className="flex items-center py-3 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium text-gray-700">
        {rank}
      </div>
      <div className="ml-4 flex-1">
        <h4 className="font-medium">{issue}</h4>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-gray-500">Mentions: {count}</span>
          <span
            className={`text-xs flex items-center ${
              sentiment === "positive"
                ? "text-green-600"
                : sentiment === "negative"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {sentiment === "positive" ? (
              <ThumbsUp className="h-3 w-3 mr-1" />
            ) : sentiment === "negative" ? (
              <ThumbsDown className="h-3 w-3 mr-1" />
            ) : (
              <AlertTriangle className="h-3 w-3 mr-1" />
            )}
            {sentiment}
          </span>
          <span
            className={`text-xs ${
              trend > 0
                ? "text-green-600"
                : trend < 0
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {trend > 0 ? `+${trend}%` : trend < 0 ? `${trend}%` : "No change"}
          </span>
        </div>
      </div>
    </div>
  );
}

function StaffPerformanceRow({
  agent,
  rating,
  responseTime,
  issueResolved,
  satisfaction,
}) {
  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="py-3 px-4">
        <div className="font-medium">{agent}</div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`h-4 w-4 ${
                star <= rating ? "text-yellow-400" : "text-gray-200"
              }`}
            >
              ★
            </div>
          ))}
          <span className="ml-2 text-sm text-gray-600">{rating}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="text-sm">{responseTime}</div>
      </td>
      <td className="py-3 px-4">
        <div className="text-sm">{issueResolved}%</div>
      </td>
      <td className="py-3 px-4">
        <div
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
            satisfaction >= 90
              ? "bg-green-100 text-green-800"
              : satisfaction >= 75
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {satisfaction}%
        </div>
      </td>
    </tr>
  );
}

function OptimizationSuggestion({
  title,
  description,
  impact,
  difficulty,
  category,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
      <div className="flex items-start">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex justify-between">
            <h4 className="font-medium text-gray-900">{title}</h4>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                category === "High Priority"
                  ? "bg-red-100 text-red-800"
                  : category === "Medium Priority"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {category}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-2">Impact:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <div
                    key={dot}
                    className={`h-2 w-2 rounded-full mx-0.5 ${
                      dot <= impact ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-2">Difficulty:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <div
                    key={dot}
                    className={`h-2 w-2 rounded-full mx-0.5 ${
                      dot <= difficulty ? "bg-orange-400" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeedbackInsights() {
  // Mock data for dashboard
  const feedbackStats = {
    totalFeedback: 1248,
    positiveRate: 76,
    negativeRate: 14,
    neutralRate: 10,
    averageRating: 4.2,
    responseRate: 94,
  };

  // Mock data for top issues
  const topIssues = [
    {
      rank: 1,
      issue: "Wait times for customer service",
      sentiment: "negative",
      trend: -8,
      count: 187,
    },
    {
      rank: 2,
      issue: "Loan application process complexity",
      sentiment: "negative",
      trend: 5,
      count: 143,
    },
    {
      rank: 3,
      issue: "Mobile app interface usability",
      sentiment: "mixed",
      trend: -12,
      count: 136,
    },
    {
      rank: 4,
      issue: "Helpful financial advisors",
      sentiment: "positive",
      trend: 20,
      count: 124,
    },
    {
      rank: 5,
      issue: "Account statement clarity",
      sentiment: "negative",
      trend: 3,
      count: 98,
    },
  ];

  // Mock data for staff performance
  const staffPerformance = [
    {
      agent: "Priya Sharma",
      rating: 4.9,
      responseTime: "1m 47s",
      issueResolved: 97,
      satisfaction: 98,
    },
    {
      agent: "Rahul Verma",
      rating: 4.7,
      responseTime: "2m 12s",
      issueResolved: 94,
      satisfaction: 93,
    },
    {
      agent: "Ananya Desai",
      rating: 4.5,
      responseTime: "2m 38s",
      issueResolved: 92,
      satisfaction: 89,
    },
    {
      agent: "Vikram Singh",
      rating: 4.2,
      responseTime: "3m 05s",
      issueResolved: 89,
      satisfaction: 84,
    },
    {
      agent: "Neha Patel",
      rating: 3.8,
      responseTime: "3m 45s",
      issueResolved: 76,
      satisfaction: 72,
    },
  ];

  // Mock data for optimization suggestions
  const optimizationSuggestions = [
    {
      title: "Implement chatbot first response for common queries",
      description:
        "Analysis shows 40% of initial customer queries are about account balance, transaction history, and password resets. Implementing an AI chatbot could reduce wait times by 60%.",
      impact: 5,
      difficulty: 3,
      category: "High Priority",
    },
    {
      title: "Simplify loan application process",
      description:
        "Feedback analysis indicates customers find the loan application too complex. Reducing required fields from 24 to 15 could increase completion rates by 35%.",
      impact: 4,
      difficulty: 2,
      category: "Medium Priority",
    },
    {
      title: "Enhance mobile app dashboard with personalized insights",
      description:
        "Customer sentiment analysis shows high engagement with personalized financial insights. Adding AI-driven spending patterns could improve app satisfaction scores by 28%.",
      impact: 4,
      difficulty: 4,
      category: "Medium Priority",
    },
    {
      title: "Implement voice biometrics for faster authentication",
      description:
        "Customers express frustration with authentication time. Voice biometrics could reduce verification time by 73% while maintaining security standards.",
      impact: 5,
      difficulty: 5,
      category: "Low Priority",
    },
  ];

  return (
    <div className="p-6">
      <PageHeader
        title="Feedback & AI Insights"
        description="AI-powered customer feedback analysis and service optimization"
        actionLabel="Download Report"
        actionUrl="#"
      />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <DataCard
          title="Total Feedback"
          value={feedbackStats.totalFeedback}
          icon={<MessageSquare className="h-6 w-6 text-blue-600" />}
        />
        <DataCard
          title="Positive Sentiment"
          value={feedbackStats.positiveRate}
          isPercentage={true}
          icon={<ThumbsUp className="h-6 w-6 text-green-600" />}
        />
        <DataCard
          title="Negative Sentiment"
          value={feedbackStats.negativeRate}
          isPercentage={true}
          icon={<ThumbsDown className="h-6 w-6 text-red-600" />}
        />
        <DataCard
          title="Neutral Sentiment"
          value={feedbackStats.neutralRate}
          isPercentage={true}
          icon={<BarChart3 className="h-6 w-6 text-yellow-600" />}
        />
        <DataCard
          title="Average Rating"
          value={feedbackStats.averageRating}
          icon={<LineChart className="h-6 w-6 text-purple-600" />}
        />
        <DataCard
          title="Response Rate"
          value={feedbackStats.responseRate}
          isPercentage={true}
          icon={<CheckCircle className="h-6 w-6 text-indigo-600" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI-Powered Feedback Analysis Section */}
        <div className="lg:col-span-2">
          <SectionCard title="AI-Powered Feedback Analysis">
            <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
              <h3 className="text-lg font-medium text-gray-900">
                Common Issues & Areas for Improvement
              </h3>
              <div className="flex items-center gap-2">
                <Dropdown
                  label="Time Period: Last 30 days"
                  options={["Last 7 days", "Last 30 days", "Last 90 days"]}
                />
                <Dropdown
                  label="Sentiment: All"
                  options={["All", "Positive", "Negative", "Neutral"]}
                />
                <button className="p-2 border rounded-md bg-white">
                  <Filter className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {topIssues.map((issue) => (
                <TopIssue key={issue.rank} {...issue} />
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Sentiment Trend Analysis
              </h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">
                  Sentiment trend chart visualization would appear here
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Automated Service Optimization Section */}
        <div>
          <SectionCard title="Automated Service Optimization Suggestions">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                AI-Driven Recommendations
              </h3>
              <Dropdown
                label="Sort By: Impact"
                options={["Impact", "Difficulty", "Priority"]}
              />
            </div>

            <div>
              {optimizationSuggestions.map((suggestion, index) => (
                <OptimizationSuggestion key={index} {...suggestion} />
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Staff Performance Tracking Section */}
      <SectionCard title="Staff Performance Tracking">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <h3 className="text-lg font-medium text-gray-900">
            Agent Performance Metrics
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                className="pl-10 pr-4 py-2 border rounded-md text-sm"
              />
            </div>
            <Dropdown
              label="Department: All"
              options={[
                "All",
                "Customer Service",
                "Technical Support",
                "Accounts",
              ]}
            />
            <Dropdown
              label="Sort By: Rating"
              options={["Rating", "Response Time", "Resolution Rate"]}
            />
            <button className="flex items-center gap-1 px-3 py-2 bg-black text-white rounded-md text-sm">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3">Agent</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Avg. Response Time</th>
                <th className="px-4 py-3">Issues Resolved</th>
                <th className="px-4 py-3">Customer Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {staffPerformance.map((staff, index) => (
                <StaffPerformanceRow key={index} {...staff} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Performance Trends
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">
              Performance trend chart visualization would appear here
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
