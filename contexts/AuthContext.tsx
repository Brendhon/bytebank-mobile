import { useStorageState } from '@/hooks/useStorageState';
import { useRouter } from 'expo-router';
import { createContext, ReactNode, useContext, useState } from 'react';

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
  session?: string | null;
}

// 2. Context creation
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// 3. Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const signIn = async (credentials: { email: string; password: string }) => {
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
      setSession('xxx'); // Store session token

      router.replace('/(app)');
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (credentials: { name: string; email: string; password: string }) => {
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
      setSession('xxx'); // Store session token
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!session, 
        user, 
        isLoading,
        session,
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