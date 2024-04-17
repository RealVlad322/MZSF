export function toBase64(s: string): string {
  return btoa(unescape(encodeURIComponent(s)));
}
