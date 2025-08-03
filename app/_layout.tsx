import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../contexts/AuthContext';
import { SplashScreenController } from '../components/SplashScreenController';
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
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index"
        options={{ 
          animation: 'fade',
          animationDuration: 1000,
         }}
      />
      <Stack.Screen 
        name="(app)" 
        options={{ 
          animation: 'fade',
          animationDuration: 1000,
         }}
      />
    </Stack>
  );
} 