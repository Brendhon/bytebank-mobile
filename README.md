# 📱 Bytebank Mobile – Gerenciamento Financeiro

Este repositório contém a aplicação mobile do **Bytebank**, desenvolvida como parte do Tech Challenge da Fase 3 da pós-graduação em Engenharia de Front-end (FIAP). O projeto visa oferecer uma experiência completa de gerenciamento financeiro em dispositivos móveis, com foco em usabilidade, segurança e integração com serviços cloud.

## 📝 Sumário

- [📱 Bytebank Mobile – Gerenciamento Financeiro](#-bytebank-mobile--gerenciamento-financeiro)
  - [📝 Sumário](#-sumário)
  - [📄 Desafio Original](#-desafio-original)
  - [🚀 URLs de Acesso](#-urls-de-acesso)
  - [✨ Visão Geral](#-visão-geral)
  - [📦 Tecnologias](#-tecnologias)
  - [📁 Estrutura do Projeto](#-estrutura-do-projeto)
  - [🛠️ Qualidade de Código](#️-qualidade-de-código)
  - [📋 Pré-requisitos](#-pré-requisitos)
  - [🚀 Ambiente de Desenvolvimento](#-ambiente-de-desenvolvimento)
  - [☁️ Implantação (Deploy)](#️-implantação-deploy)
  - [🔗 Links Úteis](#-links-úteis)
  - [💡 Melhorias Futuras](#-melhorias-futuras)
  - [👥 Autor](#-autor)

---

## 📄 Desafio Original

O documento contendo os requisitos e objetivos do desafio original da pós-tech está disponível para consulta. Este projeto implementa as funcionalidades propostas para uma aplicação mobile de gerenciamento financeiro.

📌 [**POSTECH - Front-end - Tech Challenge - Fase 3**](./assets/POSTECH%20-%20Tech%20Challenge%20-%20Fase%203.pdf)

---

## 🚀 URLs de Acesso

  * **API GraphQL (Backend):** [https://bytebank-api.onrender.com/graphql](https://bytebank-api.onrender.com/graphql)
    > ⚠️ **Nota Importante sobre a API:** A API GraphQL está hospedada no Render utilizando o plano gratuito. Devido às limitações deste plano, a API pode demorar alguns segundos para responder na primeira requisição após um período de inatividade (quando o serviço "dorme"). As requisições subsequentes serão mais rápidas. Esta é uma limitação conhecida do plano gratuito do Render e não afeta a funcionalidade da aplicação.

---

## ✨ Visão Geral

O **Bytebank Mobile** é uma aplicação completa para gerenciar suas finanças pessoais. Ele oferece autenticação de usuários, visualização detalhada de transações com filtros e paginação, além de permitir o cadastro e edição de transações, com a funcionalidade de anexar recibos.

**Funcionalidades Principais:**

  * **Autenticação de Usuário**: Login e registro seguros, integrados com a API GraphQL do Bytebank.
  * **Dashboard Interativo**: Visão geral financeira com gráficos e análises baseadas nas transações do usuário, incluindo animações para uma experiência mais fluida.
  * **Gestão de Transações**:
      * Listagem detalhada de transações com filtros avançados (por data, categoria, etc.) e paginação.
      * Criação e edição de transações financeiras.
      * Validação robusta de campos para garantir a integridade dos dados.
      * Upload de recibos e documentos relacionados à transação, armazenados de forma segura.
  * **Armazenamento em Nuvem**: Utiliza o MongoDB para dados transacionais (via API) e Firebase Storage para armazenamento de recibos.

---

## 📦 Tecnologias

As seguintes tecnologias foram utilizadas na construção do Bytebank Mobile:

  * **Framework**: [React Native](https://reactnative.dev/)
  * **Configuração/Abstração**: [Expo](https://expo.dev/)
  * **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
  * **Estilização**: [Tailwind CSS](https://tailwindcss.com/) com [NativeWind](https://www.nativewind.dev/)
  * **Gerenciamento de Estado**: [Context API](https://react.dev/reference/react/createContext)
  * **Navegação**: [React Navigation](https://reactnavigation.org/)
  * **Animações**: [React Native Animated API](https://reactnative.dev/docs/animated)
  * **Validação de Formulários**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
  * **Comunicação API**: [Apollo Client](https://www.apollographql.com/docs/react/) para consumo da API GraphQL.
  * **Backend de Dados**: [MongoDB](https://www.mongodb.com/) (através da [Bytebank API GraphQL](https://github.com/Brendhon/bytebank-api))
  * **Armazenamento de Arquivos**: [Firebase Storage](https://firebase.google.com/docs/storage)
  * **Ferramentas de Qualidade**: ESLint, Prettier
  * **Monitoramento e Depuração**: [Flipper](https://fbflipper.com/)

---

## 📁 Estrutura do Projeto

A estrutura de pastas do projeto está organizada para facilitar a modularidade e manutenção:

```
bytebank-mobile/
├── src/
│   ├── assets/           # Imagens, ícones, fontes
│   ├── components/       # Componentes React Native reutilizáveis
│   ├── contexts/         # Contextos para gerenciamento de estado (Context API)
│   ├── hooks/            # Hooks personalizados
│   ├── navigation/       # Configurações de navegação (React Navigation)
│   ├── screens/          # Telas principais da aplicação
│   ├── services/         # Funções para comunicação com API e Firebase
│   ├── utils/            # Funções utilitárias diversas
│   └── App.tsx           # Ponto de entrada da aplicação
├── app.json
├── babel.config.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
├── .prettierignore
├── tailwind.config.js
└── tsconfig.json
```

---

## 🛠️ Qualidade de Código

O projeto utiliza um conjunto de ferramentas para garantir a consistência e a qualidade do código. **Prettier** e **ESLint** são configurados para formatar e analisar os arquivos, prevenindo a introdução de erros e inconsistências. Além disso, o **Flipper** é utilizado para monitorar o desempenho da aplicação, inspecionar a rede e depurar o estado dos componentes em tempo real, garantindo uma experiência de alta qualidade para o usuário.

---

## 📋 Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas:

  * **[Git](https://git-scm.com/)**: Para controle de versão do código.
  * **[Node.js](https://nodejs.org/)**: Recomenda-se a versão 18.x ou superior.
  * **[Expo CLI](https://docs.expo.dev/workflow/expo-cli/)**: `npm install -g expo-cli`
  * **Um emulador de dispositivo móvel** (Android Studio ou Xcode) ou um dispositivo físico com o aplicativo Expo Go instalado.

---

## 🚀 Ambiente de Desenvolvimento

Para configurar e executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Brendhon/bytebank-mobile.git
    cd bytebank-mobile
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Crie e configure o arquivo `.env`:**

      * Crie um arquivo `.env` na raiz do projeto.

      * O arquivo `.env` deve conter as seguintes variáveis:

        ```env
        # URL da sua API GraphQL do Bytebank
        EXPO_PUBLIC_GRAPHQL_API_URL=https://bytebank-api.onrender.com/graphql

        # Chaves de configuração do Firebase para o Storage
        EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
        EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
        EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
        EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
        EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_Messaginger_id
        EXPO_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
        ```

          * **Obtendo as chaves do Firebase:** Para obter as chaves do Firebase, você precisará criar um projeto no [Console do Firebase](https://console.firebase.google.com/). Após criar o projeto, vá em "Configurações do projeto" (Project settings) \> "Geral" (General) e copie as chaves de configuração do seu aplicativo web. Estas chaves serão utilizadas para inicializar o SDK do Firebase em seu aplicativo React Native.

4.  **Inicie o ambiente de desenvolvimento:**

    - **Ambiente Completo (API + Mobile):**
      Para subir a API GraphQL (com Docker) e todas as aplicações de mobile, execute:

      ```bash
      npm run dev
      ```

    - **Apenas o Mobile:**
      Se a API já estiver em execução ou se você estiver usando uma API remota, inicie apenas o Mobile:

      ```bash
      npm run dev:mobile
      ```

      Isso abrirá o Metro Bundler no seu navegador. Você pode então:

        * Escanear o QR Code com o aplicativo Expo Go no seu dispositivo móvel.
        * Pressionar 'a' para abrir no emulador Android.
        * Pressionar 'i' para abrir no simulador iOS (macOS apenas).

    - **Apenas a API (Docker):**
      Para iniciar somente a API GraphQL e o banco de dados MongoDB com Docker, use:
      ```bash
      npm run dev:api
      ```

5.  **Parando o ambiente Docker:**
    Para derrubar os contêineres da API, execute:

    ```bash
    npm run dev:stop
    ```

## ☁️ Implantação (Deploy)

A aplicação mobile pode ser construída para produção através do Expo CLI. Para gerar um build de produção (APK/IPA), você pode utilizar os comandos do Expo:

  * **Build para Android:**
    ```bash
    eas build --platform android --profile production
    ```
  * **Build para iOS:** (macOS apenas)
    ```bash
    eas build --platform ios --profile production
    ```

Para mais detalhes sobre as opções de build e deploy com Expo, consulte a [documentação oficial do EAS Build](https://docs.expo.dev/build/introduction/).

---

## 🔗 Links Úteis

  * **Bytebank API GraphQL (Backend)**: O código-fonte da API que serve como backend para este aplicativo está disponível em um [repositório separado](https://github.com/Brendhon/bytebank-api).
  * **Bytebank PRO (Microfrontends)**: O projeto da fase anterior, que utiliza microfrontends, está disponível [aqui](https://github.com/Brendhon/bytebank-pro).
  * **Bytebank (Web)**: O projeto da fase 1, desenvolvido em Next.js, está disponível [aqui](https://github.com/Brendhon/Bytebank).

---

## 💡 Melhorias Futuras

Este projeto está em constante evolução. Abaixo estão algumas ideias e sugestões para futuras melhorias:

  * **Otimização de Performance**: Continuar otimizando o carregamento de dados e a renderização de componentes para garantir uma experiência fluida em todos os dispositivos.
  * **Testes Unitários e de Integração**: Implementar testes abrangentes para os componentes, hooks e serviços para garantir a robustez da aplicação.
  * **Notificações Push**: Integrar notificações push para lembretes de transações, alertas de saldo, etc.
  * **Modo Offline**: Implementar capacidades offline para visualização e talvez registro de transações, que seriam sincronizadas quando a conexão for restabelecida.
  * **Internacionalização**: Adicionar suporte a múltiplos idiomas.
  * **Biometria**: Implementar autenticação por biometria (Face ID/Touch ID) para maior segurança e conveniência.
  * **Integração com Firebase Analytics**: Para coletar dados de uso e comportamento do usuário.

---

## 👥 Autor

**Brendhon Moreira**

[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) | [GitHub](https://github.com/Brendhon)