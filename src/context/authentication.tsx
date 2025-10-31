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
  fetchUser: () => Promise<void>;
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
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setState((prevState) => ({
        ...prevState,
        user: null,
        getUserLoading: false,
      }));
      return;
    }

    try {
      setState((prevState) => ({ ...prevState, getUserLoading: true }));
      // JWT interceptor will automatically add Authorization header
      const response = await axios.get(`${API_BASE_URL}/auth/get-user`);
      setState((prevState) => ({
        ...prevState,
        user: response.data,
        getUserLoading: false,
      }));
    } catch (error: any) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
        user: null,
        getUserLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchUser(); // โหลดข้อมูลผู้ใช้เมื่อแอปเริ่มต้น
  }, []);

  // ล็อกอินผู้ใช้
  const login = async (data: LoginData) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        data
      );
      const token = response.data.access_token;
      localStorage.setItem("token", token);

      // ดึงและตั้งค่าข้อมูลผู้ใช้
      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      navigate("/");
      await fetchUser();
    } catch (error: any) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.response?.data?.error || "Login failed",
      }));
      return { error: error.response?.data?.error || "Login failed" };
    }
  };

  // ลงทะเบียนผู้ใช้
  const register = async (data: RegisterData) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      await axios.post(
        `${API_BASE_URL}/auth/register`,
        data
      );
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
  const logout = () => {
    localStorage.removeItem("token");
    setState({ user: null, error: null, loading: null, getUserLoading: null });
    navigate("/");
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

