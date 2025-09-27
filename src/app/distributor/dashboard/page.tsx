'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import { apiClient } from '../../../lib/api';
import { useRouter } from 'next/navigation';

export default function DistributorDashboard() {
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

    if (user?.role !== 'distributor') {
      router.push('/vendor/dashboard');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const data = await apiClient.getDistributorDashboard();
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
  const notifications = (dashboardData as any)?.notifications || [];
  const partnerships = (dashboardData as any)?.partnerships || [];
  const trainingModules = (dashboardData as any)?.training || [];
  const opportunities = (dashboardData as any)?.opportunities || [];
  const stats = (dashboardData as any)?.stats || {};
  
  // Calculate training progress
  const overallProgress = trainingModules.length > 0 
    ? Math.round(trainingModules.reduce((acc: number, module: any) => acc + (module.progress || 0), 0) / trainingModules.length)
    : 0;
    
  // Transform partnerships into contracts format
  const contracts = partnerships.map((partnership: any) => ({
    id: partnership.id,
    vendor: partnership.vendor?.user?.companyName || 'Unknown Vendor',
    product: partnership.product || 'General Partnership',
    status: partnership.status,
    commission: `${partnership.commissionRate || 0}%`,
    createdDate: partnership.createdAt
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
                  <h1 className="text-2xl font-black text-gray-800 dark:text-white">Distributor Dashboard</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, {user?.name || user?.companyName || user?.email}</p>
                  {dashboardData && (
                    <p className="text-xs text-green-600">Connected to backend • {(dashboardData as any).timestamp ? new Date((dashboardData as any).timestamp).toLocaleTimeString() : ''}</p>
                  )}
                </div>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/distributor/training')}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                📚 Training Hub
              </button>
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                  <span className="text-xl">🔔</span>
                </button>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <button 
                onClick={logout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || 'D'}
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
              {(dashboardData as any).message || 'Successfully connected to distributor dashboard'}
            </p>
            <div className="mt-3 space-y-2">
              <div className="text-sm text-green-700 dark:text-green-300">
                <strong>Real Data from Backend:</strong>
              </div>
              <div className="bg-green-100 dark:bg-green-800/20 p-3 rounded text-xs space-y-1">
                <div>📊 Total Partnerships: {(dashboardData as any).stats?.totalPartnerships || 0}</div>
                <div>🎯 Available Opportunities: {(dashboardData as any).availableRequests?.length || 0}</div>
                <div>🎓 Training Progress: {(dashboardData as any).stats?.trainingCompletion || 0}%</div>
                <div>🔔 Notifications: {(dashboardData as any).notifications?.length || 0}</div>
                <div>👤 User: {(dashboardData as any).user?.firstName} {(dashboardData as any).user?.lastName}</div>
                <div>🏢 Company: {(dashboardData as any).user?.companyName}</div>
                <div>⏰ Last Updated: {(dashboardData as any).timestamp ? new Date((dashboardData as any).timestamp).toLocaleString() : 'N/A'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Partnerships</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalPartnerships || 0}</p>
              </div>
              <span className="text-2xl">🤝</span>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/distributor/training')}
            className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 p-6 rounded-2xl shadow-sm border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-all transform hover:scale-105 text-left w-full group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400">Training Progress</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{overallProgress}%</p>
                <p className="text-xs text-purple-500 dark:text-purple-400 mt-1">🎯 Click to level up!</p>
              </div>
              <span className="text-2xl group-hover:animate-bounce">📚</span>
            </div>
          </button>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Contracts</p>
                <p className="text-3xl font-bold text-red-500">1</p>
              </div>
              <span className="text-2xl">📝</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">New Opportunities</p>
                <p className="text-3xl font-bold text-green-500">{opportunities.length}</p>
              </div>
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Notifications & Requests */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              🔔 Recent Notifications
            </h2>
            
            <div className="space-y-4">
              {notifications.length > 0 ? notifications.map((notification: any) => (
                <div key={notification.id} className={`p-4 rounded-xl border-l-4 ${
                  notification.priority === 'urgent' ? 'bg-red-50 dark:bg-red-900/20 border-red-400' :
                  notification.priority === 'high' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-400' :
                  'bg-blue-50 dark:bg-blue-900/20 border-blue-400'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {notification.vendor}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        {notification.product}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {notification.timeAgo}
                      </p>
                    </div>
                    <button className="text-orange-500 hover:text-orange-600 text-sm font-medium whitespace-nowrap ml-4">
                      {notification.type === 'welcome_link' ? 'Open Link' : 'View Details'}
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No notifications yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Contract Status */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              📄 Contracts & Agreements
            </h2>
            
            <div className="space-y-4">
              {contracts.length > 0 ? contracts.map((contract: any) => (
                <div key={contract.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{contract.vendor}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{contract.product}</p>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                        Commission: {contract.commission}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      contract.status === 'signed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {contract.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {contract.status === 'signed' 
                        ? `Signed: ${contract.signedDate}` 
                        : `Due: ${contract.dueDate}`}
                    </p>
                    <button className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                      contract.status === 'pending_signature'
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {contract.status === 'pending_signature' ? 'Sign Contract' : 'View Contract'}
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No contracts yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Training Progress */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              📚 Training Progress
            </h2>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Overall Progress: <span className="font-semibold text-orange-500">{overallProgress}%</span>
              </div>
              {overallProgress === 100 && <span className="text-2xl">🎉</span>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainingModules.length > 0 ? trainingModules.map((module: any) => (
              <div key={module.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{module.module}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {module.status === 'completed' ? `Completed: ${module.completedDate}` : module.estimatedTime}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    module.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                    module.status === 'in_progress' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                  }`}>
                    {module.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        module.progress === 100 ? 'bg-green-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">{module.progress}%</p>
                </div>
                
                <button className={`w-full py-2 text-sm font-medium rounded-lg transition-colors ${
                  module.status === 'completed' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    : module.status === 'in_progress'
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}>
                  {module.status === 'completed' ? 'Review' : 
                   module.status === 'in_progress' ? 'Continue' : 'Start Module'}
                </button>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No training modules available</p>
              </div>
            )}
          </div>
        </div>

        {/* Available Opportunities */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            🎯 New Opportunities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {opportunities.length > 0 ? opportunities.map((opportunity: any) => (
              <div key={opportunity.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-orange-300 transition-colors">
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{opportunity.vendor}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{opportunity.product}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{opportunity.location}</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Commission:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{opportunity.commission}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Responses:</span>
                    <span className="font-medium">{opportunity.responses}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Deadline:</span>
                    <span className="font-medium">{opportunity.deadline}</span>
                  </div>
                </div>
                
                <button className="w-full py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors">
                  Express Interest
                </button>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No opportunities available</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
