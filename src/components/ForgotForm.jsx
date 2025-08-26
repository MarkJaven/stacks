// src/components/ForgotPasswordModal.jsx
import React, { useState } from "react";
import { HiOutlineMail as Mail } from "react-icons/hi";
import { IoCloseSharp as X } from "react-icons/io5";

const ForgotPasswordModal = ({ onClose, onBackToLogin, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    onSubmit(email);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot your password</h2>
          <p className="text-gray-600">Quickly reset your password by entering your email</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors flex items-center justify-center space-x-1"
          >
            <span>←</span>
            <span>Back to Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
