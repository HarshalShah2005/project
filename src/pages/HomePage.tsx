import { motion } from 'framer-motion';
import FileUploader from '../components/FileUploader';
import ChatWindow from '../components/ChatWindow';

const HomePage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[calc(100vh-64px-48px)]"
    >
      <div className="flex flex-col lg:flex-row h-full gap-6">
        <div className="w-full h-full">
          <ChatWindow />
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;