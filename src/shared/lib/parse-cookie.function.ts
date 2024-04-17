function _safeDecodeURIComponent(encodedURIComponent: string): string {
  try {
    return decodeURIComponent(encodedURIComponent);
  } catch {
    // probably it is not uri encoded. return as is
    return encodedURIComponent;
  }
}

export function parseCookie(cookie: string): Cookie {
  const cookies: Cookie = {};

  if (cookie && cookie !== '') {
    cookie.split(';').forEach((currentCookie) => {
      const [cookieName, cookieValue] = currentCookie.split('=');
      const name = _safeDecodeURIComponent(cookieName.replace(/^ /, ''));
      const value = _safeDecodeURIComponent(cookieValue);

      if (cookies[name]) {
        cookies[name] = [cookies[name], value].flat();
      } else {
        cookies[name] = value;
      }
    });
  }

  return cookies;
}

export interface Cookie {
  [key: string]: string | string[];
}
