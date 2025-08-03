import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerContent from '../components/DrawerContent';
import { Home, CreditCard, Settings } from 'lucide-react-native';
import '../global.css';

export default function RootLayout() {
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
        }}
      >
        <Drawer.Screen 
          name="index" 
          options={{ 
            title: 'Início',
            drawerIcon: ({ color, size }) => (
              <Home size={size} color={color} />
            ),
            headerShown: false 
          }} 
        />
        <Drawer.Screen 
          name="dashboard" 
          options={{ 
            title: 'Dashboard',
            drawerIcon: ({ color, size }) => (
              <Home size={size} color={color} />
            ),
          }} 
        />
        <Drawer.Screen 
          name="transactions" 
          options={{ 
            title: 'Transações',
            drawerIcon: ({ color, size }) => (
              <CreditCard size={size} color={color} />
            ),
          }} 
        />
        <Drawer.Screen 
          name="settings" 
          options={{ 
            title: 'Configurações',
            drawerIcon: ({ color, size }) => (
              <Settings size={size} color={color} />
            ),
          }} 
        />
      </Drawer>
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
} 