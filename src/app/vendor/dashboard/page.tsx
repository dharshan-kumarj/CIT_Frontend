export default function VendorDashboard() {
  // Mock data for vendor dashboard
  const mockDistributors = [
    { id: 1, name: "Metro Distribution Co.", status: "active", progress: 100, contractSigned: true, slackAccess: true, location: "New York" },
    { id: 2, name: "Regional Supply Chain", status: "training", progress: 65, contractSigned: true, slackAccess: true, location: "California" },
    { id: 3, name: "Global Logistics Ltd", status: "pending_contract", progress: 0, contractSigned: false, slackAccess: false, location: "Texas" },
    { id: 4, name: "FastTrack Distributors", status: "training", progress: 30, contractSigned: true, slackAccess: true, location: "Florida" },
  ];

  const mockRequests = [
    { id: 1, product: "Smart Home Security System", datePosted: "2025-09-20", responses: 12, status: "active" },
    { id: 2, product: "Eco-Friendly Cleaning Supplies", datePosted: "2025-09-18", responses: 8, status: "active" },
    { id: 3, product: "Wireless Phone Chargers", datePosted: "2025-09-15", responses: 23, status: "closed" },
  ];

  const mockAlerts = [
    { id: 1, type: "contract_pending", message: "Global Logistics Ltd hasn't signed their contract yet (3 days overdue)", urgent: true },
    { id: 2, type: "training_stalled", message: "FastTrack Distributors training progress stalled at 30%", urgent: false },
    { id: 3, type: "new_response", message: "New distributor interested in Smart Home Security System", urgent: false },
  ];

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
                  <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, TechCorp Industries</p>
                </div>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                <span className="text-xl">🔔</span>
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Alert Section */}
        {mockAlerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              🚨 Things that need your attention
            </h2>
            <div className="space-y-3">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border-l-4 ${
                    alert.urgent
                      ? "bg-red-50 dark:bg-red-900/20 border-red-400"
                      : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400"
                  }`}
                >
                  <p className="text-gray-800 dark:text-gray-200">{alert.message}</p>
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
                <p className="text-3xl font-bold text-gray-900 dark:text-white">4</p>
              </div>
              <span className="text-2xl">📦</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Products Listed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">3</p>
              </div>
              <span className="text-2xl">🛍️</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Contracts</p>
                <p className="text-3xl font-bold text-orange-500">1</p>
              </div>
              <span className="text-2xl">📝</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Training Progress</p>
                <p className="text-3xl font-bold text-green-500">65%</p>
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
              {mockDistributors.map((distributor) => (
                <div key={distributor.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{distributor.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{distributor.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {distributor.contractSigned && <span className="text-green-500 text-sm">✓ Contract</span>}
                      {distributor.slackAccess && <span className="text-blue-500 text-sm">💬 Slack</span>}
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Training Progress</span>
                      <span className="font-medium">{distributor.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${distributor.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      distributor.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      distributor.status === 'training' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {distributor.status.replace('_', ' ')}
                    </span>
                    <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
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
              {mockRequests.map((request) => (
                <div key={request.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{request.product}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Posted: {request.datePosted}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {request.responses} distributor responses
                      </span>
                      {request.responses > 10 && <span className="text-green-500">🔥</span>}
                    </div>
                    <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                      View Responses
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            🏆 Distributor Leaderboard
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockDistributors
              .sort((a, b) => b.progress - a.progress)
              .map((distributor, index) => (
                <div key={distributor.id} className={`p-4 rounded-xl ${
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
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{distributor.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{distributor.progress}% complete</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
