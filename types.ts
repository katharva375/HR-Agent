
export interface Employee {
  id: string;
  fullName: string; // Changed from firstName and lastName
  email: string;
  summary: string;
  scoring: number; // Corresponds to Supabase 'overall_scoring'
  quickRead: string; // Corresponds to Supabase 'quick_read'
  // Fields for detailed modal view
  emailContent?: string; // from 'email_content'
  detailedScoring?: Record<string, number | string>; // from 'detailed_scoring' (JSON)
  cvUrl?: string; // from 'CV'
}

export interface FilterOption {
  id: string;
  label: string;
  options?: string[]; // For dropdowns
}