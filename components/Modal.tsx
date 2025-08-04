import { Modal as RNModal, Text, TouchableOpacity, View } from 'react-native';
import { X } from 'lucide-react-native';
import { ReactNode } from 'react';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ visible, onClose, title, children }: ModalProps) {
  return (
    <RNModal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
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
  headerSpacer: 'w-6',
  title: 'text-dark text-2xl font-bold',
  closeButton: 'p-1',
  content: 'flex-1',
}; 