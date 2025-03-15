"use client"

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, FileText, Calendar, BarChart, MessageSquare, HelpCircle, Menu, X } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Query", href: "/query", icon: HelpCircle },
  { name: "Appointments", href: "/appointments", icon: Calendar },
  { name: "Tickets", href: "/tickets", icon: FileText },
  { name: "Insights", href: "/insights", icon: BarChart },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname === "/") return null;

  return (
    <nav className="p-4 bg-gray-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-3xl font-bold text-primary">FinServe</Link>
        
        {/* Menu button for mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-primary">
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <motion.div
                  className={`flex items-center p-2 rounded-lg ${pathname === item.href ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-6 h-6 mr-2" />
                  <span className="text-lg">{item.name}</span>
                </motion.div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-gray-100 shadow-md p-4 mt-2"
          >
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    <div className={`flex items-center p-2 rounded-lg ${pathname === item.href ? "text-primary" : "text-gray-600 hover:text-primary"}`}>
                      <item.icon className="w-6 h-6 mr-2" />
                      <span className="text-lg">{item.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
