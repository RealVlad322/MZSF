import { injectable } from 'inversify';
import groupBy from 'lodash/groupBy';

import { type SheduleType } from './types';
import { SheduleApiService, type SheduleGetListDto, type SubjectDto } from '../api';

const renameVoc = {
  'ИС241': 'ИС1-1',
  'ИС231': 'ИС2-1',
  'ИС222': 'ИС3-2',
  'ЭВМ221': 'ЭВМ3-1',
  'ЭВМб211': 'ЭМВб4-1',
  'ЭВМб212': 'ЭМВб4-2',
  'БИС241': 'БИС1-1',
  'БИС231': 'БИС2-1',
  'БИС221': 'БИС3-1',
  'БИС222': 'БИС3-2',
  'БИТ211': 'БИС4-1',
  'БИТ212': 'БИС4-2',
  'БИТ201': 'БИС5-1',
  'БИТ202': 'БИС5-2',
  'БИТ91': 'БИС6-1',
  'ИС221': 'ИС3-1',
  'ПМб211': 'ПМб4-1',
  'ИСЭ241': 'ИСЭ1-1',
  'ИСЭ231': 'ИСЭ2-1',
  'ИС241-1': 'ИС1-1-1',
  'ИС231-1': 'ИС2-1-1',
  'ИС222-1': 'ИС3-2-1',
  'ЭВМ221-1': 'ЭВМ3-1-1',
  'ЭВМб211-1': 'ЭМВб4-1-1',
  'ЭВМб212-1': 'ЭМВб4-2-1',
  'БИС241-1': 'БИС1-1-1',
  'БИС231-1': 'БИС2-1-1',
  'БИС221-1': 'БИС3-1-1',
  'БИС222-1': 'БИС3-2-1',
  'БИТ211-1': 'БИС4-1-1',
  'БИТ212-1': 'БИС4-2-1',
  'БИТ201-1': 'БИС5-1-1',
  'БИТ202-1': 'БИС5-2-1',
  'БИТ91-1': 'БИС6-1-1',
  'ИС221-1': 'ИС3-1-1',
  'ПМб211-1': 'ПМб4-1-1',
  'ИСЭ241-1': 'ИСЭ1-1-1',
  'ИСЭ231-1': 'ИСЭ2-1-1',
  'ИС241-2': 'ИС1-1-2',
  'ИС231-2': 'ИС2-1-2',
  'ИС222-2': 'ИС3-2-2',
  'ЭВМ221-2': 'ЭВМ3-1-2',
  'ЭВМб211-2': 'ЭМВб4-1-2',
  'ЭВМб212-2': 'ЭМВб4-2-2',
  'БИС241-2': 'БИС1-1-2',
  'БИС231-2': 'БИС2-1-2',
  'БИС221-2': 'БИС3-1-2',
  'БИС222-2': 'БИС3-2-2',
  'БИТ211-2': 'БИС4-1-2',
  'БИТ212-2': 'БИС4-2-2',
  'БИТ201-2': 'БИС5-1-2',
  'БИТ202-2': 'БИС5-2-2',
  'БИТ91-2': 'БИС6-1-2',
  'ИС221-2': 'ИС3-1-2',
  'ПМб211-2': 'ПМб4-1-2',
  'ИСЭ241-2': 'ИСЭ1-1-2',
  'ИСЭ231-2': 'ИСЭ2-1-2',
};

@injectable()
export class SheduleService {
  constructor(private readonly sheduleApi: SheduleApiService) {}

  async getList(body: SheduleGetListDto): Promise<SheduleType[]> {
    const result = await this.sheduleApi.getList(body);

    const groupedByDate = Object.entries(groupBy(result, 'date'));

    const mappedResult = groupedByDate.map(([date, val]) => {
      const subjects = val.map<SubjectDto>((s) => {
        const tempName = s.groupName ?? s.subgroup;

        return {
          index: s.index,
          place: s.place,
          type: s.type,
          teacher: s.teacher,
          name: s.discipline,
          groupName: tempName ? renameVoc[tempName.split(';')[0]] : '',
        };
      }).sort((a, b) => a.index - b.index);
      const tempName = val.at(0)?.groupName ?? val.at(0)?.subgroup;
      const shedule: SheduleType = {
        date,
        subjects,
        faculty: '',
        grade: 4,
        group: 1,
        name: tempName ? renameVoc[tempName?.split(';')[0]] : '',
      };

      return shedule;
    });

    return mappedResult;
  }
}
