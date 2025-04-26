import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Brain,
  MessageSquare,
  TrendingUp,
  Send,
  ChevronRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Check
} from 'lucide-react';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'monthly' | 'yearly'>('monthly');

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your research paper to find the perfect publishing match."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Smart Chat Assistant",
      description: "Get instant answers about publishing processes, journal requirements, and submission guidelines."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Trend Analysis",
      description: "Stay updated with trending research topics and popular publications in your field."
    }
  ];

  const pricingPlans = {
    monthly: [
      {
        name: "Basic",
        price: "29",
        features: ["5 Paper Analysis/month", "Basic Chat Support", "Journal Recommendations"],
      },
      {
        name: "Pro",
        price: "79",
        features: ["20 Paper Analysis/month", "Priority Chat Support", "Advanced Analytics", "Citation Analysis"],
      },
      {
        name: "Enterprise",
        price: "199",
        features: ["Unlimited Analysis", "24/7 Priority Support", "Custom Integration", "Team Collaboration"],
      }
    ],
    yearly: [
      {
        name: "Basic",
        price: "290",
        features: ["5 Paper Analysis/month", "Basic Chat Support", "Journal Recommendations"],
      },
      {
        name: "Pro",
        price: "790",
        features: ["20 Paper Analysis/month", "Priority Chat Support", "Advanced Analytics", "Citation Analysis"],
      },
      {
        name: "Enterprise",
        price: "1990",
        features: ["Unlimited Analysis", "24/7 Priority Support", "Custom Integration", "Team Collaboration"],
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-primary-900">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-white">ResearchAI</span>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>

            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <button className="w-full mt-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Revolutionize Your Research Publishing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            AI-powered platform that analyzes your research papers and connects you with the perfect publishers. Get smart recommendations and stay ahead of research trends.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center">
              Get Started <ChevronRight className="ml-2" />
            </button>
            <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI-powered platform provides everything you need to streamline your research publishing process
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors"
              >
                <div className="bg-primary-600/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the perfect plan for your research needs
            </p>
            <div className="flex items-center justify-center mt-8 space-x-4">
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'monthly'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-800 text-gray-400'
                }`}
                onClick={() => setActiveTab('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'yearly'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-800 text-gray-400'
                }`}
                onClick={() => setActiveTab('yearly')}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans[activeTab].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/{activeTab === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-primary-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-gray-400 mb-8">
                Have questions about our platform? We're here to help. Send us a message and we'll respond as soon as possible.
              </p>
              <div className="space-y-6">
                <div className="flex items-center text-gray-300">
                  <Mail className="h-6 w-6 text-primary-500 mr-4" />
                  <span>contact@researchai.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="h-6 w-6 text-primary-500 mr-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-6 w-6 text-primary-500 mr-4" />
                  <span>123 AI Street, Tech City, TC 12345</span>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 h-32"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center">
                  Send Message <Send className="ml-2 h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-xl font-bold text-white">ResearchAI</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing research publishing with AI-powered solutions.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ResearchAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;