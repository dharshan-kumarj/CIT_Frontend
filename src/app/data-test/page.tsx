'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth-context';
import { apiClient } from '../../lib/api';

export default function DataTestPage() {
  const { user, isLoggedIn } = useAuth();
  const [testResults, setTestResults] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const tests = [
    {
      name: 'Health Check',
      endpoint: '/',
      method: 'GET',
      requiresAuth: false,
      action: () => apiClient.healthCheck()
    },
    {
      name: 'Get Profile',
      endpoint: '/profile',
      method: 'GET', 
      requiresAuth: true,
      action: () => apiClient.getProfile()
    },
    {
      name: 'Get All Users',
      endpoint: '/users',
      method: 'GET',
      requiresAuth: true,
      action: () => apiClient.getUsers()
    },
    {
      name: 'Vendor Dashboard',
      endpoint: '/vendor/dashboard',
      method: 'GET',
      requiresAuth: true,
      role: 'vendor',
      action: () => apiClient.getVendorDashboard()
    },
    {
      name: 'Distributor Dashboard',
      endpoint: '/distributor/dashboard',
      method: 'GET',
      requiresAuth: true,
      role: 'distributor',
      action: () => apiClient.getDistributorDashboard()
    }
  ];

  const runTest = async (test: any) => {
    setIsLoading(true);
    try {
      const result = await test.action();
      setTestResults(prev => ({
        ...prev,
        [test.name]: { success: true, data: result, error: null }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [test.name]: { 
          success: false, 
          data: null, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      }));
    }
    setIsLoading(false);
  };

  const runAllTests = async () => {
    setTestResults({});
    for (const test of tests) {
      if (test.requiresAuth && !isLoggedIn) continue;
      if (test.role && user?.role !== test.role) continue;
      await runTest(test);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Backend Data Testing Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test all API endpoints and view real data from the backend
          </p>
        </div>

        {/* Auth Status */}
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Authentication Status
          </h2>
          {isLoggedIn ? (
            <div className="text-green-600 dark:text-green-400 space-y-1">
              <p>✅ Logged in as: <strong>{user?.email}</strong></p>
              <p>👤 Role: <strong>{user?.role}</strong></p>
              <p>🏢 Company: <strong>{user?.companyName || 'Not provided'}</strong></p>
              <p>📧 Email: <strong>{user?.email}</strong></p>
            </div>
          ) : (
            <div className="text-orange-600 dark:text-orange-400">
              <p>⚠️ Not logged in - some tests will be skipped</p>
              <a href="/" className="text-orange-500 underline">Go to login page</a>
            </div>
          )}
        </div>

        {/* Test Controls */}
        <div className="mb-6 text-center">
          <button
            onClick={runAllTests}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors mr-4"
          >
            {isLoading ? 'Running Tests...' : 'Run All Available Tests'}
          </button>
          <button
            onClick={() => setTestResults({})}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Clear Results
          </button>
        </div>

        {/* Test Results */}
        <div className="space-y-6">
          {tests.map((test) => {
            const result = testResults[test.name];
            const canRun = !test.requiresAuth || (isLoggedIn && (!test.role || user?.role === test.role));
            
            return (
              <div key={test.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {test.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                        {test.method} {test.endpoint}
                      </span>
                    </p>
                    {test.requiresAuth && (
                      <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                        Requires authentication{test.role && ` as ${test.role}`}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => runTest(test)}
                    disabled={isLoading || !canRun}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Testing...' : 'Test'}
                  </button>
                </div>

                {!canRun && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                      {!isLoggedIn ? 'Please login to test this endpoint' : `Requires ${test.role} role`}
                    </p>
                  </div>
                )}

                {result && (
                  <div className="mt-4">
                    {result.success ? (
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                          <p className="text-green-700 dark:text-green-300 font-semibold mb-2">
                            ✅ Success
                          </p>
                        </div>
                        
                        {/* Pretty display of the data */}
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Response Data:
                          </h4>
                          <div className="space-y-2 text-sm">
                            {typeof result.data === 'string' ? (
                              <div className="bg-white dark:bg-gray-800 p-2 rounded border">
                                <span className="text-gray-900 dark:text-white">{result.data}</span>
                              </div>
                            ) : (
                              Object.entries(result.data || {}).map(([key, value]) => (
                                <div key={key} className="bg-white dark:bg-gray-800 p-2 rounded border">
                                  <span className="font-medium text-blue-600 dark:text-blue-400">{key}:</span>
                                  <span className="text-gray-900 dark:text-white ml-2">
                                    {typeof value === 'object' ? 
                                      Array.isArray(value) ? 
                                        `Array(${value.length})` : 
                                        value ? 'Object' : 'null'
                                      : String(value)
                                    }
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                          
                          {/* Raw JSON for detailed inspection */}
                          <details className="mt-3">
                            <summary className="cursor-pointer text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                              View Raw JSON
                            </summary>
                            <pre className="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto max-h-40">
                              {JSON.stringify(result.data, null, 2)}
                            </pre>
                          </details>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-700 dark:text-red-300 font-semibold">
                          ❌ Error: {result.error}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center space-x-4">
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            ← Back to Home
          </a>
          {user?.role === 'vendor' && (
            <a 
              href="/vendor/dashboard"
              className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Vendor Dashboard →
            </a>
          )}
          {user?.role === 'distributor' && (
            <a 
              href="/distributor/dashboard" 
              className="inline-block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Distributor Dashboard →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}