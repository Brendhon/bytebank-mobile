import { Filter, Plus, Search } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function TransactionsScreen() {
  return (
    <View className="bg-gray-50 flex-1">
      {/* Header Actions */}
      <View className="border-gray-200 border-b bg-white p-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-900 text-xl font-bold">Transações</Text>
          <View className="flex-row space-x-2">
            <TouchableOpacity className="p-2">
              <Search size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2">
              <Filter size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-600 rounded-lg p-2">
              <Plus size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Transactions List */}
      <ScrollView className="flex-1 p-4">
        <View className="space-y-4">
          {[
            {
              id: 1,
              title: 'Salário',
              description: 'Recebimento mensal',
              amount: '+R$ 5.000,00',
              date: 'Hoje, 14:30',
              type: 'income',
              category: 'Trabalho',
            },
            {
              id: 2,
              title: 'Supermercado',
              description: 'Compras do mês',
              amount: '-R$ 320,00',
              date: 'Ontem, 16:45',
              type: 'expense',
              category: 'Alimentação',
            },
            {
              id: 3,
              title: 'Freelance',
              description: 'Projeto web design',
              amount: '+R$ 1.200,00',
              date: '2 dias atrás',
              type: 'income',
              category: 'Trabalho',
            },
            {
              id: 4,
              title: 'Uber',
              description: 'Transporte',
              amount: '-R$ 25,50',
              date: '3 dias atrás',
              type: 'expense',
              category: 'Transporte',
            },
            {
              id: 5,
              title: 'Netflix',
              description: 'Assinatura mensal',
              amount: '-R$ 39,90',
              date: '5 dias atrás',
              type: 'expense',
              category: 'Entretenimento',
            },
          ].map((transaction) => (
            <View key={transaction.id} className="rounded-xl bg-white p-4 shadow-sm">
              <View className="mb-2 flex-row items-center justify-between">
                <View>
                  <Text className="text-gray-900 font-semibold">{transaction.title}</Text>
                  <Text className="text-gray-500 text-sm">{transaction.description}</Text>
                </View>
                <Text
                  className={`text-lg font-bold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {transaction.amount}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center space-x-2">
                  <View
                    className={`rounded-full px-2 py-1 ${
                      transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                    <Text
                      className={`text-xs font-medium ${
                        transaction.type === 'income' ? 'text-green-700' : 'text-red-700'
                      }`}>
                      {transaction.category}
                    </Text>
                  </View>
                </View>
                <Text className="text-gray-400 text-xs">{transaction.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
