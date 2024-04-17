import { injectable } from 'inversify';

@injectable()
export class StorageAgent {
  private readonly localStorage = localStorage;

  /**
   * Return `true` if {@link localStorage} has property by passed key, otherwise return `false`
   */
  has(name: string): boolean {
    return !!this.localStorage.getItem(name);
  }

  /**
   * Get local storage object by name
   */
  get<T = unknown>(name: string): T | null {
    const storageItem = this.localStorage.getItem(name);

    return isString(storageItem) ? JSON.parse(storageItem) as T : null;
  }

  /**
   * Set object to the storage by name
   */
  set(name: string, value: string | number | boolean | Object): void {
    const storageValue = JSON.stringify(value);

    this.localStorage.setItem(name, storageValue);
  }

  /**
   * Delete local storage record by name
   */
  delete(name: string): void {
    this.localStorage.removeItem(name);
  }
}
