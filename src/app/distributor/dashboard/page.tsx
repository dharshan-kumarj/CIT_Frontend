export default function DistributorDashboard() {
  // Mock data for distributor dashboard
  const mockNotifications = [
    { id: 1, vendor: "TechCorp Industries", product: "Smart Home Security System", timeAgo: "2 hours ago", type: "new_request", priority: "high" },
    { id: 2, vendor: "EcoClean Solutions", product: "Eco-Friendly Cleaning Supplies", timeAgo: "1 day ago", type: "new_request", priority: "medium" },
    { id: 3, vendor: "TechCorp Industries", product: "Welcome link received", timeAgo: "3 days ago", type: "welcome_link", priority: "urgent" },
  ];

  const mockContracts = [
    { id: 1, vendor: "TechCorp Industries", product: "Smart Home Security System", status: "pending_signature", commission: "15%", dueDate: "2025-09-30" },
    { id: 2, vendor: "GreenTech Co.", product: "Solar Panel Installation Kit", status: "signed", commission: "12%", signedDate: "2025-09-15" },
  ];

  const mockTraining = [
    { id: 1, module: "Product Knowledge - Smart Home Systems", progress: 85, status: "in_progress", estimatedTime: "2 hours left" },
    { id: 2, module: "Sales Techniques & Best Practices", progress: 100, status: "completed", completedDate: "2025-09-20" },
    { id: 3, module: "Customer Support Guidelines", progress: 0, status: "not_started", estimatedTime: "4 hours" },
    { id: 4, module: "Platform Tools & Resources", progress: 45, status: "in_progress", estimatedTime: "3 hours left" },
  ];

  const mockOpportunities = [
    { id: 1, vendor: "MedTech Innovations", product: "Portable Health Monitors", location: "Your Region", commission: "18%", responses: 3, deadline: "2025-10-05" },
    { id: 2, vendor: "FitGear Pro", product: "Wireless Fitness Trackers", location: "Nationwide", commission: "14%", responses: 12, deadline: "2025-10-02" },
    { id: 3, vendor: "AutoParts Direct", product: "Electric Vehicle Chargers", location: "California", commission: "20%", responses: 7, deadline: "2025-10-08" },
  ];

  const overallProgress = Math.round(mockTraining.reduce((acc, module) => acc + module.progress, 0) / mockTraining.length);

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
                  <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, Metro Distribution Co.</p>
                </div>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                  <span className="text-xl">🔔</span>
                </button>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Partnerships</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">2</p>
              </div>
              <span className="text-2xl">🤝</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Training Progress</p>
                <p className="text-3xl font-bold text-orange-500">{overallProgress}%</p>
              </div>
              <span className="text-2xl">📚</span>
            </div>
          </div>
          
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
                <p className="text-3xl font-bold text-green-500">{mockOpportunities.length}</p>
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
              {mockNotifications.map((notification) => (
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
              ))}
            </div>
          </div>

          {/* Contract Status */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              📄 Contracts & Agreements
            </h2>
            
            <div className="space-y-4">
              {mockContracts.map((contract) => (
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
              ))}
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
            {mockTraining.map((module) => (
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
            ))}
          </div>
        </div>

        {/* Available Opportunities */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            🎯 New Opportunities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockOpportunities.map((opportunity) => (
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
