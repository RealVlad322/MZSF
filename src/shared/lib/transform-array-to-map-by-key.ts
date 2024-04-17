interface ObjectWithKey {
  [key: string | number]: any;
}

export function transformArrayToMapByKey<T extends ObjectWithKey, K extends keyof T>(
  array: T[],
  key: K,
): Record<T[K], T> {
  return array.reduce((acc, item) => {
    acc[item[key]] = item;

    return acc;
  }, {} as Record<T[K], T>);
}
