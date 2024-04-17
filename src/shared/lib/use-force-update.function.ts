import { useState } from 'react';

export const useForceUpdate = (): (() => void) => {
  const [, setValue] = useState(0);

  return () => setValue((value) => value + 1);
};
