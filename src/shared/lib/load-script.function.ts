const LOADED_SCRIPTS: Record<string, boolean> = {};

export function loadScript(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!global.window || LOADED_SCRIPTS[src]) {
      resolve(LOADED_SCRIPTS[src]);

      return;
    }

    LOADED_SCRIPTS[src] = false;

    const script = document.createElement('script') as HTMLScriptElement & {
      readyState: 'loaded' | 'complete' | undefined;
      onreadystatechange: null | (() => any);
    };

    script.type = 'text/javascript';
    script.src = src;

    if (script.readyState) {
      const readystatechange = (): void => {
        if (script.readyState !== 'loaded' && script.readyState !== 'complete') {
          return;
        }

        script.onreadystatechange = null;
        LOADED_SCRIPTS[src] = true;

        resolve(LOADED_SCRIPTS[src]);
        script.removeEventListener('readystatechange', readystatechange);
      };

      script.addEventListener('readystatechange', readystatechange);
    } else {
      const load = (): void => {
        LOADED_SCRIPTS[src] = true;

        resolve(LOADED_SCRIPTS[src]);
        script.removeEventListener('load', load);
      };

      script.addEventListener('load', load);
    }

    const error = (): void => {
      resolve(LOADED_SCRIPTS[src]);
      script.removeEventListener('error', error);
    };

    script.addEventListener('error', error);

    document.getElementsByTagName('head')[0].appendChild(script);
  });
}
