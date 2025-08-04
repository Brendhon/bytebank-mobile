import { z } from 'zod';

// This schema is used to validate the login form data
export const loginSchema = z.object({
  email: z
    .email({ message: 'Email inválido' }),
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

// This type is used to infer the shape of the login form data
export type LoginFormData = z.infer<typeof loginSchema>;
