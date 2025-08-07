import { Modal as RNModal, Text, TouchableOpacity, View } from 'react-native';
import { X } from 'lucide-react-native';
import { ReactNode } from 'react';
import { colors } from '@/utils/colors';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  illustration?: ReactNode;
  children: ReactNode;
}

export default function Modal({ visible, onClose, title, children, illustration }: ModalProps) {
  return (
    <RNModal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}>
      <View className={styles.container}>
        {/* Header */}
        <View className={styles.header}>
          <View className={styles.headerSpacer} />
          <Text className={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose} className={styles.closeButton}>
            <X size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Illustration */}
        {illustration && <View className={styles.illustration}>{illustration}</View>}

        {/* Content */}
        <View className={styles.content}>
          {children}
        </View>
      </View>
    </RNModal>
  );
}

const styles = {
  container: 'flex-1 bg-white p-8',
  header: 'flex-row items-center justify-between mb-6',
  illustration: 'flex items-center justify-center mb-6',
  headerSpacer: 'w-6',
  title: 'text-dark text-2xl font-bold',
  closeButton: 'p-1',
  content: 'flex-1',
}; 