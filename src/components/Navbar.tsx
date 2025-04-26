import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { path: '/topics', label: 'Research' },
    { path: '/', label: 'Chatbot' },
    { path: '/community', label: 'Community' }
  ];

  return (
    <nav className="bg-white bg-opacity-90 backdrop-blur-sm sticky top-0 z-20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <NavLink to="/" className="flex items-center space-x-2 text-primary-600">
            <BookOpen size={28} />
            <span className="font-bold text-xl">ResearchForge</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <NavLink 
                key={link.path}
                to={link.path} 
                className={({ isActive }) => 
                  `text-base font-medium transition-colors hover:text-primary-600 ${
                    isActive 
                      ? 'text-primary-600 border-b-2 border-primary-600' 
                      : 'text-gray-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink 
              to="/login" 
              className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              4876
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <NavLink 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-base font-medium ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink 
                to="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-center"
              >
                4876
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;