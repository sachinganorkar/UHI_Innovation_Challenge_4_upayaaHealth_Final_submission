/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/**
 * QuillForms Dependencies
 */
import { reduce } from "lodash";

import ConfigAPI from "../config";

/**
 * External Dependencies
 */

const getDefaultThemeProperties = () => {
  const themeStructure = ConfigAPI.getThemeStructure();
  return reduce(
    themeStructure,
    (accumulator: any, schema, key) => {
      if (schema.hasOwnProperty("default")) {
        accumulator[key] = schema.default;
      }

      return accumulator;
    },
    {}
  );
};

export default getDefaultThemeProperties;
