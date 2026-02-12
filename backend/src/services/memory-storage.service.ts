// Временное хранилище в памяти (для разработки без БД)

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

class MemoryStorageService {
  private users: Map<string, User> = new Map();
  private documents: Map<string, Document> = new Map();
  private subscriptions: Map<string, Subscription> = new Map();
  private usersByEmail: Map<string, string> = new Map(); // email -> userId

  // User operations
  async createUser(email: string, passwordHash: string, name?: string): Promise<User> {
    const id = this.generateId();
    const now = new Date().toISOString();
    
    const user: User = {
      id,
      email,
      password_hash: passwordHash,
      name,
      created_at: now,
      updated_at: now,
    };

    this.users.set(id, user);
    this.usersByEmail.set(email, id);
    
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userId = this.usersByEmail.get(email);
    if (!userId) return null;
    return this.users.get(userId) || null;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  // Document operations
  async createDocument(document: Omit<Document, 'id' | 'created_at' | 'updated_at'>): Promise<Document> {
    const id = this.generateId();
    const now = new Date().toISOString();
    
    const newDocument: Document = {
      ...document,
      id,
      created_at: now,
      updated_at: now,
    };

    this.documents.set(id, newDocument);
    return newDocument;
  }

  async updateDocument(id: string, updates: Partial<Document>): Promise<Document> {
    const document = this.documents.get(id);
    if (!document) {
      throw new Error('Document not found');
    }

    const updatedDocument: Document = {
      ...document,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    this.documents.set(id, updatedDocument);
    return updatedDocument;
  }

  async getDocumentById(id: string): Promise<Document | null> {
    return this.documents.get(id) || null;
  }

  async getUserDocuments(userId: string, limit = 50): Promise<Document[]> {
    const userDocs = Array.from(this.documents.values())
      .filter(doc => doc.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);
    
    return userDocs;
  }

  async deleteDocument(id: string): Promise<void> {
    this.documents.delete(id);
  }

  // Subscription operations
  async createSubscription(subscription: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>): Promise<Subscription> {
    const id = this.generateId();
    const now = new Date().toISOString();
    
    const newSubscription: Subscription = {
      ...subscription,
      id,
      created_at: now,
      updated_at: now,
    };

    this.subscriptions.set(id, newSubscription);
    return newSubscription;
  }

  async getUserSubscription(userId: string): Promise<Subscription | null> {
    const subscription = Array.from(this.subscriptions.values())
      .find(sub => sub.user_id === userId);
    
    return subscription || null;
  }

  async updateSubscription(userId: string, updates: Partial<Subscription>): Promise<Subscription> {
    const subscription = Array.from(this.subscriptions.values())
      .find(sub => sub.user_id === userId);
    
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const updatedSubscription: Subscription = {
      ...subscription,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    this.subscriptions.set(subscription.id, updatedSubscription);
    return updatedSubscription;
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    return true; // Memory storage is always available
  }

  // Utility methods
  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Debug methods (for development)
  getStats() {
    return {
      users: this.users.size,
      documents: this.documents.size,
      subscriptions: this.subscriptions.size,
    };
  }

  clear() {
    this.users.clear();
    this.documents.clear();
    this.subscriptions.clear();
    this.usersByEmail.clear();
  }
}

export { MemoryStorageService };
export default new MemoryStorageService();