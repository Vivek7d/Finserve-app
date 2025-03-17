"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Search,
  Star,
  User,
  MessageSquare,
  Phone,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Poppins } from "next/font/google";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/navbar";
import toast, { Toaster } from "react-hot-toast";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

const consultationTypes = [
  {
    id: 1,
    name: "Investment Planning",
    description:
      "Get expert guidance on investment strategies and portfolio management",
    icon: "💰",
  },
  {
    id: 2,
    name: "Tax Consultation",
    description: "Professional advice on tax planning and compliance",
    icon: "📊",
  },
  {
    id: 3,
    name: "Wealth Management",
    description: "Comprehensive wealth management and financial planning",
    icon: "💎",
  },
  {
    id: 4,
    name: "Loan & Mortgage Guidance",
    description: "Expert advice on loans, mortgages, and debt management",
    icon: "🏠",
  },
  {
    id: 5,
    name: "Retirement Planning",
    description: "Plan your retirement with personalized strategies",
    icon: "👴",
  },
];

const bookingTypes = [
  {
    id: 1,
    name: "Visit Branch",
    description: "Meet with your advisor face-to-face at our branch",
    icon: <User className="h-8 w-8" />,
  },
  {
    id: 2,
    name: "Chat",
    description: "Text-based consultation through our secure platform",
    icon: <MessageSquare className="h-8 w-8" />,
  },
  {
    id: 3,
    name: "Call",
    description: "Voice call with your financial advisor",
    icon: <Phone className="h-8 w-8" />,
  },
];

const bankBranches = [
  {
    id: 1,
    name: "Mumbai Main Branch",
    address: "123, Financial District, Mumbai - 400001",
    phone: "+91 22 1234 5678",
  },
  {
    id: 2,
    name: "Delhi Central Branch",
    address: "456, Banking Zone, New Delhi - 110001",
    phone: "+91 11 2345 6789",
  },
  {
    id: 3,
    name: "Bangalore Tech Branch",
    address: "789, Digital Avenue, Bangalore - 560001",
    phone: "+91 80 3456 7890",
  },
  {
    id: 4,
    name: "Chennai Corporate Branch",
    address: "321, Business Park, Chennai - 600001",
    phone: "+91 44 4567 8901",
  },
];

