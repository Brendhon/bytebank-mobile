import { z } from 'zod';

// This schema is used to validate the settings form data
export const settingsSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('Email inválido'),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres').optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  // Se não há nova senha, não precisa validar
  if (!data.newPassword && !data.confirmPassword) {
    return true;
  }
  
  // Se há nova senha, senha atual é obrigatória
  if (data.newPassword && (!data.currentPassword || !data.currentPassword.trim())) {
    return false;
  }
  
  // Se há nova senha, confirmação é obrigatória
  if (data.newPassword && !data.confirmPassword) {
    return false;
  }
  
  // Se há confirmação, nova senha é obrigatória
  if (data.confirmPassword && !data.newPassword) {
    return false;
  }
  
  // Senhas devem coincidir
  if (data.newPassword && data.confirmPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  
  return true;
}, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

// This type is used to infer the shape of the settings form data
export type SettingsFormData = z.infer<typeof settingsSchema>;
