import DrawerContent from '@/components/DrawerContent';
import { useAuth } from '@/contexts/AuthContext';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { CreditCard, Home, Settings } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../../global.css';

export default function AppLayout() {
  // Get the authentication status and loading state
  const { isAuthenticated, isLoading } = useAuth();

  // Don't render anything while checking authentication
  if (isLoading || !isAuthenticated) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <DrawerContent props={props} />}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1e40af',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerActiveBackgroundColor: '#dbeafe',
          drawerActiveTintColor: '#1e40af',
          drawerInactiveTintColor: '#6b7280',
          drawerStyle: {
            backgroundColor: '#f9fafb',
            width: 280,
          },
        }}>
        <Drawer.Screen
          name="index"
          options={{
            title: 'Dashboard',
            drawerIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="transactions"
          options={{
            title: 'Transações',
            drawerIcon: ({ color, size }) => <CreditCard size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: 'Configurações',
            drawerIcon: ({ color, size }) => <Settings size={size} color={color} />,
          }}
        />
      </Drawer>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
