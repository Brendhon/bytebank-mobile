import { TransactionType } from '../models';

export const formatCurrency = (value: number) => {
  return (
    'R$ ' +
    value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
};

export const formatCurrencyWithSign = (type: TransactionType, value: number): string => {
  const formatted = Math.abs(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return type === TransactionType.INFLOW ? `+ ${formatted}` : `- ${formatted}`;
};
