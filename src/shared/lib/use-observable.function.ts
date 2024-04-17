import { useEffect, useState } from 'react';
import { BehaviorSubject, type Observable } from 'rxjs';

export function useObservable<
  O extends Observable<any>,
  T = Parameters<Parameters<O['forEach']>[0]>[0],
  I = O extends BehaviorSubject<any> ? T : null,
>(observable: O, initialState: I = null as I): T | I {
  initialState =
    observable instanceof BehaviorSubject
      ? observable.value
      : observable.source && observable.source instanceof BehaviorSubject
        ? observable.source.value
        : initialState;

  const [value, setValue] = useState<T | I>(initialState);

  useEffect(() => {
    let prevValue: T;

    const subscription = observable.subscribe((nextValue) => {
      if (nextValue === prevValue) {
        return;
      }

      prevValue = nextValue;
      setValue(nextValue);
    });

    return () => {
      !subscription.closed && subscription.unsubscribe();
    };
  }, [observable]);

  return value;
}