const financialAdvisors = [
  {
    id: 1,
    name: "Mr. Rajesh Sharma",
    specialty: "Investment Planning",
    rating: 4.8,
    reviews: 120,
    experience: "12 years",
    languages: ["English", "Hindi", "Gujarati"],
    email: "rajesh.sharma@finserve.com",
    phone: "+91 98765 43210",
    bio: "Expert in investment planning and portfolio management with 12+ years of experience. Specializes in equity markets and mutual funds.",
    availability: {
      monday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      tuesday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      wednesday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      thursday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      friday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
    },
  },
  {
    id: 2,
    name: "Ms. Priya Patel",
    specialty: "Tax Consultation",
    rating: 4.5,
    reviews: 85,
    experience: "8 years",
    languages: ["English", "Hindi", "Gujarati"],
    email: "priya.patel@finserve.com",
    phone: "+91 98765 43211",
    bio: "Experienced tax consultant specializing in individual and business taxation. Expert in international tax laws.",
    availability: {
      monday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      tuesday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      wednesday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      thursday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      friday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
    },
  },
  {
    id: 3,
    name: "Mr. Vikram Singh",
    specialty: "Retirement Planning",
    rating: 4.7,
    reviews: 95,
    experience: "15 years",
    languages: ["English", "Hindi", "Punjabi"],
    email: "vikram.singh@finserve.com",
    phone: "+91 98765 43212",
    bio: "Senior retirement planning expert with focus on long-term financial stability and pension management.",
    availability: {
      monday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      tuesday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      wednesday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      thursday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      friday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
    },
  },
  {
    id: 7,
    name: "Mr. Aditya Kumar",
    specialty: "Loan & Mortgage Guidance",
    rating: 4.9,
    reviews: 150,
    experience: "10 years",
    languages: ["English", "Hindi", "Telugu"],
    email: "aditya.kumar@finserve.com",
    phone: "+91 98765 43216",
    bio: "Expert in loan and mortgage consultation with extensive experience in home loans, business loans, and debt restructuring.",
    availability: {
      monday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      tuesday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      wednesday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      thursday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      friday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
    },
  },
  {
    id: 4,
    name: "Ms. Anjali Desai",
    specialty: "Estate Planning",
    rating: 4.9,
    reviews: 60,
    experience: "10 years",
    languages: ["English", "Hindi", "Marathi"],
    email: "anjali.desai@finserve.com",
    phone: "+91 98765 43213",
    bio: "Specializes in estate planning and wealth transfer strategies. Experienced in international estate laws.",
    availability: {
      monday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      tuesday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      wednesday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      thursday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      friday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
    },
  },
  {
    id: 5,
    name: "Mr. Arjun Mehta",
    specialty: "Financial Analysis",
    rating: 4.6,
    reviews: 75,
    experience: "8 years",
    languages: ["English", "Hindi", "Gujarati"],
    email: "arjun.mehta@finserve.com",
    phone: "+91 98765 43214",
    bio: "Expert in financial analysis and risk management with a focus on investment strategies. Specializes in portfolio management and asset allocation.",
    availability: {
      monday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      tuesday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      wednesday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      thursday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      friday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
    },
  },
  {
    id: 6,
    name: "Ms. Neha Kapoor",
    specialty: "Insurance Consultation",
    rating: 4.4,
    reviews: 50,
    experience: "5 years",
    languages: ["English", "Hindi", "Bengali"],
    email: "neha.kapoor@finserve.com",
    phone: "+91 98765 43215",
    bio: "Provides insurance consultation and risk assessment services. Experienced in international insurance markets.",
    availability: {
      monday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      tuesday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      wednesday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
      thursday: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      friday: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
    },
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
    advisor: "Mr. Rajesh Sharma",
    date: "2023-06-15",
    time: "10:00 AM - 11:00 AM",
    status: "Confirmed",
    notes: "Initial financial planning session",
    bookingType: "Vist Branch",
    advisorDetails: financialAdvisors[0],
  },
  {
    id: 2,
    advisor: "Ms. Priya Patel",
    date: "2023-06-20",
    time: "01:00 PM - 02:00 PM",
    status: "Pending",
    notes: "Tax consultation for small business",
    bookingType: "Chat",
    advisorDetails: financialAdvisors[1],
  },
  {
    id: 3,
    advisor: "Mr. Vikram Singh",
    date: "2023-06-25",
    time: "03:00 PM - 04:00 PM",
    status: "Confirmed",
    notes: "Retirement portfolio review",
    bookingType: "Call",
    advisorDetails: financialAdvisors[2],
  },
];

const feedbackSessions = [
  {
    id: 1,
    advisor: "Mr. Rajesh Sharma",
    date: "2024-03-10",
    time: "10:00 AM - 11:00 AM",
    type: "Investment Planning",
    rating: 5,
    feedback:
      "Excellent session with Mr. Sharma. He provided detailed insights on mutual funds and helped me restructure my portfolio for better returns. Highly recommended!",
  },
  {
    id: 2,
    advisor: "Ms. Priya Patel",
    date: "2024-03-12",
    time: "02:00 PM - 03:00 PM",
    type: "Tax Consultation",
    rating: 4,
    feedback:
      "Ms. Patel was very knowledgeable about tax saving options. She helped me understand how to optimize my tax planning for the current financial year.",
  },
  {
    id: 3,
    advisor: "Mr. Vikram Singh",
    date: "2024-03-15",
    time: "11:00 AM - 12:00 PM",
    type: "Retirement Planning",
    rating: 5,
    feedback:
      "Mr. Singh provided exceptional guidance on retirement planning. His strategies were tailored to my specific needs and long-term goals.",
  },
  {
    id: 4,
    advisor: "Mr. Aditya Kumar",
    date: "2024-03-14",
    time: "03:00 PM - 04:00 PM",
    type: "Loan & Mortgage Guidance",
    rating: 5,
    feedback:
      "Mr. Kumar provided excellent guidance on home loan options and helped me understand the best mortgage rates available. Very professional and knowledgeable!",
  },
];

