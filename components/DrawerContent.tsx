import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { LogOut, User } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

interface DrawerContentProps {
  props: any;
}

export default function DrawerContent({ props }: DrawerContentProps) {
  const { user, signOut } = useAuth();

  const handleLogout = () => signOut();

  return (
    <View className="flex-1 bg-gray-50">
      <DrawerContentScrollView {...props}>
        {/* Header */}
        <View className="bg-blue-600 p-6 mb-4">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-4">
              <User size={24} color="#1e40af" />
            </View>
            <View>
              <Text className="text-white text-lg font-semibold">
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
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center p-3 bg-red-50 rounded-lg"
        >
          <LogOut size={20} color="#dc2626" />
          <Text className="text-red-600 font-semibold ml-3">
            Sair da Conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 