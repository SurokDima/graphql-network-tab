import { createStorage } from "../../common/storage";
import { chromeProvider } from "../services/chromeProvider";

export const storage = createStorage(chromeProvider.storage.local);
