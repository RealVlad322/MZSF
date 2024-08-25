import { useInjection } from '@/app/ioc';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

import { MainStore } from './main.store';
import { Settingsfeature } from './settings/settings.feature';
import { Tablefeature } from './table/table.feature';

export const MainFeature: FC<MainFeatureProps> = observer((props) => {
  const {} = props;

  const main$ = useInjection(MainStore);

  const { showSubjects } = main$;

  return <div>{showSubjects ? <Tablefeature /> : <Settingsfeature />}</div>;
});

export interface MainFeatureProps {}
