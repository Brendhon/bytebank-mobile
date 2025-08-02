# 📋 Diretrizes Gerais para a Camada de Serviço

Este documento estabelece as regras e padrões **universais** para a criação de todos os serviços no projeto. Um "serviço" é um módulo responsável pela comunicação pura com um sistema externo.

Estas regras são a base e devem ser seguidas por todos os serviços. A forma como estes serviços são consumidos pela aplicação é detalhada em `hooks-guidelines.md`.

### 1\. Princípios Fundamentais

  * **Abstração e Responsabilidade Única**: Cada serviço encapsula a lógica de comunicação de um único domínio ou funcionalidade.
  * **Independência do React**: Serviços **não devem** importar a biblioteca `react` ou utilizar hooks. São módulos de TypeScript puros.

### 2\. Estrutura e Nomenclatura

  * **Diretório Principal**: Todos os serviços devem residir em `src/services/`.
  * **Subdiretórios por Tecnologia**: É **obrigatório** criar um subdiretório para cada tecnologia (`api/`, `firebase/`).
  * **Nomenclatura de Arquivo**: Use o sufixo `.service.ts` (ex: `storage.service.ts`).
  * **Configuração Centralizada**: A inicialização de SDKs (Firebase, Apollo Client) deve ser feita em um arquivo de configuração central dentro de seu respectivo diretório (ex: `firebase/config.ts`, `api/client.ts`).

### 3\. Regras Globais de Implementação

  * **Tipagem Estrita**: Todas as funções, parâmetros e retornos devem ser fortemente tipados. Use `Promise<TipoDeRetorno>` para funções assíncronas.
  * **Tratamento de Erros**:
      * Toda comunicação externa deve ser envolvida em `try...catch`.
      * O serviço deve capturar o erro bruto, registrá-lo (`console.error`), e então **lançar um novo `Error`** com uma mensagem padronizada.