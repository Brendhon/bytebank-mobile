import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'expo-router';

// 1. Type definition for the context data
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  signIn(credentials: { email: string; password: string }): Promise<void>;
  signUp(credentials: { name: string; email: string; password: string }): Promise<void>;
  signOut(): void;
}

// 2. Context creation
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// 3. Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const signIn = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual authentication service
      // Mock implementation for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: 'Usuário Teste',
        email: credentials.email,
      };
      
      setUser(mockUser);

      router.replace('/(app)');
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual registration service
      // Mock implementation for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: credentials.name,
        email: credentials.email,
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setIsLoading(true);
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        user, 
        isLoading,
        signIn, 
        signUp,
        signOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 4. Dedicated consumer hook (MANDATORY)
export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}; 