import { createStorage } from "../../common/storage";
import { chromeProvider } from "../services/chrome-provider";

export const storage = createStorage(chromeProvider.storage.local);
