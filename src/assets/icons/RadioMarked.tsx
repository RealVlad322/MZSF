import SvgIcon from '@mui/material/SvgIcon';
import { type ReactNode } from 'react';

export const RadioMarked = (props: any): ReactNode => (
  <SvgIcon>
    <g>
      <rect
        width="24"
        height="24"
        rx="12"
        fill={props.fill || '#F2F2F2'}
        fillOpacity={props.fill && 0.2}
      />
      <circle cx="12" cy="12" r="6" fill={props.fill || '#32558F'} />
    </g>
  </SvgIcon>
);
