import { useAuth } from '@/contexts/AuthContext';
import { SplashScreen } from 'expo-router';

export function SplashScreenController() {
  const { isLoading } = useAuth();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
