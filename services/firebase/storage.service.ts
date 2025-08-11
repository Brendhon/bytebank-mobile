import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll 
} from 'firebase/storage';
import { firebaseStorage } from './config';

/**
 * Uploads a receipt for a specific transaction.
 * @param file The receipt file (Blob).
 * @param userId The ID of the user.
 * @param transactionId The ID of the transaction.
 * @returns The download URL of the uploaded file.
 */
export const uploadReceiptService = async (
  file: Blob, 
  userId: string,
  transactionId: string
): Promise<string> => {
  const filePath = `${userId}/${transactionId}.pdf`;
  const storageRef = ref(firebaseStorage, filePath);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.error('Firebase Storage Upload Error:', error);
    throw new Error('Failed to upload receipt.');
  }
};

/**
 * Deletes a receipt from storage.
 * @param receiptUrl The URL of the receipt to delete.
 */
export const deleteReceiptService = async (receiptUrl: string): Promise<void> => {
  try {
    // Extract the path from the download URL
    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/`;
    const path = decodeURIComponent(
      receiptUrl.replace(baseUrl, '').split('?')[0]
    );
    
    const storageRef = ref(firebaseStorage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Firebase Storage Delete Error:', error);
    throw new Error('Failed to delete receipt.');
  }
};

/**
 * Deletes a receipt for a specific transaction.
 * @param userId The ID of the user.
 * @param transactionId The ID of the transaction.
 */
export const deleteTransactionReceiptService = async (
  userId: string,
  transactionId: string
): Promise<void> => {
  try {
    const filePath = `${userId}/${transactionId}.pdf`;
    const storageRef = ref(firebaseStorage, filePath);
    
    try {
      await deleteObject(storageRef);
    } catch (error) {
      // Don't throw error if file doesn't exist
      if ((error as any)?.code !== 'storage/object-not-found') {
        throw error;
      }
    }
  } catch (error) {
    console.error('Firebase Storage Delete Receipt Error:', error);
    throw new Error('Failed to delete transaction receipt.');
  }
};

/**
 * Gets the download URL for a receipt by user and transaction ID.
 * @param userId The ID of the user.
 * @param transactionId The ID of the transaction.
 * @returns The download URL of the receipt or null if not found.
 */
export const getReceiptUrlService = async (
  userId: string, 
  transactionId: string
): Promise<string | null> => {
  try {
    const filePath = `${userId}/${transactionId}.pdf`;
    const storageRef = ref(firebaseStorage, filePath);
    
    try {
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      // Return null if file not found
      if ((error as any)?.code === 'storage/object-not-found') {
        return null;
      }
      throw error;
    }
  } catch (error) {
    console.error('Firebase Storage Get URL Error:', error);
    return null;
  }
};
