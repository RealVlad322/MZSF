import { injectable } from 'inversify';

import { buildQuery } from './build-query.function';
import { HttpException } from './http-exception.class';
import { ToastAgent } from './toast.agent';

@injectable()
export class HttpAgent {
  private baseUrl: string | undefined;

  constructor(private readonly toast$$: ToastAgent) {}

  setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  async get<T>(url: string, options?: HttpRequestOptions): Promise<T> {
    return this._request<T>('GET', url, options);
  }

  async post<T>(url: string, options?: HttpRequestOptions): Promise<T> {
    return this._request<T>('POST', url, options);
  }

  async put<T>(url: string, options?: HttpRequestOptions): Promise<T> {
    return this._request<T>('PUT', url, options);
  }

  async patch<T>(url: string, options?: HttpRequestOptions): Promise<T> {
    return this._request<T>('PATCH', url, options);
  }

  async delete<T>(url: string, options?: HttpRequestOptions): Promise<T> {
    return this._request<T>('DELETE', url, options);
  }

  async _request(
    method: string,
    url: string,
    options: HttpRequestOptions & { responseType: 'response' },
  ): Promise<Response>;
  async _request<T>(
    method: string,
    url: string,
    options: HttpRequestOptions & { responseType: 'json' },
  ): Promise<T>;
  async _request(
    method: string,
    url: string,
    options: HttpRequestOptions & { responseType: 'text' },
  ): Promise<string>;
  async _request(
    method: string,
    url: string,
    options: HttpRequestOptions & { responseType: 'blob' },
  ): Promise<Blob>;
  async _request<T>(method: string, url: string, options?: HttpRequestOptions,): Promise<T>;
  async _request(method: string, url: string, options: HttpRequestOptions = {}): Promise<unknown> {
    if (this.baseUrl) {
      url = url.replace(/^\/+/, '');
      url = `${this.baseUrl}/${url}`;
    }

    if (options.params) {
      url = this._replacePathParams(url, options.params);
    }

    options.showToast ??= true;
    options.headers ??= {};

    try {
      const {
        query,
        headers,
        responseType = method === 'DELETE' ? undefined : 'json',
        signal,
        ...contentOptions
      } = options;

      const hasQuery = !!(query && Object.keys(query).length);
      const fullUrl = `${url}${hasQuery ? `?${buildQuery(query)}` : ''}`;

      const res = await fetch(fullUrl, {
        method,
        signal,
        headers: {
          'Accept': 'application/json',
          ...'json' in options && { 'Content-Type': 'application/json; charset=utf-8' },
          ...headers,
        },
        // mode: 'cors',
        // credentials: 'same-origin',
        // referrerPolicy: 'no-referrer',
        body:
          'json' in contentOptions
            ? JSON.stringify(contentOptions.json!)
            : 'blob' in contentOptions
              ? contentOptions.blob
              : undefined,
      });

      if (responseType === 'response') {
        return res;
      }

      const data: unknown = await (responseType === 'json'
        ? res.text().then((t) => t ? (JSON.parse(t) as unknown) : null)
        : responseType === 'blob'
          ? res.blob()
          : responseType === 'text'
            ? res.text()
            : null);

      if (res.status >= 400) {
        const err = new HttpException(res.statusText, res.status, data as any);
        console.error(err);

        throw err;
      }

      if (res.status >= 500) {
        this.toast$$.show('Сервис временно не доступен, попробуйте позже, или обратитесь в поддержку(код ошибки 502)', { variant: 'error', autoHideDuration: 20_000 });
      }

      return data;
    } catch (err: any) {
      console.error(err);

      throw err;
    }
  }

  private _replacePathParams(path: string, params: HttpParams): string {
    let resultPath = path;

    for (const param of Object.keys(params)) {
      const paramPlaceholder = `:${param}`;
      resultPath = resultPath.replace(paramPlaceholder, `${params[param]}`);
    }

    return resultPath;
  }
}

export interface HttpRequestOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  query?: HttpQuery;
  json?: HttpJson;
  blob?: Blob;
  responseType?: 'json' | 'blob' | 'text' | 'response';
  showToast?: boolean;
  signal?: AbortSignal;
}

export interface HttpHeaders {
  [key: string]: string | string[];
}

export interface HttpParams {
  [key: string]: string | number | boolean;
}

export interface HttpQuery {
  [key: string]: string | number | boolean | (string | number | boolean)[] | undefined;
}

export interface HttpJson {
  [key: string]: any;
}
