import LoginModal from '@/components/modal/LoginModal';
import RegisterModal from '@/components/modal/RegisterModal';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { useState } from 'react';
import { View } from 'react-native';

export default function HomeScreen() {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  return (
    <View className="bg-gray-50 flex-1">
      {/* Header */}
      <Header
        variant="guest"
        onOpenAccount={() => setRegisterModalVisible(true)}
        onLogin={() => setLoginModalVisible(true)}
      />

      {/* Content */}
      <BenefitsSection />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <LoginModal visible={loginModalVisible} onClose={() => setLoginModalVisible(false)} />
      <RegisterModal
        visible={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
      />
    </View>
  );
}
