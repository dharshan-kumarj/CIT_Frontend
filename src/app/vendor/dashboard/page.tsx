'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import { apiClient } from '../../../lib/api';
import { useRouter } from 'next/navigation';

export default function VendorDashboard() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
      return;
    }

    if (user?.role !== 'vendor') {
      router.push('/distributor/dashboard');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const data = await apiClient.getVendorDashboard();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn || !user) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p>Redirecting...</p>
      </div>
    </div>;
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p>Loading dashboard...</p>
      </div>
    </div>;
  }
  // Extract real data from backend API response
  const distributors = (dashboardData as any)?.partnerships || [];
  const productRequests = (dashboardData as any)?.requests || [];
  const notifications = (dashboardData as any)?.notifications || [];
  const stats = (dashboardData as any)?.stats || {};
  
  // Transform notifications into alerts format
  const alerts = notifications.filter((notif: any) => notif.type === 'alert').map((notif: any) => ({
    id: notif.id,
    type: notif.type,
    message: notif.message,
    urgent: notif.priority === 'high'
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center transform -rotate-12">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-800 dark:text-white">Vendor Dashboard</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, {user?.name || user?.companyName || user?.email}</p>
                  {dashboardData && (
                    <p className="text-xs text-green-600">Connected to backend • {(dashboardData as any).timestamp ? new Date((dashboardData as any).timestamp).toLocaleTimeString() : ''}</p>
                  )}
                </div>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                <span className="text-xl">🔔</span>
              </button>
              <button 
                onClick={logout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || 'V'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="font-semibold text-red-800 dark:text-red-200">Connection Error</h3>
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            <p className="text-red-600 dark:text-red-400 text-xs mt-2">
              Make sure the backend server is running at http://localhost:3002
            </p>
          </div>
        )}

        {/* Success Display */}
        {dashboardData && (
          <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="font-semibold text-green-800 dark:text-green-200">✅ Connected to Backend</h3>
            <p className="text-green-700 dark:text-green-300 text-sm">
              {(dashboardData as any).message || 'Successfully connected to vendor dashboard'}
            </p>
            <div className="mt-3 space-y-2">
              <div className="text-sm text-green-700 dark:text-green-300">
                <strong>Real Data from Backend:</strong>
              </div>
              <div className="bg-green-100 dark:bg-green-800/20 p-3 rounded text-xs space-y-1">
                <div>📊 Total Partnerships: {(dashboardData as any).stats?.totalPartnerships || 0}</div>
                <div>📋 Product Requests: {(dashboardData as any).stats?.totalRequests || 0}</div>
                <div>🔔 Notifications: {(dashboardData as any).notifications?.length || 0}</div>
                <div>👤 User: {(dashboardData as any).user?.firstName} {(dashboardData as any).user?.lastName}</div>
                <div>🏢 Company: {(dashboardData as any).user?.companyName}</div>
                <div>⏰ Last Updated: {(dashboardData as any).timestamp ? new Date((dashboardData as any).timestamp).toLocaleString() : 'N/A'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Alert Section */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              🚨 Things that need your attention
            </h2>
            <div className="space-y-3">
              {alerts.map((alert: any) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border-l-4 ${
                    alert.urgent
                      ? "bg-red-50 dark:bg-red-900/20 border-red-400"
                      : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400"
                  }`}
                >
                  <p className="text-gray-800 dark:text-gray-200">{alert.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(alert.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Distributors</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalPartnerships || 0}</p>
              </div>
              <span className="text-2xl">📦</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Product Requests</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalRequests || 0}</p>
              </div>
              <span className="text-2xl">🛍️</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Notifications</p>
                <p className="text-3xl font-bold text-orange-500">{notifications.length || 0}</p>
              </div>
              <span className="text-2xl">�</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Partnerships</p>
                <p className="text-3xl font-bold text-green-500">{distributors.filter((d: any) => d.status === 'active').length || 0}</p>
              </div>
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Distributor Management */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Your Distributors
              </h2>
              <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors">
                Send Welcome Link
              </button>
            </div>
            
            <div className="space-y-4">
              {distributors.length > 0 ? distributors.map((partnership: any) => (
                <div key={partnership.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {partnership.distributor?.user?.companyName || 'Unknown Company'}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {partnership.distributor?.user?.firstName} {partnership.distributor?.user?.lastName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        partnership.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        partnership.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                      }`}>
                        {partnership.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Commission Rate</span>
                      <span className="font-medium">{partnership.commissionRate || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((partnership.commissionRate || 0) * 2, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Started: {new Date(partnership.createdAt).toLocaleDateString()}
                    </div>
                    <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No distributors yet</p>
                  <p className="text-sm">Send invitation links to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* Product Requests */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Your Product Requests
              </h2>
              <button className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                + New Request
              </button>
            </div>
            
            <div className="space-y-4">
              {productRequests.length > 0 ? productRequests.map((request: any) => (
                <div key={request.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{request.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Posted: {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{request.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Budget: ${request.budget || 'Not specified'}
                      </span>
                      {request.urgency === 'high' && <span className="text-red-500">🔥</span>}
                    </div>
                    <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No product requests yet</p>
                  <p className="text-sm">Create your first request to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            🏆 Distributor Leaderboard
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {distributors.length > 0 ? distributors
              .sort((a: any, b: any) => (b.commissionRate || 0) - (a.commissionRate || 0))
              .slice(0, 6)
              .map((partnership: any, index: number) => (
                <div key={partnership.id} className={`p-4 rounded-xl ${
                  index === 0 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300' :
                  index === 1 ? 'bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-300' :
                  index === 2 ? 'bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-300' :
                  'bg-gray-50 dark:bg-gray-700/30'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📍'}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {partnership.distributor?.user?.companyName || 'Unknown'}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {partnership.commissionRate || 0}% commission
                      </p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-3 text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No partnerships to rank yet</p>
                </div>
              )}
          </div>
        </div>
      </main>
    </div>
  );
}
