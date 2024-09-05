import { useInjection } from '@/app/ioc';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

import { TEACHER_SELECT_ITEMS } from './settings.constants';
import $ from './settings.module.scss';
import { MainStore } from '../main.store';

export const SettingsTeacherFeature: FC<SettingsTeacherFeatureProps> = observer((props) => {
  const {} = props;

  const main$ = useInjection(MainStore);

  return (
    <div className={$.test}>
      <Stack mb="15px" gap="8px">
        <FormControl>
          <InputLabel>Направление</InputLabel>
          <Select
            value={main$.teacherName}
            label="Направление"
            onChange={(e) => {
              main$.setTeacherName(e.target.value);
            }}
          >
            {TEACHER_SELECT_ITEMS.map((dir) => (
              <MenuItem key={dir.name} value={dir.value}>
                {dir.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack>

        <Stack flexDirection="row" alignItems="center" gap="10px">
          <Button
            className={$.buttons}
            variant="outlined"
            onClick={() => {
              void main$.loadFullSem();
              main$.setShowSubjects(true);
            }}
          >
            Расширенно(весь семестр)
          </Button>
          {/* <Button
            className={$.buttons}
            variant="outlined"
            onClick={() => {
              void main$.loadShedulesToomorrow();
              main$.setShowSubjects(true);
            }}
          >
            Завтра
          </Button> */}
        </Stack>
      </Stack>
    </div>
  );
});

export interface SettingsTeacherFeatureProps {}
