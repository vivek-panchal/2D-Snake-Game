import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/"
              className="flex-shrink-0 flex items-center text-xl font-bold text-green-500 hover:text-green-600"
            >
              Snake Game
            </Link>
            
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Play
              </Link>
              
              <Link
                to="/leaderboard"
                className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Leaderboard
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user.username}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              >
                Login
              </Link>
            )}
            
            {/* Mobile menu button */}
            <div className="ml-4 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon for menu */}
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Play
            </Link>
            
            <Link
              to="/leaderboard"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;