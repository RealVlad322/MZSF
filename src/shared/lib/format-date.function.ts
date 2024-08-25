import isNumber from 'lodash/isNumber';

export const FORMATTER_LANG = 'ru-RU';
export const NO_RESULT = '-';

const DATE_FORMATTER = new Intl.DateTimeFormat(FORMATTER_LANG, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

const DATETIME_FORMATTER = new Intl.DateTimeFormat(FORMATTER_LANG, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const DATE_LONG_FORMATTER = new Intl.DateTimeFormat(FORMATTER_LANG, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const DATETIME_LONG_FORMATTER = new Intl.DateTimeFormat(FORMATTER_LANG, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export function formatDate(date: unknown, withTime?: boolean, long?: boolean): string {
  date = +new Date(date as any);

  if (!isNumber(date)) {
    return NO_RESULT;
  }

  const dateFormatter = long
    ? withTime
      ? DATETIME_LONG_FORMATTER
      : DATE_LONG_FORMATTER
    : withTime
      ? DATETIME_FORMATTER
      : DATE_FORMATTER;

  return dateFormatter.format(date);
}
