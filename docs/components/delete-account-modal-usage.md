# DeleteAccountModal Component

A modal component specifically designed for account deletion with password validation.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `visible` | `boolean` | Yes | Controls the visibility of the modal |
| `onClose` | `() => void` | Yes | Function called when the modal should be closed |

## Usage

```typescript
import DeleteAccountModal from '@/components/modal/DeleteAccountModal';

function MyComponent() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <DeleteAccountModal 
      visible={isVisible} 
      onClose={() => setIsVisible(false)} 
    />
  );
}
```

## Features

- **Password Validation**: Requires user to enter their password to confirm deletion
- **Warning Display**: Shows clear warning about permanent account deletion
- **Loading States**: Displays loading state during deletion process
- **Error Handling**: Shows appropriate error messages for invalid passwords
- **Accessibility**: Proper accessibility labels and hints
- **Responsive Design**: Adapts to different screen sizes

## Structure

The modal consists of:
1. **Header**: Title with close button
2. **Warning Illustration**: AlertTriangle icon to emphasize danger
3. **Warning Section**: Clear text explaining the permanent nature of deletion
4. **Password Input**: Secure input field for password confirmation
5. **Action Buttons**: Cancel and Delete buttons with appropriate styling

## Security Features

- **Password Validation**: Uses `validatePassword` service to verify user's password
- **Input Validation**: Prevents submission with empty password
- **Error Feedback**: Clear error messages for invalid passwords
- **Loading Protection**: Prevents multiple submission attempts during deletion

## Examples

### Basic Usage
```typescript
const [deleteModalVisible, setDeleteModalVisible] = useState(false);

<DeleteAccountModal 
  visible={deleteModalVisible} 
  onClose={() => setDeleteModalVisible(false)} 
/>
```

### With Custom Handler
```typescript
const handleDeleteAccount = () => {
  setDeleteModalVisible(true);
};

<Button onPress={handleDeleteAccount}>
  Excluir Conta
</Button>

<DeleteAccountModal 
  visible={deleteModalVisible} 
  onClose={() => setDeleteModalVisible(false)} 
/>
```

## Integration

This modal integrates with:
- **AuthContext**: For sign out functionality
- **useAuthService**: For password validation and account deletion
- **Modal Component**: Base modal structure
- **Button Component**: Action buttons
- **Input Component**: Password input field

## Styling

The modal uses:
- **Orange Theme**: For danger/warning actions
- **NativeWind**: For consistent styling
- **Responsive Layout**: Adapts to different screen sizes
- **Accessibility**: Proper contrast and touch targets
