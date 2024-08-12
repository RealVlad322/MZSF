import { type FC, useState } from 'react';

import { Tablefeature } from './table/table.feature';

export const MainFeature: FC<MainFeatureProps> = (props) => {
  const {} = props;

  const [isOpen, setIsOpen] = useState(false);

  return (<div>
    <button onClick={() => setIsOpen(!isOpen)}></button>
		Hello Main Feature
    <Tablefeature/>
  </div>);
};

export interface MainFeatureProps {
}
