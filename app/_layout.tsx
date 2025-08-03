import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SplashScreenController } from '@/components/SplashScreenController';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <RootNavigator />
      <StatusBar style="dark" />
    </AuthProvider>
  );
}

// Separate this into a new component so it can access the SessionProvider context later
function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 1000 }}>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="index" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
} 