# 🔥 Diretrizes para o Firebase

Este documento define as regras específicas para os **serviços** que interagem com o **Firebase**. Estas regras estendem as diretrizes definidas em `service-guidelines.md`.

### 1\. Estrutura e Nomenclatura

  * **Localização**: Todos os serviços do Firebase devem estar em `services/firebase/`.
  * **Configuração**: A inicialização do app (`initializeApp`) deve ser feita uma única vez em `services/firebase/config.ts`. A instância do serviço (ex: `getStorage()`) deve ser exportada deste arquivo para ser usada nos demais serviços.
  * **Separação de Serviços**: Crie arquivos distintos para cada funcionalidade do Firebase (`storage.service.ts`, `auth.service.ts`, etc.).

### 2\. Padrões de Implementação

  * **Abstração Total do SDK**: As funções de serviço devem abstrair completamente o SDK do Firebase. O resto da aplicação chamará `uploadReceipt(file)`, não `uploadBytes(ref(...))`.
  * **Gerenciamento de Caminhos (Paths)**: A lógica para construir os caminhos de armazenamento (storage paths) deve ser centralizada e padronizada dentro do `storage.service.ts`.

#### Exemplo de Serviço de Storage

**Arquivo: `services/firebase/storage.service.ts`**

```typescript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseStorage } from './config'; // Importa a instância configurada do storage

/**
 * Realiza o upload de um recibo para uma transação específica.
 * @param file O arquivo (Blob) do recibo.
 * @param transactionId O ID da transação para construir um caminho único.
 * @returns A URL de download do arquivo.
 */
export const uploadReceiptService = async (file: Blob, transactionId: string): Promise<string> => {
  const filePath = `receipts/${transactionId}/${new Date().getTime()}`;
  const storageRef = ref(firebaseStorage, filePath);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Firebase Storage Upload Error:", error);
    throw new Error("Falha ao enviar o recibo.");
  }
};
```