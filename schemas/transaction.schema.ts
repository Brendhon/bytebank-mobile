
import { TransactionDesc, TransactionType } from '@/models/transaction';
import { z } from 'zod';

// Keys
const TransactionDescKeys = Object.values(TransactionDesc);
const TransactionTypeKeys = Object.values(TransactionType);

export const transactionSchema = z.object({
  desc: z.enum(TransactionDescKeys, { message: 'Selecione uma descrição' }),
  type: z.enum(TransactionTypeKeys, { message: 'Selecione um tipo' }),
  alias: z.string().optional(),
  value: z.number().min(0, 'Informe um valor maior que 0'),
  date: z.string().min(1, 'Informe uma data'),
})

export type TransactionFormData = z.infer<typeof transactionSchema>