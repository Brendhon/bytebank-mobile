import { TouchableOpacity, Text, Linking, Alert, View } from 'react-native';
import { FileText } from 'lucide-react-native';
import { useCallback } from 'react';
import { colors } from '@/utils/colors';
import Button from '@/components/form/Button';

interface ReceiptViewerProps {
  receiptUrl: string;
  variant?: 'inline' | 'button';
  className?: string;
}

export default function ReceiptViewer({ 
  receiptUrl, 
  variant = 'button',
  className = '' 
}: ReceiptViewerProps) {
  
  const handleOpenReceipt = useCallback(async () => {
    try {
      const supported = await Linking.canOpenURL(receiptUrl);
      
      if (supported) {
        await Linking.openURL(receiptUrl);
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível abrir o recibo. Tente novamente mais tarde.'
        );
      }
    } catch (error) {
      console.error('Error opening receipt:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao abrir o recibo.'
      );
    }
  }, [receiptUrl]);

  if (variant === 'button') {
    return (
      <Button
        variant="outlineBlue"
        onPress={handleOpenReceipt}
        className={`${styles.container} ${className}`}
        accessibilityLabel="Abrir recibo"
        accessibilityHint="Abre o recibo em uma nova janela"
      >
        <View className={styles.button}>
          <FileText size={16} color={colors.blue} />
          <Text className={styles.buttonText}>Ver Recibo</Text>
        </View>
      </Button>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleOpenReceipt}
      className={`${styles.inline} ${className}`}
      activeOpacity={0.7}
    >
      <FileText size={16} color={colors.blue} />
      <Text className={styles.inlineText}>Recibo anexado</Text>
    </TouchableOpacity>
  );
}

const styles = {
  container: 'h-10 w-full',
  button: 'flex-row items-center justify-center gap-2',
  buttonText: 'text-blue font-semibold',
  inline: 'flex-row items-center gap-1',
  inlineText: 'text-blue text-sm underline',
};
