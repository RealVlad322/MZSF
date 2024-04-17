export function fromBase64(b64: string): string {
  return decodeURIComponent(escape(atob(b64)));
}
