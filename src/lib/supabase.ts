import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          subscription_tier: 'free' | 'basic' | 'pro' | 'business';
          subscription_status: 'active' | 'cancelled' | 'expired';
          subscription_expires_at: string | null;
          documents_count: number;
          documents_limit: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: 'free' | 'basic' | 'pro' | 'business';
          subscription_status?: 'active' | 'cancelled' | 'expired';
          subscription_expires_at?: string | null;
          documents_count?: number;
          documents_limit?: number;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: 'free' | 'basic' | 'pro' | 'business';
          subscription_status?: 'active' | 'cancelled' | 'expired';
          subscription_expires_at?: string | null;
          documents_count?: number;
          documents_limit?: number;
        };
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          original_filename: string;
          file_path: string;
          file_size: number;
          file_type: string;
          page_count: number | null;
          status: 'processing' | 'completed' | 'failed';
          created_at: string;
          updated_at: string;
        };
      };
      analyses: {
        Row: {
          id: string;
          document_id: string;
          summary: string | null;
          key_points: any;
          risks: any;
          obligations: any;
          checklist: any;
          style: 'formal' | 'friendly' | 'expert';
          created_at: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          document_id: string;
          user_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at: string;
        };
      };
    };
  };
};
