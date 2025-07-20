import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/task';
import { storage } from '@/lib/storage';

interface AuthContextType extends AuthState {
  login: (username: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const savedUser = storage.getUser();
    if (savedUser) {
      setAuthState({
        user: savedUser,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (username: string, email: string) => {
    const user: User = {
      id: storage.generateId(),
      username,
      email,
    };
    
    storage.saveUser(user);
    setAuthState({
      user,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    storage.clearUser();
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};