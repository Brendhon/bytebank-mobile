import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Dashboard
        </Text>
        
        {/* Saldo */}
        <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-2">
            Saldo Atual
          </Text>
          <Text className="text-3xl font-bold text-green-600">
            R$ 5.250,00
          </Text>
        </View>

        {/* Resumo Mensal */}
        <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-4">
            Resumo do Mês
          </Text>
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Receitas</Text>
              <Text className="text-green-600 font-semibold">R$ 3.500,00</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Despesas</Text>
              <Text className="text-red-600 font-semibold">R$ 2.250,00</Text>
            </View>
            <View className="border-t pt-3 flex-row justify-between">
              <Text className="text-gray-800 font-semibold">Saldo</Text>
              <Text className="text-green-600 font-bold">R$ 1.250,00</Text>
            </View>
          </View>
        </View>

        {/* Ações Rápidas */}
        <View className="bg-white p-6 rounded-lg shadow-sm">
          <Text className="text-lg font-semibold text-gray-700 mb-4">
            Ações Rápidas
          </Text>
          <View className="space-y-3">
            <Link 
              href="/transactions" 
              className="bg-blue-600 text-white py-3 px-4 rounded-lg text-center font-semibold"
            >
              Nova Transação
            </Link>
            <Link 
              href="/transactions" 
              className="bg-gray-200 text-gray-800 py-3 px-4 rounded-lg text-center font-semibold"
            >
              Ver Todas as Transações
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
} 