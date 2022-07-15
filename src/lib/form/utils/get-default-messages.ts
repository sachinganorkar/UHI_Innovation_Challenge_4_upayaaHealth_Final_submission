/* eslint-disable no-prototype-builtins */
import { reduce } from "lodash";

import ConfigAPI from "../config";
import type { FormMessages } from "../types";

/**
 * External Dependencies
 */

const getDefaultMessages = (): FormMessages => {
  const messagesStructure = ConfigAPI.getMessagesStructure();
  return reduce(
    messagesStructure,
    (accumulator, schema, key) => {
      if (schema.hasOwnProperty("default")) {
        // @ts-expect-error any
        accumulator[key] = schema.default;
      }

      return accumulator;
    },
    {}
  );
};

export default getDefaultMessages;
