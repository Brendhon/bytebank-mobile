import { z } from 'zod';

export const accountSchema = z
  .object({
    name: z.string({ message: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
    email: z.email('Email inválido'),
    password: z
      .string({ message: 'Senha obrigatória' })
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    newPassword: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: 'Senha deve ter pelo menos 6 caracteres',
      }),
    confirmPassword: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: 'Senha deve ter pelo menos 6 caracteres',
      }),
  })
  .refine((data) => !data.newPassword || data.newPassword === data.confirmPassword, {
    // Check if passwords match
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type AccountFormData = z.infer<typeof accountSchema>;
