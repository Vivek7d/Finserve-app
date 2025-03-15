"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Clock, Search, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Poppins } from "next/font/google";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/navbar";
import toast, { Toaster } from "react-hot-toast";

const financialAdvisors = [
  {
    id: 1,
    name: "Mr. John Stone",
    specialty: "Investment Planning",
    rating: 4.8,
    reviews: 120,
    bio: "Expert in investment planning and portfolio management with 10+ years of experience.",
  },
  {
    id: 2,
    name: "Ms. Sarah Lee",
    specialty: "Tax Consultation",
    rating: 4.5,
    reviews: 85,
    bio: "Experienced tax consultant specializing in individual and business taxation.",
  },
  {
    id: 3,
    name: "Mr. Alex Brown",
    specialty: "Retirement Planning",
    rating: 4.7,
    reviews: 95,
    bio: "Provides retirement planning and wealth management services for long-term financial stability.",
  },
  {
    id: 4,
    name: "Ms. Emily White",
    specialty: "Estate Planning",
    rating: 4.9,
    reviews: 60,
    bio: "Specializes in estate planning and wealth transfer strategies.",
  },
  {
    id: 5,
    name: "Mr. Michael Green",
    specialty: "Financial Analysis",
    rating: 4.6,
    reviews: 75,
    bio: "Expert in financial analysis and risk management with a focus on investment strategies.",
  },
  {
    id: 6,
    name: "Ms. Laura Black",
    specialty: "Insurance Consultation",
    rating: 4.4,
    reviews: 50,
    bio: "Provides insurance consultation and risk assessment services.",
  },
];

const timeSlots = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
];

const existingAppointments = [
  {
    id: 1,
    advisor: "Mr. John Stone",
    date: "2023-06-15",
    time: "10:00 AM - 11:00 AM",
    status: "Confirmed",
    notes: "Initial financial planning session",
  },
  {
    id: 2,
    advisor: "Ms. Sarah Lee",
    date: "2023-06-20",
    time: "01:00 PM - 02:00 PM",
    status: "Pending",
    notes: "Tax consultation for small business",
  },
  {
    id: 3,
    advisor: "Mr. Alex Brown",
    date: "2023-06-25",
    time: "03:00 PM - 04:00 PM",
    status: "Confirmed",
    notes: "Retirement portfolio review",
  },
];

const feedbackSessions = [
  { id: 1, advisor: "Mr. John Doe", date: "May 15, 2023" },
  { id: 2, advisor: "Ms. Sarah Lee", date: "May 10, 2023" },
];

