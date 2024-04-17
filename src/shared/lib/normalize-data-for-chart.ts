export function normalizeData<T>(
  data: { page: string; value: (T | null)[] }[],
): { page: string; value: (T | null)[] }[] {
  const maxValues = Math.max(...data.map((item) => item.value.length));

  const temp = data.map((item) => {
    const value = [...item.value];

    while (value.length < maxValues) {
      value.push(null);
    }

    return { page: item.page, value };
  });

  return temp;
}
