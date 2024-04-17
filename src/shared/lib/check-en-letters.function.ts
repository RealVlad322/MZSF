const LATIN_LETTERS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export function checkEnLetters(phrase: string): boolean {
  return phrase
    .replace(/ /g, '')
    .split('')
    .filter((symbol: string) => !isNumber(symbol))
    .some((letter) => LATIN_LETTERS.includes(letter));
}
