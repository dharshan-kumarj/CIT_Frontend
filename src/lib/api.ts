// API configuration and types
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface User {
  id: string;
  email: string;
  role: 'vendor' | 'distributor';
  name?: string;
  companyName?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
  sessionId: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// API client class
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.timeout = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get token from localStorage if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  // Auth methods
  async login(email: string, password: string, role: 'vendor' | 'distributor'): Promise<AuthResponse> {
    const endpoint = role === 'vendor' ? '/auth/vendor/login' : '/auth/distributor/login';
    const response = await this.request<any>(endpoint, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Map userType to role for consistency
    return {
      ...response,
      user: {
        ...response.user,
        role: response.user.userType as 'vendor' | 'distributor',
        name: `${response.user.firstName} ${response.user.lastName}`.trim(),
      }
    };
  }

  async register(data: {
    email: string;
    password: string;
    name?: string;
    companyName?: string;
  }, role: 'vendor' | 'distributor'): Promise<AuthResponse> {
    const endpoint = role === 'vendor' ? '/auth/vendor/register' : '/auth/distributor/register';
    return this.request<AuthResponse>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Dashboard methods
  async getVendorDashboard(): Promise<any> {
    return this.request('/vendor/dashboard');
  }

  async getDistributorDashboard(): Promise<any> {
    return this.request('/distributor/dashboard');
  }

  // User methods
  async getProfile(): Promise<User> {
    return this.request<User>('/profile');
  }

  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  // Health check
  async healthCheck(): Promise<string> {
    return this.request<string>('/');
  }
}

export const apiClient = new ApiClient();

// Auth utilities
export const authUtils = {
  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  },

  setUser(user: User) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  },

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  },

  isLoggedIn(): boolean {
    return !!this.getToken();
  },

  logout() {
    this.removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }
};
