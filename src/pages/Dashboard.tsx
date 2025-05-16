import React, { useState } from 'react';
import { useWords } from '../context/WordsContext';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { AddWordModal } from '../components/word/AddWordModal';
import { BarChart3Icon, TrendingUpIcon, BookOpenIcon, BrainIcon, ArrowRightIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { words, isLoading } = useWords();
  const { user } = useAuth();
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }
  
  // Calculate statistics
  const totalWords = words.length;
  const masteredWords = words.filter(word => word.recognizedCount > word.failedCount && (word.recognizedCount + word.failedCount) > 0).length;
  const needsPracticeWords = words.filter(word => word.failedCount >= word.recognizedCount && (word.recognizedCount + word.failedCount) > 0).length;
  const notSeenWords = words.filter(word => word.recognizedCount === 0 && word.failedCount === 0).length;
  
  const masteredPercentage = totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0;
  // Get top categories
  const categories = words.reduce((acc, word) => {
    if (word.category) {
      acc[word.category] = (acc[word.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  const topCategories = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.username || 'Learner'}!</h1>
              <p className="text-gray-600 mt-1">Track your vocabulary progress and continue learning.</p>
            </div>
            
            <Button
              onClick={() => setIsAddWordModalOpen(true)}
              className="flex text-white items-center"
            >
              <PlusIcon size={18} className="mr-1" />
              Add New Word
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <BookOpenIcon size={24} className="text-indigo-600" />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-800">Total Words</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalWords}</p>
              <p className="text-sm text-gray-500 mt-1">Words in your collection</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUpIcon size={24} className="text-green-600" />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-800">Mastered</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{masteredWords}</p>
              <p className="text-sm text-gray-500 mt-1">{masteredPercentage}% of total words</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <BrainIcon size={24} className="text-yellow-600" />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-800">Need Practice</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{needsPracticeWords}</p>
              <p className="text-sm text-gray-500 mt-1">Challenging words for you</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BarChart3Icon size={24} className="text-blue-600" />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-800">Not Started</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{notSeenWords}</p>
              <p className="text-sm text-gray-500 mt-1">Words not yet studied</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Learning Progress</h3>
              <div className="h-60 flex items-center justify-center">
                <div className="w-full h-full flex items-end justify-around">
                  <div className="flex flex-col items-center justify-end h-full">
                    <div className="w-16 bg-green-100 rounded-t-lg" style={{height: `${masteredPercentage}%` }}>
                      <div className="bg-green-500 h-full w-full rounded-t-lg transition-all duration-1000 "></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Mastered</p>
                    <p className="text-xs text-gray-500">{masteredWords} words</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-end h-full">
                    <div className="w-16 bg-yellow-100 rounded-t-lg" style={{ height: `${(needsPracticeWords / totalWords) * 100}%` }}>
                      <div className="bg-yellow-500 h-full w-full rounded-t-lg transition-all duration-1000"></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Practicing</p>
                    <p className="text-xs text-gray-500">{needsPracticeWords} words</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-end h-full ">
                    <div className="w-16 bg-blue-100 rounded-t-lg" style={{ height: `${(notSeenWords / totalWords) * 100}%` }}>
                      <div className="bg-blue-500 h-full w-full rounded-t-lg transition-all duration-1000"></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Not Started</p>
                    <p className="text-xs text-gray-500">{notSeenWords} words</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Top Categories</h3>
              {topCategories.length > 0 ? (
                <div className="space-y-4">
                  {topCategories.map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-500 mr-3"></div>
                        <span className="text-gray-700">{category}</span>
                      </div>
                      <span className="text-gray-500 text-sm">{count} words</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No categories yet</p>
              )}
            </div>
          </div>
          
          {/* Call to action */}
          <div className="mt-8 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-md overflow-hidden">
            <div className="p-8 md:flex md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Ready to continue learning?</h3>
                <p className="mt-2 text-indigo-100">Practice your vocabulary and improve your recognition skills.</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/practice">
                  <Button variant="outline" className="bg-white text-indigo-600 flex items-center hover:bg-indigo-50 border-white">
                    Start Practice <ArrowRightIcon size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <AddWordModal
        isOpen={isAddWordModalOpen}
        onClose={() => setIsAddWordModalOpen(false)}
      />
    </div>
  );
};
