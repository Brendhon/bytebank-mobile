import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function TransactionsScreen() {
  const transactions = [
    {
      id: 1,
      description: 'Salário',
      amount: 3500.00,
      type: 'income',
      date: '2024-01-15',
      category: 'Trabalho'
    },
    {
      id: 2,
      description: 'Supermercado',
      amount: -150.00,
      type: 'expense',
      date: '2024-01-14',
      category: 'Alimentação'
    },
    {
      id: 3,
      description: 'Conta de Luz',
      amount: -89.50,
      type: 'expense',
      date: '2024-01-13',
      category: 'Moradia'
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-900">
            Transações
          </Text>
          <Link 
            href="/transactions/new" 
            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold"
          >
            Nova
          </Link>
        </View>

        {/* Filtros */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-3">
            Filtros
          </Text>
          <View className="flex-row space-x-2">
            <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-lg">
              <Text className="text-white font-semibold">Todas</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-lg">
              <Text className="text-gray-700 font-semibold">Receitas</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-lg">
              <Text className="text-gray-700 font-semibold">Despesas</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de Transações */}
        <View className="space-y-3">
          {transactions.map((transaction) => (
            <View key={transaction.id} className="bg-white p-4 rounded-lg shadow-sm">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900">
                    {transaction.description}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {transaction.category} • {transaction.date}
                  </Text>
                </View>
                <Text 
                  className={`text-lg font-bold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : ''}R$ {transaction.amount.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Botão para ver mais */}
        <View className="mt-6">
          <Link 
            href="/transactions" 
            className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-center font-semibold"
          >
            Ver Todas as Transações
          </Link>
        </View>
      </View>
    </ScrollView>
  );
} 