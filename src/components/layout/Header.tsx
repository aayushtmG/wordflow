import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MenuIcon, XIcon, LogOutIcon, BookOpenIcon, BarChartIcon, BookIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, we would toggle a dark mode class on the html element
    // and use Tailwind's dark mode feature
    document.documentElement.classList.toggle('dark');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <div className="bg-indigo-600 text-white p-2 rounded-lg mr-2">
                <BookOpenIcon size={20} />
              </div>
              <span className="text-xl font-bold text-gray-800">WordFlow</span>
            </Link>
          </div>
          
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <BarChartIcon size={18} className="mr-1" />
                Dashboard
              </Link>
              <Link 
                to="/practice" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <BookIcon size={18} className="mr-1" />
                Practice
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </button>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <div className="text-sm font-medium text-gray-700">
                {user.username}
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 flex items-center"
                aria-label="Logout"
              >
                <LogOutIcon size={18} className="mr-1" />
                Logout
              </button>
            </div>
          )}
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && user && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg mt-1 transition-all duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <BarChartIcon size={18} className="mr-2" />
                Dashboard
              </div>
            </Link>
            <Link
              to="/practice"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <BookIcon size={18} className="mr-2" />
                Practice
              </div>
            </Link>
            <button
              onClick={() => {
                toggleDarkMode();
                toggleMenu();
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                {isDarkMode ? <SunIcon size={18} className="mr-2" /> : <MoonIcon size={18} className="mr-2" />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </div>
            </button>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="px-3 py-2 text-sm text-gray-500">
              Signed in as <span className="font-medium text-gray-700">{user.username}</span>
            </div>
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
            >
              <div className="flex items-center">
                <LogOutIcon size={18} className="mr-2" />
                Logout
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};