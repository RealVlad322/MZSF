import { useInjection } from '@/app/ioc';
import { formatDate } from '@/shared/lib/format-date.function';
import { Divider, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

import { DayOfWeek } from './table.constants';
import $ from './table.module.scss';
import { MainStore } from '../main.store';

export const TableTeacherFeature: FC<TableTeacherFeatureProps> = observer((props) => {
  const {} = props;

  const main$ = useInjection(MainStore);

  const { shedules, fullSem } = main$;

  shedules.forEach((s, i, arr) => {
    const dayOfWeek = DayOfWeek[new Date(s.date).getDay()];

    if (dayOfWeek === DayOfWeek[6]) {
      return;
    }

    const nextShedule = arr.at(i + 1);

    if (nextShedule) {
      const nextDayIndex = new Date(nextShedule.date).getDay();

      if (DayOfWeek[nextDayIndex - 1] !== dayOfWeek) {
        arr.splice(i + 1, 0, {
          date: new Date(+new Date(s.date) + 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          name: 'test',
          grade: 0,
          group: 0,
          subjects: [],
          faculty: '',
        });
      }
    }

    const prevShedule = arr.at(i - 1);

    if (dayOfWeek === DayOfWeek[1]) {
      return;
    }

    if (prevShedule && i !== 0) {
      const prevDayIndex = new Date(prevShedule.date).getDay();

      if (s.date === '2024-09-06') {
        console.log(dayOfWeek, prevDayIndex, prevShedule);
      }

      if (DayOfWeek[prevDayIndex + 1] !== dayOfWeek) {
        arr.splice(i, 0, {
          date: new Date(+new Date(s.date) - 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          name: 'test',
          grade: 0,
          group: 0,
          subjects: [],
          faculty: '',
        });
      }
    } else {
      arr.splice(0, 0, {
        date: new Date(+new Date(s.date) - 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        name: 'test',
        grade: 0,
        group: 0,
        subjects: [],
        faculty: '',
      });
    }
  });

  return (
    <div className={$.test}>
      {!!shedules.length && (
        <Stack flexDirection="row" gap="5px" pl="15px" mb="20px" alignItems="center">
          {!fullSem && <Button
            onClick={() => {
              void main$.loadShedulesNextWeek();
            }}
            // sx={{ mt: '20px', alignSelf: 'center' }}
            variant="outlined"
          >
            След неделя
          </Button>}
          <Button
            onClick={() => {
              main$.setShowSubjects(false);
            }}
            // sx={{ mt: '20px', alignSelf: 'center' }}
            variant="outlined"
          >
            назад
          </Button>
        </Stack>
      )}
      <Stack flexDirection="row" gap="15px" justifyContent="center" mb="20px" flexWrap="wrap">
        {shedules.map((s) => {
          const dayOfWeek = DayOfWeek[new Date(s.date).getDay()];
          // console.log(new Date(+new Date(s.date) + 3 * 60 * 60 * 1000).getDay(), s.date);

          return (
            <Card sx={{ padding: '15px 10px', width: '16%', minWidth: '312px' }} key={s.date}>
              <Stack flexDirection="row" gap="5px" alignItems="center">
                <Typography variant="subtitle2">
                  {dayOfWeek} {formatDate(s.date)}
                </Typography>
                <Typography variant="caption">{s.faculty}</Typography>
              </Stack>
              <Divider />
              {s.subjects.length
                ? s.subjects.map((sub, index) => {
                  const name = sub.name
                    ? sub.name
                    : sub.place.includes('Спортзал')
                      ? 'Физ-ра'
                      : null;

                  return (
                    <Stack key={sub.index}>
                      <Stack flexDirection="row" gap="5px" alignItems="center">
                        <Typography className={$.subjectIndex}>{sub.index} Пара</Typography>
                        <Divider orientation="vertical" flexItem variant="middle" />
                        {/* <Typography className={$.subjectIndex}>
                          {s.grade}-{s.group} {s.name}
                        </Typography> */}
                        <Typography className={$.subjectIndex}>
                          {sub.groupName}
                        </Typography>
                        <Divider orientation="vertical" flexItem variant="middle" />
                        <Typography className={$.subjcetCaption}>{sub.place}</Typography>
                      </Stack>
                      <Typography sx={{ textDecoration: 'underline' }} className={$.subjcetCaption}>
                        {sub.type}
                      </Typography>
                      <Typography className={$.subjectName}>{name}</Typography>
                      {index === s.subjects.length - 1 ? null : <Divider />}
                    </Stack>
                  );
                })
                : <Typography>Нет пар</Typography>
              }
            </Card>
          );
        })}
      </Stack>
      <Stack flexDirection="row" gap="5px" pl="15px" alignItems="center">
        {!fullSem && <Button
          onClick={() => {
            void main$.loadShedulesNextWeek();
          }}
          sx={{ mt: '20px', alignSelf: 'center' }}
          variant="outlined"
        >
          След неделя
        </Button>}
        <Button
          onClick={() => {
            main$.setShowSubjects(false);
          }}
          sx={{ mt: '20px', alignSelf: 'center' }}
          variant="outlined"
        >
          назад
        </Button>
      </Stack>
    </div>
  );
});

export interface TableTeacherFeatureProps {}
