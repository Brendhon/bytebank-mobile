# 📱 Bytebank Mobile – Gerenciamento Financeiro

Este repositório contém a aplicação mobile do **Bytebank**, desenvolvida como parte do Tech Challenge da Fase 3 da pós-graduação em Engenharia de Front-end (FIAP). O projeto oferece uma experiência completa de gerenciamento financeiro em dispositivos móveis, com foco em usabilidade, segurança e integração com serviços cloud.

## 📝 Sumário

- [📱 Bytebank Mobile – Gerenciamento Financeiro](#-bytebank-mobile--gerenciamento-financeiro)
  - [📝 Sumário](#-sumário)
  - [📄 Desafio Original](#-desafio-original)
  - [✨ Visão Geral](#-visão-geral)
  - [📦 Tecnologias](#-tecnologias)
  - [📁 Estrutura do Projeto](#-estrutura-do-projeto)
  - [🚀 URLs de Acesso](#-urls-de-acesso)
  - [📋 Pré-requisitos](#-pré-requisitos)
  - [🚀 Ambiente de Desenvolvimento](#-ambiente-de-desenvolvimento)
    - [1. Clone e Instalação](#1-clone-e-instalação)
    - [2. Configuração do Ambiente](#2-configuração-do-ambiente)
    - [3. Executando o Projeto](#3-executando-o-projeto)
    - [4. Testando a Aplicação](#4-testando-a-aplicação)
  - [☁️ Implantação (Deploy)](#️-implantação-deploy)
    - [Build APK](#build-apk)
    - [Configuração](#configuração)
    - [APK para Testes](#apk-para-testes)
  - [▶️ Vídeo Demonstrativo](#️-vídeo-demonstrativo)
  - [📎 Funcionalidade de Upload de Recibos](#-funcionalidade-de-upload-de-recibos)
    - [Como Funciona](#como-funciona)
    - [Restrições](#restrições)
    - [Segurança](#segurança)
  - [💡 Melhorias Futuras](#-melhorias-futuras)
  - [🔗 Links Úteis](#-links-úteis)
  - [👥 Autor](#-autor)

---

## 📄 Desafio Original

O documento contendo os requisitos e objetivos do desafio original da pós-tech está disponível para consulta. Este projeto implementa as funcionalidades propostas para uma aplicação mobile de gerenciamento financeiro.

📌 [**POSTECH - Front-end - Tech Challenge - Fase 3**](./assets/POSTECH%20-%20Tech%20Challenge%20-%20Fase%203.pdf)

---

## ✨ Visão Geral

O **Bytebank Mobile** é um aplicativo completo para o gerenciamento das suas finanças pessoais, projetado para ser simples, seguro e eficiente. Com ele, você pode acessar todas as suas transações, cadastrar e editar movimentações financeiras, além de anexar recibos de forma prática.

**Principais funcionalidades:**

- **Autenticação de Usuário**: Página inicial com Modal intuitivo para login e cadastro, totalmente integrado à API GraphQL do Bytebank.
- **Dashboard Interativo**: Painel financeiro com gráficos e análises dinâmicas das suas transações, incluindo animações para uma experiência visual agradável.
- **Gestão de Transações**:
  - Visualização detalhada das transações, com filtros avançados (por data, categoria, etc.) e paginação.
  - **Scroll Infinito**: Carregamento automático de transações conforme o usuário rola a lista, otimizando a performance e experiência do usuário.
  - Modal dedicado para criar e editar transações.
  - Validação rigorosa dos campos para garantir a qualidade dos dados.
  - **Upload de Recibos**: Anexe recibos PDF às suas transações para manter um registro completo das suas movimentações financeiras.
- **Armazenamento em Nuvem**: Utiliza MongoDB para armazenar os dados das transações (via API) e Firebase Storage para os recibos.
- **Atualização Automática de Dados**: Informações do usuário, como nome e saldo, são atualizadas automaticamente por meio de queries GraphQL.

---

## 📦 Tecnologias

- **Framework**: [React Native](https://reactnative.dev/)
- **Configuração/Abstração**: [Expo](https://expo.dev/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) com [NativeWind](https://www.nativewind.dev/)
- **Gerenciamento de Estado**: [Context API](https://react.dev/reference/react/createContext)
- **Navegação**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Animações**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Validação de Formulários**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Comunicação API**: [Apollo Client](https://www.apollographql.com/docs/react/) para consumo da API GraphQL
- **Backend de Dados**: [MongoDB](https://www.mongodb.com/) (através da [Bytebank API GraphQL](https://github.com/Brendhon/bytebank-api))
- **Armazenamento de Arquivos**: [Firebase Storage](https://firebase.google.com/docs/storage)
- **Ferramentas de Qualidade**: ESLint, Prettier
- **Monitoramento e Depuração**: [Flipper](https://fbflipper.com/)

---

## 📁 Estrutura do Projeto

```
bytebank-mobile/
├── assets/                   # Imagens, ícones, fontes
├── components/               # Componentes React Native reutilizáveis
├── contexts/                 # Contextos para gerenciamento de estado (Context API)
├── hooks/                    # Hooks personalizados
├── app/                      # Configurações de navegação (Expo Router)
│   ├── _layout.tsx           # Layout principal da aplicação
│   ├── index.tsx             # Página inicial com login e cadastro
│   ├── dashboard.tsx         # Página de dashboard com gráficos e análises
│   ├── transactions.tsx      # Página de transações com criação, edição e upload de recibos
│   └── settings.tsx          # Página de configurações
├── services/                 # Funções para comunicação com API e Firebase
├── utils/                    # Funções utilitárias diversas
├── app.json
├── babel.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 URLs de Acesso

- **API GraphQL (Backend)**: [https://bytebank-api.onrender.com/graphql](https://bytebank-api.onrender.com/graphql)

> ⚠️ **Nota sobre a API**: A API GraphQL está hospedada no Render utilizando o plano gratuito. Devido às limitações deste plano, a API pode demorar alguns segundos para responder na primeira requisição após um período de inatividade. As requisições subsequentes serão mais rápidas.

---

## 📋 Pré-requisitos

- **[Git](https://git-scm.com/)**: Controle de versão do código
- **[Node.js](https://nodejs.org/)**: Versão 18.x ou superior
- **[Expo CLI](https://docs.expo.dev/workflow/expo-cli/)**: Instale globalmente com `npm install -g expo-cli`
- **[Docker](https://www.docker.com/)**: Necessário para rodar a API GraphQL e o MongoDB localmente
- **Dispositivo para testes**: Utilize um dispositivo físico com o aplicativo Expo Go instalado **ou** um emulador de dispositivo móvel

---

## 🚀 Ambiente de Desenvolvimento

### 1. Clone e Instalação

```bash
git clone https://github.com/Brendhon/bytebank-mobile.git
cd bytebank-mobile
npm install
```

### 2. Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# URL da API GraphQL do Bytebank
EXPO_PUBLIC_GRAPHQL_API_URL=https://bytebank-api.onrender.com/graphql

# Chaves de configuração do Firebase para o Storage
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

> 💡 **Obtendo as chaves do Firebase**: Crie um projeto no [Console do Firebase](https://console.firebase.google.com/), vá em "Configurações do projeto" > "Geral" e copie as chaves de configuração do seu aplicativo web.

### 3. Executando o Projeto

- **Ambiente Completo (API + Mobile)**:
  ```bash
  npm run dev
  ```

- **Apenas o Mobile**:
  ```bash
  npm run dev:mobile
  ```

- **Apenas a API (Docker)**:
  ```bash
  npm run dev:api
  ```

- **Parando o ambiente Docker**:
  ```bash
  npm run dev:stop
  ```

### 4. Testando a Aplicação

Após executar `npm run dev:mobile`, você pode:
- Escanear o QR Code com o aplicativo Expo Go no seu dispositivo móvel
- Pressionar 'a' para abrir no emulador Android
- Pressionar 'i' para abrir no simulador iOS (macOS apenas)
- Pressionar 'w' para abrir no navegador

> 💡 **Dica para Emulador Android**: Para facilitar o uso sem abrir o Android Studio, adicione as ferramentas do Android ao PATH e use `emulator -avd <nome-do-emulador>` para iniciar emuladores pelo terminal.

---

## ☁️ Implantação (Deploy)

### Build APK

O projeto está configurado para gerar **APKs** através do EAS Build. Para builds de produção:

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Build de preview (para testes)
eas build --platform android --profile preview

# Build de produção
eas build --platform android --profile production
```

### Configuração

O arquivo `eas.json` está configurado para gerar APKs:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

> ⚠️ **Nota**: Para publicar na Google Play Store, altere temporariamente `"buildType": "aab"` no `eas.json`.

### APK para Testes

Uma versão do APK está disponível para download direto:

📱 **[Download do APK - Bytebank Mobile](https://drive.google.com/file/d/1iEcP9nUOgD6KUkHsdRYQj4n9mUDX8s3n/view?usp=sharing)**

> 💡 **Dica**: Este APK pode ser instalado diretamente em emuladores Android ou dispositivos físicos para testes rápidos, sem necessidade de gerar builds locais.

---

## ▶️ Vídeo Demonstrativo

Assista a uma demonstração das principais funcionalidades do aplicativo:

▶️ **[Vídeo Demonstrativo - Bytebank Mobile](https://drive.google.com/file/d/1KEbnzUHAtrvg1uI3nrsL283dIwuIow6D/view?usp=drive_link)**

---

## 📎 Funcionalidade de Upload de Recibos

### Como Funciona

1. **Seleção de Arquivo**: Ao criar ou editar uma transação, você pode anexar um recibo PDF
2. **Upload Automático**: O arquivo é enviado para o Firebase Storage após a transação ser salva
3. **Visualização**: Recibos anexados aparecem na lista de transações com ícone de documento
4. **Acesso Externo**: Clique no ícone do recibo para abri-lo no visualizador de PDF padrão

### Restrições

- **Formato**: Apenas arquivos PDF
- **Tamanho**: Máximo de 5MB por arquivo
- **Quantidade**: Um recibo por transação
- **Armazenamento**: Arquivos organizados por usuário e transação

### Segurança

- **Isolamento por Usuário**: Cada usuário tem sua própria área de armazenamento
- **Limpeza Automática**: Recibos são removidos automaticamente quando a transação é deletada
- **URLs Seguras**: Links de download são autenticados e temporários

---

## 💡 Melhorias Futuras

- **Otimização de Performance**: Melhorar carregamento de dados e renderização de componentes
- **Testes**: Implementar testes unitários e de integração
- **Notificações Push**: Integrar notificações para lembretes e alertas
- **Modo Offline**: Implementar capacidades offline para visualização e sincronização
- **Internacionalização**: Adicionar suporte a múltiplos idiomas
- **Biometria**: Implementar autenticação por biometria (Face ID/Touch ID)
- **Analytics**: Integrar Firebase Analytics para dados de uso

---

## 🔗 Links Úteis

- **Bytebank API GraphQL (Backend)**: [Repositório da API](https://github.com/Brendhon/bytebank-api)
- **Bytebank PRO (Microfrontends)**: [Projeto da fase anterior](https://github.com/Brendhon/bytebank-pro)
- **Bytebank (Web)**: [Projeto da fase 1](https://github.com/Brendhon/Bytebank)

---

## 👥 Autor

**Brendhon Moreira**

[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) | [GitHub](https://github.com/Brendhon)