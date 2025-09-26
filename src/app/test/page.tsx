'use client';

import { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { apiClient } from '../../lib/api';
import HealthCheck from '../../components/HealthCheck';

export default function TestPage() {
  const { user, isLoggedIn } = useAuth();
  const [testResults, setTestResults] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async (testName: string, testFunction: () => Promise<any>) => {
    setIsLoading(true);
    try {
      const result = await testFunction();
      setTestResults((prev: any) => ({
        ...prev,
        [testName]: { success: true, data: result, error: null }
      }));
    } catch (error) {
      setTestResults((prev: any) => ({
        ...prev,
        [testName]: { 
          success: false, 
          data: null, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      }));
    }
    setIsLoading(false);
  };

  const tests = [
    {
      name: 'Health Check',
      description: 'Basic server connectivity',
      action: () => runTest('health', () => apiClient.healthCheck())
    },
    {
      name: 'Get Users',
      description: 'Fetch all users (requires auth)',
      action: () => runTest('users', () => apiClient.getUsers()),
      requiresAuth: true
    },
    {
      name: 'Get Profile',
      description: 'Get current user profile (requires auth)',
      action: () => runTest('profile', () => apiClient.getProfile()),
      requiresAuth: true
    },
    {
      name: 'Vendor Dashboard',
      description: 'Get vendor dashboard data (requires vendor auth)',
      action: () => runTest('vendorDashboard', () => apiClient.getVendorDashboard()),
      requiresAuth: true,
      role: 'vendor'
    },
    {
      name: 'Distributor Dashboard',
      description: 'Get distributor dashboard data (requires distributor auth)',
      action: () => runTest('distributorDashboard', () => apiClient.getDistributorDashboard()),
      requiresAuth: true,
      role: 'distributor'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Backend Connection Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test the connection between frontend and backend
          </p>
        </div>

        {/* Auth Status */}
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Authentication Status
          </h2>
          {isLoggedIn ? (
            <div className="text-green-600 dark:text-green-400">
              <p>✅ Logged in as: {user?.email}</p>
              <p>Role: {user?.role}</p>
              <p>Name: {user?.name || 'Not provided'}</p>
              <p>Company: {user?.companyName || 'Not provided'}</p>
            </div>
          ) : (
            <div className="text-orange-600 dark:text-orange-400">
              <p>⚠️ Not logged in - some tests will fail</p>
              <a href="/" className="text-orange-500 underline">Go to login</a>
            </div>
          )}
        </div>

        {/* Health Check Component */}
        <div className="mb-8">
          <HealthCheck />
        </div>

        {/* API Tests */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            API Endpoint Tests
          </h2>
          
          {tests.map((test) => (
            <div key={test.name} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {test.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {test.description}
                  </p>
                  {test.requiresAuth && (
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      Requires authentication{test.role && ` as ${test.role}`}
                    </p>
                  )}
                </div>
                <button
                  onClick={test.action}
                  disabled={
                    isLoading || 
                    (test.requiresAuth && !isLoggedIn) ||
                    (!!test.role && user?.role !== test.role)
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Testing...' : 'Test'}
                </button>
              </div>

              {/* Test Results */}
              {testResults[test.name.toLowerCase().replace(/ /g, '')] && (
                <div className="mt-4">
                  {testResults[test.name.toLowerCase().replace(/ /g, '')].success ? (
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="text-green-700 dark:text-green-300 font-semibold mb-2">
                        ✅ Success
                      </p>
                      <pre className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800/20 p-2 rounded overflow-auto">
                        {JSON.stringify(testResults[test.name.toLowerCase().replace(/ /g, '')].data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-red-700 dark:text-red-300 font-semibold">
                        ❌ Error: {testResults[test.name.toLowerCase().replace(/ /g, '')].error}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
