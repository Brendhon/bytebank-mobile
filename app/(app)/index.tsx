import { GradientContainer } from '@/components/layout/GradientContainer';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/utils/colors';
import { formatDate } from '@/utils/date';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const { user } = useAuth();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  // Dados das movimentações
  const movements = [
    {
      id: 1,
      type: 'Pagamentos',
      value: 1001.00,
      color: 'bg-dark',
    },
    {
      id: 2,
      type: 'Depósitos',
      value: 9250.00,
      color: 'bg-blue',
    },
    {
      id: 3,
      type: 'Transferências',
      value: 510.00,
      color: 'bg-orange',
    },
    {
      id: 4,
      type: 'Saque',
      value: 0.00,
      color: 'bg-green',
    },
  ];

  // Fist name
  const firstName = user?.name?.split(' ')?.[0] || 'Usuário';

  return (
    <GradientContainer>
      <ScrollView className="flex-1">
        {/* Header com saudação e data */}
        <View className="p-6 mt-6">
          <View className="flex-row items-start justify-between">

            <View className="flex items-start justify-start gap-1">
              <Text className="mb-2 text-3xl font-bold text-dark">
                Olá, {firstName}! :)
              </Text>
              <Text className="text-dark-gray">{formatDate()}</Text>
            </View>

            <TouchableOpacity onPress={() => setIsBalanceVisible(!isBalanceVisible)}            >
              {isBalanceVisible ? <EyeOff size={32} color={colors.dark} /> : <Eye size={32} color={colors.dark} />}
            </TouchableOpacity>

          </View>
        </View>

        {/* Seção de Saldo */}
        <View className="p-6">
          <View className="mb-8 rounded-lg bg-dark p-6 shadow-sm flex-row justify-between">
            <View className="flex items-start justify-start gap-1">
              <Text className="text-white text-2xl font-semibold">Saldo</Text>
              <Text className="text-white text-sm">Conta Corrente</Text>
            </View>

            <View className="flex items-center justify-center">
              <Text
                className="text-white mb-2 text-3xl font-bold"
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ maxWidth: 220 }}
              >
                {isBalanceVisible ? 'R$ 15.420,50' : '••••••'}
              </Text>
            </View>

          </View>

          {/* Seção de Movimentações */}
          <View className="mb-6">
            <Text className="text-dark mb-4 text-2xl font-semibold">
              Movimentações
            </Text>

            <View className="flex gap-4">
              {movements.map((movement) => (
                <View
                  key={movement.id}
                  className={`rounded-lg p-6 shadow-sm ${movement.color}`}
                >
                  <Text className={`mb-2 text-2xl font-bold text-white`}>
                    R$ {movement.value.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                  <Text className={`text-white`}>
                    {movement.type}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </GradientContainer>
  );
}
