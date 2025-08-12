import { X } from 'lucide-react-native';
import { memo, ReactNode } from 'react';
import {
  Modal as RNModal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  illustration?: ReactNode;
  children: ReactNode;
}

function Modal({ visible, onClose, title, children, illustration }: ModalProps) {
  // Avoid mounting modal tree when not visible to prevent unnecessary renders
  if (!visible) return null;

  return (
    <RNModal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
          <ScrollView
            className={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
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
            <View className={styles.content}>{children}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </RNModal>
  );
}

const styles = {
  container: 'bg-white p-8',
  header: 'flex-row items-center justify-between mb-6',
  illustration: 'flex items-center justify-center mb-6',
  headerSpacer: 'w-6',
  title: 'text-dark text-2xl font-bold',
  closeButton: 'p-1',
  content: 'flex-1 mb-8',
};

export default memo(Modal);