const poppins = Poppins({
  weight: ["100", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointments, setAppointments] = useState(existingAppointments);
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [reschedulingHistory, setReschedulingHistory] = useState({});

  const handleAdvisorDropdown = (event) => {
    setSelectedAdvisor(event.target.value);
  };

  const filteredAdvisors = financialAdvisors.filter((advisor) =>
    advisor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setAvailableTimeSlots(timeSlots);
  }, [selectedAdvisor]);

  const handleBookAppointment = () => {
    if (selectedAdvisor && selectedDate && selectedTime) {
      const advisor = financialAdvisors.find(
        (a) => a.id === parseInt(selectedAdvisor)
      );
      const newAppointment = {
        id: appointments.length + 1,
        advisor: advisor.name,
        date: selectedDate,
        time: selectedTime,
      };
      setAppointments([...appointments, newAppointment]);
      setSelectedAdvisor("");
      setSelectedDate("");
      setSelectedTime("");
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments(appointments.filter(app => app.id !== appointmentId));
    toast.success("Appointment is cancelled");
  };

  const handleRescheduleClick = (appointmentId) => {
    setRescheduleId(appointmentId);
    const appointment = appointments.find(app => app.id === appointmentId);
    setRescheduleDate(appointment.date);
    setRescheduleTime(appointment.time);
  };

  const handleRescheduleSubmit = () => {
    if (rescheduleDate && rescheduleTime) {
      const appointment = appointments.find(app => app.id === rescheduleId);
      
      // Create or update rescheduling history for this appointment
      const updatedHistory = {...reschedulingHistory};
      if (!updatedHistory[rescheduleId]) {
        updatedHistory[rescheduleId] = [];
      }
      
      // Add the current appointment details to history
      updatedHistory[rescheduleId].push({
        date: appointment.date,
        time: appointment.time,
        changedAt: new Date().toISOString()
      });
      
      setReschedulingHistory(updatedHistory);
      
      // Update the appointment
      const updatedAppointments = appointments.map(app => 
        app.id === rescheduleId 
          ? {...app, date: rescheduleDate, time: rescheduleTime, status: "Confirmed"} 
          : app
      );
      
      setAppointments(updatedAppointments);
      setRescheduleId(null);
      toast.success("Appointment rescheduled successfully");
    } else {
      toast.error("Please select both date and time");
    }
  };

  const handleCancelReschedule = () => {
    setRescheduleId(null);
  };

  return (
    <>
      <Navbar />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div
        className={`${poppins.className} min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Banking Appointment Services
          </h1>

          <Tabs defaultValue="find-advisors" className="space-y-4">
            <TabsList>
              <TabsTrigger value="find-advisors">
                Find Financial Advisors
              </TabsTrigger>
              <TabsTrigger value="schedule-appointments">
                Schedule Appointments
              </TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="find-advisors">
              <Card>
                <CardHeader>
                  <CardTitle>Find a Financial Advisor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-col sm:flex-row gap-4">
                    <Input
                      type="text"
                      placeholder="Search advisors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-grow"
                    />
                    <select className="flex-grow sm:w-auto border rounded-md py-2 px-4 bg-white">
                      <option value="">All Specialties</option>
                      <option value="investment">Investment Planning</option>
                      <option value="tax">Tax Consultation</option>
                      <option value="retirement">Retirement Planning</option>
                    </select>
                    <Button className="w-full sm:w-auto">
                      <Search className="mr-2 h-4 w-4" /> Search
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredAdvisors.map((advisor) => (
                      <Card key={advisor.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4 mb-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src="/placeholder.svg?height=48&width=48"
                                alt={advisor.name}
                              />
                              <AvatarFallback>
                                {advisor.name.split(" ")[0][0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {advisor.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {advisor.specialty}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-4">
                            {advisor.bio}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Star className="h-5 w-5 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm font-semibold">
                                {advisor.rating} ({advisor.reviews} reviews)
                              </span>
                            </div>
                            <Button size="sm">Book Appointment</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule-appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule an Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="flex-grow flex flex-col">
                        <label className="text-sm font-medium mb-1 text-gray-700">
                          Select Advisor
                        </label>
                        <select
                          className="border rounded-md py-2 px-4 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={selectedAdvisor}
                          onChange={(e) => setSelectedAdvisor(e.target.value)}
                        >
                          <option value="">Select Advisor</option>
                          {financialAdvisors.map((advisor) => (
                            <option key={advisor.id} value={advisor.id}>
                              {advisor.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex-grow flex flex-col">
                        <label className="text-sm font-medium mb-1 text-gray-700">
                          Select Date
                        </label>
                        <Input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="border rounded-md py-2 px-4 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="flex-grow flex flex-col">
                        <label className="text-sm font-medium mb-1 text-gray-700">
                          Select Time Slot
                        </label>
                        <select
                          className="border rounded-md py-2 px-4 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          disabled={!selectedAdvisor}
                        >
                          <option value="">Select Time Slot</option>
                          {availableTimeSlots.map((slot, index) => (
                            <option key={index} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <Button
                      onClick={handleBookAppointment}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
                    >
                      Book Appointment
                    </Button>

                    <div className="mt-10 mb-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Your Appointments
                      </h2>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {appointments.map((appointment) => (
                          <Card
                            key={appointment.id}
                            className="shadow-md hover:shadow-lg transition-shadow"
                          >
                            <CardContent className="p-5">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-lg font-semibold text-blue-700">
                                    {appointment.advisor}
                                  </h3>
                                  <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                                      appointment.status === "Confirmed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {appointment.status}
                                  </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  <span>
                                    {new Date(
                                      appointment.date
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock className="mr-2 h-4 w-4" />
                                  <span>{appointment.time}</span>
                                </div>
                                {appointment.notes && (
                                  <div className="mt-2 pt-2 border-t text-sm text-gray-600">
                                    <p>
                                      <span className="font-medium">
                                        Notes:
                                      </span>{" "}
                                      {appointment.notes}
                                    </p>
                                  </div>
                                )}
                                
                                {/* Rescheduling history section */}
                                {reschedulingHistory[appointment.id] && reschedulingHistory[appointment.id].length > 0 && (
                                  <div className="mt-2 pt-2 border-t text-sm text-gray-600">
                                    <p className="font-medium mb-1">Previous Schedules:</p>
                                    <ul className="text-xs space-y-1">
                                      {reschedulingHistory[appointment.id].map((history, idx) => (
                                        <li key={idx} className="flex justify-between">
                                          <span>
                                            {new Date(history.date).toLocaleDateString("en-US", {
                                              month: "short",
                                              day: "numeric",
                                            })} at {history.time}
                                          </span>
                                          <span className="text-gray-400">
                                            {new Date(history.changedAt).toLocaleDateString()}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                {rescheduleId === appointment.id ? (
                                  <div className="mt-3 pt-2 border-t">
                                    <div className="text-sm font-medium mb-2 text-gray-700">Reschedule Appointment</div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                      <div>
                                        <label className="text-xs font-medium mb-1 text-gray-600">New Date</label>
                                        <Input
                                          type="date"
                                          value={rescheduleDate}
                                          onChange={(e) => setRescheduleDate(e.target.value)}
                                          className="w-full"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-xs font-medium mb-1 text-gray-600">New Time</label>
                                        <select
                                          className="w-full border rounded-md py-1 px-2 bg-white text-sm"
                                          value={rescheduleTime}
                                          onChange={(e) => setRescheduleTime(e.target.value)}
                                        >
                                          {timeSlots.map((slot, index) => (
                                            <option key={index} value={slot}>
                                              {slot}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={handleCancelReschedule}
                                      >
                                        Cancel
                                      </Button>
                                      <Button 
                                        size="sm"
                                        onClick={handleRescheduleSubmit}
                                      >
                                        Confirm
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex mt-3 pt-2 border-t justify-end space-x-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleRescheduleClick(appointment.id)}
                                    >
                                      Reschedule
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-600 border-red-200 hover:bg-red-50"
                                      onClick={() => handleCancelAppointment(appointment.id)}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {appointments.length === 0 && (
                      <div className="text-center py-10 text-gray-500">
                        <p>You don't have any appointments scheduled.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>Session Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    {feedbackSessions.map((session) => (
                      <Card key={session.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {session.advisor} Session
                              </h3>
                              <p className="text-sm text-gray-500">
                                <User className="inline mr-2 h-4 w-4" />{" "}
                                {session.advisor}
                                <Calendar className="inline ml-4 mr-2 h-4 w-4" />{" "}
                                {session.date}
                              </p>
                            </div>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="h-6 w-6 text-yellow-400 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                          <Textarea
                            className="w-full p-2 border rounded-md"
                            rows={4}
                            placeholder="Share your thoughts about the session..."
                          />
                          <Button className="mt-4">Submit Feedback</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
