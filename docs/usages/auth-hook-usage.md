# 🔐 Authentication Services Integration

This document describes the changes implemented to integrate real GraphQL API services into the Bytebank Mobile authentication system.

## 📋 Implemented Changes

### 1. Updated Apollo Client (`services/api/client.ts`)

- **Token Management**: Implemented JWT token management system using `expo-secure-store`
- **Token Manager**: Created `tokenManager` utility for token operations
- **Automatic Headers**: Configured to automatically add authorization token to requests

```typescript
// Example of tokenManager usage
import { tokenManager } from '@/services/api/client';

// Store token
await tokenManager.setToken(authPayload.token);

// Retrieve token
const token = await tokenManager.getToken();

// Remove token
await tokenManager.removeToken();
```

### 2. Updated AuthContext (`contexts/AuthContext.tsx`)

- **Real Services**: Replaced mock implementations with real API services
- **State Management**: Improved loading state management
- **Automatic Verification**: Implemented automatic authentication verification on initialization
- **Navigation**: Integrated automatic navigation after login/logout

#### Added Features:

- `refreshUser()`: Updates current user data
- Automatic valid token verification
- Authentication error handling
- Separate loading states for different operations

### 3. Custom Hook (`hooks/useAuthService.ts`)

Created `useAuthService` hook for operations that require authentication:

```typescript
import { useAuthService } from '@/hooks/useAuthService';

const { updateUser, deleteUser, validatePassword, isUpdatingUser } = useAuthService();
```

#### Available Operations:

- `updateUser(updates)`: Update user data
- `deleteUser()`: Delete user account
- `validatePassword(password)`: Validate current password
- Loading states for each operation

## 🚀 How to Use

### 1. Login/Registration

```typescript
import { useAuth } from '@/contexts/AuthContext';

const { signIn, signUp, user, isLoading } = useAuth();

// Login
await signIn({ email: 'user@example.com', password: 'password' });

// Registration
await signUp({ 
  name: 'John Silva', 
  email: 'john@example.com', 
  password: 'password',
  acceptPrivacy: true 
});
```

### 2. User Operations

```typescript
import { useAuthService } from '@/hooks/useAuthService';

const { updateUser, deleteUser, isUpdatingUser } = useAuthService();

// Update user
const updatedUser = await updateUser({ name: 'New Name' });

// Delete account
const deleted = await deleteUser();
```

### 3. Authentication Verification

```typescript
import { useAuth } from '@/contexts/AuthContext';

const { isAuthenticated, user, refreshUser } = useAuth();

if (isAuthenticated) {
  console.log('Logged user:', user.name);
  
  // Update user data
  await refreshUser();
}
```

## 🔧 Configuration

### Environment Variables

Make sure the environment variable is configured:

```env
EXPO_PUBLIC_GRAPHQL_API_URL=https://api.bytebank.com/graphql
```

### Data Structure

The system expects the API to return data in the format:

```typescript
interface AuthPayload {
  token: string;
  user: User;
}

interface User {
  _id: string;
  name: string;
  email: string;
  acceptPrivacy: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 🛡️ Security

- **JWT Token**: Securely stored using `expo-secure-store`
- **Automatic Headers**: Token automatically added to all requests
- **Token Validation**: Automatic valid token verification on initialization
- **Data Cleanup**: Proper removal of sensitive data on logout

## 🔄 Authentication Flow

1. **Login/Registration**: Calls API service and stores token
2. **Initial Verification**: On initialization, verifies if there's a valid token
3. **Requests**: Token automatically added to headers
4. **Logout**: Removes token and clears user data
5. **Refresh**: Allows updating user data when needed

## 📱 Complete Usage Example

See the file `docs/examples/auth-usage-example.tsx` for a complete example of how to use all implemented features.

## 🐛 Error Handling

The system includes robust error handling:

- **Invalid Token**: Automatically clears session
- **Network Errors**: Displays appropriate error messages
- **Loading States**: Indicates when operations are in progress
- **Validation**: Verifies data before sending to API

## 📈 Benefits

- **Complete Integration**: Uses real GraphQL API services
- **Type Safety**: Fully typed with TypeScript
- **Performance**: Efficient state and cache management
- **UX**: Loading states and adequate user feedback
- **Maintainability**: Organized and well-documented code 