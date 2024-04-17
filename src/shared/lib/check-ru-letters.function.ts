const CYRILLIC_LETTERS = [
  'а',
  'б',
  'в',
  'г',
  'д',
  'е',
  'ё',
  'ж',
  'з',
  'и',
  'й',
  'к',
  'л',
  'м',
  'н',
  'о',
  'п',
  'р',
  'с',
  'т',
  'у',
  'ф',
  'х',
  'ц',
  'ч',
  'ш',
  'щ',
  'ъ',
  'ы',
  'ь',
  'э',
  'ю',
  'я',
];

export function checkRuLetters(phrase: string): boolean {
  return phrase
    .replace(/ /g, '')
    .split('')
    .filter((symbol: string) => !isNumber(symbol))
    .some((letter) => CYRILLIC_LETTERS.includes(letter));
}
