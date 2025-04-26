import React, { useState } from 'react';

export interface FileUploaderProps {
  onUpload: (file: File) => Promise<void>;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }

      setError(null);
      setFile(selectedFile);

      try {
        await onUpload(selectedFile);
      } catch (error) {
        console.error('Error uploading file:', error);
        setError('Error uploading file. Please try again.');
        setFile(null);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Upload Research Paper</h2>
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
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}
      {file && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Selected file: {file.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
