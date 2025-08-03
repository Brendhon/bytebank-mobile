# 🚀 useStorageState Hook - Usage Documentation

Welcome to the `useStorageState` hook usage documentation. This guide explains how to use the hook to securely persist data across different platforms, following the official Expo Router documentation standard.

The hook is built to provide a consistent API for data storage, using **`expo-secure-store`** on native platforms and **`localStorage`** on the web. It automatically manages loading states and includes error handling for cases where storage is unavailable.

## ✨ Key Features

- **Cross-platform**: Uses `expo-secure-store` on native and `localStorage` on the web.
- **Asynchronous State**: Automatically manages loading states.
- **Error Handling**: Includes `try-catch` blocks for cases where storage is not available.
- **Consistent API**: Returns a `[state, setState]` tuple, similar to `useState`.

## 💡 Basic Usage

To use the hook, import `useStorageState` and provide a unique key for the data you want to store. The hook will return the current state and a function to update it.

```typescript
import { useStorageState } from '../hooks/useStorageState';

function MyComponent() {
  const [[isLoading, value], setValue] = useStorageState('my_key');

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View>
      <Text>Value: {value}</Text>
      <Button onPress={() => setValue('new_value')} title="Update" />
      <Button onPress={() => setValue(null)} title="Clear" />
    </View>
  );
}
```

## 🔑 Integration with AuthContext

The `AuthContext` is already integrated with `useStorageState` to persist the user session.

```typescript
// In AuthContext
const [[isLoading, session], setSession] = useStorageState('session');

// To sign in
const signIn = async (credentials) => {
  // ...authentication logic
  setSession('user_token');
};

// To sign out
const signOut = () => {
  setSession(null);
};
```

## 📖 Return Structure

The hook returns a tuple with the following structure:

1.  **State**: `[boolean, T | null]` - `[isLoading, value]`
2.  **Setter**: `(value: T | null) => void` - A function to update the value.

## 🚀 Storage Keys

The following keys are used in the application:

- `session`: User authentication token.
- `user_theme`: Theme preference (light/dark).
- `user_language`: Preferred language.
- `user_notifications`: Notification settings.

## 💡 Security

- **Native**: Uses `expo-secure-store` for secure storage.
- **Web**: Uses `localStorage` (consider encrypting sensitive data).
- **Error Handling**: Includes fallbacks for cases where storage is not available.