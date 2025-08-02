import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white justify-center items-center p-6">
      <View className="w-full max-w-sm">
        <Text className="text-3xl font-bold text-center text-gray-900 mb-8">
          Bytebank Mobile
        </Text>
        
        <Text className="text-lg text-center text-gray-600 mb-8">
          Gerencie suas finanças de forma simples e segura
        </Text>

        <View className="space-y-4">
          <Link 
            href="/dashboard" 
            className="bg-blue text-white py-3 px-6 rounded-lg text-center font-semibold"
          >
            Entrar
          </Link>
          
          <Link 
            href="/transactions" 
            className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-center font-semibold"
          >
            Ver Transações
          </Link>
          
          <Link 
            href="/settings" 
            className="bg-gray-100 text-gray-600 py-3 px-6 rounded-lg text-center"
          >
            Configurações
          </Link>
        </View>
      </View>
    </View>
  );
} 