import { useInjection } from '@/app/ioc';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

import { DIRECTION_SELECT_ITEMS, GRADE_SELECT_ITEMS, GROUP_SELECT_ITEMS } from './constants';
import $ from './settings.module.scss';
import { MainStore } from '../main.store';

export const Settingsfeature: FC<SettingsFeature> = observer((props) => {
  const {} = props;

  const main$ = useInjection(MainStore);

  return (
    <div className={$.test}>
      <Typography sx={{ mb: '15px' }}>Выборы</Typography>
      <Stack gap="8px">
        <FormControl>
          <InputLabel>Направление</InputLabel>
          <Select
            value={main$.name}
            label="Направление"
            onChange={(e) => {
              main$.setName(e.target.value);
            }}
          >
            {DIRECTION_SELECT_ITEMS.map((dir) => (
              <MenuItem key={dir.name} value={dir.value}>
                {dir.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Курс</InputLabel>
          <Select
            value={main$.grade}
            label="Курс"
            onChange={(e) => {
              main$.setGrade(+e.target.value);
            }}
          >
            {GRADE_SELECT_ITEMS.map((dir) => (
              <MenuItem key={dir.name} value={dir.value}>
                {dir.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Группа</InputLabel>
          <Select
            sx={{ mb: '15px' }}
            value={main$.group}
            label="Группа"
            onChange={(e) => {
              main$.setgroup(+e.target.value);
            }}
          >
            {GROUP_SELECT_ITEMS.map((dir) => (
              <MenuItem key={dir.name} value={dir.value}>
                {dir.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack>
        <Stack flexDirection="row" alignItems="center" gap="10px" mb="15px">
          <Button
            className={$.buttons}
            variant="outlined"
            onClick={() => {
              void main$.loadShedulesThisWeek();
              main$.setShowSubjects(true);
            }}
          >
            Эта неделя
          </Button>
          <Button
            className={$.buttons}
            variant="outlined"
            disabled
            onClick={() => {
              void main$.loadShedulesNextWeek();
              main$.setShowSubjects(true);
            }}
          >
            След неделя
          </Button>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap="10px">
          <Button
            className={$.buttons}
            variant="outlined"
            onClick={() => {
              void main$.loadShedulesToday();
              main$.setShowSubjects(true);
            }}
          >
            Сегодня
          </Button>
          <Button
            className={$.buttons}
            variant="outlined"
            onClick={() => {
              void main$.loadShedulesToomorrow();
              main$.setShowSubjects(true);
            }}
          >
            Завтра
          </Button>
        </Stack>
      </Stack>
    </div>
  );
});

export interface SettingsFeature {}
