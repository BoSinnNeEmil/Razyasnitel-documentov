import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  password_hash: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

interface Document {
  id: string;
  user_id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  file_url: string;
  status: 'processing' | 'completed' | 'failed';
  extracted_text?: string;
  analysis?: any;
  created_at: string;
  updated_at: string;
}

interface Subscription {
  id: string;
  user_id: string;
  plan: 'free' | 'basic' | 'pro' | 'business';
  status: 'active' | 'cancelled' | 'expired';
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

class DatabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Service Role Key are required');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // User operations
  async createUser(email: string, passwordHash: string, name?: string): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .insert({
        email,
        password_hash: passwordHash,
        name,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  // Document operations
  async createDocument(document: Omit<Document, 'id' | 'created_at' | 'updated_at'>): Promise<Document> {
    const { data, error } = await this.supabase
      .from('documents')
      .insert(document)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateDocument(id: string, updates: Partial<Document>): Promise<Document> {
    const { data, error } = await this.supabase
      .from('documents')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getDocumentById(id: string): Promise<Document | null> {
    const { data, error } = await this.supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getUserDocuments(userId: string, limit = 50): Promise<Document[]> {
    const { data, error } = await this.supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  async deleteDocument(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Subscription operations
  async createSubscription(subscription: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>): Promise<Subscription> {
    const { data, error } = await this.supabase
      .from('subscriptions')
      .insert(subscription)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserSubscription(userId: string): Promise<Subscription | null> {
    const { data, error } = await this.supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async updateSubscription(userId: string, updates: Partial<Subscription>): Promise<Subscription> {
    const { data, error } = await this.supabase
      .from('subscriptions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('users')
        .select('count')
        .limit(1);
      
      return !error;
    } catch {
      return false;
    }
  }
}

export { DatabaseService };
export default new DatabaseService();