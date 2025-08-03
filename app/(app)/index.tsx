import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, DollarSign, TrendingUp } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

export default function DashboardScreen() {
  const { user } = useAuth();

  return (
    <ScrollView className="bg-gray-50 flex-1">
      {/* Welcome Header */}
      <View className="bg-blue-600 p-6">
        <Text className="mb-2 text-2xl font-bold text-white">Olá, {user?.name}!</Text>
        <Text className="text-blue-100">Bem-vindo ao seu dashboard financeiro</Text>
      </View>

      {/* Balance Card */}
      <View className="p-6">
        <View className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-gray-900 text-lg font-semibold">Saldo Total</Text>
            <CreditCard size={24} color="#1e40af" />
          </View>
          <Text className="text-gray-900 mb-2 text-3xl font-bold">R$ 15.420,50</Text>
          <Text className="text-green-600 text-sm">+2,5% este mês</Text>
        </View>

        {/* Quick Actions */}
        <View className="space-y-4">
          <View className="rounded-xl bg-white p-6 shadow-sm">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-gray-900 text-lg font-semibold">Receitas</Text>
              <TrendingUp size={24} color="#059669" />
            </View>
            <Text className="text-green-600 mb-2 text-2xl font-bold">R$ 8.250,00</Text>
            <Text className="text-gray-600 text-sm">Este mês</Text>
          </View>

          <View className="rounded-xl bg-white p-6 shadow-sm">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-gray-900 text-lg font-semibold">Despesas</Text>
              <DollarSign size={24} color="#dc2626" />
            </View>
            <Text className="text-red-600 mb-2 text-2xl font-bold">R$ 3.120,00</Text>
            <Text className="text-gray-600 text-sm">Este mês</Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="mt-6">
          <Text className="text-gray-900 mb-4 text-lg font-semibold">Transações Recentes</Text>
          <View className="overflow-hidden rounded-xl bg-white shadow-sm">
            {[
              { id: 1, title: 'Salário', amount: '+R$ 5.000,00', date: 'Hoje', type: 'income' },
              {
                id: 2,
                title: 'Supermercado',
                amount: '-R$ 320,00',
                date: 'Ontem',
                type: 'expense',
              },
              {
                id: 3,
                title: 'Freelance',
                amount: '+R$ 1.200,00',
                date: '2 dias atrás',
                type: 'income',
              },
            ].map((transaction) => (
              <View
                key={transaction.id}
                className="border-gray-100 flex-row items-center justify-between border-b p-4">
                <View>
                  <Text className="text-gray-900 font-semibold">{transaction.title}</Text>
                  <Text className="text-gray-500 text-sm">{transaction.date}</Text>
                </View>
                <Text
                  className={`font-semibold ${
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
