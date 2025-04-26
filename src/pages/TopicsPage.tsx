import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import TopicCard from '../components/TopicCard';
import { Journal } from '../types/Journal';
import FileUploader from '../components/FileUploader';
import FileStorage from '../services/FileStorage';

interface AnalysisResponse {
  summary: string;
  domains: string[];
  recommended_journals: Journal[];
}

interface Filters {
  searchTerm: string;
  minImpactFactor: number;
  maxImpactFactor: number;
  openAccess: boolean | null;
  publishers: string[];
}

const TopicsPage = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    minImpactFactor: 0,
    maxImpactFactor: 100,
    openAccess: null,
    publishers: [],
  });
  const [uniquePublishers, setUniquePublishers] = useState<string[]>([]);

  useEffect(() => {
    if (analysisData?.recommended_journals) {
      const publishers = [...new Set(analysisData.recommended_journals
        .map(journal => journal.publisher)
        .filter(Boolean) as string[]
      )];
      setUniquePublishers(publishers);
    }
  }, [analysisData]);

  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Save PDF locally
      const pdfId = await FileStorage.savePdf(file);
      console.log('PDF saved locally with ID:', pdfId);

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

  const filteredJournals = analysisData?.recommended_journals.filter(journal => {
    const searchMatch = !filters.searchTerm || 
      journal.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      journal.scope?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      journal.publisher?.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const impactFactorMatch = (!journal.impact_factor && filters.minImpactFactor === 0) ||
      (journal.impact_factor &&
        journal.impact_factor >= filters.minImpactFactor &&
        journal.impact_factor <= filters.maxImpactFactor);

    const openAccessMatch = filters.openAccess === null ||
      journal.open_access === filters.openAccess;

    const publisherMatch = filters.publishers.length === 0 ||
      (journal.publisher && filters.publishers.includes(journal.publisher));

    return searchMatch && impactFactorMatch && openAccessMatch && publisherMatch;
  });

  const handleFilterChange = (filterName: keyof Filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const FilterSection = () => (
    <div className="bg-white rounded-lg p-4 shadow-sm space-y-6">
      <div>
        <h3 className="font-medium mb-2">Search</h3>
        <input
          type="text"
          placeholder="Search journals..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <h3 className="font-medium mb-2">Impact Factor Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            max="100"
            value={filters.minImpactFactor}
            onChange={(e) => handleFilterChange('minImpactFactor', parseFloat(e.target.value))}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Min"
          />
          <input
            type="number"
            min="0"
            max="100"
            value={filters.maxImpactFactor}
            onChange={(e) => handleFilterChange('maxImpactFactor', parseFloat(e.target.value))}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Max"
          />
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Open Access</h3>
        <select
          value={filters.openAccess === null ? '' : filters.openAccess.toString()}
          onChange={(e) => {
            const value = e.target.value === '' ? null : e.target.value === 'true';
            handleFilterChange('openAccess', value);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">All</option>
          <option value="true">Open Access</option>
          <option value="false">Subscription</option>
        </select>
      </div>

      <div>
        <h3 className="font-medium mb-2">Publishers</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {uniquePublishers.map((publisher) => (
            <label key={publisher} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.publishers.includes(publisher)}
                onChange={(e) => {
                  const newPublishers = e.target.checked
                    ? [...filters.publishers, publisher]
                    : filters.publishers.filter(p => p !== publisher);
                  handleFilterChange('publishers', newPublishers);
                }}
                className="mr-2"
              />
              <span className="text-sm">{publisher}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => setFilters({
          searchTerm: '',
          minImpactFactor: 0,
          maxImpactFactor: 100,
          openAccess: null,
          publishers: [],
        })}
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );

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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FileUploader onUpload={handleFileUpload} />
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}
          
          {/* Only show filters when we have analysis data */}
          {analysisData && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              <FilterSection />
            </div>
          )}
        </div>

        <div className="lg:col-span-3">
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
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Recommended Journals 
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({filteredJournals?.length || 0} results)
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredJournals && filteredJournals.length > 0 ? (
                    filteredJournals.map((journal, index) => (
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
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">
                        No journals match your filter criteria.
                      </p>
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