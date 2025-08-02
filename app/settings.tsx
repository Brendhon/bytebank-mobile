import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Configurações
        </Text>

        {/* Perfil do Usuário */}
        <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-4">
            Perfil
          </Text>
          <View className="space-y-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Nome</Text>
              <Text className="text-gray-900 font-semibold">João Silva</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Email</Text>
              <Text className="text-gray-900 font-semibold">joao@email.com</Text>
            </View>
            <Link 
              href="/settings/profile" 
              className="text-blue-600 font-semibold"
            >
              Editar Perfil
            </Link>
          </View>
        </View>

        {/* Configurações de Segurança */}
        <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-4">
            Segurança
          </Text>
          <View className="space-y-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Autenticação Biométrica</Text>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={biometricEnabled ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>
            <Link 
              href="/settings/security" 
              className="text-blue-600 font-semibold"
            >
              Alterar Senha
            </Link>
          </View>
        </View>

        {/* Configurações de Notificações */}
        <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-4">
            Notificações
          </Text>
          <View className="space-y-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Notificações Push</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>
            <Link 
              href="/settings/notifications" 
              className="text-blue-600 font-semibold"
            >
              Configurar Notificações
            </Link>
          </View>
        </View>

        {/* Configurações da Aplicação */}
        <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-4">
            Aplicação
          </Text>
          <View className="space-y-4">
            <Link 
              href="/settings/about" 
              className="text-blue-600 font-semibold"
            >
              Sobre o App
            </Link>
            <Link 
              href="/settings/privacy" 
              className="text-blue-600 font-semibold"
            >
              Política de Privacidade
            </Link>
            <Link 
              href="/settings/terms" 
              className="text-blue-600 font-semibold"
            >
              Termos de Uso
            </Link>
          </View>
        </View>

        {/* Sair */}
        <View className="bg-white p-6 rounded-lg shadow-sm">
          <TouchableOpacity className="bg-red-600 py-3 px-6 rounded-lg">
            <Text className="text-white text-center font-semibold">
              Sair da Conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
} 