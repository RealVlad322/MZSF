declare module '*.svg' {
  import type React from 'react';

  export const ReactComponent: React.FC<React.SVGProps<SVGElement>>;

  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.module.scss' {
  const src: { [key: string]: string };
  export default src;
}

declare module '@mui/x-data-grid/internals' {
  interface GridSlotPropsOverrides {
    baseButton: {
      apiRef?: MutableRefObject<GridApiPremium>;
      startIcon?: ReactNode;
    };
  }
}

interface ImportMetaEnv {
  readonly REACT_API_BASE_URL: string;
  readonly REACT_API_WS_BASE_URL: string;
  readonly REACT_EXPERIMENTAL: string;
  readonly REACT_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type Type<T = any, S = {}> = (new (...args: any[]) => T) & S;

type IdRef<T> = T | string;

interface Page<T> {
  count: number;
  items: T[];
}

declare function isArray(x: unknown): x is any[];
declare function isBoolean(x: unknown): x is boolean;
declare function isFunction<T extends Function>(x: unknown): x is T;
declare function isId(x: unknown): x is string;
declare function isNil(x: unknown): x is null | undefined;
declare function isNumber(x: unknown): x is number;
declare function isObject(x: unknown): x is object;
declare function isString(x: unknown): x is string;
declare function notEmpty<T>(x: T): x is NonNullable<T>;
