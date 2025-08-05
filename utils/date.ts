// Format date to pt-BR
export const formatDate = (date: Date = new Date()) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return date.toLocaleDateString('pt-BR', options);
};