
import { TransactionDesc, TransactionType } from '@/models/transaction';
import { z } from 'zod';

// Keys
const TransactionDescKeys = Object.values(TransactionDesc);
const TransactionTypeKeys = Object.values(TransactionType);

export const transactionSchema = z.object({
  desc: z.enum(TransactionDescKeys, { message: 'Selecione uma descrição' }),
  type: z.enum(TransactionTypeKeys, { message: 'Selecione um tipo' }),
  alias: z.string().optional(),
  value: z.number().min(1, 'Informe um valor maior que 0'),
  date: z
    .string()
    .min(1, 'Informe uma data')
    .refine((date) => {
      // Validate format DD/MM/YYYY
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return false;
      
      // Get day, month and year
      const [day, month, year] = date.split('/').map(Number);
      
      // Validate ranges
      if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) {
        return false;
      }
      
      // Check if the date is valid
      return !isNaN(new Date(year, month - 1, day).getTime());
    }, 'Data inválida'),
});

export type TransactionFormData = z.infer<typeof transactionSchema>