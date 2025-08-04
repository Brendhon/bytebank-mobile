import { AuthService } from '@/services/api/auth.service';
import { User, UserUpdateInput } from '@/models/user';
import { useState } from 'react';

interface UseAuthServiceReturn {
  // User operations
  updateUser: (updates: UserUpdateInput) => Promise<User>;
  deleteUser: () => Promise<boolean>;
  validatePassword: (password: string) => Promise<boolean>;

  // Loading states
  isUpdatingUser: boolean;
  isDeletingUser: boolean;
  isValidatingPassword: boolean;
}

/**
 * Hook for user-related operations that require authentication
 */
export const useAuthService = (): UseAuthServiceReturn => {
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [isValidatingPassword, setIsValidatingPassword] = useState(false);

  const updateUser = async (updates: UserUpdateInput): Promise<User> => {
    try {
      setIsUpdatingUser(true);
      const updatedUser = await AuthService.updateUser(updates);
      return updatedUser;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    } finally {
      setIsUpdatingUser(false);
    }
  };

  const deleteUser = async (): Promise<boolean> => {
    try {
      setIsDeletingUser(true);
      const result = await AuthService.deleteUser();
      return result;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    } finally {
      setIsDeletingUser(false);
    }
  };

  const validatePassword = async (password: string): Promise<boolean> => {
    try {
      setIsValidatingPassword(true);
      const isValid = await AuthService.validatePassword(password);
      return isValid;
    } catch (error) {
      console.error('Validate password error:', error);
      throw error;
    } finally {
      setIsValidatingPassword(false);
    }
  };

  return {
    updateUser,
    deleteUser,
    validatePassword,
    isUpdatingUser,
    isDeletingUser,
    isValidatingPassword,
  };
};
