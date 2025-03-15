'use client'
import { Star, Paperclip, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Poppins } from 'next/font/google';
import { Navbar } from '@/components/navbar';

const poppins = Poppins({
  weight: ["100", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [previousFeedback, setPreviousFeedback] = useState([
    {
      rating: 4,
      feedback: "The banking app is great, but it could use more features for better user experience.",
      attachment: "invoice.pdf",
    },
    {
      rating: 5,
      feedback: "Excellent service! The customer support was very helpful and quick to resolve my issues.",
      attachment: null,
    }
  ]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", { rating, feedback });
    setPreviousFeedback([
      ...previousFeedback,
      { rating, feedback, attachment: null }
    ]);
    setRating(0);
    setFeedback('');
  };

  return (<>
    <Navbar />
 
    <div className={`${poppins.className} flex-1 p-6 sm:p-8 lg:p-12`}>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 p-6">Feedback for Banking Services</h1>

        {/* Rating Section */}
        <section className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Rate Your Experience</h3>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleRatingChange(value)}
                className={`p-2 ${rating >= value ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                <Star className="h-6 w-6" />
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">{rating} out of 5</p>
        </section>

        {/* Feedback Section */}
        <section className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Feedback</h3>
          <textarea
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="Please share your feedback about our banking services"
            value={feedback}
            onChange={handleFeedbackChange}
          />
        </section>

        {/* Attachments Section */}
        <section className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Attach Supporting Documents</h3>
          <div className="flex items-center gap-4">
            <label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
              <Paperclip className="h-5 w-5 mr-2" />
              Attach a File
            </label>
            <input type="file" id="file-upload" className="hidden" />
            <div className="text-sm text-gray-500">Supported formats: PDF, PNG, JPG</div>
          </div>
        </section>

        {/* Submit Feedback Section */}
        <div className="flex justify-end p-6">
          <button
            type="submit"
            onClick={handleSubmitFeedback}
            className="bg-black text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </div>

        {/* Previous Feedback Section */}
        <section className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Previous Feedback</h3>
          <div className="space-y-4">
            {previousFeedback.map((item, index) => (
              <div key={index} className="border p-4 rounded-md">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-2 text-gray-900">{item.rating} out of 5</span>
                </div>
                <p className="text-gray-700 mt-2">{item.feedback}</p>
                {item.attachment && (
                  <div className="mt-2 text-sm text-gray-500">
                    Attachment: {item.attachment}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
    </>
  );
}
