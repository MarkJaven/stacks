// src/components/PasswordValidator.jsx
import React from 'react';
import { HiCheck, HiX } from 'react-icons/hi';

const PasswordValidator = ({ password, showRules = true }) => {
  const rules = [
    {
      id: 'length',
      text: 'Be at least 8 characters long',
      isValid: password.length >= 8
    },
    {
      id: 'uppercase',
      text: 'At least one uppercase letter (A-Z)',
      isValid: /[A-Z]/.test(password)
    },
    {
      id: 'special',
      text: 'At least one special character (!@#$%^&*)',
      isValid: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    }
  ];

  const getPasswordStrength = () => {
    const validRules = rules.filter(rule => rule.isValid).length;
    if (validRules === 0) return { text: '', color: '' };
    if (validRules === 1) return { text: 'Weak', color: 'text-red-600 bg-red-50 border-red-200' };
    if (validRules === 2) return { text: 'Medium', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' };
    if (validRules === 3) return { text: 'Strong', color: 'text-green-600 bg-green-50 border-green-200' };
    return { text: '', color: '' };
  };

  const strength = getPasswordStrength();
  const allRulesValid = rules.every(rule => rule.isValid);

  if (!showRules && password.length === 0) return null;

  return (
    <div className="mt-2">
      {/* Password Strength Indicator */}
      {password.length > 0 && strength.text && (
        <div className={`px-3 py-2 rounded-lg text-sm font-medium border mb-3 ${strength.color}`}>
          <div className="flex items-center">
            {strength.text === 'Weak' && <HiX className="w-4 h-4 mr-2" />}
            {strength.text === 'Strong' && <HiCheck className="w-4 h-4 mr-2" />}
            Password strength: {strength.text}
          </div>
        </div>
      )}

      {/* Rules List */}
      {showRules && (
        <div className="space-y-2">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`flex items-center text-sm transition-colors ${
                password.length === 0
                  ? 'text-gray-400'
                  : rule.isValid
                  ? 'text-green-600'
                  : 'text-red-500'
              }`}
            >
              <div className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${
                password.length === 0
                  ? 'bg-gray-200'
                  : rule.isValid
                  ? 'bg-green-100'
                  : 'bg-red-100'
              }`}>
                {password.length > 0 && (
                  rule.isValid ? (
                    <HiCheck className="w-3 h-3 text-green-600" />
                  ) : (
                    <HiX className="w-3 h-3 text-red-500" />
                  )
                )}
              </div>
              {rule.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordValidator;