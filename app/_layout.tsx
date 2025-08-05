import { SplashScreenController } from '@/components/splash/SplashScreenController';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { apolloClient } from '@/services/api/client';
import { ApolloProvider } from '@apollo/client';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <SplashScreenController />
        <RootNavigator />
        <StatusBar style="light" />
      </AuthProvider>
    </ApolloProvider>
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
