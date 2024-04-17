export const PASSWORD_REGEX = /^[~`!@#$%^&*()_+=[\]{}|;':",./<>?a-zA-Z0-9-]+$/;

export function isPassword(x: string): x is string {
  return PASSWORD_REGEX.test(x);
}
