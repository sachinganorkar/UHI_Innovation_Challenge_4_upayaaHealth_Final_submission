import type { MessagesStructure, ThemeStructure } from "../../types";

import type { InitialPayload } from "./initial-payload";
import type { StoreAddons } from "./store-addons";

export type ConfigData = Record<string, unknown> & {
  isWPEnv: boolean;
  maxUploadSize: number;
  structures: {
    theme: ThemeStructure;
    messages: MessagesStructure;
  };
  initialPayload: InitialPayload;
  storeAddons: StoreAddons;
};
