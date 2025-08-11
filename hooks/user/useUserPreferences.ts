import { useStorageState } from '../storage';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'pt-BR' | 'en-US';
  notifications: boolean;
}

export function useUserPreferences() {
  const [[isLoading, theme], setTheme] = useStorageState('user_theme');
  const [[, language], setLanguage] = useStorageState('user_language');
  const [[, notifications], setNotifications] = useStorageState('user_notifications');

  const preferences: UserPreferences = {
    theme: (theme as 'light' | 'dark') || 'light',
    language: (language as 'pt-BR' | 'en-US') || 'pt-BR',
    notifications: notifications === 'true',
  };

  const updateTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  const updateLanguage = (newLanguage: 'pt-BR' | 'en-US') => {
    setLanguage(newLanguage);
  };

  const updateNotifications = (enabled: boolean) => {
    setNotifications(enabled.toString());
  };

  return {
    preferences,
    isLoading,
    updateTheme,
    updateLanguage,
    updateNotifications,
  };
}
