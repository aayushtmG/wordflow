import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, BrainIcon, CheckIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-lg mr-2">
                <BookOpenIcon size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold">WordFlow</span>
            </div>
            
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </nav>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Learn vocabulary <span className="text-indigo-200">effortlessly</span> with spaced repetition
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Boost your language skills with our innovative word learning app. Swipe, learn, and master new vocabulary in record time.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 w-full sm:w-auto">
                    Get started for free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center transform translate-y-10 md:translate-y-0">
              <div className="w-80 h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-indigo-700/20 relative">
                <div className="bg-indigo-500 p-6 text-white">
                  <h3 className="font-bold text-xl">WordFlow</h3>
                </div>
                <div className="p-6">
                  <div className="bg-gray-100 rounded-2xl p-6 mb-6 shadow-md">
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Ephemeral</h4>
                    <p className="text-sm text-gray-500">Tap to reveal definition</p>
                    <div className="mt-8 flex justify-between text-sm">
                      <div className="flex items-center text-red-500">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span className="ml-1">Swipe left if you don't know</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-2xl p-6 mb-6 shadow-md">
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Ubiquitous</h4>
                    <p className="text-gray-600 mt-2">Present, appearing, or found everywhere</p>
                    <div className="mt-8 flex justify-between text-sm">
                      <div className="flex items-center text-green-500">
                        <CheckIcon size={18} />
                        <span className="ml-1">Swipe right if you know</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How WordFlow Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our app makes vocabulary learning intuitive and effective using proven techniques.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-6 inline-flex mb-5">
                <BookOpenIcon size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Swipe-Based Learning</h3>
              <p className="text-gray-600">
                Effortlessly swipe right for words you recognize, left for words you're still learning.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-6 inline-flex mb-5">
                <BrainIcon size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Repetition</h3>
              <p className="text-gray-600">
                Our algorithm prioritizes words you find challenging and gradually spaces out words you know well.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-6 inline-flex mb-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Tracking</h3>
              <p className="text-gray-600">
                Detailed analytics and progress tracking help you see your improvement over time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to expand your vocabulary?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of learners who have significantly improved their language skills with WordFlow.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              Get started for free <ArrowRightIcon size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <div className="bg-indigo-600 text-white p-2 rounded-lg mr-2">
                  <BookOpenIcon size={20} />
                </div>
                <span className="text-xl font-bold text-gray-800">WordFlow</span>
              </div>
              <p className="text-gray-600 mt-2 max-w-md">
                The smarter way to learn vocabulary and enhance your language skills.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Product</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600">Features</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600">Blog</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600">Privacy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600">Terms</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 mt-8 text-center">
            <p className="text-gray-500">© 2025 WordFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
