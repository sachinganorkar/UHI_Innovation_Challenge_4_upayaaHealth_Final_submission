import { size } from "lodash";

import type { FormTheme } from "../../types";
import { getDefaultThemeProperties } from "../../utils";

/**
 * Internal Dependencies
 */
import useCurrentBlock from "./use-current-block";
import useFormContext from "./use-form-context";

/**
 * External Dependencies
 */

const useCurrentTheme = () => {
  const {
    formObj: { theme, themesList },
  } = useFormContext();
  const currentBlock = useCurrentBlock();
  let appliedTheme = theme;
  if (
    currentBlock?.attributes?.themeId &&
    themesList !== undefined &&
    size(themesList) > 0
  ) {
    appliedTheme = themesList.find(
      ($theme) => $theme.id === currentBlock?.attributes?.themeId
    )?.properties as FormTheme;
  }
  if (!appliedTheme) {
    appliedTheme = {};
  }
  return {
    ...getDefaultThemeProperties(),
    ...appliedTheme,
  } as FormTheme;
};

export default useCurrentTheme;
