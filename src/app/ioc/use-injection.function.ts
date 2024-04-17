import { container } from './container';

export function useInjection<T>(type: Type<T>): T {
  return container.get<T>(type);
}
