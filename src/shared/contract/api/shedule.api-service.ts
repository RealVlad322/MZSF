
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
    const result = await this.http$.post<SheduleOut[]>('http://127.0.0.1:3002/shedule/shedules', {
      json: body,
    });

    return result;
  }
}
