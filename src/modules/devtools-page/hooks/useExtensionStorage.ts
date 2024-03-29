import { useEffect, useState } from "react";

import { storage } from "../storage";

export const useLazyGetExtensionStorageItem = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getExtensionStorageItem = async (key: string) => {
    setLoading(true);
    setError(null);

    try {
      const item = await storage.getItem<T>(key);
      setData(item);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getExtensionStorageItem };
};

export const useGetExtensionStorageItem = <T>(key: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    storage
      .getItem<T>(key)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [key]);

  return { data, loading, error };
};

export const useSetExtensionStorageItem = <T>(key: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setExtensionStorageItem = async (record: T) => {
    setLoading(true);
    setError(null);

    try {
      await storage.setItem(key, record);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { setItem: setExtensionStorageItem, loading, error };
};
