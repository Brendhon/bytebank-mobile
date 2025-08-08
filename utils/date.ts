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

export const formatDateWithRelative = (dateString: string): string => {
  // Check if date is already in format DD/MM/YYYY
  if (dateString.includes('/')) return dateString;

  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Hoje';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Ontem';
  } else {
    return date.toLocaleDateString('pt-BR');
  }
};

// Format date to DD/MM/YYYY
export const formatDateToInput = (date: Date = new Date()) => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};