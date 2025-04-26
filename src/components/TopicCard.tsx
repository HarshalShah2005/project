import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Bookmark, Share2 } from 'lucide-react';

type TopicCardProps = {
  title: string;
  description: string;
  impactFactor: number;
  domain: string;
  trendData: number[];
};

const TopicCard = ({ title, description, impactFactor, domain, trendData }: TopicCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  // Normalize trend data to fit in the sparkline
  const normalizedData = trendData.map(val => {
    const min = Math.min(...trendData);
    const max = Math.max(...trendData);
    return ((val - min) / (max - min)) * 30;
  });
  
  // Create SVG path for sparkline
  const sparklinePath = normalizedData.reduce((path, val, index) => {
    const x = (index / (normalizedData.length - 1)) * 100;
    const y = 30 - val;
    return `${path} ${index === 0 ? 'M' : 'L'} ${x},${y}`;
  }, '');
  
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.15)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card group cursor-pointer"
    >
      <div className="mb-2 flex justify-between items-start">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          {domain}
        </span>
        <div className="flex space-x-1">
          <button 
            onClick={toggleBookmark}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark 
              size={18} 
              className={isBookmarked ? "text-primary-500 fill-primary-500" : "text-gray-400"} 
            />
          </button>
          <button 
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Share topic"
          >
            <Share2 size={18} className="text-gray-400" />
          </button>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      
      <p className="mt-2 text-sm text-gray-600 line-clamp-3">
        {description}
      </p>
      
      <div className="mt-4 flex justify-between items-end">
        <div>
          <div className="flex items-center space-x-1">
            <BookOpen size={16} className="text-gray-500" />
            <span className="text-sm font-medium">Impact Factor: {impactFactor.toFixed(2)}</span>
          </div>
        </div>
        
        <svg width="100" height="30" className="text-primary-500">
          <path
            d={sparklinePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx={100}
            cy={30 - normalizedData[normalizedData.length - 1]}
            r="2"
            fill="currentColor"
          />
        </svg>
      </div>
      <div>
        <button className="mt-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">Send Mail</button>
      </div>
    </motion.div>
  );
};

export default TopicCard;