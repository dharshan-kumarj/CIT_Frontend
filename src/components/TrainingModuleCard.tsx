'use client';

import { useState } from 'react';

interface TrainingModuleProps {
  module: {
    id: number;
    title: string;
    category: string;
    difficulty: string;
    duration: string;
    points: number;
    progress: number;
    status: string;
    icon: string;
    description: string;
    lessons: number;
    completedLessons: number;
    nextLesson?: string;
    completedDate?: string;
    requirement?: string;
  };
  onStartModule: (moduleId: number) => void;
}

export default function TrainingModuleCard({ module, onStartModule }: TrainingModuleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockLessons = [
    { id: 1, title: "Introduction to Smart Home Systems", duration: "5 min", completed: true },
    { id: 2, title: "Understanding IoT Protocols", duration: "8 min", completed: true },
    { id: 3, title: "Security Best Practices", duration: "12 min", completed: true },
    { id: 4, title: "Installation Procedures", duration: "15 min", completed: false, current: true },
    { id: 5, title: "Troubleshooting Common Issues", duration: "10 min", completed: false },
    { id: 6, title: "Customer Training Guidelines", duration: "8 min", completed: false },
  ];

  return (
    <div 
      className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer group ${
        module.status === 'completed' 
          ? 'border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
          : module.status === 'in_progress'
          ? 'border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:shadow-lg'
          : module.status === 'locked'
          ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60'
          : 'border-orange-200 dark:border-orange-800 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 hover:shadow-lg'
      }`}
    >
      {module.status === 'locked' && (
        <div className="absolute top-4 right-4">
          <span className="text-2xl">🔒</span>
        </div>
      )}
      
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl">{module.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{module.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{module.description}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className={`px-2 py-1 rounded-full ${
              module.difficulty === 'Advanced' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
              module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
              'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
            }`}>
              {module.difficulty}
            </span>
            <span>{module.duration}</span>
            <span>💎 {module.points} pts</span>
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-black/20 transition-colors"
        >
          <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {module.status !== 'locked' && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">
              Progress ({module.completedLessons}/{module.lessons} lessons)
            </span>
            <span className="font-medium">{module.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                module.status === 'completed' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}
              style={{ width: `${module.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && module.status !== 'locked' && (
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Lessons</h4>
          <div className="space-y-2">
            {mockLessons.slice(0, module.lessons).map((lesson, index) => (
              <div 
                key={lesson.id}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  lesson.completed 
                    ? 'bg-green-50 dark:bg-green-900/20' 
                    : lesson.current 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                    : 'bg-gray-50 dark:bg-gray-700/50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  lesson.completed 
                    ? 'bg-green-500 text-white' 
                    : lesson.current 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {lesson.completed ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    lesson.completed 
                      ? 'text-green-700 dark:text-green-300' 
                      : lesson.current 
                      ? 'text-blue-700 dark:text-blue-300' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{lesson.duration}</p>
                </div>
                {lesson.current && (
                  <button className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600 transition-colors">
                    Continue
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {module.status === 'locked' ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">{module.requirement}</p>
        ) : module.status === 'completed' ? (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
            <span>✅ Completed on {module.completedDate}</span>
          </div>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Next: {module.nextLesson}
          </p>
        )}
        
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            module.status === 'completed'
              ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50'
              : module.status === 'in_progress'
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : module.status === 'locked'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
          disabled={module.status === 'locked'}
          onClick={() => module.status !== 'locked' && onStartModule(module.id)}
        >
          {module.status === 'completed' ? 'Review' : 
           module.status === 'in_progress' ? 'Continue' : 
           module.status === 'locked' ? 'Locked' : 'Start'}
        </button>
      </div>
    </div>
  );
}