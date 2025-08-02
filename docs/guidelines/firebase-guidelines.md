# 🔥 Firebase Guidelines

This document defines the specific rules for **services** that interact with **Firebase**. These rules extend the general guidelines in `service-guidelines.md`.

### 1. Structure and Naming

-   **Location**: All Firebase services must be located in `services/firebase/`.
-   **Configuration**: The app initialization (`initializeApp`) must be done only once in `services/firebase/config.ts`. The service instance (e.g., `getStorage()`) should be exported from this file for use in other services.
-   **Service Separation**: Create distinct files for each Firebase feature (e.g., `storage.service.ts`, `auth.service.ts`).

### 2. Implementation Patterns

-   **Full SDK Abstraction**: Service functions must completely abstract the Firebase SDK. The rest of the application will call `uploadReceipt(file)`, not `uploadBytes(ref(...))`.
-   **Path Management**: The logic for building storage paths must be centralized and standardized within the relevant service (e.g., `storage.service.ts`).

#### Example Storage Service

**File: `services/firebase/storage.service.ts`**

```typescript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseStorage } from './config'; // Import the configured storage instance

/**
 * Uploads a receipt for a specific transaction.
 * @param file The receipt file (Blob).
 * @param transactionId The ID of the transaction to build a unique path.
 * @returns The download URL of the uploaded file.
 */
export const uploadReceiptService = async (file: Blob, transactionId: string): Promise<string> => {
  const filePath = `receipts/${transactionId}/${new Date().getTime()}`;
  const storageRef = ref(firebaseStorage, filePath);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Firebase Storage Upload Error:", error);
    throw new Error("Failed to upload receipt.");
  }
};
```
