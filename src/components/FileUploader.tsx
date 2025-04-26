import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Clipboard, FileText, X } from 'lucide-react';

type TabType = 'upload' | 'paste';

const FileUploader = () => {
  const [activeTab, setActiveTab] = useState<TabType>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    
    if (selectedFile) {
      setFile(selectedFile);
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 300);
    }
  };
  
  const clearFile = () => {
    setFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FileText className="text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="text-blue-500" />;
      case 'txt':
        return <FileText className="text-gray-500" />;
      default:
        return <FileText className="text-gray-400" />;
    }
  };
  
  return (
    <div className="card h-full">
      <div className="flex space-x-4 border-b pb-4 mb-4">
        <button
          className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
            activeTab === 'upload' 
              ? 'bg-primary-50 text-primary-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('upload')}
        >
          <Upload size={18} />
          <span>Upload Paper</span>
        </button>
        <button
          className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
            activeTab === 'paste' 
              ? 'bg-primary-50 text-primary-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('paste')}
        >
          <Clipboard size={18} />
          <span>Paste Title & Abstract</span>
        </button>
      </div>
      
      <div className="mt-4">
        {activeTab === 'upload' ? (
          <div className="space-y-4">
            {!file ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.docx,.doc,.txt"
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag and drop your file here, or
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 btn-primary"
                >
                  Browse Files
                </button>
                <p className="mt-2 text-xs text-gray-500">
                  Supported formats: PDF, DOCX, TXT
                </p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="mr-3">
                    {getFileIcon(file.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button 
                    onClick={clearFile}
                    className="p-1 rounded-full hover:bg-gray-200"
                    aria-label="Remove file"
                  >
                    <X size={16} className="text-gray-500" />
                  </button>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                
                {uploadProgress === 100 && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-green-600"
                  >
                    Upload complete! Your paper is ready for analysis.
                  </motion.p>
                )}
              </motion.div>
            )}
          </div>
        ) : (
          <div>
            <label htmlFor="paper-title" className="block text-sm font-medium text-gray-700 mb-1">
              Paper Title
            </label>
            <input
              id="paper-title"
              type="text"
              className="input mb-4"
              placeholder="Enter the paper title"
            />
            
            <label htmlFor="paper-abstract" className="block text-sm font-medium text-gray-700 mb-1">
              Paper Abstract
            </label>
            <textarea
              id="paper-abstract"
              className="input h-40 resize-none"
              placeholder="Paste the paper abstract here..."
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
            ></textarea>
            
            <button 
              className="btn-primary mt-4 w-full"
              disabled={!pastedText}
            >
              Analyze
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;