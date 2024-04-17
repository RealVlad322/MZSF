import SvgIcon from '@mui/material/SvgIcon';
import { type ReactNode } from 'react';

export const RadioBlank = (props: { fill: string }): ReactNode => (
  <SvgIcon>
    <g>
      <rect
        width="24"
        height="24"
        rx="12"
        fillOpacity={props.fill && 0.2}
        fill={props.fill || '#F2F2F2'}
      />
    </g>
  </SvgIcon>
);
