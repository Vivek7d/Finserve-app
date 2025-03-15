"use client"

import { useState } from "react"
import Link from "next/link"
import { User, CreditCard, DollarSign, AlertCircle, Calendar, FileText, TrendingUp, ShieldAlert, BarChart2, PieChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const quickActions = [
  { name: "Raise a Query", href: "/query", icon: AlertCircle, description: "Submit your queries and get quick responses." },
  { name: "Schedule an Appointment", href: "/appointments", icon: Calendar, description: "Book an appointment with our experts." },
  { name: "View Service Tickets", href: "/tickets", icon: FileText, description: "Check the status of your service tickets." },
]

export default function Dashboard() {
  const [user] = useState({
    name: "John Doe",
    creditScore: 750,
    accountNumber: "**** **** **** 1234",
    balance: 50000,
    priority: "VIP",
  })

  const smartSuggestions = [
    "Your credit score is improving, you’re eligible for a better loan!",
    "Consider consolidating your debts for better interest rates."
  ]

  const riskAlerts = [
    "Unusual transaction detected: ₹10,000 at Electronics Store.",
    "Payment due reminder: Credit Card bill due in 3 days."
  ]

  const spendingTrends = [
    "Your spending on dining is 20% higher than similar users.",
    "You saved 15% more this month compared to last month."
  ]

  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly Spending',
        data: [2000, 3500, 4500, 2500, 3600, 3900, 1500, 2700, 3000, 3900, 2500, 4100],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const doughnutData = {
    labels: ['Dining', 'Groceries', 'Utilities', 'Entertainment', 'Others'],
    datasets: [
      {
        label: 'Spending Distribution',
        data: [5000, 3000, 2000, 4000, 1000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Bar data={barData} />
                  </motion.div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Spending Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <div className="w-64 h-64 mx-auto">
                      <Doughnut data={doughnutData} />
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <User className="w-5 h-5 mr-2" /> {user.name}
                    </p>
                    <p className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" /> Account: {user.accountNumber}
                    </p>
                    <p className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" /> Balance: ₹{user.balance.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Credit Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="3"
                          strokeDasharray={`${(user.creditScore / 10) * 100}, 100`}
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                        {user.creditScore}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {quickActions.map((action) => (
                    <motion.div key={action.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Card className="p-4 rounded-lg shadow-lg">
                        <Link href={action.href} className="flex flex-col items-center">
                          <action.icon className="w-6 h-6 mb-2" />
                          <span className="font-semibold">{action.name}</span>
                          <p className="text-sm mt-2">{action.description}</p>
                          <Button variant="outline" className="mt-4 bg-black text-white">Go</Button>
                        </Link>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Smart Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {smartSuggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Risk Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {riskAlerts.map((alert, index) => (
                      <li key={index} className="flex items-center">
                        <ShieldAlert className="w-5 h-5 mr-2 text-warning" />
                        {alert}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Spending Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {spendingTrends.map((trend, index) => (
                      <li key={index} className="flex items-center">
                        <BarChart2 className="w-5 h-5 mr-2 text-info" />
                        {trend}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            {user.priority === "VIP" && (
              <div className="bg-primary/10 p-4 rounded-md">
                <p className="text-primary font-semibold">VIP Customer: Enjoy priority service and exclusive benefits!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}
