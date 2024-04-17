export const PHONE_REGEX = /^\+\d{11,13}$/;

export function isPhone(x: string): x is `+${number}` {
  return PHONE_REGEX.test(x);
}
