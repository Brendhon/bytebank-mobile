import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { CreditCard, Shield, TrendingUp } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  return (
    <View className="bg-gray-50 flex-1">
      {/* Header */}
      <View className="bg-blue-600 px-6 pb-6 pt-12">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-white">Bytebank</Text>
            <Text className="text-blue-100 text-sm">Gerencie suas finanças</Text>
          </View>
          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={() => setLoginModalVisible(true)}
              className="bg-blue-500 rounded-lg px-4 py-2">
              <Text className="font-semibold text-white">Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRegisterModalVisible(true)}
              className="rounded-lg bg-white px-4 py-2">
              <Text className="text-blue-600 font-semibold">Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-6 py-8">
        {/* Hero Section */}
        <View className="mb-8">
          <Text className="text-gray-900 mb-4 text-3xl font-bold">
            Controle total das suas finanças
          </Text>
          <Text className="text-gray-600 text-lg leading-6">
            Gerencie suas contas, acompanhe gastos e invista com segurança. Tudo em um só lugar, de
            forma simples e intuitiva.
          </Text>
        </View>

        {/* Features */}
        <View className="space-y-6">
          <View className="rounded-xl bg-white p-6 shadow-sm">
            <View className="mb-4 flex-row items-center">
              <View className="bg-blue-100 mr-4 rounded-lg p-3">
                <CreditCard size={24} color="#1e40af" />
              </View>
              <View>
                <Text className="text-gray-900 text-lg font-semibold">Controle de Contas</Text>
                <Text className="text-gray-600">
                  Gerencie múltiplas contas bancárias em um só lugar
                </Text>
              </View>
            </View>
          </View>

          <View className="rounded-xl bg-white p-6 shadow-sm">
            <View className="mb-4 flex-row items-center">
              <View className="bg-green-100 mr-4 rounded-lg p-3">
                <TrendingUp size={24} color="#059669" />
              </View>
              <View>
                <Text className="text-gray-900 text-lg font-semibold">Investimentos</Text>
                <Text className="text-gray-600">
                  Acompanhe seus investimentos e veja o crescimento
                </Text>
              </View>
            </View>
          </View>

          <View className="rounded-xl bg-white p-6 shadow-sm">
            <View className="mb-4 flex-row items-center">
              <View className="mr-4 rounded-lg bg-purple-100 p-3">
                <Shield size={24} color="#7c3aed" />
              </View>
              <View>
                <Text className="text-gray-900 text-lg font-semibold">Segurança</Text>
                <Text className="text-gray-600">
                  Seus dados protegidos com criptografia de ponta
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View className="bg-blue-600 mt-8 rounded-xl p-6">
          <Text className="mb-4 text-center text-xl font-bold text-white">Comece agora mesmo</Text>
          <Text className="text-blue-100 mb-6 text-center">
            Crie sua conta gratuitamente e comece a controlar suas finanças
          </Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={() => setRegisterModalVisible(true)}
              className="flex-1 rounded-lg bg-white py-3">
              <Text className="text-blue-600 text-center font-semibold">Criar Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLoginModalVisible(true)}
              className="bg-blue-500 flex-1 rounded-lg py-3">
              <Text className="text-center font-semibold text-white">Já tenho conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      <LoginModal visible={loginModalVisible} onClose={() => setLoginModalVisible(false)} />
      <RegisterModal
        visible={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
      />
    </View>
  );
}
