import { type QueryParams } from './query-params.type';

export function parseQuery(querystring: string): QueryParams {
  const query: QueryParams = {};
  const searchParams = new URLSearchParams(querystring);

  for (const [key, value] of Object.entries(searchParams)) {
    if (query[key]) {
      query[key] = [query[key], value].flat();
    } else {
      query[key] = value;
    }
  }

  return query;
}
