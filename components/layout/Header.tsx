import { Text, TouchableOpacity, View } from 'react-native';

type HeaderProps = {
  variant: 'guest';
  onOpenAccount: () => void;
  onLogin: () => void;
};

export const Header = ({ variant, onOpenAccount, onLogin }: HeaderProps) => {
  return (
    <View className="bg-blue-600 px-6 pb-6 pt-12">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-white">Bytebank</Text>
          <Text className="text-blue-100 text-sm">Gerencie suas finanças</Text>
        </View>
        <View className="flex-row space-x-2">
          <TouchableOpacity
            onPress={onLogin}
            className="bg-blue-500 rounded-lg px-4 py-2">
            <Text className="font-semibold text-white">Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onOpenAccount}
            className="rounded-lg bg-white px-4 py-2">
            <Text className="text-blue-600 font-semibold">Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}; 