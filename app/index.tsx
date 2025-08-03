import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { CreditCard, Shield, TrendingUp } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 pt-12 pb-6 px-6">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white text-2xl font-bold">Bytebank</Text>
            <Text className="text-blue-100 text-sm">Gerencie suas finanças</Text>
          </View>
          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={() => setLoginModalVisible(true)}
              className="bg-blue-500 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-semibold">Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRegisterModalVisible(true)}
              className="bg-white px-4 py-2 rounded-lg"
            >
              <Text className="text-blue-600 font-semibold">Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-6 py-8">
        {/* Hero Section */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-4">
            Controle total das suas finanças
          </Text>
          <Text className="text-lg text-gray-600 leading-6">
            Gerencie suas contas, acompanhe gastos e invista com segurança. 
            Tudo em um só lugar, de forma simples e intuitiva.
          </Text>
        </View>

        {/* Features */}
        <View className="space-y-6">
          <View className="bg-white p-6 rounded-xl shadow-sm">
            <View className="flex-row items-center mb-4">
              <View className="bg-blue-100 p-3 rounded-lg mr-4">
                <CreditCard size={24} color="#1e40af" />
              </View>
              <View>
                <Text className="text-lg font-semibold text-gray-900">
                  Controle de Contas
                </Text>
                <Text className="text-gray-600">
                  Gerencie múltiplas contas bancárias em um só lugar
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white p-6 rounded-xl shadow-sm">
            <View className="flex-row items-center mb-4">
              <View className="bg-green-100 p-3 rounded-lg mr-4">
                <TrendingUp size={24} color="#059669" />
              </View>
              <View>
                <Text className="text-lg font-semibold text-gray-900">
                  Investimentos
                </Text>
                <Text className="text-gray-600">
                  Acompanhe seus investimentos e veja o crescimento
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white p-6 rounded-xl shadow-sm">
            <View className="flex-row items-center mb-4">
              <View className="bg-purple-100 p-3 rounded-lg mr-4">
                <Shield size={24} color="#7c3aed" />
              </View>
              <View>
                <Text className="text-lg font-semibold text-gray-900">
                  Segurança
                </Text>
                <Text className="text-gray-600">
                  Seus dados protegidos com criptografia de ponta
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View className="mt-8 bg-blue-600 p-6 rounded-xl">
          <Text className="text-white text-xl font-bold text-center mb-4">
            Comece agora mesmo
          </Text>
          <Text className="text-blue-100 text-center mb-6">
            Crie sua conta gratuitamente e comece a controlar suas finanças
          </Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={() => setRegisterModalVisible(true)}
              className="flex-1 bg-white py-3 rounded-lg"
            >
              <Text className="text-blue-600 font-semibold text-center">
                Criar Conta
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLoginModalVisible(true)}
              className="flex-1 bg-blue-500 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold text-center">
                Já tenho conta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      <LoginModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      />
      <RegisterModal
        visible={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
      />
    </View>
  );
} 