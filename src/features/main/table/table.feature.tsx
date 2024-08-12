import { type FC } from 'react';

import $ from './table.module.scss';

export const Tablefeature: FC<TableFeatureProps> = (props) => {
  const {} = props;

  return <div className={$.test}>Table</div>;
};

export interface TableFeatureProps {

}
