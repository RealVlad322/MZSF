import { useInjection } from '@/app/ioc';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

import { MainStore } from './main.store';
import { SettingsFeature } from './settings/settings.feature';
import { TabsFeature } from './tab/tabs.feature';
import { Tablefeature } from './table/table.feature';

export const MainFeature: FC<MainFeatureProps> = observer((props) => {
  const {} = props;

  const main$ = useInjection(MainStore);

  const { showSubjects } = main$;

  return (
    <div>
      <TabsFeature />
      {showSubjects ? <Tablefeature /> : <SettingsFeature />}
    </div>
  );
});

export interface MainFeatureProps {}
