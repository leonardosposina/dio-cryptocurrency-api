export const currencyFormat = (value: number, currency: string): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 5,
  }).format(value);

export const hourFormat = (timestamp: string): string => {
  const format = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };

  return new Intl.DateTimeFormat('en-IN', format).format(new Date(timestamp));
};

export const dateFormat = (timestamp: string): string =>
  new Intl.DateTimeFormat('en-IN').format(new Date(timestamp));