const poppins = Poppins({
  weight: ["100", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function page() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConsultationType, setSelectedConsultationType] =
    useState(null);
  const [selectedBookingType, setSelectedBookingType] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [assignedAdvisor, setAssignedAdvisor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [appointments, setAppointments] = useState(existingAppointments);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [reschedulingHistory, setReschedulingHistory] = useState({});
  const [step, setStep] = useState(1); // 1: Select Type, 2: Select Booking Type, 3: Select Branch (if visit) or Review Advisor, 4: Review Advisor or Select Time, 5: Select Time
  const [pastSessions, setPastSessions] = useState(feedbackSessions);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState({});

  // Fetch appointments from Firestore on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsRef = collection(db, "appointments");
        const querySnapshot = await getDocs(appointmentsRef);
        const appointmentsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          // Find advisor details
          const advisorDetails = financialAdvisors.find(
            (advisor) => advisor.name === data.advisor
          );
          return {
            id: doc.id,
            ...data,
            advisorDetails: advisorDetails || null,
          };
        });
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments");
      }
    };

    fetchAppointments();
  }, []);

  const handleConsultationTypeSelect = (typeId) => {
    const selectedType = consultationTypes.find((type) => type.id === typeId);
    setSelectedConsultationType(selectedType);
    setStep(2);
  };

  const handleBookingTypeSelect = (typeId) => {
    const selectedType = bookingTypes.find((type) => type.id === typeId);
    setSelectedBookingType(selectedType);

    if (selectedType.name === "Visit Branch") {
      setStep(3); // Go to branch selection
    } else {
      // Automatically assign the best available advisor for this consultation type
      const availableAdvisors = financialAdvisors.filter(
        (advisor) => advisor.specialty === selectedConsultationType.name
      );

      if (availableAdvisors.length > 0) {
        // Sort by rating and reviews to get the best advisor
        const bestAdvisor = availableAdvisors.sort((a, b) => {
          if (b.rating === a.rating) {
            return b.reviews - a.reviews;
          }
          return b.rating - a.rating;
        })[0];

        setAssignedAdvisor(bestAdvisor);

        // Get available time slots for the assigned advisor
        const today = new Date();
        const days = [
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ];
        const dayOfWeek = days[today.getDay()];
        setAvailableTimeSlots(bestAdvisor.availability[dayOfWeek] || []);

        setStep(4); // Skip branch selection for non-visit appointments
      } else {
        toast.error("No advisors available for this consultation type");
      }
    }
  };

  const handleBranchSelect = (branchId) => {
    const selectedBranch = bankBranches.find(
      (branch) => branch.id === branchId
    );
    setSelectedBranch(selectedBranch);

    // After branch selection, proceed with advisor assignment
    const availableAdvisors = financialAdvisors.filter(
      (advisor) => advisor.specialty === selectedConsultationType.name
    );

    if (availableAdvisors.length > 0) {
      const bestAdvisor = availableAdvisors.sort((a, b) => {
        if (b.rating === a.rating) {
          return b.reviews - a.reviews;
        }
        return b.rating - a.rating;
      })[0];

      setAssignedAdvisor(bestAdvisor);

      const today = new Date();
      const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      const dayOfWeek = days[today.getDay()];
      setAvailableTimeSlots(bestAdvisor.availability[dayOfWeek] || []);

      setStep(4);
    } else {
      toast.error("No advisors available for this consultation type");
    }
  };

  const handleConfirmAdvisor = () => {
    setStep(4);
  };

  const handleBookAppointment = async () => {
    if (assignedAdvisor && selectedDate && selectedTime && selectedLanguage) {
      const newAppointment = {
        advisor: assignedAdvisor.name,
        date: selectedDate,
        time: selectedTime,
        status: "Confirmed",
        type: selectedConsultationType.name,
        bookingType: selectedBookingType.name,
        createdAt: new Date().toISOString(),
        advisorDetails: assignedAdvisor,
        selectedBranch:
          selectedBookingType.name === "Visit Branch" ? selectedBranch : null,
        language: selectedLanguage,
      };

      try {
        // Add appointment to Firestore
        const docRef = await addDoc(
          collection(db, "appointments"),
          newAppointment
        );

        // Update local state with the new appointment including Firestore ID
        setAppointments([
          ...appointments,
          { ...newAppointment, id: docRef.id },
        ]);

        // Reset the booking flow
        setSelectedConsultationType(null);
        setSelectedBookingType(null);
        setSelectedBranch(null);
        setAssignedAdvisor(null);
        setSelectedDate("");
        setSelectedTime("");
        setSelectedLanguage("");
        setStep(1);

        toast.success("Appointment booked successfully!");
      } catch (error) {
        console.error("Error booking appointment:", error);
        toast.error("Failed to book appointment");
      }
    } else {
      toast.error(
        "Please select date, time, and language preference for your appointment"
      );
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "appointments", appointmentId));

      // Update local state
      setAppointments(appointments.filter((app) => app.id !== appointmentId));
      toast.success("Appointment cancelled successfully");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  const handleRescheduleClick = (appointmentId) => {
    setRescheduleId(appointmentId);
    const appointment = appointments.find((app) => app.id === appointmentId);
    setRescheduleDate(appointment.date);
    setRescheduleTime(appointment.time);
  };

  const handleRescheduleSubmit = async () => {
    if (rescheduleDate && rescheduleTime) {
      try {
        const appointmentRef = doc(db, "appointments", rescheduleId);

        // Update in Firestore
        await updateDoc(appointmentRef, {
          date: rescheduleDate,
          time: rescheduleTime,
          status: "Confirmed",
          updatedAt: new Date().toISOString(),
        });

        // Update local state
        const updatedAppointments = appointments.map((app) =>
          app.id === rescheduleId
            ? {
                ...app,
                date: rescheduleDate,
                time: rescheduleTime,
                status: "Confirmed",
                updatedAt: new Date().toISOString(),
              }
            : app
        );

        setAppointments(updatedAppointments);
        setRescheduleId(null);
        toast.success("Appointment rescheduled successfully");
      } catch (error) {
        console.error("Error rescheduling appointment:", error);
        toast.error("Failed to reschedule appointment");
      }
    } else {
      toast.error("Please select both date and time");
    }
  };

  const handleCancelReschedule = () => {
    setRescheduleId(null);
  };

  const handleRating = (appointmentId, rating) => {
    setAppointments(
      appointments.map((app) =>
        app.id === appointmentId ? { ...app, rating } : app
      )
    );
  };

  const handleFeedback = (appointmentId, feedback) => {
    setAppointments(
      appointments.map((app) =>
        app.id === appointmentId ? { ...app, feedback } : app
      )
    );
  };

  const handleSubmitFeedback = async (appointmentId) => {
    const appointment = appointments.find((app) => app.id === appointmentId);
    if (!appointment.rating) {
      toast.error("Please provide a rating");
      return;
    }
    if (!appointment.feedback) {
      toast.error("Please provide feedback");
      return;
    }

    try {
      // Add feedback to Firestore
      await addDoc(collection(db, "feedback"), {
        appointmentId,
        advisorName: appointment.advisor,
        rating: appointment.rating,
        feedback: appointment.feedback,
        date: appointment.date,
        createdAt: new Date().toISOString(),
      });

      // Update appointment status in Firestore
      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, {
        hasFeedback: true,
      });

      toast.success("Thank you for your feedback!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    }
  };

  const handleSendMessage = async (advisorId, appointmentId) => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    try {
      // Add message to Firestore
      await addDoc(collection(db, "messages"), {
        appointmentId,
        advisorId,
        message,
        sentBy: "client",
        timestamp: new Date().toISOString(),
      });

      setMessage("");
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className={`${poppins.className} min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Banking Appointment Services
          </h1>

          <Tabs defaultValue="book-appointment" className="space-y-4">
            <TabsList>
              <TabsTrigger value="book-appointment">
                Book Appointment
              </TabsTrigger>
              <TabsTrigger value="my-appointments">My Appointments</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="book-appointment">
              <Card>
                <CardHeader>
                  <CardTitle>Book a Financial Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  {step === 1 && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Step 1: Select Consultation Type
                      </h3>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {consultationTypes.map((type) => (
                          <Card
                            key={type.id}
                            className={`cursor-pointer transition-all ${
                              selectedConsultationType?.id === type.id
                                ? "ring-2 ring-blue-500"
                                : "hover:shadow-lg"
                            }`}
                            onClick={() =>
                              handleConsultationTypeSelect(type.id)
                            }
                          >
                            <CardContent className="p-6">
                              <div className="text-3xl mb-4">{type.icon}</div>
                              <h3 className="text-lg font-semibold mb-2">
                                {type.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {type.description}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && selectedConsultationType && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Step 2: Select Booking Type
                      </h3>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {bookingTypes.map((type) => (
                          <Card
                            key={type.id}
                            className={`cursor-pointer transition-all ${
                              selectedBookingType?.id === type.id
                                ? "ring-2 ring-blue-500"
                                : "hover:shadow-lg"
                            }`}
                            onClick={() => handleBookingTypeSelect(type.id)}
                          >
                            <CardContent className="p-6 flex flex-col items-center">
                              <div className="mb-4 text-blue-600">
                                {type.icon}
                              </div>
                              <h3 className="text-lg font-semibold mb-2 text-center">
                                {type.name}
                              </h3>
                              <p className="text-sm text-gray-600 text-center">
                                {type.description}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Button variant="outline" onClick={() => setStep(1)}>
                          Back
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 &&
                    selectedBookingType?.name === "Visit Branch" && (
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Nearest Branches
                        </h3>
                        <div className="grid gap-6 md:grid-cols-2">
                          {bankBranches.map((branch) => (
                            <Card
                              key={branch.id}
                              className={`cursor-pointer transition-all ${
                                selectedBranch?.id === branch.id
                                  ? "ring-2 ring-blue-500"
                                  : "hover:shadow-lg"
                              }`}
                            >
                              <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-2">
                                  {branch.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                  {branch.address}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <Phone className="inline-block h-4 w-4 mr-2" />
                                  {branch.phone}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        {/* <div className="mt-4 flex justify-between">
                          <Button
                            variant="outline"
                            onClick={() => router.push("appointments")}
                          >
                            Back
                          </Button>
                        </div> */}
                      </div>
                    )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium mb-4">
                        Select Date, Time and Language Preference
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 text-gray-700">
                            Select Date
                          </label>
                          <Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 text-gray-700">
                            Select Time Slot
                          </label>
                          <select
                            className="w-full border rounded-md py-2 px-4 bg-white"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                          >
                            <option value="">Select Time Slot</option>
                            {availableTimeSlots.map((slot, index) => (
                              <option key={index} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 text-gray-700">
                            Preferred Language
                          </label>
                          <select
                            className="w-full border rounded-md py-2 px-4 bg-white"
                            value={selectedLanguage}
                            onChange={(e) =>
                              setSelectedLanguage(e.target.value)
                            }
                          >
                            <option value="">Select Language</option>
                            {assignedAdvisor?.languages.map(
                              (language, index) => (
                                <option key={index} value={language}>
                                  {language}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setStep(3)}>
                          Back
                        </Button>
                        <Button onClick={handleBookAppointment}>
                          Confirm Booking
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="my-appointments">
              <Card>
                <CardHeader>
                  <CardTitle>My Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {appointments.map((appointment) => (
                      <Card key={appointment.id} className="shadow-md">
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-semibold text-blue-700">
                                  {appointment.type}
                                </h3>
                                <span
                                  className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                                    appointment.status === "Confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {appointment.status}
                                </span>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  {appointment.bookingType}
                                </p>
                                {appointment.bookingType === "Visit Branch" &&
                                  appointment.selectedBranch && (
                                    <p className="text-sm text-gray-600">
                                      {appointment.selectedBranch.name}
                                    </p>
                                  )}
                              </div>
                            </div>

                            <div className="border-t border-b py-4">
                              <div className="flex items-start space-x-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage
                                    src="/placeholder.svg"
                                    alt={appointment.advisor}
                                  />
                                  <AvatarFallback>
                                    {appointment.advisor[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-semibold">
                                    {appointment.advisor}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {appointment.advisorDetails?.specialty}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {new Date(
                                  appointment.date
                                ).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                {appointment.time}
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="border rounded-lg p-4 bg-gray-50">
                                <div className="space-y-4 mb-4 max-h-40 overflow-y-auto">
                                  {(chatMessages[appointment.id] || []).map(
                                    (msg, idx) => (
                                      <div
                                        key={idx}
                                        className={`flex ${
                                          msg.sentBy === "client"
                                            ? "justify-end"
                                            : "justify-start"
                                        }`}
                                      >
                                        <div
                                          className={`rounded-lg px-4 py-2 max-w-[80%] ${
                                            msg.sentBy === "client"
                                              ? "bg-blue-500 text-white"
                                              : "bg-gray-200"
                                          }`}
                                        >
                                          {msg.message}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter") {
                                        handleSendMessage(
                                          appointment.advisorDetails.id,
                                          appointment.id
                                        );
                                      }
                                    }}
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleSendMessage(
                                        appointment.advisorDetails.id,
                                        appointment.id
                                      )
                                    }
                                  >
                                    Send
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {rescheduleId === appointment.id ? (
                              <div className="mt-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">
                                      New Date
                                    </label>
                                    <Input
                                      type="date"
                                      value={rescheduleDate}
                                      onChange={(e) =>
                                        setRescheduleDate(e.target.value)
                                      }
                                      min={
                                        new Date().toISOString().split("T")[0]
                                      }
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      New Time
                                    </label>
                                    <select
                                      className="w-full border rounded-md py-2 px-4"
                                      value={rescheduleTime}
                                      onChange={(e) =>
                                        setRescheduleTime(e.target.value)
                                      }
                                    >
                                      {availableTimeSlots.map((slot, index) => (
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
                                    onClick={handleCancelReschedule}
                                  >
                                    Cancel
                                  </Button>
                                  <Button onClick={handleRescheduleSubmit}>
                                    Confirm Reschedule
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-end space-x-2 mt-4">
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    handleRescheduleClick(appointment.id)
                                  }
                                >
                                  Reschedule
                                </Button>
                                <Button
                                  variant="outline"
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={() =>
                                    handleCancelAppointment(appointment.id)
                                  }
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
                    {pastSessions.map((session) => (
                      <Card key={session.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {session.advisor} - {session.type}
                              </h3>
                              <p className="text-sm text-gray-500">
                                <Calendar className="inline mr-2 h-4 w-4" />
                                {new Date(session.date).toLocaleDateString()}
                                <Clock className="inline ml-4 mr-2 h-4 w-4" />
                                {session.time}
                              </p>
                            </div>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-6 w-6 cursor-pointer ${
                                    star <= (session.rating || 0)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                  onClick={() => {
                                    setPastSessions(
                                      pastSessions.map((s) =>
                                        s.id === session.id
                                          ? { ...s, rating: star }
                                          : s
                                      )
                                    );
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          <Textarea
                            className="w-full p-2 border rounded-md"
                            rows={4}
                            placeholder="Share your thoughts about the session..."
                            value={session.feedback || ""}
                            onChange={(e) => {
                              setPastSessions(
                                pastSessions.map((s) =>
                                  s.id === session.id
                                    ? { ...s, feedback: e.target.value }
                                    : s
                                )
                              );
                            }}
                          />
                          <Button
                            className="mt-4"
                            onClick={() => {
                              toast.success("Feedback submitted successfully!");
                            }}
                          >
                            Submit Feedback
                          </Button>
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
