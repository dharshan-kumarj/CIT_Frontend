'use client';

import React, { useState } from 'react';
import { useAuth } from '../lib/auth-context';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  onClose?: () => void;
}

export default function AuthForm({ onClose }: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'vendor' | 'distributor'>('vendor');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    companyName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const user = await login(formData.email, formData.password, role);
        setSuccess('Login successful! Redirecting...');
        
        onClose?.();
        
        // Navigate based on user's actual role from backend
        setTimeout(() => {
          if (user.role === 'vendor') {
            router.push('/vendor/dashboard');
          } else if (user.role === 'distributor') {
            router.push('/distributor/dashboard');
          } else {
            router.push('/dashboard');
          }
        }, 1000);
      } else {
        await register(formData, role);
        setSuccess('Registration successful! Please login.');
        setMode('login');
        setFormData({ email: formData.email, password: '', name: '', companyName: '' });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 transform -rotate-12">
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === 'login' ? 'Welcome Back!' : 'Join BizLink'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {mode === 'login' 
              ? 'Sign in to your account' 
              : 'Create your account to get started'
            }
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            I am a:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('vendor')}
              className={`p-3 rounded-lg border-2 transition-all ${
                role === 'vendor'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="font-semibold">Vendor</div>
              <div className="text-sm opacity-75">Sell products</div>
            </button>
            <button
              type="button"
              onClick={() => setRole('distributor')}
              className={`p-3 rounded-lg border-2 transition-all ${
                role === 'distributor'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="font-semibold">Distributor</div>
              <div className="text-sm opacity-75">Buy & distribute</div>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="you@company.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="••••••••"
            />
          </div>

          {/* Additional fields for registration */}
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Your Company Inc."
                />
              </div>
            </>
          )}

          {/* Success message */}
          {success && (
            <div className="p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-700 dark:text-green-300 text-sm">{success}</p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-lg transition-colors"
          >
            {isLoading 
              ? 'Please wait...' 
              : mode === 'login' 
                ? 'Sign In' 
                : 'Create Account'
            }
          </button>
        </form>

        {/* Test Credentials */}
        {mode === 'login' && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-sm mb-2">
              🧪 Test Credentials (Click to fill)
            </h4>
            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, email: 'vendor1@techcorp.com', password: 'password123' });
                  setRole('vendor');
                }}
                className="block w-full text-left p-2 bg-blue-100 dark:bg-blue-800/30 rounded hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
              >
                <strong>Vendor:</strong> vendor1@techcorp.com / password123
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, email: 'distributor1@fastdist.com', password: 'password123' });
                  setRole('distributor');
                }}
                className="block w-full text-left p-2 bg-blue-100 dark:bg-blue-800/30 rounded hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
              >
                <strong>Distributor:</strong> distributor1@fastdist.com / password123
              </button>
            </div>
          </div>
        )}

        {/* Switch mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
