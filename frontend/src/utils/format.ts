const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => currencyFormatter.format(value);

export const formatRating = (rating: number) => rating.toFixed(1);

