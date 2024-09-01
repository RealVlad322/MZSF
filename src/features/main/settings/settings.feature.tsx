import { useInjection } from '@/app/ioc';
import { SettingsTabs } from '@/shared/contract/services';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

import { SettingsStudentFeature } from './settings-student.feature';
import { SettingsTeacherFeature } from './settings-teacher.feature';
import { MainStore } from '../main.store';

export const SettingsFeature: FC<SettingsFeatureProps> = observer((props) => {
  const {} = props;

  const main$ = useInjection(MainStore);

  if (main$.settingsTab === SettingsTabs.STUDENT) {
    return <SettingsStudentFeature />;
  }

  if (main$.settingsTab === SettingsTabs.TEACHER) {
    return <SettingsTeacherFeature />;
  }
});

export interface SettingsFeatureProps {}
