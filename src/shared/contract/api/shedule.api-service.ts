
import { inject, injectable } from 'inversify';

import { type SheduleGetListDto, type SheduleOut } from './types';
import { HttpAgent } from '../../lib';

@injectable()
export class SheduleApiService {
  constructor(
    @inject(HttpAgent) private readonly http$: HttpAgent,
  ) {
  }

  async getList(body: SheduleGetListDto): Promise<SheduleOut[]> {
    const result = await this.http$.post<SheduleOut[]>('https://mstuca-schedule.ru/service2/shedule/shedules', {
      json: body,
    });

    return result;
  }
}
