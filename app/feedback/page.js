"use client";
import { Star, Paperclip, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

const poppins = Poppins({
  weight: ["100", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [previousFeedback, setPreviousFeedback] = useState([]);

  // Fetch feedback from Firestore on component mount
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedbackRef = collection(db, "feedback");
        const q = query(feedbackRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const feedbackData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPreviousFeedback(feedbackData);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    try {
      // Add feedback to Firestore
      await addDoc(collection(db, "feedback"), {
        rating,
        feedback,
        createdAt: new Date().toISOString(),
        attachment: null, // For future implementation of file attachments
      });

      // Update local state
      setPreviousFeedback([
        {
          rating,
          feedback,
          createdAt: new Date().toISOString(),
          attachment: null,
        },
        ...previousFeedback,
      ]);

      // Reset form
      setRating(0);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "feedback", feedbackId));

      // Update local state
      setPreviousFeedback(
        previousFeedback.filter((fb) => fb.id !== feedbackId)
      );
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className={`${poppins.className} flex-1 p-6 sm:p-8 lg:p-12`}>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-gray-900 p-6">
            Feedback for Banking Services
          </h1>

          {/* Rating Section */}
          <section className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Rate Your Experience
            </h3>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRatingChange(value)}
                  className={`p-2 ${
                    rating >= value ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  <Star className="h-6 w-6" />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">{rating} out of 5</p>
          </section>

          {/* Feedback Section */}
          <section className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Your Feedback
            </h3>
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Attach Supporting Documents
            </h3>
            <div className="flex items-center gap-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-600 hover:text-blue-800"
              >
                <Paperclip className="h-5 w-5 mr-2" />
                Attach a File
              </label>
              <input type="file" id="file-upload" className="hidden" />
              <div className="text-sm text-gray-500">
                Supported formats: PDF, PNG, JPG
              </div>
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Previous Feedback
            </h3>
            <div className="space-y-4">
              {previousFeedback.map((item, index) => (
                <div key={index} className="border p-4 rounded-md">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-2 text-gray-900">
                      {item.rating} out of 5
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{item.feedback}</p>
                  {item.attachment && (
                    <div className="mt-2 text-sm text-gray-500">
                      Attachment: {item.attachment}
                    </div>
                  )}
                  <div className="mt-2 text-sm text-gray-500">
                    Submitted at: {new Date(item.createdAt).toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleDeleteFeedback(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
