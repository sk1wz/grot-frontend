export function formatAmount(amount: number, currency = "₽") {
  return `${new Intl.NumberFormat("ru-RU").format(amount)} ${currency}`;
}

export function formatDate(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
