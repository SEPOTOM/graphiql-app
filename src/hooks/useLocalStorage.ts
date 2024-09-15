import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useLocalStorage<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const isClient = typeof window !== 'undefined';
  const getValue = (): T => {
    if (isClient) {
      const storage: Nullable<string> = localStorage.getItem(key);
      if (storage) {
        return JSON.parse(storage);
      }
    }
    return defaultValue;
  };
  const [query, setQuery] = useState(getValue);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(query));
    }
  }, [query, isClient, key]);

  return [query, setQuery];
}
