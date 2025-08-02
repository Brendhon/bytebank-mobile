# 🔵 Context API Guidelines

This document provides strict rules for using React's Context API to ensure it is used efficiently and predictably.

### 1. When to Use Context

Context is exclusively for sharing data that is "global" to a component tree.

#### ✅ Permitted Uses:

*   **Authentication & User Session**: Share auth status (`isAuthenticated`), user data, and session functions (`signIn`, `signOut`).
*   **Global UI State**: Manage app-wide settings like theme (dark/light mode), language, or the state of global components (e.g., notification modals).

#### ❌ Forbidden Uses:

*   **Server State Management**: **NEVER** use Context to store data fetched from the API (e.g., transaction lists, balances). This is the sole responsibility of **Apollo Client's cache**. Using Context for this creates duplicate sources of truth and synchronization issues.
*   **Replacing Local State**: For state belonging to a single component or a small number of children, use `useState` and pass props. It is simpler and more explicit.

### 2. Structure and Naming

*   **Directory**: All context files must reside in `contexts/`.
*   **File Naming**: Follow the `[Name]Context.tsx` pattern (e.g., `AuthContext.tsx`).

### 3. Required Implementation Pattern

To ensure safety and decoupling, every context **must** follow this structure:

1.  **Strict Typing**: Fully type the context value, provider props, and the return value of the consumer hook.
2.  **Dedicated Consumer Hook**: Export a custom hook (e.g., `useAuth`) alongside the provider. This hook must:
    *   Abstract the `useContext(MyContext)` call.
    *   Include a runtime check to ensure it is used within its corresponding provider, throwing an error if not.
3.  **Scoped Provider**: Wrap only the necessary parts of the component tree with the provider.

### 4. Example: `AuthContext`

**File: `contexts/AuthContext.tsx`**

```typescript
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { signInService } from '../services/api/auth.service'; // Example service

// 1. Type definition for the context data
interface AuthContextData {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  signIn(credentials: any): Promise<void>;
  signOut(): void;
}

// 2. Context creation
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// 3. Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const signIn = async (credentials: any) => {
    const response = await signInService(credentials);
    setUser(response.user);
    // Store token, etc.
  };

  const signOut = () => {
    setUser(null);
    // Clear token, etc.
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Dedicated consumer hook (MANDATORY)
export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
```

### 5. Usage

**Wrap the relevant part of your app (e.g., `navigation/index.tsx`):**

```typescript
import { AuthProvider } from '../contexts/AuthContext';
import { AppRoutes } from './AppRoutes';

export const Main = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};
```

**Consume the context in a screen component:**

```typescript
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext'; // Import the hook

export const ProfileScreen = () => {
  const { user, signOut } = useAuth(); // Cleanly consume the context

  return (
    <View>
      <Text>Welcome, {user?.name}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};
```