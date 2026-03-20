"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserTier = 'free' | 'pro' | 'enterprise';
export type UserRole = 'facilitator' | 'evaluator';

export interface User {
  id: string;
  email: string;
  name: string;
  tier: UserTier;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  upgradeToPro: () => void;
  switchRole: (role: UserRole) => void;
}

// By default, we provide a logged-in user for the MVP preview
const defaultUser: User = {
  id: "usr_mock123",
  email: "facilitator@example.com",
  name: "Alex Rivera",
  tier: "pro",
  role: "facilitator",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser);

  const login = () => setUser(defaultUser);
  const logout = () => setUser(null);
  const upgradeToPro = () => {
    if (user) setUser({ ...user, tier: 'pro' });
  };
  const switchRole = (role: UserRole) => {
    if (user) setUser({ ...user, role });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradeToPro, switchRole }}>
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
