export const getDateWithYear = (date: string | undefined): string => {
  let currentYear = new Date().getFullYear();

  if (!date) {
    return '';
  }

  const [day, month] = date.split('.');

  if (month === '12') {
    currentYear = 2023;
  }

  return `${currentYear}-${month}-${day}`;
};
