'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import { useRouter } from 'next/navigation';
import TrainingModuleCard from '../../../components/TrainingModuleCard';

export default function DistributorTraining() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());

  const handleStartModule = (moduleId: number) => {
    setActiveModule(moduleId);
    console.log(`Starting module ${moduleId}`);
    // Here you would typically navigate to the module content or open a modal
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
      return;
    }

    if (user?.role !== 'distributor') {
      router.push('/vendor/dashboard');
      return;
    }
  }, [isLoggedIn, user, router]);

  // Mock training data for technical distributor
  const trainingModules = [
    {
      id: 1,
      title: "Smart Home Systems Mastery",
      category: "Technical Skills",
      difficulty: "Advanced",
      duration: "45 mins",
      points: 150,
      progress: 85,
      status: "in_progress",
      icon: "🏠",
      description: "Master the technical aspects of smart home installations and troubleshooting",
      lessons: 12,
      completedLessons: 10,
      nextLesson: "Advanced IoT Integration"
    },
    {
      id: 2,
      title: "Customer Communication Excellence",
      category: "Soft Skills",
      difficulty: "Intermediate",
      duration: "30 mins",
      points: 100,
      progress: 100,
      status: "completed",
      icon: "💬",
      description: "Learn effective communication strategies for technical explanations",
      lessons: 8,
      completedLessons: 8,
      completedDate: "2025-09-25"
    },
    {
      id: 3,
      title: "Network Security Fundamentals",
      category: "Technical Skills",
      difficulty: "Advanced",
      duration: "60 mins",
      points: 200,
      progress: 45,
      status: "in_progress",
      icon: "🔒",
      description: "Understand cybersecurity principles for smart device installations",
      lessons: 15,
      completedLessons: 7,
      nextLesson: "Firewall Configuration"
    },
    {
      id: 4,
      title: "Sales Psychology & Persuasion",
      category: "Business Skills",
      difficulty: "Intermediate",
      duration: "40 mins",
      points: 120,
      progress: 0,
      status: "locked",
      icon: "🧠",
      description: "Advanced sales techniques for technical products",
      lessons: 10,
      completedLessons: 0,
      requirement: "Complete Customer Communication Excellence"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "vendor_post",
      vendor: "TechCorp Solutions",
      vendorAvatar: "T",
      action: "posted new product training",
      product: "Smart Doorbell Pro Max",
      timeAgo: "2 hours ago",
      engagement: { likes: 12, comments: 3 },
      category: "Product Launch"
    },
    {
      id: 2,
      type: "achievement",
      user: "Sarah Chen",
      userAvatar: "S",
      action: "completed Network Security certification",
      achievement: "Security Expert Badge",
      timeAgo: "4 hours ago",
      engagement: { likes: 24, comments: 8 },
      category: "Achievement"
    },
    {
      id: 3,
      type: "vendor_post",
      vendor: "EcoTech Innovations",
      vendorAvatar: "E",
      action: "shared installation tips",
      product: "Solar Panel Monitoring System",
      timeAgo: "6 hours ago",
      engagement: { likes: 18, comments: 12 },
      category: "Tips & Tricks"
    },
    {
      id: 4,
      type: "challenge",
      challenge: "Weekly Tech Quiz",
      description: "Test your smart home knowledge",
      participants: 45,
      timeLeft: "2 days",
      reward: "250 points + Premium Badge",
      category: "Challenge"
    },
    {
      id: 5,
      type: "peer_achievement",
      user: "Mike Rodriguez",
      userAvatar: "M",
      action: "reached Level 15 Technical Expert",
      milestone: "1000+ installations completed",
      timeAgo: "8 hours ago",
      engagement: { likes: 31, comments: 15 },
      category: "Milestone"
    }
  ];

  const userStats = {
    level: 12,
    totalPoints: 2450,
    nextLevelPoints: 2800,
    weeklyStreak: 7,
    completedModules: 15,
    achievements: 8,
    rank: 23,
    totalDistributors: 156
  };

  const weeklyLeaderboard = [
    { name: "Alex Thompson", points: 380, avatar: "A", level: 15, badge: "🥇" },
    { name: "Sarah Chen", points: 360, avatar: "S", level: 14, badge: "🥈" },
    { name: "You", points: 340, avatar: user?.name?.[0] || "D", level: 12, badge: "🥉", isCurrentUser: true },
    { name: "Mike Rodriguez", points: 325, avatar: "M", level: 13, badge: "4️⃣" },
    { name: "Lisa Park", points: 310, avatar: "L", level: 11, badge: "5️⃣" }
  ];

  if (!isLoggedIn || !user) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/distributor/dashboard')}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center transform -rotate-12">
                  <span className="text-white font-bold text-lg">📚</span>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-800 dark:text-white">Training Hub</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Level up your technical skills</p>
                </div>
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              {/* User Stats */}
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-3 py-1 rounded-full">
                  <span className="text-purple-600 dark:text-purple-400">⚡</span>
                  <span className="font-medium">{userStats.weeklyStreak} day streak</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-3 py-1 rounded-full">
                  <span className="text-yellow-600 dark:text-yellow-400">🏆</span>
                  <span className="font-medium">Level {userStats.level}</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-3 py-1 rounded-full">
                  <span className="text-green-600 dark:text-green-400">💎</span>
                  <span className="font-medium">{userStats.totalPoints.toLocaleString()} pts</span>
                </div>
              </div>
              
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || 'D'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Progress Overview */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Progress</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Next Level:</span>
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((userStats.totalPoints - (userStats.level * 200)) / 350) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-medium">{userStats.nextLevelPoints - userStats.totalPoints} pts to go</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                  <div className="text-2xl mb-2">📖</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userStats.completedModules}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Modules</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <div className="text-2xl mb-2">🏅</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{userStats.achievements}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Badges</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{userStats.weeklyStreak}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">#{userStats.rank}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rank</div>
                </div>
              </div>
            </div>

            {/* Training Modules */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Training Modules</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trainingModules.map((module) => (
                  <TrainingModuleCard 
                    key={module.id}
                    module={module}
                    onStartModule={handleStartModule}
                  />
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                🚀 Community Feed
              </h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        activity.type === 'vendor_post' ? 'bg-gradient-to-r from-blue-500 to-purple-600' :
                        activity.type === 'achievement' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                        activity.type === 'challenge' ? 'bg-gradient-to-r from-orange-500 to-red-600' :
                        'bg-gradient-to-r from-purple-500 to-pink-600'
                      }`}>
                        {activity.type === 'vendor_post' ? activity.vendorAvatar :
                         activity.type === 'challenge' ? '🎯' :
                         activity.userAvatar}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            activity.category === 'Product Launch' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                            activity.category === 'Achievement' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                            activity.category === 'Tips & Tricks' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                            activity.category === 'Challenge' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                            'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400'
                          }`}>
                            {activity.category}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{activity.timeAgo}</span>
                        </div>
                        
                        <p className="text-gray-900 dark:text-white mb-2">
                          <span className="font-semibold">
                            {activity.vendor || activity.user || activity.challenge}
                          </span>
                          {' '}{activity.action}
                          {activity.product && <span className="font-medium text-blue-600 dark:text-blue-400"> {activity.product}</span>}
                          {activity.achievement && <span className="font-medium text-green-600 dark:text-green-400"> {activity.achievement}</span>}
                        </p>
                        
                        {activity.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{activity.description}</p>
                        )}
                        
                        {activity.participants && (
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span>👥 {activity.participants} participants</span>
                            <span>⏰ {activity.timeLeft} left</span>
                            <span className="text-orange-600 dark:text-orange-400 font-medium">🏆 {activity.reward}</span>
                          </div>
                        )}
                        
                        {activity.milestone && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{activity.milestone}</p>
                        )}
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                          {activity.engagement && (
                            <>
                              <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                                <span>❤️</span>
                                <span>{activity.engagement.likes}</span>
                              </button>
                              <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                                <span>💬</span>
                                <span>{activity.engagement.comments}</span>
                              </button>
                              <button className="hover:text-green-500 transition-colors">
                                <span>🔄 Share</span>
                              </button>
                            </>
                          )}
                          {activity.type === 'challenge' && (
                            <button className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-medium hover:bg-orange-600 transition-colors">
                              Join Challenge
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Leaderboard */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                🏆 Weekly Leaderboard
              </h3>
              
              <div className="space-y-3">
                {weeklyLeaderboard.map((user, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      user.isCurrentUser 
                        ? 'bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 border-2 border-orange-200 dark:border-orange-800' 
                        : 'bg-gray-50 dark:bg-gray-700/50'
                    }`}
                  >
                    <span className="text-2xl">{user.badge}</span>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${user.isCurrentUser ? 'text-orange-700 dark:text-orange-300' : 'text-gray-900 dark:text-white'}`}>
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Level {user.level}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${user.isCurrentUser ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        {user.points} pts
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                View Full Leaderboard →
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                ⚡ Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button className="w-full p-3 text-left rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📝</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Daily Quiz</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">50 points available</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-3 text-left rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Practice Mode</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Skill challenges</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-3 text-left rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Study Groups</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Join discussions</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-3 text-left rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Progress Report</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">View analytics</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Achievements Preview */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                🏅 Recent Badges
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                  <div className="text-2xl mb-1">🔥</div>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Hot Streak</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                  <div className="text-2xl mb-1">🧠</div>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Quick Learner</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                  <div className="text-2xl mb-1">⭐</div>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Rising Star</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                  <div className="text-2xl mb-1">🚀</div>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Tech Expert</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}