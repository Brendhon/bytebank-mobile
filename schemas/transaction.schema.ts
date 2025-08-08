
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
  date: z.string().min(1, 'Informe uma data').refine((date) => {
    const [day, month, year] = date.split('/');
    return !isNaN(new Date(+year, +month - 1, +day).getTime());
  }, 'Data inválida'),
})

export type TransactionFormData = z.infer<typeof transactionSchema>