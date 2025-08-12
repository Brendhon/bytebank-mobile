import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/utils/colors';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { LogOut, User } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import LogoIllustration from '../illustrations/LogoIllustration';

interface DrawerContentProps {
  props: any;
}

export default function DrawerContent({ props }: DrawerContentProps) {
  const { user, signOut } = useAuth();

  const handleLogout = () => signOut();

  return (
    <View className={styles.container}>
      <DrawerContentScrollView {...props}>
        {/* Header */}
        <View className={styles.header}>
          <View className={styles.headerContent}>
            <View className={styles.headerContentUser}>
              <User size={28} color={colors.dark} />
            </View>
            <View>
              <Text className={styles.headerContentUserIcon}>
                {user?.name || 'Bytebank Mobile'}
              </Text>
              <Text className={styles.headerContentUserEmail}>
                {user?.email || 'Gerencie suas finanças'}
              </Text>
            </View>
          </View>
        </View>

        {/* Navigation Items */}
        <View className={styles.navigationItems}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Logo */}
      <View className={styles.logo}>
        <LogoIllustration width={20} height={20} color={colors.gray} />
        <Text className={styles.logoText}>Bytebank</Text>
      </View>

      {/* Logout Button */}
      <View className={styles.logoutButton}>
        <TouchableOpacity onPress={handleLogout} className={styles.logoutButtonContainer}>
          <LogOut size={20} color={colors.white} />
          <Text className={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: 'bg-dark flex-1',
  header: 'mb-4 p-6',
  logo: 'mb-8 flex-row items-center justify-center gap-2',
  logoText: 'text-gray text-2xl font-bold italic',
  headerContent: 'flex-row items-center',
  headerContentUser: 'mr-4 h-12 w-12 items-center justify-center rounded-full bg-white',
  headerContentUserIcon: 'text-lg font-semibold text-white',
  headerContentUserEmail: 'text-gray text-sm',
  navigationItems: 'px-4',
  logoutButton: 'border-dark-gray border-t p-8',
  logoutButtonText: 'text-white ml-3 font-semibold',
  logoutButtonContainer: 'flex-row items-center',
};
