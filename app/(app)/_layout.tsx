import LogoIllustration from '@/components/illustrations/LogoIllustration';
import DrawerContent from '@/components/layout/DrawerContent';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/utils/colors';
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

  const headerRight = () => (
    <LogoIllustration color={colors.orange} width={24} height={24} style={{ marginRight: 12 }} />
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <DrawerContent props={props} />}
        screenOptions={{
          headerShown: true,
          headerRight,
          headerStyle: {
            backgroundColor: colors.dark,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          drawerActiveBackgroundColor: colors.blue,
          drawerActiveTintColor: colors.white,
          drawerInactiveTintColor: colors.gray,
          drawerStyle: {
            backgroundColor: colors.dark,
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
