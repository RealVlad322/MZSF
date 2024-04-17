import { injectable } from 'inversify';
import ms from 'ms';

const COOKIE_DELETE_DATE = new Date(1000);

@injectable()
export class CookieAgent {
  private get cookie(): string {
    return document.cookie;
  }

  /**
   * Return `true` if {@link Document} is accessible, otherwise return `false`
   */
  has(name: string): boolean {
    name = encodeURIComponent(name);

    const regExp: RegExp = CookieAgent._getCookieRegExp(name);

    return regExp.test(this.cookie);
  }

  /**
   * Get cookies by name
   */
  get(name: string): string | null {
    name = encodeURIComponent(name);

    const regExp = CookieAgent._getCookieRegExp(name);
    const result = regExp.exec(this.cookie) || [];

    return result[1] ? CookieAgent._safeDecodeURIComponent(result[1]) : null;
  }

  /**
   * Get all cookies in JSON format
   */
  getAll(): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};

    if (this.cookie && this.cookie !== '') {
      this.cookie.split(';').forEach((currentCookie) => {
        const [cookieName, cookieValue] = currentCookie.split('=');
        const name = CookieAgent._safeDecodeURIComponent(cookieName.replace(/^ /, ''));
        const value = CookieAgent._safeDecodeURIComponent(cookieValue);

        cookies[name] = value;
      });
    }

    return cookies;
  }

  set(name: string, value?: string, options: SetCookieOptions = {}): void {
    const { expires, ttl, path = '/', domain, secure, sameSite = 'Lax' } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value!)};`;

    if (expires || ttl) {
      const nowTs = Date.now();
      const date = expires || new Date(nowTs + ms(ttl!));

      cookieString += `Expires=${date.toUTCString()};`;
    }

    if (path) {
      cookieString += `Path=${path};`;
    }

    if (domain) {
      cookieString += `Domain=${domain};`;
    }

    cookieString += `SameSite=${sameSite};`;

    if (secure || sameSite === 'None') {
      if (!secure) {
        console.warn(`Cookie ${name} was forced with secure flag because SameSite=None.`);
      }

      cookieString += 'Secure;';
    }

    // cookieString += 'HttpOnly';

    document.cookie = cookieString;
  }

  /**
   * Delete cookie by name
   */
  delete(name: string, options: DeleteCookieOptions = {}): void {
    const expires = COOKIE_DELETE_DATE;

    this.set(name, '', {
      ...options,
      expires,
    });
  }

  /**
   * Delete all cookies
   */
  deleteAll(options: DeleteCookieOptions = {}): void {
    const cookies = this.getAll();

    for (const cookieName in cookies) {
      if (cookies.hasOwnProperty(cookieName)) {
        this.delete(cookieName, options);
      }
    }
  }

  /**
   * Gets the unencoded version of an encoded component of a Uniform Resource Identifier (URI).
   */
  private static _safeDecodeURIComponent(encodedURIComponent: string): string {
    try {
      return decodeURIComponent(encodedURIComponent);
    } catch {
      // probably it is not uri encoded. return as is
      return encodedURIComponent;
    }
  }

  /**
   * Get cookie Regular Expression.
   */
  private static _getCookieRegExp(name: string): RegExp {
    const escapedName = name.replace(/([[\]{}()|=;+?,.*^$])/gi, '\\$1');

    return new RegExp(`(?:^${escapedName}|;\\s*${escapedName})=(.*?)(?:;|$)`, 'g');
  }
}

export interface DeleteCookieOptions {
  path?: string | undefined;
  domain?: string | undefined;
  secure?: boolean | undefined;
  sameSite?: 'Lax' | 'None' | 'Strict';
}

export interface SetCookieOptions extends DeleteCookieOptions {
  expires?: Date;
  ttl?: string;
}
