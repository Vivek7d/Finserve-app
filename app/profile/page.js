import { Camera, Plus, Trash2 } from 'lucide-react'
import React from 'react'
import { Poppins } from 'next/font/google';
import { Navbar } from "@/components/navbar"; // Importing Navbar

const poppins = Poppins({
    weight: ["100", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

export default function BankingProfile() {
  return (
    <>
      <Navbar /> {/* Adding Navbar component */}
      <div className={`${poppins.className} flex-1 p-6 sm:p-8 lg:p-12`}>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-gray-900 p-6">Banking Profile</h1>

          {/* Profile Picture */}
          <div className="flex items-center p-6 border-b border-gray-200">
            <div className="relative">
              <img
                src="./profile.jpg"
               
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                <Camera className="h-5 w-5" />
                <span className="sr-only">Change profile picture</span>
              </button>
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold text-gray-900">John Doe</h2>
              
            </div>
          </div>

          {/* Banking Information */}
          <section className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Banking Information</h3>
            <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Account Number</label>
                <input type="text" id="accountNumber" name="accountNumber" value="**** **** **** 1234" readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input type="text" id="bankName" name="bankName" value="Union Bank of India" readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">IFSC Code</label>
                <input type="text" id="ifscCode" name="ifscCode" value="UBIN1234567" readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Account Type</label>
                <input type="text" id="accountType" name="accountType" value="Current Account" readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </form>
          </section>

          {/* Balance Information */}
          <section className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Balance Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-start p-4 border rounded-lg bg-gray-50">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Current Balance</h4>
                  <p className="text-gray-600">₹50,000.00</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <Plus className="h-5 w-5" />
                  <span className="sr-only">Deposit Money</span>
                </button>
              </div>
            </div>
            <button className="mt-4 flex items-center text-blue-600 hover:text-blue-800">
              <Plus className="h-5 w-5 mr-2" />
              Add Deposit
            </button>
          </section>

          {/* Transaction History */}
          <section className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-start p-4 border rounded-lg bg-gray-50">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Transfer to ABC Corp</h4>
                  <p className="text-gray-600">₹10,000.00</p>
                  <p className="text-sm text-gray-500">January 10, 2025</p>
                </div>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">Delete transaction</span>
                </button>
              </div>
              <div className="flex justify-between items-start p-4 border rounded-lg bg-gray-50">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Deposit from ABC Corp</h4>
                  <p className="text-gray-600">₹15,000.00</p>
                  <p className="text-sm text-gray-500">January 8, 2025</p>
                </div>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">Delete transaction</span>
                </button>
              </div>
            </div>
            <button className="mt-4 flex items-center text-blue-600 hover:text-blue-800">
              <Plus className="h-5 w-5 mr-2" />
              Add Transaction
            </button>
          </section>

          {/* Save Button */}
          <div className="flex justify-end p-6">
            <button type="submit" className="bg-black text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700">
              Save Banking Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
