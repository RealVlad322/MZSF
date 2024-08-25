import { injectable } from 'inversify';

import { SheduleApiService, type SheduleGetListDto, type SheduleOut } from '../api';

@injectable()
export class SheduleService {
  constructor(private readonly sheduleApi: SheduleApiService) {}

  async getList(body: SheduleGetListDto): Promise<SheduleOut[]> {
    const result = await this.sheduleApi.getList(body);

    return result;
  }
}
