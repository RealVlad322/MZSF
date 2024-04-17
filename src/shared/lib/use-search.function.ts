import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type UseSearchProps = [Record<string, string>, (params: Record<string, string | null>) => void];

export function useSearch(): UseSearchProps {
  const [searchParams, setSearchParams] = useSearchParams();

  const transformSearch = useCallback(
    (search: URLSearchParams): Record<string, string> =>
      Object.fromEntries(new URLSearchParams(search)),
    [],
  );

  const setSearch = useCallback(
    (params: Record<string, string | null>): void => {
      setSearchParams((prevSearch) =>
        Object.keys(params).reduce((acc, key) => {
          const paramValue = params[key];

          if (paramValue === null && acc[key]) {
            delete acc[key];
          } else if (isString(paramValue)) {
            acc[key] = paramValue;
          }

          return acc;
        }, transformSearch(prevSearch)));
    },
    [setSearchParams, transformSearch],
  );

  return [transformSearch(searchParams), setSearch];
}
