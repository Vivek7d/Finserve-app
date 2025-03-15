"use client";

import { useState } from "react";
import {
  BarChart2,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Users,
  ShieldAlert,
  Building,
  Clock,
  ThumbsUp,
  AlertOctagon,
  TrendingUp,
  Award,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Analytics() {
  // Sample data for Customer Engagement
  const customerInteractionData = [
    { month: "Jan", inPerson: 1200, mobile: 1800, web: 1400 },
    { month: "Feb", inPerson: 1100, mobile: 1900, web: 1500 },
    { month: "Mar", inPerson: 1000, mobile: 2100, web: 1600 },
    { month: "Apr", inPerson: 900, mobile: 2300, web: 1800 },
    { month: "May", inPerson: 800, mobile: 2500, web: 2000 },
    { month: "Jun", inPerson: 750, mobile: 2800, web: 2200 },
  ];

  const serviceRequestData = [
    { name: "Account Services", value: 35 },
    { name: "Loans", value: 25 },
    { name: "Investments", value: 20 },
    { name: "Card Services", value: 15 },
    { name: "Insurance", value: 5 },
  ];

  const satisfactionScores = [
    { month: "Jan", score: 4.2 },
    { month: "Feb", score: 4.3 },
    { month: "Mar", score: 4.4 },
    { month: "Apr", score: 4.5 },
    { month: "May", score: 4.6 },
    { month: "Jun", score: 4.7 },
  ];

  // Sample data for Risk & Compliance
  const complianceScoreData = [
    { month: "Jan", score: 92 },
    { month: "Feb", score: 94 },
    { month: "Mar", score: 91 },
    { month: "Apr", score: 95 },
    { month: "May", score: 97 },
    { month: "Jun", score: 96 },
  ];

  const fraudDetectionData = [
    { month: "Jan", detected: 48, prevented: 45 },
    { month: "Feb", detected: 52, prevented: 49 },
    { month: "Mar", detected: 58, prevented: 55 },
    { month: "Apr", detected: 45, prevented: 43 },
    { month: "May", detected: 42, prevented: 40 },
    { month: "Jun", detected: 38, prevented: 37 },
  ];

  const riskCategoriesData = [
    { subject: "Identity Theft", A: 85, fullMark: 100 },
    { subject: "Unauthorized Access", A: 90, fullMark: 100 },
    { subject: "Transaction Fraud", A: 70, fullMark: 100 },
    { subject: "AML Compliance", A: 95, fullMark: 100 },
    { subject: "Cyber Security", A: 80, fullMark: 100 },
    { subject: "Account Takeover", A: 78, fullMark: 100 },
  ];

  // Sample data for Branch Performance
  const branchResponseData = [
    { name: "Mumbai Main", value: 4.2 },
    { name: "Delhi Central", value: 3.8 },
    { name: "Bangalore Tech", value: 3.3 },
    { name: "Chennai Plaza", value: 4.1 },
    { name: "Kolkata Central", value: 3.6 },
  ];

  const resolutionEfficiencyData = [
    {
      month: "Jan",
      Mumbai: 88,
      Delhi: 82,
      Bangalore: 92,
      Chennai: 86,
      Kolkata: 80,
    },
    {
      month: "Feb",
      Mumbai: 90,
      Delhi: 84,
      Bangalore: 91,
      Chennai: 88,
      Kolkata: 83,
    },
    {
      month: "Mar",
      Mumbai: 92,
      Delhi: 86,
      Bangalore: 93,
      Chennai: 90,
      Kolkata: 85,
    },
    {
      month: "Apr",
      Mumbai: 91,
      Delhi: 88,
      Bangalore: 94,
      Chennai: 91,
      Kolkata: 87,
    },
    {
      month: "May",
      Mumbai: 93,
      Delhi: 90,
      Bangalore: 95,
      Chennai: 92,
      Kolkata: 89,
    },
    {
      month: "Jun",
      Mumbai: 95,
      Delhi: 91,
      Bangalore: 96,
      Chennai: 94,
      Kolkata: 91,
    },
  ];

  const customerFeedbackData = [
    { name: "Mumbai Main", excellent: 45, good: 30, average: 20, poor: 5 },
    { name: "Delhi Central", excellent: 40, good: 35, average: 15, poor: 10 },
    { name: "Bangalore Tech", excellent: 55, good: 25, average: 15, poor: 5 },
    { name: "Chennai Plaza", excellent: 50, good: 30, average: 15, poor: 5 },
    { name: "Kolkata Central", excellent: 35, good: 40, average: 20, poor: 5 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Analytics & Insights
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export Reports</Button>
          <Button>
            <TrendingUp className="mr-2 h-4 w-4" />
            Generate Insights
          </Button>
        </div>
      </div>

      <Tabs defaultValue="customer-engagement" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customer-engagement">
            <Users className="mr-2 h-4 w-4" />
            Customer Engagement
          </TabsTrigger>
          <TabsTrigger value="risk-compliance">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Risk & Compliance
          </TabsTrigger>
          <TabsTrigger value="branch-performance">
            <Building className="mr-2 h-4 w-4" />
            Branch Performance
          </TabsTrigger>
        </TabsList>

        {/* Customer Engagement Tab */}
        <TabsContent value="customer-engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">248,942</div>
                  <Badge className="bg-green-100 text-green-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    12%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Compared to last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">182,635</div>
                  <Badge className="bg-green-100 text-green-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    8%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  73% of total customers
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">4.7/5.0</div>
                  <Badge className="bg-green-100 text-green-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    0.2
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Up from 4.5 last quarter
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Customer Interaction Channels</CardTitle>
                <CardDescription>
                  Monthly trends across different service channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={customerInteractionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inPerson" name="In-Person" fill="#8884d8" />
                    <Bar dataKey="mobile" name="Mobile App" fill="#82ca9d" />
                    <Bar dataKey="web" name="Web Banking" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Requested Services</CardTitle>
                <CardDescription>
                  Distribution of service requests by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={serviceRequestData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {serviceRequestData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            [
                              "#8884d8",
                              "#82ca9d",
                              "#ffc658",
                              "#ff8042",
                              "#a4de6c",
                            ][index % 5]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction Score</CardTitle>
                <CardDescription>
                  Monthly average satisfaction ratings (out of 5)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={satisfactionScores}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[3.5, 5]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Digital Adoption
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground pt-1">
                  12% increase from last year
                </p>
                <div className="mt-4">
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Customer Retention
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground pt-1">
                  3% increase from last year
                </p>
                <div className="mt-4">
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Feature Utilization
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground pt-1">
                  8% increase from last year
                </p>
                <div className="mt-4">
                  <Progress value={68} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Service Resolution
                </CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground pt-1">
                  5% increase from last year
                </p>
                <div className="mt-4">
                  <Progress value={94} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Risk & Compliance Tab */}
        <TabsContent value="risk-compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Compliance Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">96%</div>
                  <Badge className="bg-green-100 text-green-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    3%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Above industry average (92%)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Fraud Prevention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">97.3%</div>
                  <Badge className="bg-green-100 text-green-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    1.2%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Fraud detection success rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">Low</div>
                  <Badge className="bg-green-100 text-green-800">
                    Improved
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  From "Moderate" last quarter
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Compliance Trends</CardTitle>
                <CardDescription>
                  Monthly compliance score across all regulations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={complianceScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#82ca9d"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fraud Detection & Prevention</CardTitle>
                <CardDescription>
                  Monthly fraudulent activities detected and prevented
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={fraudDetectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="detected" name="Detected" fill="#ff8042" />
                    <Bar dataKey="prevented" name="Prevented" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Risk Assessment Metrics</CardTitle>
                <CardDescription>
                  Performance across different risk categories (higher is
                  better)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart outerRadius={150} data={riskCategoriesData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Risk Score"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  KYC Compliance
                </CardTitle>
                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.2%</div>
                <p className="text-xs text-muted-foreground pt-1">
                  1.5% increase from last year
                </p>
                <div className="mt-4">
                  <Progress value={99.2} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Data Security
                </CardTitle>
                <AlertOctagon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.7%</div>
                <p className="text-xs text-muted-foreground pt-1">
                  2.3% increase from last year
                </p>
                <div className="mt-4">
                  <Progress value={98.7} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Audit Compliance
                </CardTitle>
                <PieChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">97.5%</div>
                <p className="text-xs text-muted-foreground pt-1">
                  3.1% increase from last year
                </p>
                <div className="mt-4">
                  <Progress value={97.5} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Branch Performance Tab */}
        <TabsContent value="branch-performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">3.7 min</div>
                  <Badge className="bg-green-100 text-green-800">
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                    12%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Down from 4.2 min last quarter
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Resolution Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">93.4%</div>
                  <Badge className="bg-green-100 text-green-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    3.8%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  First-contact resolution rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Customer Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">4.5/5.0</div>
                  <Badge className="bg-green-100 text-green-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    0.3
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Up from 4.2 last quarter
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Average Response Time by Branch</CardTitle>
                <CardDescription>
                  Average response time in minutes by branch location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    layout="vertical"
                    data={branchResponseData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 5]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip
                      formatter={(value) => [`${value} min`, "Response Time"]}
                    />
                    <Bar dataKey="value" name="Response Time" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Efficiency Trends</CardTitle>
                <CardDescription>
                  First-contact resolution rate by branch (%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={resolutionEfficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[75, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Mumbai"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="Delhi" stroke="#82ca9d" />
                    <Line
                      type="monotone"
                      dataKey="Bangalore"
                      stroke="#ffc658"
                    />
                    <Line type="monotone" dataKey="Chennai" stroke="#ff8042" />
                    <Line type="monotone" dataKey="Kolkata" stroke="#a4de6c" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Customer Feedback Analysis by Branch</CardTitle>
                <CardDescription>
                  Distribution of customer feedback ratings for each branch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={customerFeedbackData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="excellent"
                      name="Excellent"
                      stackId="a"
                      fill="#82ca9d"
                    />
                    <Bar
                      dataKey="good"
                      name="Good"
                      stackId="a"
                      fill="#8884d8"
                    />
                    <Bar
                      dataKey="average"
                      name="Average"
                      stackId="a"
                      fill="#ffc658"
                    />
                    <Bar
                      dataKey="poor"
                      name="Poor"
                      stackId="a"
                      fill="#ff8042"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Mumbai Main
                </CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-muted-foreground pt-1">
                  Efficiency rating
                </p>
                <div className="mt-4">
                  <Progress value={95} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Delhi Central
                </CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">91%</div>
                <p className="text-xs text-muted-foreground pt-1">
                  Efficiency rating
                </p>
                <div className="mt-4">
                  <Progress value={91} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Bangalore Tech
                </CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96%</div>
                <p className="text-xs text-muted-foreground pt-1">
                  Efficiency rating
                </p>
                <div className="mt-4">
                  <Progress value={96} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Chennai Plaza
                </CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground pt-1">
                  Efficiency rating
                </p>
                <div className="mt-4">
                  <Progress value={94} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Kolkata Central
                </CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">91%</div>
                <p className="text-xs text-muted-foreground pt-1">
                  Efficiency rating
                </p>
                <div className="mt-4">
                  <Progress value={91} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
