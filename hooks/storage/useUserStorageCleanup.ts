import { useCallback, useState } from 'react';
import { deleteUserFolderService } from '@/services/firebase/storage.service';

interface UseUserStorageCleanupReturn {
  isCleaning: boolean;
  error: string | null;
  deleteUserFolder: (userId: string) => Promise<void>;
}

/**
 * Hook to manage cleanup operations in Firebase Storage for a given user.
 */
export function useUserStorageCleanup(): UseUserStorageCleanupReturn {
  const [isCleaning, setIsCleaning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUserFolder = useCallback(async (userId: string) => {
    setIsCleaning(true);
    setError(null);
    try {
      await deleteUserFolderService(userId);
    } catch (err) {
      setError('Falha ao remover arquivos do usuário no Storage');
      throw err;
    } finally {
      setIsCleaning(false);
    }
  }, []);

  return { isCleaning, error, deleteUserFolder };
}


