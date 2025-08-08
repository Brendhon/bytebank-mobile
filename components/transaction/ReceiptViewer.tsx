import { TouchableOpacity, Text, View, Linking, Alert } from 'react-native';
import { FileText, ExternalLink } from 'lucide-react-native';
import { useCallback } from 'react';

interface ReceiptViewerProps {
  receiptUrl: string;
  variant?: 'inline' | 'button';
  className?: string;
}

export default function ReceiptViewer({ 
  receiptUrl, 
  variant = 'inline',
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
      <TouchableOpacity
        onPress={handleOpenReceipt}
        className={`${styles.button} ${className}`}
        activeOpacity={0.7}
      >
        <FileText size={18} color="#059669" />
        <Text className={styles.buttonText}>Ver Recibo</Text>
        <ExternalLink size={14} color="#059669" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleOpenReceipt}
      className={`${styles.inline} ${className}`}
      activeOpacity={0.7}
    >
      <FileText size={16} color="#059669" />
      <Text className={styles.inlineText}>Recibo anexado</Text>
    </TouchableOpacity>
  );
}

const styles = {
  button: 'flex-row items-center justify-center gap-2 px-4 py-2 bg-green-50 border border-green-600 rounded-lg',
  buttonText: 'text-green-600 font-medium',
  inline: 'flex-row items-center gap-1',
  inlineText: 'text-green-600 text-sm underline',
};
