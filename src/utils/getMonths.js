export const getLastMonths = (count = 6) => {
  const now = new Date();
  return Array.from({ length: count }).map((_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1);
    return date.toLocaleString('default', { month: 'short' }); // e.g., 'Apr'
  });
};

const months = getLastMonths(6);
