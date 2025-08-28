// src/components/ResetForm.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import forgotPassImg from "../images/forgot-pass-img.png";
import { AuthService } from "../services/AuthService";

const ResetForm = ({ onClose, onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setError("");
    
    try {
      console.log('🚀 Attempting to send password reset email to:', email);
      
      const result = await AuthService.sendPasswordReset(email);
      
      if (result.success) {
        console.log('✅ Password reset email sent successfully!');
        setIsSubmitted(true);
      } else {
        console.error('❌ Failed to send reset email:', result.error);
        setError(result.error);
      }
    } catch (error) {
      console.error("❌ Unexpected error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center p-6"
      >
        <div className="w-32 h-32 mb-6 flex items-center justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Check your email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to <strong>{email}</strong>
        </p>
        <button
          onClick={onBackToLogin}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          ← Back to Login
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center p-6"
    >
      <div className="w-32 h-32 mb-6 flex items-center justify-center">
        <img 
          src={forgotPassImg} 
          alt="Forgot Password" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
        Forgot your password
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Quickly reset your password by entering your email
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Sending..." : "Submit"}
        </button>
      </form>

      <button
        onClick={onBackToLogin}
        className="mt-6 text-gray-600 hover:text-gray-800 font-medium transition-colors flex items-center"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Login
      </button>
    </motion.div>
  );
};

export default ResetForm;