import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Bookmark, Share2, Lock, Unlock, FileText, Quote } from 'lucide-react';
import axios from 'axios';

interface TopicCardProps {
  title: string;
  description: string;
  impactFactor: number;
  domain: string;
  trendData: number[];
  openAccess?: boolean;
  worksCount?: number;
  citedByCount?: number;
}

const TopicCard = ({ 
  title, 
  description, 
  impactFactor, 
  domain, 
  openAccess = false,
  worksCount = 0,
  citedByCount = 0 
}: TopicCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isContacting, setIsContacting] = useState(false);
  
  // Generate random data points for this specific card
  const randomData = useMemo(() => {
    const dataPoints = 8;
    return Array.from({ length: dataPoints }, () => 
      Math.random() * 0.7 + 0.2 // Generate numbers between 0.2 and 0.9
    );
  }, [title]); // Regenerate only if the card title changes
  
  // Create SVG path for sparkline
  const sparklinePath = useMemo(() => {
    return randomData.reduce((path, val, index) => {
      const x = (index / (randomData.length - 1)) * 100;
      const y = 30 - (val * 30); // Scale to fit in 30px height
      return `${path} ${index === 0 ? 'M' : 'L'} ${x},${y}`;
    }, '');
  }, [randomData]);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleContactJournal = async () => {
    try {
      setIsContacting(true);
      
      // Prepare the data to send to n8n webhook
      const journalData = {
        title: title,
        description: description,
        impactFactor: impactFactor,
        domain: domain,
        openAccess: openAccess,
        worksCount: worksCount,
        citedByCount: citedByCount
      };

      // Send POST request to n8n webhook
      await axios.post(
        'https://harshal2005.app.n8n.cloud/webhook/ba41d87f-b404-41b4-a1bf-52cbca34a082',
        journalData
      );

      alert('Contact request sent successfully!');
    } catch (error) {
      console.error('Error contacting journal:', error);
      alert('Failed to send contact request. Please try again.');
    } finally {
      setIsContacting(false);
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.15)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card group cursor-pointer"
    >
      <div className="mb-2 flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {domain}
          </span>
          {openAccess ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Unlock size={12} className="mr-1" />
              Open Access
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              <Lock size={12} className="mr-1" />
              Subscription
            </span>
          )}
        </div>
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
      
      <div className="mt-4 space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-1">
            <BookOpen size={16} className="text-gray-500" />
            <span className="text-sm font-medium">IF: {impactFactor.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FileText size={16} className="text-gray-500" />
            <span className="text-sm">Papers: {worksCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Quote size={16} className="text-gray-500" />
            <span className="text-sm">Citations: {citedByCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <svg width="100" height="30" className="text-primary-500">
            <path
              d={sparklinePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {randomData.map((val, index) => (
              <circle
                key={index}
                cx={(index / (randomData.length - 1)) * 100}
                cy={30 - (val * 30)}
                r="2"
                fill="currentColor"
              />
            ))}
          </svg>
        </div>
      </div>
      
      <div className="mt-4">
        <button 
          className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleContactJournal}
          disabled={isContacting}
        >
          {isContacting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white" />
          ) : (
            <Share2 size={16} />
          )}
          {isContacting ? 'Sending...' : 'Contact Journal'}
        </button>
      </div>
    </motion.div>
  );
};

export default TopicCard;