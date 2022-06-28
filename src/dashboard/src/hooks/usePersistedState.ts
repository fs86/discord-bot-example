import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function usePersistedState<T>(
  key: string,
  type: 'local' | 'session' = 'local',
  initialState?: T
): [T, Dispatch<SetStateAction<T>>] {
  const storage = type == 'local' ? window.localStorage : window.sessionStorage;

  const [value, setValue] = useState<T>(() => {
    const persistedValue = storage.getItem(key);
    return persistedValue !== null ? JSON.parse(persistedValue) : initialState;
  });

  useEffect(() => {
    storage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
