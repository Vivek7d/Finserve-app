"use client"

import { useState } from "react"
import { Clock, CheckCircle, RefreshCw, AlertTriangle, Filter, MessageSquare, ChevronDown, ChevronUp, Calendar, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

const tickets = [
  {
    id: "T001", 
    type: "Account Access Issue",
    department: "Customer Support",
    status: "Pending",
    priority: "High",
    estimatedTime: "24 hours",
    description: "Customer unable to access online banking portal after password reset",
    createdOn: "2023-11-15",
    lastUpdated: "2023-11-15",
    assignedTo: "Sarah Johnson",
    comments: [
      { id: 1, user: "Sarah Johnson", text: "Investigating the issue. Will contact customer for verification.", timestamp: "2023-11-15T10:30:00" }
    ],
    progress: 15
  },
  {
    id: "T002",
    type: "Mortgage Refinancing", 
    department: "Loans",
    status: "In Progress",
    priority: "Medium",
    estimatedTime: "48 hours",
    description: "Customer seeking information about mortgage refinancing options with current interest rates",
    createdOn: "2023-11-14",
    lastUpdated: "2023-11-16",
    assignedTo: "Michael Chen",
    comments: [
      { id: 1, user: "Michael Chen", text: "Reviewed customer's current mortgage details.", timestamp: "2023-11-14T14:20:00" },
      { id: 2, user: "Michael Chen", text: "Preparing refinancing options based on current rates.", timestamp: "2023-11-16T09:15:00" }
    ],
    progress: 60
  },
  {
    id: "T003",
    type: "Mobile App Crash",
    department: "IT",
    status: "Resolved", 
    priority: "Critical",
    estimatedTime: "Completed",
    description: "Mobile app crashing on startup for iOS users after the latest update",
    createdOn: "2023-11-13",
    lastUpdated: "2023-11-14",
    assignedTo: "Alex Rodriguez",
    comments: [
      { id: 1, user: "Alex Rodriguez", text: "Identified compatibility issue with iOS 16.", timestamp: "2023-11-13T11:45:00" },
      { id: 2, user: "Alex Rodriguez", text: "Deployed hotfix to app store.", timestamp: "2023-11-14T08:30:00" },
      { id: 3, user: "Alex Rodriguez", text: "Issue resolved. App now functioning normally on all iOS versions.", timestamp: "2023-11-14T16:20:00" }
    ],
    progress: 100
  },
  {
    id: "T004",
    type: "Unauthorized Transaction",
    department: "Fraud Prevention",
    status: "In Progress",
    priority: "Critical",
    estimatedTime: "12 hours",
    description: "Customer reported unauthorized debit card transaction of $527.99 at an online electronics store",
    createdOn: "2023-11-16",
    lastUpdated: "2023-11-16",
    assignedTo: "Emma Wilson",
    comments: [
      { id: 1, user: "Emma Wilson", text: "Card has been temporarily frozen.", timestamp: "2023-11-16T08:10:00" },
      { id: 2, user: "Emma Wilson", text: "Investigation opened with merchant. Contacting customer for additional details.", timestamp: "2023-11-16T10:45:00" }
    ],
    progress: 40
  },
  {
    id: "T005",
    type: "Statement Discrepancy",
    department: "Accounting",
    status: "Pending",
    priority: "Low",
    estimatedTime: "72 hours",
    description: "Customer reports missing deposit on monthly statement from October 28",
    createdOn: "2023-11-15",
    lastUpdated: "2023-11-15",
    assignedTo: "David Park",
    comments: [
      { id: 1, user: "David Park", text: "Reviewing transaction history and deposit records.", timestamp: "2023-11-15T15:30:00" }
    ],
    progress: 10
  },
  {
    id: "T006",
    type: "Credit Limit Increase",
    department: "Credit Cards",
    status: "Resolved",
    priority: "Medium",
    estimatedTime: "Completed",
    description: "Customer requested credit limit increase from $5,000 to $8,000 on Platinum Rewards card",
    createdOn: "2023-11-12",
    lastUpdated: "2023-11-14",
    assignedTo: "Olivia Martinez",
    comments: [
      { id: 1, user: "Olivia Martinez", text: "Reviewing customer's credit history and account standing.", timestamp: "2023-11-12T13:20:00" },
      { id: 2, user: "Olivia Martinez", text: "Credit limit increase approved. New limit: $7,500.", timestamp: "2023-11-14T11:05:00" }
    ],
    progress: 100
  }
];

const departments = [
  "All Departments",
  "Customer Support",
  "Loans",
  "IT",
  "Fraud Prevention",
  "Accounting",
  "Credit Cards"
];

export default function ServiceTickets() {
  const [expandedTicket, setExpandedTicket] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDepartment, setFilterDepartment] = useState('All Departments')
  const [filterPriority, setFilterPriority] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [ticketsData, setTicketsData] = useState(tickets)
  const [sortBy, setSortBy] = useState('newest')

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-gray-100 text-gray-800"
      case "Medium":
        return "bg-blue-100 text-blue-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4" />
      case "In Progress":
        return <RefreshCw className="w-4 h-4 animate-spin" />
      case "Resolved":
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "Critical":
        return <AlertTriangle className="w-4 h-4" />
      case "High":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return null
    }
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const updatedTickets = ticketsData.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        const updatedTicket = {
          ...ticket,
          comments: [
            ...ticket.comments,
            {
              id: ticket.comments.length + 1,
              user: "You",
              text: newComment,
              timestamp: new Date().toISOString()
            }
          ],
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        return updatedTicket;
      }
      return ticket;
    });
    
    setTicketsData(updatedTickets);
    setNewComment('');
    setSelectedTicket(updatedTickets.find(t => t.id === selectedTicket.id));
  };

  // Consistent date formatting to avoid hydration errors
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  // Apply all filters and sorting
  const filteredAndSortedTickets = ticketsData
    .filter(ticket => {
      const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
      const matchesDepartment = filterDepartment === 'All Departments' || ticket.department === filterDepartment;
      const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
      const matchesSearch = searchQuery === '' || 
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesDepartment && matchesPriority && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdOn) - new Date(a.createdOn);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdOn) - new Date(b.createdOn);
      } else if (sortBy === 'priority') {
        const priorityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Service Tickets</h1>
            <p className="text-gray-500 mt-1">Track and manage your support requests</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-1/3">
              <Input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="board">Board View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <div className="space-y-4">
              {filteredAndSortedTickets.map((ticket) => (
                <Card 
                  key={ticket.id}
                  className="hover:shadow-md transition-shadow duration-200"
                >
                  <CardHeader className="pb-2 flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-3">
                        <span className="text-xl font-semibold">{ticket.type}</span>
                        <Badge variant="outline" className="ml-2">#{ticket.id}</Badge>
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Created on {formatDate(ticket.createdOn)} • Last updated {formatDate(ticket.lastUpdated)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getPriorityColor(ticket.priority)} flex items-center`}>
                        {getPriorityIcon(ticket.priority)}
                        <span className="ml-1">{ticket.priority}</span>
                      </Badge>
                      <Badge className={`${getStatusColor(ticket.status)} flex items-center border`}>
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1">{ticket.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <div className="text-sm text-gray-500 mb-2 md:mb-0">Progress</div>
                        <div className="text-sm font-medium">{ticket.progress}%</div>
                      </div>
                      <Progress value={ticket.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <User className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="font-medium text-gray-700 mr-2">Assigned to:</span>
                          <span>{ticket.assignedTo}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="font-medium text-gray-700 mr-2">Comments:</span>
                          <span>{ticket.comments.length}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="font-medium text-gray-700 mr-2">Est. Time:</span>
                          <span>{ticket.estimatedTime}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Filter className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="font-medium text-gray-700 mr-2">Department:</span>
                          <span>{ticket.department}</span>
                        </div>
                      </div>
                    </div>
                    
                    {expandedTicket === ticket.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                        <p className="text-gray-700 mb-4">{ticket.description}</p>
                        
                        <h4 className="font-medium text-gray-900 mb-2">Activity</h4>
                        <div className="space-y-3">
                          {ticket.comments.map((comment) => (
                            <div key={comment.id} className="flex space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-medium">{comment.user}</span>
                                  <span className="text-xs text-gray-500">{formatDate(comment.timestamp)} {formatTime(comment.timestamp)}</span>
                                </div>
                                <p className="text-sm text-gray-700">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="flex flex-col sm:flex-row justify-between pt-2 border-t">
                    <div className="flex space-x-2 w-full sm:w-auto mb-2 sm:mb-0">
                      <Button 
                        variant={expandedTicket === ticket.id ? "default" : "outline"} 
                        size="sm"
                        className="flex-1 sm:flex-none"
                        onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}
                      >
                        {expandedTicket === ticket.id ? (
                          <>
                            <ChevronUp className="mr-1 h-4 w-4" /> Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="mr-1 h-4 w-4" /> View Details
                          </>
                        )}
                      </Button>
                      
                      <Dialog open={isDialogOpen && selectedTicket?.id === ticket.id} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (open) setSelectedTicket(ticket);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1 sm:flex-none"
                          >
                            <MessageSquare className="mr-1 h-4 w-4" /> Add Comment
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Add Comment to Ticket #{ticket.id}</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <Textarea
                              placeholder="Type your comment here..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="min-h-[100px]"
                            />
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button onClick={() => {
                              handleAddComment();
                              setIsDialogOpen(false);
                            }}>Submit Comment</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 sm:flex-none"
                      >
                        <MessageSquare className="mr-1 h-4 w-4" /> Contact Support
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredAndSortedTickets.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Filter className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    No tickets match your current filter criteria. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="board">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Pending", "In Progress", "Resolved"].map((status) => (
                <div key={status} className="space-y-4">
                  <div className={`p-3 rounded-t-lg ${getStatusColor(status)}`}>
                    <h3 className="font-medium flex items-center">
                      {getStatusIcon(status)}
                      <span className="ml-2">{status}</span>
                      <Badge className="ml-2 bg-white text-gray-700">
                        {filteredAndSortedTickets.filter(t => t.status === status).length}
                      </Badge>
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {filteredAndSortedTickets
                      .filter(ticket => ticket.status === status)
                      .map((ticket) => (
                        <Card key={ticket.id} className="hover:shadow-md transition-shadow duration-200">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base font-medium flex justify-between">
                              <div className="flex items-center">
                                <span>{ticket.type}</span>
                                <Badge variant="outline" className="ml-2 text-xs">#{ticket.id}</Badge>
                              </div>
                              <Badge className={getPriorityColor(ticket.priority)}>
                                {ticket.priority}
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-gray-700 line-clamp-2 mb-2">{ticket.description}</p>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(ticket.createdOn)}
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                {ticket.comments.length}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2 border-t">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full text-xs"
                              onClick={() => {
                                setSelectedTicket(ticket);
                                setIsDialogOpen(true);
                              }}
                            >
                              View Details
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                      
                    {filteredAndSortedTickets.filter(t => t.status === status).length === 0 && (
                      <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <p className="text-gray-500 text-sm">No tickets</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
