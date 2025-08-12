import { useStorageState } from '@/hooks/storage';
import { User } from '@/models/user';
import { AuthService } from '@/services/api/auth.service';
import { tokenManager, cacheManager } from '@/services/api/client';
import { useRouter } from 'expo-router';
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';

// 1. Type definition for the context data
interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  signIn(credentials: { email: string; password: string }): Promise<void>;
  signUp(credentials: {
    name: string;
    email: string;
    password: string;
    acceptPrivacy: boolean;
  }): Promise<void>;
  signOut(): Promise<void>;
  refreshUser(): Promise<void>;
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
  const [isUserLoading, setIsUserLoading] = useState(false);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (session) {
        try {
          setIsUserLoading(true);
          const currentUser = await AuthService.getMe();
          setUser(currentUser);
        } catch (error) {
          console.error('Failed to get current user:', error);
          // If token is invalid, clear session
          await signOut();
        } finally {
          setIsUserLoading(false);
        }
      }
    };

    checkAuthStatus();
  }, [session]);

  const signIn = async (credentials: { email: string; password: string }) => {
    try {
      setIsUserLoading(true);

      // Clear any existing cache before login to ensure fresh data
      await cacheManager.clearCache();

      // Call the real authentication service
      const authPayload = await AuthService.login(credentials.email, credentials.password);

      // Store the token
      await tokenManager.setToken(authPayload.token);
      setSession(authPayload.token);

      // Set user data
      setUser(authPayload.user);

      // Navigate to app
      router.replace('/(app)');
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  };

  const signUp = async (credentials: {
    name: string;
    email: string;
    password: string;
    acceptPrivacy: boolean;
  }) => {
    try {
      setIsUserLoading(true);

      // Clear any existing cache before registration to ensure fresh data
      await cacheManager.clearCache();

      // Call the real registration service
      const authPayload = await AuthService.register(
        credentials.name,
        credentials.email,
        credentials.password,
        credentials.acceptPrivacy
      );

      // Store the token
      await tokenManager.setToken(authPayload.token);
      setSession(authPayload.token);

      // Set user data
      setUser(authPayload.user);

      // Navigate to app
      router.replace('/(app)');
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      // Remove token from storage
      await tokenManager.removeToken();
      setSession(null);
      setUser(null);

      // Clear Apollo Client cache to remove all cached data
      await cacheManager.clearCache();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const refreshUser = async () => {
    try {
      setIsUserLoading(true);
      const currentUser = await AuthService.getMe();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!session && !!user,
        user,
        isLoading: isLoading || isUserLoading,
        session,
        signIn,
        signUp,
        signOut,
        refreshUser,
      }}>
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
