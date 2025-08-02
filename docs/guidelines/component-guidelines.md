# 📋 Component Best Practices for Bytebank Mobile

This guide outlines best practices for React Native component development to ensure consistency, maintainability, performance, and accessibility.

## 🎨 General Guidelines

### 1. Structure and Naming

-   **File Structure**:
    -   Store components in `components/`.
    -   Complex components with multiple files (hooks, types) should reside in their own directory.
        -   **Simple**: `components/Button.tsx`
        -   **Complex**: `components/TransactionCard/index.tsx`, `components/TransactionCard/types.ts`
-   **Naming Conventions**:
    -   **File/Component**: `PascalCase.tsx` (e.g., `Button.tsx`).
    -   **Component Directory**: `PascalCase` (e.g., `TransactionCard/`).
-   **Exports**:
    -   Use `export default` for the main component.
    -   Use named `export` for related types and constants.
-   **Comments**:
    -   All code comments must be in **English**.

### 2. Styling with NativeWind

To maintain clean and readable code, all styling must use a `styles` object.

-   **Inline styles are forbidden.** Do not use Tailwind classes directly in TSX.
-   **`styles` Object**: Centralize all Tailwind classes in a `styles` object at the end of the file. Use semantic keys to describe elements.
-   **Usage**: Apply styles via `className={styles.keyName}`.

**Correct Example:**

```typescript
import { Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  label: string;
  onPress: () => void;
};

export const Button = ({ label, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} className={styles.container}>
      <Text className={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  container: `bg-blue-500 rounded-lg py-3 px-6 items-center justify-center`,
  label: `text-white font-bold text-base`,
};
```

---

## 🏗️ Modern React & React Native Patterns

Always use the latest recommended APIs and patterns.

-   **Functional Components**: All components must be functional. Class components are deprecated.
-   **TypeScript**: Typing is **mandatory**.
    -   **Props**: Define an `interface` or `type` for all component props.
    -   **Hooks**: Type `useState` state and custom hook return values.
-   **Essential Hooks**:
    -   **`useState`**: For simple, local state.
    -   **`useEffect`**: For side effects. Always include a dependency array and a cleanup function if needed.
    -   **`useContext`**: For consuming global data from the Context API.
    -   **`useCallback` & `useMemo`**: For performance optimizations only when a bottleneck is identified.
-   **Library Hooks**:
    -   **Navigation**: Use **React Navigation** hooks (`useNavigation`, `useRoute`).
    -   **API**: Use **Apollo Client** hooks (`useQuery`, `useMutation`). Do not implement manual fetch logic.
    -   **Forms**: Use **React Hook Form** for state management and validation, with **Zod** for schemas.
-   **Custom Hooks**: Encapsulate reusable logic in custom hooks (e.g., `useAuth`) and place them in the `hooks/` directory.
-   **Animations**: Use the **React Native Animated API** with `useNativeDriver: true` whenever possible.

---

## 📱 Responsive Design

The app must adapt to various screen sizes.

-   **Flexible Units**: Use Tailwind's percentage-based (`w-4/5`), flexbox (`flex-1`), and proportional (`aspect-square`) classes.
-   **Fixed Values**: Avoid fixed pixel values (e.g., `w-[97px]`). If necessary, use Tailwind's spacing scale (`w-16`, `h-24`), which is `rem`-based.
-   **Media Queries**: Use NativeWind's responsive prefixes (`sm:`, `md:`, `lg:`) to adjust styles at different breakpoints.

---

## ♿ Accessibility (a11y)

Ensure the app is usable by everyone.

-   **Labels & Hints**:
    -   **`accessibilityLabel`**: Provide a text label for elements, especially icon-only buttons.
    -   **`accessibilityHint`**: Describe the action that occurs on interaction.
-   **Roles & States**:
    -   **`accessibilityRole`**: Define the element's type (`'button'`, `'header'`, `'link'`).
    -   **`accessibilityState`**: Describe the component's current state (`{ disabled: true }`).
-   **Interactivity**:
    -   Ensure a logical navigation order for screen readers.
    -   Interactive elements must have a minimum touch area of **44x44 points**. Use padding to increase touch areas without altering the visual design.
-   **Contrast**: Text-to-background contrast ratio must be at least **4.5:1**.
