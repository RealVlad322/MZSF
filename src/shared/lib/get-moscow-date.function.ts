import { MOSCOW_TZ_OFFSET } from '../contract/constants';

export function getMoscowDate(timestamp: Date = new Date()): string {
  return new Date(+timestamp + MOSCOW_TZ_OFFSET).toISOString().slice(0, 10);
}
