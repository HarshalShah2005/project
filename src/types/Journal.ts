export interface Journal {
  name: string;
  scope: string;
  impact_factor: number;
  keywords: string[];
  publisher: string;
  open_access: boolean;
  works_count: number;
  cited_by_count: number;
  similarity_score: number;
}