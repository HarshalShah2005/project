import React, { useState, useEffect } from 'react';
import FileStorage from '../services/FileStorage';
import { Trash2 } from 'lucide-react';

export interface FileUploaderProps {
  onUpload: (file: File) => Promise<void>;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [storageInfo, setStorageInfo] = useState<{ used: number; total: number }>({ used: 0, total: 0 });

  useEffect(() => {
    setStorageInfo(FileStorage.getStorageUsage());
  }, [file]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }

      // Check file size
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (selectedFile.size > maxSize) {
        setError(`File size exceeds ${formatBytes(maxSize)} limit`);
        return;
      }

      setError(null);
      setFile(selectedFile);

      try {
        await onUpload(selectedFile);
      } catch (error: any) {
        console.error('Error uploading file:', error);
        setError(error.message || 'Error uploading file. Please try again.');
        setFile(null);
      }
    }
  };

  const handleClearStorage = () => {
    FileStorage.clearStorage();
    setStorageInfo(FileStorage.getStorageUsage());
    setError(null);
    setFile(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Upload Research Paper</h2>
      
      {/* Storage usage indicator with clear button */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm text-gray-600 space-x-2">
            <span>Storage used: {formatBytes(storageInfo.used)}</span>
            <span>/ {formatBytes(storageInfo.total)}</span>
          </div>
          <button
            onClick={handleClearStorage}
            className="flex items-center gap-1 px-2 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
            title="Clear storage"
          >
            <Trash2 size={16} />
            <span>Clear Storage</span>
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              (storageInfo.used / storageInfo.total) > 0.9 ? 'bg-red-500' : 'bg-primary-600'
            }`}
            style={{ width: `${(storageInfo.used / storageInfo.total) * 100}%` }}
          />
        </div>
      </div>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-primary-50 file:text-primary-700
          hover:file:bg-primary-100"
      />
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      {file && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Selected file: {file.name} ({formatBytes(file.size)})
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
