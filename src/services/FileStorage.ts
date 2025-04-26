class FileStorage {
  private static readonly STORAGE_KEY = 'uploadedPdfs';

  static async savePdf(file: File): Promise<string> {
    try {
      // Convert file to base64
      const base64 = await this.fileToBase64(file);
      
      // Get existing PDFs
      const existingPdfs = this.getStoredPdfs();
      
      // Add new PDF
      const newPdf = {
        id: Date.now().toString(),
        name: file.name,
        data: base64,
        uploadDate: new Date().toISOString()
      };
      
      existingPdfs.push(newPdf);
      
      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingPdfs));
      
      return newPdf.id;
    } catch (error) {
      console.error('Error saving PDF:', error);
      throw new Error('Failed to save PDF');
    }
  }

  static getPdf(id: string): { name: string; data: string } | null {
    const pdfs = this.getStoredPdfs();
    const pdf = pdfs.find(p => p.id === id);
    return pdf ? { name: pdf.name, data: pdf.data } : null;
  }

  static getAllPdfs(): Array<{ id: string; name: string; uploadDate: string }> {
    return this.getStoredPdfs().map(({ id, name, uploadDate }) => ({
      id,
      name,
      uploadDate
    }));
  }

  private static getStoredPdfs(): Array<{
    id: string;
    name: string;
    data: string;
    uploadDate: string;
  }> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private static fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}

export default FileStorage;