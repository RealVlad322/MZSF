export const truncateString = (str: string, maxLength: number = 30): string => {
  if (str.length <= maxLength) {
    return str;
  }

  const truncated = str.substr(0, maxLength).replace(/\S*$/, '');

  return `${truncated}...`;
};
