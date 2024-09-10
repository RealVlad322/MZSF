import { injectable } from 'inversify';
import groupBy from 'lodash/groupBy';

import { type SheduleType } from './types';
import { SheduleApiService, type SheduleGetListDto, type SubjectDto } from '../api';

@injectable()
export class SheduleService {
  constructor(private readonly sheduleApi: SheduleApiService) {}

  async getList(body: SheduleGetListDto): Promise<SheduleType[]> {
    console.log(body);

    const result = await this.sheduleApi.getList(body);

    const groupedByDate = Object.entries(groupBy(result, 'date'));

    const mappedResult = groupedByDate.map(([date, val]) => {
      const subjects = new Array(6).fill({}).map<SubjectDto>((t, i) => {
        const s = val.find((v) => v.index === i + 1);

        if (s) {
          return {
            index: s.index,
            place: s.place,
            type: s.type,
            teacher: s.teacher,
            name: s.discipline,
            groupName: s.groupName,
            subGroup: s.subgroup,
          };
        }

        return {
          index: i + 1,
        };
      }).sort((a, b) => a.index - b.index);
      const shedule: SheduleType = {
        date,
        subjects,
        faculty: '',
        grade: val.at(0)?.grade ?? 0,
        group: val.at(0)?.group ?? 0,
        name: val.at(0)?.groupName ?? '',
        subgroup: val.at(0)?.subgroup ?? '',
      };

      return shedule;
    });

    return mappedResult;
  }
}
