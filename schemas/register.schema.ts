import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string({ message: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
    email: z.email('Email inválido'),
    password: z
      .string({ message: 'Senha obrigatória' })
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string({ message: 'Campo obrigatório' })
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    acceptPrivacy: z
      .boolean() // Define the checkbox as a boolean
      .refine((val) => val === true, {
        // Validate that the checkbox is checked
        message: 'Você deve aceitar os termos de uso',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    // Check if passwords match
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
