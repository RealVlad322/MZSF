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

export const TableStudentFeature: FC<TableStudentFeatureProps> = observer((props) => {
  const {} = props;

  const main$ = useInjection(MainStore);

  const { shedules } = main$;

  if (shedules.length) {
    return (
      <div className={$.test}>
        {!!shedules.length && (
          <Stack flexDirection="row" gap="5px" mb="20px" alignItems="center" flexWrap="wrap">
            <Button
              onClick={() => {
                void main$.loadShedulesNextWeek();
              }}
              // sx={{ mt: '20px', alignSelf: 'center' }}
              variant="outlined"
            >
              След неделя
            </Button>

            {/* <Button
            onClick={ async () => {
              await main$.loadShedulesToomorrow();
            }}
            // sx={{ mt: '20px', alignSelf: 'center' }}
            variant="outlined"
          >
            завтра
          </Button> */}
            <Stack alignItems="center" flexDirection="row" flexWrap="wrap" gap="15px">
              <Stack flexDirection="row" alignItems="center">
                {' '}
                <div className={`${$.colorIcon}  ${$.colorIconLectures}`}></div>
                <Typography>Лекции</Typography>
              </Stack>
              <Stack flexDirection="row" alignItems="center">
                <div className={`${$.colorIcon}  ${$.colorIconPractice}`}></div>
                <Typography>Практические (семинарские) занятия</Typography>
              </Stack>
              <Stack flexDirection="row" alignItems="center">
                {' '}
                <div className={`${$.colorIcon}  ${$.colorIconLaboratory}`}></div>
                <Typography>Лабораторные работы</Typography>
              </Stack>
              <Stack flexDirection="row" alignItems="center">
                {' '}
                <div className={`${$.colorIcon}  ${$.colorIconProdPractice}`}></div>
                <Typography>Производственная практика</Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
        <Stack flexDirection="row" gap="15px" justifyContent="center" flexWrap="wrap">
          {shedules.map((s) => {
            const dayOfWeek = DayOfWeek[new Date(s.date).getDay()];

            return (
              <Card sx={{ padding: '15px 10px', width: '100%' }} key={s.date}>
                <Stack flexDirection="row" gap="5px" alignItems="center">
                  <Typography variant="subtitle2">
                    {dayOfWeek} {formatDate(s.date)}
                  </Typography>
                  <Typography variant="caption">{s.faculty}</Typography>
                  <Typography variant="caption">
                    {s.grade}-{s.group} {s.name}
                  </Typography>
                </Stack>
                <Divider />
                {s.subjects.map((sub, index) => {
                  const name = sub.name
                    ? sub.name
                    : sub.place?.includes('Спортзал')
                      ? 'Физ-ра'
                      : null;
                  const isDangerous = sub.teacher?.includes('Емельянов');
                  const color =
                    sub.type === 'Лекции'
                      ? 'rgb(67%, 86%, 68%)'
                      : sub.type === 'Практические (семинарские) занятия'
                        ? 'rgb(92%, 75%, 46%)'
                        : sub.type === 'Лабораторные работы'
                          ? 'rgb(62%, 64%, 95%)'
                          : sub.type === 'Производственная практика '
                            ? 'rgb(92%, 55%, 55%)'
                            : 'none';

                  return (
                    <Stack
                      mb={index + 1 === s.subjects.length ? undefined : '10px'}
                      sx={{ backgroundColor: isDangerous ? 'rgb(255, 0, 0, 0.5)' : color }}
                      key={sub.index}
                    >
                      <Stack flexDirection="row" gap="5px" alignItems="center">
                        <Typography className={$.subjectIndex}>{sub.index} Пара</Typography>
                        <Typography className={$.subjcetCaption}>{sub.place}</Typography>
                      </Stack>
                      <Typography className={$.subjcetCaption}>
                        {sub.teacher} <u>{sub.type}</u>
                      </Typography>
                      <Typography className={$.subjectName}>{name}</Typography>
                      {index === s.subjects.length - 1 ? null : <Divider />}
                    </Stack>
                  );
                })}
              </Card>
            );
          })}
        </Stack>
        <Stack flexDirection="row" gap="5px" alignItems="center">
          <Button
            onClick={() => {
              void main$.loadShedulesNextWeek();
            }}
            sx={{ mt: '20px', alignSelf: 'center' }}
            variant="outlined"
          >
            След неделя
          </Button>
        </Stack>
      </div>
    );
  }

  return (
    <Stack alignItems="center" padding="30px">
      <Typography fontSize="20px">Нет пар</Typography>
    </Stack>
  );
});

export interface TableStudentFeatureProps {}
