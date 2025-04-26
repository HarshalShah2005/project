import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, TrendingUp } from 'lucide-react';
import TopicCard from '../components/TopicCard';

// Sample topic data
const SAMPLE_TOPICS = [
  {
    id: '1',
    title: 'Recent Advances in Machine Learning for Medical Image Analysis',
    description: 'Exploration of state-of-the-art machine learning techniques for medical imaging, including segmentation, classification, and anomaly detection.',
    impactFactor: 4.89,
    domain: 'AI & Medical Imaging',
    trendData: [5, 7, 6, 8, 10, 12, 15],
  },
  {
    id: '2',
    title: 'Quantum Computing Approaches to Drug Discovery',
    description: 'Novel approaches leveraging quantum computing algorithms to accelerate drug discovery and optimize molecular structures.',
    impactFactor: 5.32,
    domain: 'Quantum Computing',
    trendData: [3, 4, 5, 8, 12, 18, 22],
  },
  {
    id: '3',
    title: 'Climate Change Effects on Marine Ecosystems',
    description: 'Comprehensive analysis of climate change impacts on marine biodiversity, ecosystem functions, and coastal communities.',
    impactFactor: 4.21,
    domain: 'Environmental Science',
    trendData: [10, 9, 11, 13, 12, 14, 16],
  },
  {
    id: '4',
    title: 'CRISPR-Cas9 Applications in Genetic Disease Treatment',
    description: 'Recent developments in CRISPR gene editing technology for treating inherited genetic disorders.',
    impactFactor: 6.78,
    domain: 'Biotechnology',
    trendData: [8, 12, 15, 14, 18, 20, 23],
  },
  {
    id: '5',
    title: 'Neural Interfaces for Prosthetic Limb Control',
    description: 'Advancements in brain-machine interfaces for intuitive control of prosthetic limbs and improved quality of life.',
    impactFactor: 5.12,
    domain: 'Neuroscience',
    trendData: [6, 7, 9, 12, 14, 16, 18],
  },
  {
    id: '6',
    title: 'Renewable Energy Storage Solutions',
    description: 'Innovative approaches to energy storage for renewable sources, including battery technologies, hydrogen storage, and thermal solutions.',
    impactFactor: 4.55,
    domain: 'Renewable Energy',
    trendData: [9, 10, 12, 15, 14, 17, 20],
  },
];

const domains = ['All Domains', 'AI & Medical Imaging', 'Quantum Computing', 'Environmental Science', 'Biotechnology', 'Neuroscience', 'Renewable Energy'];

const TopicsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [impactRange, setImpactRange] = useState([0, 10]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const filteredTopics = SAMPLE_TOPICS.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === 'All Domains' || topic.domain === selectedDomain;
    const matchesImpact = topic.impactFactor >= impactRange[0] && topic.impactFactor <= impactRange[1];
    
    return matchesSearch && matchesDomain && matchesImpact;
  });
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Explore Research Topics</h1>
        <p className="mt-2 text-gray-600">Discover trending research areas and find journals in your field of interest</p>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="search"
            className="input pl-10"
            placeholder="Search topics, keywords, or research areas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters panel */}
        <motion.div 
          className={`card w-full lg:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="domain-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Domain
              </label>
              <select
                id="domain-select"
                className="input"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
              >
                {domains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Impact Factor Range
              </label>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={impactRange[1]}
                  onChange={(e) => setImpactRange([impactRange[0], parseFloat(e.target.value)])}
                  className="w-full accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{impactRange[0].toFixed(1)}</span>
                  <span>{impactRange[1].toFixed(1)}</span>
                </div>
              </div>
            </div>
            
            <button className="btn-primary w-full flex items-center justify-center">
              <TrendingUp size={18} className="mr-2" />
              Get Trending Topics
            </button>
          </div>
        </motion.div>
        
        {/* Mobile filter toggle */}
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden btn-secondary flex items-center mb-4"
        >
          <SlidersHorizontal size={18} className="mr-2" />
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>
        
        {/* Topic cards grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTopics.map(topic => (
              <TopicCard
                key={topic.id}
                title={topic.title}
                description={topic.description}
                impactFactor={topic.impactFactor}
                domain={topic.domain}
                trendData={topic.trendData}
              />
            ))}
            
            {filteredTopics.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No topics found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDomain('All Domains');
                    setImpactRange([0, 10]);
                  }}
                  className="mt-4 btn-secondary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicsPage;