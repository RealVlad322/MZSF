import { injectable } from 'inversify';

@injectable()
export class DebounceAgent {
  private timerId: number | undefined = undefined;

  constructor() {}

  debounce(fn: (args: void) => void, ms: number = 400): void {
    clearTimeout(this.timerId);

    this.timerId = window.setTimeout(() => {
      fn();
    }, ms);
  }
}
