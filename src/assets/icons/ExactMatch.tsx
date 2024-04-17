import SvgIcon from '@mui/material/SvgIcon';
import { type ComponentProps, forwardRef } from 'react';

export default forwardRef((props: ComponentProps<any>, ref) => (
  <SvgIcon ref={ref} {...props}>
    <path
      d="M9 17H6V7H9"
      stroke="#666666"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 7L18 7L18 17L15 17"
      stroke="#666666"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
));
