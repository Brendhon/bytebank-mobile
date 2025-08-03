import { View, Text, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Menu } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="bg-blue p-6 pt-12">
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-2xl font-bold">
            Bytebank Mobile
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/dashboard')}
            className="p-2"
          >
            <Menu size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <Text className="text-blue-100 text-lg mt-2">
          Bem-vindo ao seu banco digital
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 justify-center items-center p-6">
        <View className="w-full max-w-sm">
          <View className="bg-white p-8 rounded-2xl shadow-lg">
            <Text className="text-2xl font-bold text-center text-gray-900 mb-4">
              Gerencie suas finanças
            </Text>
            
            <Text className="text-center text-gray-600 mb-8">
              Acesse o dashboard para começar a gerenciar suas transações e acompanhar seus gastos
            </Text>

            <View className="space-y-4">
              <Link 
                href="/dashboard" 
                className="bg-blue-600 text-white py-4 px-6 rounded-xl text-center font-semibold shadow-sm"
              >
                Acessar Dashboard
              </Link>
              
              <Link 
                href="/transactions" 
                className="bg-gray-100 text-gray-800 py-4 px-6 rounded-xl text-center font-semibold"
              >
                Ver Transações
              </Link>
              
              <Link 
                href="/settings" 
                className="bg-gray-50 text-gray-600 py-4 px-6 rounded-xl text-center"
              >
                Configurações
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
} 