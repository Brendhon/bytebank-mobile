import { useState, useCallback } from 'react';
import {
  uploadReceiptService,
  deleteTransactionReceiptService,
  getReceiptUrlService,
} from '@/services/firebase/storage.service';

interface UseReceiptUploadReturn {
  receiptUrl: string | null;
  isUploading: boolean;
  uploadError: string | null;
  uploadReceipt: (file: Blob, userId: string, transactionId: string) => Promise<string | null>;
  deleteReceipt: (userId: string, transactionId: string) => Promise<void>;
  getReceiptUrl: (userId: string, transactionId: string) => Promise<string | null>;
  clearReceipt: () => void;
  setReceiptUrl: (url: string | null) => void;
}

/**
 * Custom hook for managing receipt uploads for transactions
 */
export function useReceiptUpload(): UseReceiptUploadReturn {
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadReceipt = useCallback(
    async (file: Blob, userId: string, transactionId: string): Promise<string | null> => {
      setIsUploading(true);
      setUploadError(null);

      try {
        // Upload new receipt
        const url = await uploadReceiptService(file, userId, transactionId);
        setReceiptUrl(url);
        return url;
      } catch (error) {
        const errorMessage = 'Falha ao fazer upload do recibo';
        setUploadError(errorMessage);
        console.error('Receipt upload error:', error);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    []
  );

  const deleteReceipt = useCallback(
    async (userId: string, transactionId: string): Promise<void> => {
      setIsUploading(true);
      setUploadError(null);

      try {
        await deleteTransactionReceiptService(userId, transactionId);
        setReceiptUrl(null);
      } catch (error) {
        const errorMessage = 'Falha ao remover o recibo';
        setUploadError(errorMessage);
        console.error('Receipt delete error:', error);
        throw error;
      } finally {
        setIsUploading(false);
      }
    },
    []
  );

  const getReceiptUrl = useCallback(
    async (userId: string, transactionId: string): Promise<string | null> => {
      try {
        const url = await getReceiptUrlService(userId, transactionId);
        setReceiptUrl(url);
        return url;
      } catch (error) {
        console.error('Get receipt URL error:', error);
        return null;
      }
    },
    []
  );

  const clearReceipt = useCallback(() => {
    setReceiptUrl(null);
    setUploadError(null);
  }, []);

  return {
    receiptUrl,
    isUploading,
    uploadError,
    uploadReceipt,
    deleteReceipt,
    getReceiptUrl,
    clearReceipt,
    setReceiptUrl,
  };
}
