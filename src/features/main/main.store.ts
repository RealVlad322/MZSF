
import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

@injectable()
export class MainStore {
  // объявление полей, которые нужны в разных фичах
  constructor(
    // объявление сервисов/агентов через private readonly serviceName$$: ServiceName
  ) {
    makeAutoObservable(this);
  }

  // написание разных методов(к примеру получить данные)
}
