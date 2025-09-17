type StoreObject = Record<string, unknown>;

export const createStorage = (storageArea: chrome.storage.StorageArea) => {
  const getAllItems = async (): Promise<StoreObject> => {
    return new Promise((resolve) => {
      storageArea.get(null, resolve);
    });
  };

  const getItem = async <T>(key: string): Promise<T> => {
    return new Promise((resolve) => {
      storageArea.get(key, (records) => resolve(records[key]));
    });
  };

  const setItem = async (key: string, record: unknown): Promise<void> => {
    await storageArea.set({ [key]: record });
  };

  const removeItem = async (key: string): Promise<void> => {
    await storageArea.remove(key);
  };

  const updateItem = async <TOldItem, TNewItem>(
    key: string,
    record: (val: TOldItem) => TNewItem
  ): Promise<void> => {
    const currentValue = await getItem<TOldItem>(key);
    await setItem(key, record(currentValue));
  };

  const listenToChanges = (
    listener: (changes: Record<string, chrome.storage.StorageChange>) => void
  ) => {
    storageArea.onChanged.addListener(listener);
  };

  const stopListeningToChanges = (
    listener: (changes: Record<string, chrome.storage.StorageChange>) => void
  ) => {
    storageArea.onChanged.removeListener(listener);
  };

  return {
    getAllItems,
    getItem,
    setItem,
    removeItem,
    updateItem,
    listenToChanges,
    stopListeningToChanges,
  };
};
