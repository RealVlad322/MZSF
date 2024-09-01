import { useInjection } from '@/app/ioc';
import { SettingsTabs } from '@/shared/contract/services';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

import { TableStudentFeature } from './table-student.feature';
import { TableTeacherFeature } from './table-teacher.feature';
import { MainStore } from '../main.store';

export const Tablefeature: FC<TableFeatureProps> = observer((props) => {
  const {} = props;

  const main$ = useInjection(MainStore);
  const { settingsTab } = main$;

  if (settingsTab === SettingsTabs.STUDENT) {
    return <TableStudentFeature/>;
  }

  if (settingsTab === SettingsTabs.TEACHER) {
    return <TableTeacherFeature/>;
  }
});

export interface TableFeatureProps {}
