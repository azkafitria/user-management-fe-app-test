export const formatDate = (date) => {
  const today = new Date(date);
  return today.toLocaleDateString('in-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const formatDateTime = (date) => {
  const today = new Date(date);
  return today
    .toLocaleDateString('in-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
    .replace(',', '')
    .replace('.', ':');
};
