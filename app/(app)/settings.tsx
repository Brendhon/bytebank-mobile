import { useAuth } from '@/contexts/AuthContext';
import {
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  Shield,
  User
} from 'lucide-react-native';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: signOut,
        },
      ]
    );
  };

  const settingsItems = [
    {
      id: 1,
      title: 'Perfil',
      subtitle: 'Editar informações pessoais',
      icon: User,
      onPress: () => {},
    },
    {
      id: 2,
      title: 'Notificações',
      subtitle: 'Configurar alertas',
      icon: Bell,
      onPress: () => {},
    },
    {
      id: 3,
      title: 'Segurança',
      subtitle: 'Senha e autenticação',
      icon: Shield,
      onPress: () => {},
    },
    {
      id: 4,
      title: 'Cartões',
      subtitle: 'Gerenciar cartões',
      icon: CreditCard,
      onPress: () => {},
    },
    {
      id: 5,
      title: 'Ajuda',
      subtitle: 'Suporte e FAQ',
      icon: HelpCircle,
      onPress: () => {},
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* User Profile Header */}
      <View className="bg-white p-6 border-b border-gray-200">
        <View className="flex-row items-center">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mr-4">
            <User size={24} color="#1e40af" />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-900">
              {user?.name}
            </Text>
            <Text className="text-gray-600">
              {user?.email}
            </Text>
          </View>
        </View>
      </View>

      {/* Settings List */}
      <ScrollView className="flex-1">
        <View className="p-4 space-y-4">
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              className="bg-white p-4 rounded-xl shadow-sm"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                  <item.icon size={20} color="#6b7280" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {item.subtitle}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-50 p-4 rounded-xl border border-red-200"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-red-100 rounded-lg items-center justify-center mr-4">
                <LogOut size={20} color="#dc2626" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-red-600">
                  Sair da Conta
                </Text>
                <Text className="text-sm text-red-500">
                  Encerrar sessão atual
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
} 