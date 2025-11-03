import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = 'https://blog-post-project-api-five.vercel.app';

interface User {
  id: number;
  name?: string;
  username?: string;
  email: string;
  avatar?: string;
  [key: string]: any;
}

interface AuthState {
  loading: boolean | null;
  getUserLoading: boolean | null;
  error: string | null;
  user: User | null;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  fullName?: string;
  name?: string;
  username?: string;
  email: string;
  password: string;
}

interface AuthContextType {
  state: AuthState;
  login: (data: LoginData) => Promise<{ error?: string } | void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<{ error?: string } | void>;
  isAuthenticated: boolean;
  fetchUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    loading: null,
    getUserLoading: null,
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  // ดึงข้อมูลผู้ใช้โดยใช้ API
  const fetchUser = async (): Promise<User | null> => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log('⚠️ No token found, skipping user fetch');
      setState((prevState) => ({
        ...prevState,
        user: null,
        getUserLoading: false,
      }));
      return null;
    }

    try {
      console.log('👤 Fetching user data from /auth/me...');
      setState((prevState) => ({ ...prevState, getUserLoading: true }));
      
      // JWT interceptor will automatically add Authorization header
      const response = await axios.get(`${API_BASE_URL}/auth/me`);
      
      console.log('✅ User data response:', {
        status: response.status,
        fullResponse: response.data,
        user: response.data.user,
      });
      
      // Backend returns { user: {...} }
      const userData = response.data.user || response.data;
      
      console.log('👤 Parsed user data:', userData);
      console.log('👑 User role check:', {
        rawRole: userData?.role,
        lowercaseRole: userData?.role?.toLowerCase(),
        isAdmin: userData?.role?.toLowerCase() === 'admin',
        allFields: Object.keys(userData || {}),
        fullUserData: userData
      });
      
      setState((prevState) => ({
        ...prevState,
        user: userData,
        getUserLoading: false,
        error: null,
      }));
      
      // Log after state update
      console.log('📊 Auth state updated with user:', userData);
      
      return userData;
    } catch (error: any) {
      console.error('❌ Error fetching user:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
      
      setState((prevState) => ({
        ...prevState,
        error: error.response?.data?.message || error.message,
        user: null,
        getUserLoading: false,
      }));
      
      // If 401, clear token
      if (error.response?.status === 401) {
        console.log('🔓 Clearing token due to 401 error');
        localStorage.removeItem("token");
      }
      
      return null;
    }
  };

  useEffect(() => {
    fetchUser(); // โหลดข้อมูลผู้ใช้เมื่อแอปเริ่มต้น
  }, []);

  // ล็อกอินผู้ใช้
  const login = async (data: LoginData) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      
      console.log('🔐 Login attempt:', { email: data.email });
      
      // Endpoint confirmed from backend: /auth/login
      const endpoint = '/auth/login';
      const url = `${API_BASE_URL}${endpoint}`;
      
      console.log(`📡 Calling endpoint: ${url}`);
      
      const response = await axios.post(
        url,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        }
      );
      
      console.log('✅ Login response received:', {
        status: response.status,
        data: response.data,
        hasAccessToken: !!response.data.access_token,
        hasToken: !!response.data.token,
      });
      
      const token = response.data.access_token || response.data.token || response.data.session?.access_token;
      
      if (!token) {
        console.error('❌ No token in response:', {
          responseData: response.data,
          allKeys: Object.keys(response.data || {}),
        });
        throw new Error('No token received from server');
      }
      
      localStorage.setItem("token", token);
      console.log('💾 Token saved to localStorage:', token.substring(0, 20) + '...');

      // Clear loading state
      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      
      // Fetch user data before navigating
      console.log('👤 Fetching user data...');
      try {
        const userData = await fetchUser();
        if (userData) {
          console.log('✅ User data fetched successfully');
          console.log('👑 User role from fetchUser:', userData?.role);
          console.log('👑 User role from state:', state.user?.role);
        } else {
          console.warn('⚠️ fetchUser returned null');
        }
      } catch (fetchError: any) {
        console.error('⚠️ Error fetching user:', {
          message: fetchError.message,
          response: fetchError.response?.data,
          status: fetchError.response?.status,
        });
        // Don't throw here, user is still logged in even if fetch fails
        // But we should still show an error to user
        console.warn('Continuing with login even though user fetch failed');
      }
      
      console.log('🚀 Navigating to home...');
      navigate("/");
    } catch (error: any) {
      console.error('❌ Login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
      });
      
      const errorMessage = 
        error.response?.data?.error || 
        error.response?.data?.message || 
        error.message || 
        "Login failed";
        
      console.error('📝 Error message:', errorMessage);
      
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: errorMessage,
      }));
      return { error: errorMessage };
    }
  };

  // ลงทะเบียนผู้ใช้
  const register = async (data: RegisterData) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      // Endpoint confirmed from backend: /auth/register
      const endpoint = '/auth/register';
      console.log(`Calling register endpoint: ${API_BASE_URL}${endpoint}`);
      
      const response = await axios.post(
        `${API_BASE_URL}${endpoint}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log('Register response:', response.data);
      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      navigate("/sign-up/success");
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Registration failed";
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: errorMessage,
      }));
      return { error: errorMessage };
    }
  };

  // ล็อกเอาท์ผู้ใช้
  const logout = async () => {
    try {
      // Call backend logout endpoint if token exists
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          console.log('✅ Logout successful on server');
        } catch (error) {
          // Even if backend logout fails, clear local token
          console.warn('⚠️ Backend logout failed, clearing local token anyway:', error);
        }
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Always clear local state and token
      localStorage.removeItem("token");
      setState({ user: null, error: null, loading: null, getUserLoading: null });
      navigate("/");
    }
  };

  const isAuthenticated = Boolean(state.user);

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register,
        isAuthenticated,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook สำหรับใช้งาน AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
export type { User, AuthState, LoginData, RegisterData };

