import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { getCurrentUser, login as mockLogin, logout as mockLogout } from '../services/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  upgradeToPro: () => void;
  incrementAnalyses: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string) => {
    const loggedInUser = await mockLogin(email);
    setUser(loggedInUser);
  };

  const logout = () => {
    mockLogout();
    setUser(null);
  };

  const upgradeToPro = () => {
    if (user) {
      const updatedUser = { ...user, plan: 'pro' as const };
      setUser(updatedUser);
      localStorage.setItem('mock_user', JSON.stringify(updatedUser));
    }
  };

  const incrementAnalyses = () => {
    if (user) {
      const updatedUser = { ...user, analysesCount: user.analysesCount + 1 };
      setUser(updatedUser);
      localStorage.setItem('mock_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, upgradeToPro, incrementAnalyses }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
