import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import AuthBackground from '../components/three/AuthBackground';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to home on submit
    navigate('/topics');
  };
  
  return (
    <div className="min-h-screen w-full flex">
      {/* Left side: Three.js background */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <AuthBackground />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl font-bold drop-shadow-lg">JournalFinder</h1>
            <p className="mt-2 text-xl drop-shadow-md">Find the perfect journal for your research</p>
          </motion.div>
        </div>
      </div>
      
      {/* Right side: Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-3xl font-bold text-gray-900">JournalFinder</h1>
            <p className="mt-2 text-gray-600">Find the perfect journal for your research</p>
          </div>
          
          <div className="card">
            <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input pl-10"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input pl-10"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full flex justify-center items-center"
              >
                <LogIn size={18} className="mr-2" />
                Sign in
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don't have an account?</span>
              <Link to="/signup" className="ml-1 font-medium text-primary-600 hover:text-primary-500">
                Sign up
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;