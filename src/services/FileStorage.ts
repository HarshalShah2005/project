class FileStorage {
  private static readonly STORAGE_KEY = 'uploadedPdfs';
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit
  private static readonly MAX_FILES = 5; // Maximum number of stored files

  static async savePdf(file: File): Promise<string> {
    try {
      // Check file size
      if (file.size > this.MAX_FILE_SIZE) {
        throw new Error(`File size exceeds ${this.MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
      }

      // Convert file to base64
      const base64 = await this.fileToBase64(file);
      
      // Get existing PDFs
      const existingPdfs = this.getStoredPdfs();
      
      // If we have too many files, remove the oldest ones
      while (existingPdfs.length >= this.MAX_FILES) {
        existingPdfs.shift(); // Remove oldest file
      }

      // Try to clear some space by removing old files if needed
      try {
        localStorage.removeItem(this.STORAGE_KEY);
      } catch (e) {
        console.warn('Failed to clear storage:', e);
      }
      
      // Add new PDF
      const newPdf = {
        id: Date.now().toString(),
        name: file.name,
        data: base64,
        uploadDate: new Date().toISOString(),
        size: file.size
      };
      
      existingPdfs.push(newPdf);
      
      try {
        // Try to save to localStorage
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingPdfs));
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          // If we still can't save, try removing all files except the new one
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify([newPdf]));
        } else {
          throw e;
        }
      }
      
      return newPdf.id;
    } catch (error) {
      console.error('Error saving PDF:', error);
      if (error.name === 'QuotaExceededError') {
        throw new Error('Storage full. Please remove some files before uploading.');
      }
      throw new Error('Failed to save PDF');
    }
  }

  static getPdf(id: string): { name: string; data: string; size: number } | null {
    const pdfs = this.getStoredPdfs();
    const pdf = pdfs.find(p => p.id === id);
    return pdf ? { name: pdf.name, data: pdf.data, size: pdf.size } : null;
  }

  static getAllPdfs(): Array<{ id: string; name: string; uploadDate: string; size: number }> {
    return this.getStoredPdfs().map(({ id, name, uploadDate, size }) => ({
      id,
      name,
      uploadDate,
      size
    }));
  }

  static clearStorage(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  private static getStoredPdfs(): Array<{
    id: string;
    name: string;
    data: string;
    uploadDate: string;
    size: number;
  }> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading from storage:', error);
      return [];
    }
  }

  private static fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  static getStorageUsage(): { used: number; total: number } {
    try {
      const used = new Blob([localStorage.getItem(this.STORAGE_KEY) || '']).size;
      // Approximate total storage (usually around 5-10MB depending on browser)
      const total = 5 * 1024 * 1024; // 5MB as safe default
      return { used, total };
    } catch (error) {
      console.error('Error calculating storage usage:', error);
      return { used: 0, total: 0 };
    }
  }
}

export default FileStorage;