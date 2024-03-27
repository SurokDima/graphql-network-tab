import { chromeProvider } from "../services/chrome-provider";

export const extensionStorage = chromeProvider.storage.local;

type StoreObject = Record<string, unknown>;

export const getAllItems = async (): Promise<StoreObject> => {
  return new Promise((resolve) => {
    extensionStorage.get(null, resolve);
  });
};

export const getItem = async <T>(key: string): Promise<T> => {
  return new Promise((resolve) => {
    extensionStorage.get(key, (records) => resolve(records[key]));
  });
};

export const setItem = async (key: string, record: unknown): Promise<void> => {
  await extensionStorage.set({ [key]: record });
};

export const removeItem = async (key: string): Promise<void> => {
  await extensionStorage.remove(key);
};

export const updateItem = async <TOldItem, TNewItem>(
  key: string,
  record: (val: TOldItem) => TNewItem
): Promise<void> => {
  const currentValue = await getItem<TOldItem>(key);
  await setItem(key, record(currentValue));
};
