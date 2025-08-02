import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Bytebank Mobile',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="dashboard" 
          options={{ 
            title: 'Dashboard',
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="transactions" 
          options={{ 
            title: 'Transações',
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            title: 'Configurações',
            headerShown: true 
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
} 