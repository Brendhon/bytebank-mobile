import { useAuth } from '@/contexts/AuthContext';
import { Bell, CreditCard, HelpCircle, LogOut, Shield, User } from 'lucide-react-native';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sair da Conta', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: signOut,
      },
    ]);
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
    <View className="bg-gray-50 flex-1">
      {/* User Profile Header */}
      <View className="border-gray-200 border-b bg-white p-6">
        <View className="flex-row items-center">
          <View className="bg-blue-100 mr-4 h-16 w-16 items-center justify-center rounded-full">
            <User size={24} color="#1e40af" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-900 text-xl font-bold">{user?.name}</Text>
            <Text className="text-gray-600">{user?.email}</Text>
          </View>
        </View>
      </View>

      {/* Settings List */}
      <ScrollView className="flex-1">
        <View className="space-y-4 p-4">
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              className="rounded-xl bg-white p-4 shadow-sm">
              <View className="flex-row items-center">
                <View className="bg-gray-100 mr-4 h-10 w-10 items-center justify-center rounded-lg">
                  <item.icon size={20} color="#6b7280" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-semibold">{item.title}</Text>
                  <Text className="text-gray-500 text-sm">{item.subtitle}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-50 border-red-200 rounded-xl border p-4">
            <View className="flex-row items-center">
              <View className="bg-red-100 mr-4 h-10 w-10 items-center justify-center rounded-lg">
                <LogOut size={20} color="#dc2626" />
              </View>
              <View className="flex-1">
                <Text className="text-red-600 font-semibold">Sair da Conta</Text>
                <Text className="text-red-500 text-sm">Encerrar sessão atual</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
