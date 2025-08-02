# 🎣 Diretrizes para Hooks Customizados

Este documento define as regras para a criação de **hooks customizados**, que servem como a ponte entre os **Componentes da UI** e a **Camada de Serviço**.

### 1\. Princípios Fundamentais

  * **Ponte para a UI**: Hooks são a **única camada** que deve interagir com os serviços definidos em `services/`.
  * **Gerenciamento de Estado**: O hook é responsável por gerenciar todo o estado relacionado a uma operação: `loading`, `error` e `data`.

### 2\. Estrutura e Nomenclatura

  * **Diretório Principal**: Todos os hooks customizados devem residir em `hooks/`.
  * **Nomenclatura**: Use o prefixo `use` seguido pelo nome da funcionalidade em `PascalCase` (ex: `useFileUpload`, `useFetchTransactions`).

### 3\. Padrões de Implementação

#### 3.1. Hooks para Serviços Gerais (ex: Firebase)

  * **Estado Local**: Use `useState` para gerenciar o estado (`loading`, `error`, `data`).
  * **Funções Memoizadas**: A função que o hook expõe para o componente (ex: para iniciar um upload) **deve** ser envolvida em `useCallback` para otimizar a performance.
  * **Comunicação com Serviço**: A função dentro do `useCallback` deve chamar a função de serviço correspondente e atualizar o estado interno do hook.

**Exemplo (Hook de Upload)**

```typescript
import { useState, useCallback } from 'react';
import { uploadReceiptService } from '../services/firebase/storage.service';

export const useUploadReceipt = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = useCallback(async (file: Blob, transactionId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = await uploadReceiptService(file, transactionId);
      setIsLoading(false);
      return url;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      return null;
    }
  }, []);

  return { isLoading, error, upload };
};
```

#### 3.2. Hooks para a API (Apollo Client)

  * **Wrapper de Hooks Apollo**: Hooks para a API devem envolver os hooks nativos do Apollo (`useQuery`, `useMutation`).
  * **Estado Gerenciado pelo Apollo**: Não use `useState` para `loading`, `error` e `data`, pois o Apollo já os fornece.
  * **Atualização de Cache**: A responsabilidade de atualizar o cache (`refetchQueries` ou `update`) é do **hook de mutação**.

**Exemplo (Hook de Mutação da API)**

```typescript
import { useMutation } from '@apollo/client';
import { CREATE_TRANSACTION, GET_TRANSACTIONS } from '../services/graphql/transactions.queries';

export const useCreateTransaction = () => {
  const [mutate, { loading, error, data }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTIONS }],
  });

  return { createTransaction: mutate, loading, error, data };
};
```