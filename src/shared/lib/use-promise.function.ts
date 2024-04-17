import { type DependencyList, useCallback, useEffect, useState } from 'react';

export function usePromise<T, I = null>(
  promiseFn: () => Promise<T>,
  inputs: DependencyList,
  initialState: I = null as I,
): T | I {
  const [value, setValue] = useState<T | I>(initialState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const promiseFnCached = useCallback(promiseFn, inputs);

  useEffect(() => {
    void promiseFnCached().then(setValue, (err) => {
      console.error('usePromise error:', err);
    });
  }, [promiseFnCached]);

  return value;
}
