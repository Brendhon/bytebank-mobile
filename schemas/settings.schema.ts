import { z } from 'zod';

// This schema is used to validate the settings form data
export const settingsSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    currentPassword: z.string().min(1, 'Informe sua senha atual para atualizar seus dados'),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // Validation logic using switch statement for clarity
      switch (true) {
        // If there is no current password, no need to validate further
        case !data.currentPassword:
          return true;

        // Current password is always required and must not be empty
        case !data.currentPassword.trim():
          return false;

        // If new password is provided, confirmation is required
        case !!data.newPassword && !data.confirmPassword:
          return false;

        // If confirmation is provided, new password is required
        case !!data.confirmPassword && !data.newPassword:
          return false;

        // If both new password and confirmation are provided, they must match
        case !!data.newPassword &&
          !!data.confirmPassword &&
          data.newPassword !== data.confirmPassword:
          return false;

        // All validations passed
        default:
          return true;
      }
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    }
  );

// This type is used to infer the shape of the settings form data
export type SettingsFormData = z.infer<typeof settingsSchema>;
