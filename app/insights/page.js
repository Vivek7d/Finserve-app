"use client"

import { useState, useEffect } from "react"
import { 
  TrendingUp, 
  AlertTriangle, 
  CreditCard, 
  PieChart as PieChartIcon, 
  BarChart as BarChartIcon,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Wallet
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { PolarGrid,PolarAngleAxis,PolarRadiusAxis,
  LineChart, 
  BarChart, 
  PieChart, 
  AreaChart, 
  RadarChart,
  RadialBarChart,
  ScatterChart,
  ComposedChart,
  Line, 
  Bar, 
  Pie, 
  Area, 
  Radar,
  RadialBar,
  Scatter,
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function Insights() {
  const [insights, setInsights] = useState([])
  const [accountSummary, setAccountSummary] = useState({})
  const [transactionHistory, setTransactionHistory] = useState([])
  const [budgetProgress, setBudgetProgress] = useState([])
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly")

  useEffect(() => {
    // Simulate fetching data from an API or server
    const fetchedInsights = [
      {
        title: "Savings Growth",
        description: "Your savings have grown by 15% this year. Keep up the good work!",
        icon: TrendingUp,
        trend: "+15%",
        trendDirection: "up",
        data: [
          { name: 'Jan', value: 4000 },
          { name: 'Feb', value: 4200 },
          { name: 'Mar', value: 4500 },
          { name: 'Apr', value: 4800 },
          { name: 'May', value: 5100 },
          { name: 'Jun', value: 5400 }
        ]
      },
      {
        title: "Expense Tracking",
        description: "You have reduced your monthly expenses by 10%. Great job on budgeting!",
        icon: CreditCard,
        trend: "-10%",
        trendDirection: "down",
        data: [
          { name: 'Housing', value: 2000, fill: '#8884d8' },
          { name: 'Food', value: 1500, fill: '#83a6ed' },
          { name: 'Utilities', value: 500, fill: '#8dd1e1' },
          { name: 'Transportation', value: 800, fill: '#82ca9d' },
          { name: 'Entertainment', value: 600, fill: '#a4de6c' },
          { name: 'Healthcare', value: 400, fill: '#d0ed57' }
        ]
      },
      {
        title: "Investment Portfolio",
        description: "Your investments have outperformed the market by 5% this quarter.",
        icon: CreditCard,
        trend: "+5%",
        trendDirection: "up",
        data: [
          { name: 'Stocks', value: 45, fill: '#0088FE' },
          { name: 'Bonds', value: 25, fill: '#00C49F' },
          { name: 'Real Estate', value: 15, fill: '#FFBB28' },
          { name: 'Crypto', value: 10, fill: '#FF8042' },
          { name: 'Cash', value: 5, fill: '#8884d8' }
        ]
      },
      {
        title: "Projected Growth",
        description: "Your projected growth over the next quarter looks promising.",
        icon: TrendingUp,
        trend: "+8%",
        trendDirection: "up",
        data: [
          { name: 'Jul', value: 5700, projection: 5700 },
          { name: 'Aug', value: 6000, projection: 6000 },
          { name: 'Sep', value: null, projection: 6300 },
          { name: 'Oct', value: null, projection: 6600 },
          { name: 'Nov', value: null, projection: 6900 },
          { name: 'Dec', value: null, projection: 7200 }
        ]
      },
    ]

    const fetchedAccountSummary = {
      balance: 12450.75,
      income: 5200.00,
      expenses: 3750.25,
      savings: 1449.75,
      savingsRate: 27.9,
      creditScore: 785,
      creditScoreChange: 15,
      monthlyComparison: {
        income: 8.5,
        expenses: -10.2,
        savings: 22.4
      }
    }

    const fetchedTransactionHistory = [
      { date: '2023-06-01', amount: -2000, category: 'Housing', description: 'Monthly Rent' },
      { date: '2023-06-03', amount: -85.42, category: 'Utilities', description: 'Electricity Bill' },
      { date: '2023-06-05', amount: -120.33, category: 'Food', description: 'Grocery Shopping' },
      { date: '2023-06-10', amount: 5200, category: 'Income', description: 'Salary Deposit' },
      { date: '2023-06-12', amount: -65.99, category: 'Entertainment', description: 'Streaming Services' },
      { date: '2023-06-15', amount: -800, category: 'Savings', description: 'Savings Transfer' },
      { date: '2023-06-18', amount: -45.75, category: 'Transportation', description: 'Fuel' },
      { date: '2023-06-20', amount: -250, category: 'Healthcare', description: 'Doctor Visit' },
      { date: '2023-06-25', amount: -180.50, category: 'Food', description: 'Dining Out' },
      { date: '2023-06-28', amount: -95.25, category: 'Shopping', description: 'Clothing Purchase' }
    ]

    const fetchedBudgetProgress = [
      { category: 'Housing', budget: 2000, spent: 2000, percentage: 100 },
      { category: 'Food', budget: 800, spent: 300.83, percentage: 37.6 },
      { category: 'Utilities', budget: 400, spent: 85.42, percentage: 21.4 },
      { category: 'Transportation', budget: 300, spent: 45.75, percentage: 15.3 },
      { category: 'Entertainment', budget: 200, spent: 65.99, percentage: 33.0 },
      { category: 'Healthcare', budget: 500, spent: 250, percentage: 50.0 },
      { category: 'Shopping', budget: 400, spent: 95.25, percentage: 23.8 }
    ]

    setInsights(fetchedInsights)
    setAccountSummary(fetchedAccountSummary)
    setTransactionHistory(fetchedTransactionHistory)
    setBudgetProgress(fetchedBudgetProgress)
  }, [])

  const spendingByDayData = [
    { day: 'Mon', amount: 120 },
    { day: 'Tue', amount: 85 },
    { day: 'Wed', amount: 190 },
    { day: 'Thu', amount: 75 },
    { day: 'Fri', amount: 210 },
    { day: 'Sat', amount: 250 },
    { day: 'Sun', amount: 180 }
  ]

  const incomeVsExpensesData = [
    { month: 'Jan', income: 5000, expenses: 3800 },
    { month: 'Feb', income: 5100, expenses: 3900 },
    { month: 'Mar', income: 5000, expenses: 3700 },
    { month: 'Apr', income: 5200, expenses: 3850 },
    { month: 'May', income: 5150, expenses: 3750 },
    { month: 'Jun', income: 5200, expenses: 3750 }
  ]

  const financialHealthData = [
    { subject: 'Savings', A: 85, fullMark: 100 },
    { subject: 'Debt', A: 70, fullMark: 100 },
    { subject: 'Investments', A: 65, fullMark: 100 },
    { subject: 'Budget', A: 90, fullMark: 100 },
    { subject: 'Credit', A: 78, fullMark: 100 },
    { subject: 'Insurance', A: 60, fullMark: 100 }
  ]

  const savingsGoalData = [
    { name: 'Emergency Fund', value: 75 },
    { name: 'Vacation', value: 45 },
    { name: 'Down Payment', value: 30 },
    { name: 'Retirement', value: 60 }
  ]

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Financial Insights Dashboard</h1>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant={selectedTimeframe === "weekly" ? "default" : "outline"} 
              onClick={() => setSelectedTimeframe("weekly")}
            >
              Weekly
            </Button>
            <Button 
              variant={selectedTimeframe === "monthly" ? "default" : "outline"} 
              onClick={() => setSelectedTimeframe("monthly")}
            >
              Monthly
            </Button>
            <Button 
              variant={selectedTimeframe === "yearly" ? "default" : "outline"} 
              onClick={() => setSelectedTimeframe("yearly")}
            >
              Yearly
            </Button>
          </div>
        </div>

        {/* Account Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">&#8377;{accountSummary.balance?.toLocaleString()}</div>
                <Wallet className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Available for spending
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Monthly Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">&#8377;{accountSummary.income?.toLocaleString()}</div>
                <div className="flex items-center">
                  <ArrowUpRight className="h-5 w-5 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+{accountSummary.monthlyComparison?.income}%</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Compared to last month
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">&#8377;{accountSummary.expenses?.toLocaleString()}</div>
                <div className="flex items-center">
                  <ArrowDownRight className="h-5 w-5 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">{accountSummary.monthlyComparison?.expenses}%</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Compared to last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {insights.map((insight, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{insight.title}</CardTitle>
                  <Badge variant={insight.trendDirection === "up" ? "success" : "destructive"}>
                    {insight.trend}
                  </Badge>
                </div>
                <CardDescription>{insight.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={250}>
                    {index === 0 && (
                      <AreaChart data={insight.data}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    )}
                    {index === 1 && (
                      <BarChart data={insight.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" />
                      </BarChart>
                    )}
                    {index === 2 && (
                      <PieChart>
                        <Pie 
                          data={insight.data} 
                          dataKey="value" 
                          nameKey="name" 
                          cx="50%" 
                          cy="50%" 
                          outerRadius={80} 
                          label
                        />
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    )}
                    {index === 3 && (
                      <ComposedChart data={insight.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="value" fill="#8884d8" stroke="#8884d8" />
                        <Line type="monotone" dataKey="projection" stroke="#ff7300" strokeDasharray="5 5" />
                      </ComposedChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Insights Tabs */}
        <Tabs defaultValue="spending" className="mb-8">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
            <TabsTrigger value="budget">Budget Progress</TabsTrigger>
            <TabsTrigger value="financial-health">Financial Health</TabsTrigger>
            <TabsTrigger value="goals">Savings Goals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="spending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Spending Pattern</CardTitle>
                  <CardDescription>Your spending habits throughout the week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={spendingByDayData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Income vs Expenses</CardTitle>
                  <CardDescription>Monthly comparison of income and expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={incomeVsExpensesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="income" fill="#82ca9d" />
                      <Bar dataKey="expenses" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactionHistory.slice(0, 5).map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</div>
                      </div>
                      <div className={`font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'INR',
                        }).replace('INR', '₹')}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Transactions</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="budget" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Budget Progress</CardTitle>
                <CardDescription>Track your spending against budget categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {budgetProgress.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <div className="font-medium">{item.category}</div>
                        <div className="text-sm text-muted-foreground">
                          &#8377;{item.spent.toFixed(2)} of &#8377;{item.budget.toFixed(2)}
                        </div>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                      <div className="text-xs text-right text-muted-foreground">
                        {item.percentage.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="financial-health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Health Radar</CardTitle>
                <CardDescription>Overview of your financial well-being</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={financialHealthData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Financial Health" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Savings Goals Progress</CardTitle>
                <CardDescription>Track your progress towards financial goals</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart 
                    innerRadius="10%" 
                    outerRadius="80%" 
                    data={savingsGoalData} 
                    startAngle={180} 
                    endAngle={0}
                  >
                    <RadialBar 
                      minAngle={15} 
                      label={{ fill: '#666', position: 'insideStart' }} 
                      background 
                      clockWise={true} 
                      dataKey="value" 
                    />
                    <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-10 bg-warning/20 p-6 rounded-md">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 mr-4 text-warning flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-warning-foreground mb-2">Important Notice</h3>
              <p className="text-warning-foreground">
                These insights are based on your financial activities and are provided for informational purposes only. 
                Always consider your current financial situation before making any decisions. For personalized financial advice, 
                please consult with one of our financial advisors.
              </p>
              <Button variant="outline" className="mt-4">Schedule Advisor Consultation</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}