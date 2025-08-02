# ⚙️ Diretrizes para a API (GraphQL com Apollo Client)

Este documento define as regras específicas para a **camada de serviço** que interage com a API GraphQL. Estas regras estendem as diretrizes definidas em `service-guidelines.md`.

### 1\. Estrutura e Nomenclatura

  * **Configuração do Cliente**: A instância do `ApolloClient` deve ser configurada e exportada de `services/api/client.ts`.
  * **Definições GraphQL**:
      * Todas as definições (`query`, `mutation`, `fragment`) com a tag `gql` devem ser centralizadas em `services/graphql/`.
      * Os arquivos devem ser organizados por domínio (ex: `transactions.queries.ts`).

### 2\. Padrões de Implementação

  * **Use GraphQL Fragments**: É obrigatório o uso de fragments para agrupar campos reutilizáveis, garantindo consistência e manutenibilidade nas queries e mutations.
  * **Tipagem Gerada**: É fortemente recomendado o uso de ferramentas como **GraphQL Code Generator** para gerar tipos a partir do schema da API. Isso garante que os dados retornados e as variáveis das operações sejam totalmente tipados.

#### Exemplo de Definição de Serviço

**Arquivo: `services/graphql/transactions.queries.ts`**

```typescript
import { gql } from '@apollo/client';

// Regra: Usar fragments para campos reutilizáveis.
export const TRANSACTION_FIELDS = gql`
  fragment TransactionFields on Transaction {
    id
    description
    amount
    date
    type
  }
`;

export const GET_TRANSACTIONS = gql`
  query GetTransactions($filter: TransactionFilterInput) {
    transactions(filter: $filter) {
      ...TransactionFields
    }
  }
  ${TRANSACTION_FIELDS}
`;

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      ...TransactionFields
    }
  }
  ${TRANSACTION_FIELDS}
`;
```