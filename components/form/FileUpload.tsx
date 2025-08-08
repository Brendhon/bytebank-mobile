import { Alert, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { FileText, Trash2, Upload } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useCallback, useState } from 'react';

interface FileUploadProps {
  label?: string;
  value?: string | null;
  onUpload: (file: Blob, fileName: string) => Promise<string>;
  onRemove?: () => void;
  accept?: string[];
  maxSize?: number; // in MB
  loading?: boolean;
  error?: string;
}

export default function FileUpload({
  label = 'Anexar Recibo',
  value,
  onUpload,
  onRemove,
  accept = ['application/pdf'],
  maxSize = 5,
  loading = false,
  error,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSelectFile = useCallback(async () => {
    if (isUploading || loading) return;

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: accept,
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) return;

      const file = result.assets[0];
      
      // Validate file size
      if (file.size && file.size > maxSize * 1024 * 1024) {
        Alert.alert(
          'Arquivo muito grande',
          `O arquivo deve ter no máximo ${maxSize}MB.`
        );
        return;
      }

      setIsUploading(true);
      setFileName(file.name);

      // Convert URI to Blob
      const response = await fetch(file.uri);
      const blob = await response.blob();
      
      // Add name property to blob for file extension extraction
      (blob as any).name = file.name;

      // Upload file
      const url = await onUpload(blob, file.name);
      
      if (!url) {
        throw new Error('Failed to get upload URL');
      }
    } catch (err) {
      console.error('File upload error:', err);
      Alert.alert(
        'Erro no Upload',
        'Não foi possível fazer o upload do arquivo. Tente novamente.'
      );
      setFileName(null);
    } finally {
      setIsUploading(false);
    }
  }, [isUploading, loading, accept, maxSize, onUpload]);

  const handleRemoveFile = useCallback(() => {
    if (isUploading || loading) return;
    
    Alert.alert(
      'Remover Arquivo',
      'Tem certeza que deseja remover o arquivo anexado?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setFileName(null);
            onRemove?.();
          },
        },
      ]
    );
  }, [isUploading, loading, onRemove]);

  const isLoading = isUploading || loading;
  const hasFile = value || fileName;

  return (
    <View className={styles.container}>
      {label && (
        <Text className={styles.label}>{label}</Text>
      )}
      
      {!hasFile ? (
        <TouchableOpacity
          onPress={handleSelectFile}
          disabled={isLoading}
          className={styles.uploadButton}
          activeOpacity={0.7}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#059669" />
          ) : (
            <Upload size={20} color="#059669" />
          )}
          <Text className={styles.uploadText}>
            {isLoading ? 'Enviando...' : 'Selecionar Arquivo'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View className={styles.fileContainer}>
          <View className={styles.fileInfo}>
            <FileText size={20} color="#059669" />
            <Text className={styles.fileName} numberOfLines={1}>
              {fileName || 'Arquivo anexado'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleRemoveFile}
            disabled={isLoading}
            className={styles.removeButton}
            activeOpacity={0.7}
          >
            <Trash2 size={18} color="#DC2626" />
          </TouchableOpacity>
        </View>
      )}

      {error && (
        <Text className={styles.error}>{error}</Text>
      )}
      
      <Text className={styles.helperText}>
        Apenas PDF (máx. {maxSize}MB)
      </Text>
    </View>
  );
}

const styles = {
  container: 'gap-2',
  label: 'text-dark text-lg font-bold',
  uploadButton: 'flex-row items-center justify-center gap-2 p-4 border-2 border-dashed border-green rounded-lg bg-light-green',
  uploadText: 'text-green font-medium',
  fileContainer: 'flex-row items-center justify-between p-4 border border-gray rounded-lg bg-gray',
  fileInfo: 'flex-row items-center gap-2 flex-1',
  fileName: 'text-dark flex-1',
  removeButton: 'p-2 bg-red rounded-lg',
  error: 'text-red ext-sm',
  helperText: 'text-dark-gray text-xs',
};
