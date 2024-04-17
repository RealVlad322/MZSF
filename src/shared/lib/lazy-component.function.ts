import { type ComponentType, type LazyExoticComponent, lazy } from 'react';

export function lazyComponent<T extends ComponentType<any>, K extends string>(
  importFn: () => Promise<{ [P in K]: T }>,
  key: K,
): LazyExoticComponent<T> {
  return lazy(async () => {
    const { [key]: Component } = await importFn();

    return { default: Component };
  });
}
