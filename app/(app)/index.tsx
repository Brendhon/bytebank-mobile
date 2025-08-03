import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, DollarSign, TrendingUp } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

export default function DashboardScreen() {
  const { user } = useAuth();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Welcome Header */}
      <View className="bg-blue-600 p-6">
        <Text className="text-white text-2xl font-bold mb-2">
          Olá, {user?.name}!
        </Text>
        <Text className="text-blue-100">
          Bem-vindo ao seu dashboard financeiro
        </Text>
      </View>

      {/* Balance Card */}
      <View className="p-6">
        <View className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-900">
              Saldo Total
            </Text>
            <CreditCard size={24} color="#1e40af" />
          </View>
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            R$ 15.420,50
          </Text>
          <Text className="text-green-600 text-sm">
            +2,5% este mês
          </Text>
        </View>

        {/* Quick Actions */}
        <View className="space-y-4">
          <View className="bg-white p-6 rounded-xl shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-gray-900">
                Receitas
              </Text>
              <TrendingUp size={24} color="#059669" />
            </View>
            <Text className="text-2xl font-bold text-green-600 mb-2">
              R$ 8.250,00
            </Text>
            <Text className="text-gray-600 text-sm">
              Este mês
            </Text>
          </View>

          <View className="bg-white p-6 rounded-xl shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-gray-900">
                Despesas
              </Text>
              <DollarSign size={24} color="#dc2626" />
            </View>
            <Text className="text-2xl font-bold text-red-600 mb-2">
              R$ 3.120,00
            </Text>
            <Text className="text-gray-600 text-sm">
              Este mês
            </Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Transações Recentes
          </Text>
          <View className="bg-white rounded-xl shadow-sm overflow-hidden">
            {[
              { id: 1, title: 'Salário', amount: '+R$ 5.000,00', date: 'Hoje', type: 'income' },
              { id: 2, title: 'Supermercado', amount: '-R$ 320,00', date: 'Ontem', type: 'expense' },
              { id: 3, title: 'Freelance', amount: '+R$ 1.200,00', date: '2 dias atrás', type: 'income' },
            ].map((transaction) => (
              <View key={transaction.id} className="flex-row items-center justify-between p-4 border-b border-gray-100">
                <View>
                  <Text className="font-semibold text-gray-900">
                    {transaction.title}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {transaction.date}
                  </Text>
                </View>
                <Text className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
} 