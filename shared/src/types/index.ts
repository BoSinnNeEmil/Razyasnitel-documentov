export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

export interface Document {
  id: string;
  userId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  status: 'processing' | 'completed' | 'failed';
  createdAt: Date;
}

export interface DocumentAnalysis {
  summary: string;
  keyPoints: string[];
  risks: Risk[];
  obligations: Obligation[];
  checklist: ChecklistItem[];
}

export interface Risk {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface Obligation {
  title: string;
  description: string;
  deadline?: string;
}

export interface ChecklistItem {
  title: string;
  priority: 'urgent' | 'important' | 'optional';
  completed: boolean;
}

export type SubscriptionPlan = 'free' | 'basic' | 'pro' | 'business';

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate?: Date;
}
