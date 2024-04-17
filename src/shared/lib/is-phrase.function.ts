export const PHRASE_REGEX = /^[а-яёa-z0-9][-а-яёa-z0-9& ]+[а-яёa-z0-9]$/i;

export function isPhrase(x: string): x is string {
  return PHRASE_REGEX.test(x);
}
