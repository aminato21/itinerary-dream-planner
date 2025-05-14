
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

// Define types
type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication functions (to be replaced with real implementation)
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email === 'demo@example.com' && password === 'password') {
    return {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      avatar: 'https://i.pravatar.cc/150?u=demo@example.com'
    };
  }
  
  throw new Error('Invalid credentials');
};

const mockSignup = async (email: string, password: string, name: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: '2',
    email,
    name,
    avatar: `https://i.pravatar.cc/150?u=${email}`
  };
};

// Create provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('travelPlannerUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const user = await mockLogin(email, password);
      setUser(user);
      localStorage.setItem('travelPlannerUser', JSON.stringify(user));
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Login with Google
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      // Mock Google login
      await new Promise(resolve => setTimeout(resolve, 1000));
      const googleUser = {
        id: 'google123',
        email: 'google@example.com',
        name: 'Google User',
        avatar: 'https://i.pravatar.cc/150?u=google@example.com'
      };
      setUser(googleUser);
      localStorage.setItem('travelPlannerUser', JSON.stringify(googleUser));
      toast({
        title: "Login successful",
        description: `Welcome, ${googleUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Google login failed",
        description: "Could not sign in with Google",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Sign up
  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const newUser = await mockSignup(email, password, name);
      setUser(newUser);
      localStorage.setItem('travelPlannerUser', JSON.stringify(newUser));
      toast({
        title: "Account created",
        description: `Welcome to TravelPlanner, ${newUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
      localStorage.removeItem('travelPlannerUser');
      toast({
        title: "Logged out",
        description: "You've been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Could not log out",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    logout,
    signup
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
