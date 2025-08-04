# Modal Component

A reusable modal component that provides a consistent structure for all modals in the application.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `visible` | `boolean` | Yes | Controls the visibility of the modal |
| `onClose` | `() => void` | Yes | Function called when the modal should be closed |
| `title` | `string` | Yes | The title displayed in the modal header |
| `children` | `ReactNode` | Yes | The content to be displayed inside the modal |

## Usage

```typescript
import Modal from '@/components/modal/Modal';

function MyComponent() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Modal 
      visible={isVisible} 
      onClose={() => setIsVisible(false)} 
      title="My Modal"
    >
      <View>
        <Text>Your content here</Text>
      </View>
    </Modal>
  );
}
```

## Features

- **Consistent Header**: All modals have the same header structure with title and close button
- **Slide Animation**: Uses slide animation with pageSheet presentation style
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Proper touch targets and accessibility labels
- **Styling**: Follows the project's design system with NativeWind

## Structure

The modal consists of:
1. **Header**: Title centered with close button on the right
2. **Content Area**: Flexible container for any content passed as children
3. **Background**: White background with proper padding

## Examples

### Login Modal
```typescript
<Modal visible={visible} onClose={handleClose} title="Login">
  <View className="gap-4">
    <Input label="Email" placeholder="Digite seu email" />
    <Input label="Senha" placeholder="Digite sua senha" type="password" />
    <Button onPress={handleSubmit}>Acessar</Button>
  </View>
</Modal>
```

### Confirmation Modal
```typescript
<Modal visible={visible} onClose={handleClose} title="Confirmar Ação">
  <View className="gap-4">
    <Text>Tem certeza que deseja continuar?</Text>
    <View className="flex-row gap-2">
      <Button variant="outline" onPress={handleCancel}>Cancelar</Button>
      <Button variant="danger" onPress={handleConfirm}>Confirmar</Button>
    </View>
  </View>
</Modal>
``` 