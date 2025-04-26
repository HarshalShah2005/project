import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import TopicCard from '../components/TopicCard';
import { Journal } from '../types/Journal';
import FileUploader from '../components/FileUploader';

interface AnalysisResponse {
  summary: string;
  domains: string[];
  recommended_journals: Journal[];
}

const TopicsPage = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Store the file URL for chatbot feature
      const fileUrl = URL.createObjectURL(file);
      localStorage.setItem('uploadedPdfUrl', fileUrl);
      localStorage.setItem('uploadedPdfName', file.name);
      console.log('PDF stored for chatbot feature:', fileUrl);

      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading file:', file.name);
      const response = await axios.post<AnalysisResponse>(
        'https://2b73-103-104-226-58.ngrok-free.app/analyze',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('API Response:', response.data);
      setAnalysisData(response.data);
    } catch (error) {
      console.error('Error analyzing file:', error);
      setError('Failed to analyze the file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Research Paper Analysis</h1>
        <p className="mt-2 text-gray-600">Upload your research paper to get journal recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <FileUploader onUpload={handleFileUpload} />
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : analysisData ? (
            <>
              {/* Paper Analysis Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Paper Analysis</h2>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium mb-2">Summary</h3>
                  <p className="text-gray-600 mb-4">{analysisData.summary}</p>
                  
                  <h3 className="font-medium mb-2">Research Domains</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisData.domains.map((domain, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                      >
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Journal Recommendations Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Recommended Journals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {analysisData.recommended_journals.map((journal, index) => (
                    <TopicCard
                      key={journal.name || index}
                      title={journal.name}
                      description={journal.scope || ''}
                      impactFactor={journal.impact_factor || 0}
                      domain={journal.publisher || ''}
                      trendData={[journal.similarity_score || 0]}
                      openAccess={journal.open_access}
                      worksCount={journal.works_count}
                      citedByCount={journal.cited_by_count}
                    />
                  ))}
                  
                  {analysisData.recommended_journals.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No recommended journals found.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Upload a research paper to see analysis and recommendations</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TopicsPage;