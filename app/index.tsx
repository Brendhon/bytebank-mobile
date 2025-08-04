import { Footer } from '@/components/layout/Footer';
import { GradientContainer } from '@/components/layout/GradientContainer';
import { GuestHeader } from '@/components/layout/GuestHeader';
import LoginModal from '@/components/modal/LoginModal';
import RegisterModal from '@/components/modal/RegisterModal';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { useState } from 'react';
import { View } from 'react-native';

export default function HomeScreen() {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  return (
    <View className={styles.container}>
      {/* Header */}
      <GuestHeader
        onOpenAccount={() => setRegisterModalVisible(true)}
        onLogin={() => setLoginModalVisible(true)}
      />

      {/* Content */}
      <GradientContainer>
        <BenefitsSection />
      </GradientContainer>

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

const styles = {
  container: 'flex-1',
}; 
