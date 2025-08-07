# Input Component Usage

O componente `Input` é uma versão aprimorada que oferece funcionalidades avançadas como máscaras, toggle de senha e ícones customizados.

## Importação

```tsx
import Input from '@/components/form/Input';
import { Eye, Search, Mail } from 'lucide-react-native';
```

## Uso Básico

```tsx
<Input
  label="Nome"
  placeholder="Digite seu nome"
  value={name}
  onChangeText={setName}
/>
```

## Tipos de Input

### Texto Simples
```tsx
<Input
  label="Nome"
  type="text"
  value={name}
  onChangeText={setName}
/>
```

### Email
```tsx
<Input
  label="Email"
  type="email"
  placeholder="seu@email.com"
  value={email}
  onChangeText={setEmail}
/>
```

### Senha com Toggle
```tsx
<Input
  label="Senha"
  type="password"
  placeholder="Digite sua senha"
  value={password}
  onChangeText={setPassword}
/>
```

### Data com Máscara
```tsx
<Input
  label="Data de Nascimento"
  type="date"
  placeholder="DD/MM/AAAA"
  value={birthDate}
  onChangeText={setBirthDate}
/>
```

### Telefone com Máscara
```tsx
<Input
  label="Telefone"
  type="phone"
  placeholder="(00) 00000-0000"
  value={phone}
  onChangeText={setPhone}
/>
```

### Número
```tsx
<Input
  label="Idade"
  type="number"
  placeholder="Digite sua idade"
  value={age}
  onChangeText={setAge}
/>
```

## Ícones Customizados

### Ícone com Ação
```tsx
<Input
  label="Buscar"
  icon={<Search />}
  onIconClick={() => console.log('Buscar clicado')}
  placeholder="Digite para buscar..."
  value={search}
  onChangeText={setSearch}
/>
```

### Ícone Decorativo
```tsx
<Input
  label="Email"
  type="email"
  icon={<Mail />}
  placeholder="seu@email.com"
  value={email}
  onChangeText={setEmail}
/>
```

## Estados de Erro

```tsx
<Input
  label="Email"
  type="email"
  value={email}
  onChangeText={setEmail}
  error="Email inválido"
/>
```

## Input Desabilitado

```tsx
<Input
  label="Campo Desabilitado"
  value="Valor fixo"
  disabled={true}
/>
```

## Input com Foco Automático

```tsx
<Input
  label="Senha"
  type="password"
  placeholder="Digite sua senha"
  value={password}
  onChangeText={setPassword}
  autoFocus={true}
/>
```

## Estilização Customizada

```tsx
<Input
  label="Input Customizado"
  value={value}
  onChangeText={setValue}
  className="bg-gray-100 border-blue-500"
/>
```

## Props Disponíveis

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `label` | `string` | - | Label do campo |
| `placeholder` | `string` | - | Placeholder do input |
| `value` | `string` | - | Valor do input |
| `onChangeText` | `(text: string) => void` | - | Callback de mudança |
| `error` | `string` | - | Mensagem de erro |
| `type` | `InputTypes` | `'text'` | Tipo do input |
| `icon` | `React.ReactElement` | - | Ícone customizado |
| `onIconClick` | `() => void` | - | Callback do clique no ícone |
| `secureTextEntry` | `boolean` | - | Força entrada segura |
| `keyboardType` | `KeyboardTypeOptions` | - | Tipo do teclado |
| `autoCapitalize` | `AutoCapitalizeOptions` | - | Capitalização automática |
| `autoComplete` | `AutoCompleteOptions` | - | Autocompletar |
| `disabled` | `boolean` | `false` | Estado desabilitado |
| `className` | `string` | - | Classes CSS customizadas |
| `autoFocus` | `boolean` | - | Define se o input deve receber foco automaticamente |

## Tipos de Input Suportados

- `text`: Texto simples
- `email`: Email com validação automática
- `password`: Senha com toggle de visibilidade
- `date`: Data com máscara DD/MM/YYYY
- `number`: Número com teclado numérico
- `phone`: Telefone com máscara (00) 00000-0000

## Funcionalidades

- **Máscaras automáticas**: Data e telefone com formatação automática
- **Toggle de senha**: Botão para mostrar/ocultar senha
- **Ícones customizados**: Suporte a ícones com ações
- **Validação visual**: Estados de erro com bordas vermelhas
- **Acessibilidade**: Suporte a autocompletar e tipos de teclado apropriados
- **Responsividade**: Design adaptável com NativeWind 