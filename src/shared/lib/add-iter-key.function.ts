let lastKeyId = 0;

export const addIterKey = <T extends Record<string, any>>(items: T[]): (T & { $key: string })[] =>
  items.map((item) => {
    (item as T & { $key: string }).$key ||= `${lastKeyId++}`;

    return item as T & { $key: string };
  });
