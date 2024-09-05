import { useInjection } from '@/app/ioc';
import { SettingsTabs } from '@/shared/contract/services';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Tab, Tabs } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

import $ from './tabs.module.scss';
import { MainStore } from '../main.store';

export const TabsFeature: FC<TabsFeatureProps> = observer((props) => {
  const {} = props;

  const main$ = useInjection(MainStore);
  const { settingsTab, showSubjects } = main$;

  return (
    <div className={$.test}>
      <Tabs
        value={settingsTab}
        onChange={(e, v) => {
          main$.setSettingsTab(v);
        }}
      >
        { showSubjects &&
          <IconButton
            onClick={() => {
              main$.setShowSubjects(false);
            }}
          >
            <ArrowBackIcon></ArrowBackIcon>{' '}
          </IconButton>
        }

        <Tab value={SettingsTabs.STUDENT} label="Студент"></Tab>
        <Tab value={SettingsTabs.TEACHER} label="Преподаватель"></Tab>
      </Tabs>
    </div>
  );
});

export interface TabsFeatureProps {}
