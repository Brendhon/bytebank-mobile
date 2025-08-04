import { useAuth } from '@/contexts/AuthContext';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { LogOut, User } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

interface DrawerContentProps {
  props: any;
}

export default function DrawerContent({ props }: DrawerContentProps) {
  const { user, signOut } = useAuth();

  const handleLogout = () => signOut();

  return (
    <View className="bg-gray-50 flex-1">
      <DrawerContentScrollView {...props}>
        {/* Header */}
        <View className="bg-blue-600 mb-4 p-6">
          <View className="flex-row items-center">
            <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-white">
              <User size={24} color="#1e40af" />
            </View>
            <View>
              <Text className="text-lg font-semibold text-white">
                {user?.name || 'Bytebank Mobile'}
              </Text>
              <Text className="text-blue-100 text-sm">
                {user?.email || 'Gerencie suas finanças'}
              </Text>
            </View>
          </View>
        </View>

        {/* Navigation Items */}
        <View className="px-4">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Logout Button */}
      <View className="border-gray-200 border-t p-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-50 flex-row items-center rounded-lg p-3">
          <LogOut size={20} color="#dc2626" />
          <Text className="text-red-600 ml-3 font-semibold">Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
