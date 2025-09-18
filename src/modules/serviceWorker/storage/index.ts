import { createStorage } from "../../common/storage";

export const storage = createStorage(chrome.storage.local);
