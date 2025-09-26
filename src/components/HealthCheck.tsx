'use client';

import { useState } from 'react';
import { apiClient } from '../lib/api';

export default function HealthCheck() {
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<any>(null);

  const checkHealth = async () => {
    setStatus('checking');
    setMessage('');
    setResponse(null);

    try {
      const result = await apiClient.healthCheck();
      setStatus('success');
      setMessage('Backend is healthy!');
      setResponse(result);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Backend Health Check
      </h3>
      
      <button
        onClick={checkHealth}
        disabled={status === 'checking'}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-orange-300 transition-colors mb-4"
      >
        {status === 'checking' ? 'Checking...' : 'Check Backend'}
      </button>

      {status === 'success' && (
        <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-700 dark:text-green-300 font-semibold">✅ {message}</p>
          {response && (
            <pre className="mt-2 text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800/20 p-2 rounded">
              {typeof response === 'string' ? response : JSON.stringify(response, null, 2)}
            </pre>
          )}
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-300 font-semibold">❌ {message}</p>
          <p className="text-red-600 dark:text-red-400 text-xs mt-2">
            Make sure your backend is running on http://localhost:3001
          </p>
        </div>
      )}
    </div>
  );
}
