import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/utils/colors';
import { Eye, EyeOff } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

export default function DashboardScreen() {
  const { user } = useAuth();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  // Função para formatar a data atual
  const formatCurrentDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return today.toLocaleDateString('pt-BR', options);
  };

  // Dados das movimentações
  const movements = [
    {
      id: 1,
      type: 'Pagamentos',
      value: 1001.00,
      color: 'bg-dark',
      textColor: 'text-white',
    },
    {
      id: 2,
      type: 'Depósitos',
      value: 9250.00,
      color: 'bg-blue',
      textColor: 'text-white',
    },
    {
      id: 3,
      type: 'Transferências',
      value: 510.00,
      color: 'bg-orange',
      textColor: 'text-white',
    },
    {
      id: 4,
      type: 'Saque',
      value: 0.00,
      color: 'bg-green',
      textColor: 'text-white',
    },
  ];

  return (
    <ScrollView className="bg-gray-50 flex-1">
      {/* Header com saudação e data */}
      <View className="p-6">
        <Text className="mb-2 text-2xl font-bold text-dark">
          Olá, {user?.name}! :)
        </Text>
        <Text className="text-dark-gray">{formatCurrentDate()}</Text>
      </View>

      {/* Seção de Saldo */}
      <View className="p-6">
        <View className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-dark-gray text-lg font-semibold">Saldo</Text>
            <TouchableOpacity
              onPress={() => setIsBalanceVisible(!isBalanceVisible)}
              className="p-2"
            >
              {isBalanceVisible ? (
                <EyeOff size={20} color={colors.dark} />
              ) : (
                <Eye size={20} color={colors.dark} />
              )}
            </TouchableOpacity>
          </View>
          
          <Text className="text-dark-gray text-sm mb-2">Conta Corrente</Text>
          
          <Text className="text-dark mb-2 text-3xl font-bold">
            {isBalanceVisible ? 'R$ 15.420,50' : '••••••'}
          </Text>
        </View>

        {/* Seção de Movimentações */}
        <View className="mb-6">
          <Text className="text-dark mb-4 text-lg font-semibold">
            Movimentações
          </Text>
          
          <View className="space-y-4">
            {movements.map((movement) => (
              <View
                key={movement.id}
                className={`rounded-xl p-6 shadow-sm ${movement.color}`}
              >
                <Text className={`mb-2 text-2xl font-bold ${movement.textColor}`}>
                  R$ {movement.value.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
                <Text className={`text-sm ${movement.textColor}`}>
                  {movement.type}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
