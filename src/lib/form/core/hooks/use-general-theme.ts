import type { FormTheme } from "../../types";
import { getDefaultThemeProperties } from "../../utils";

/*
 * Internal Dependencies
 */
import useFormContext from "./use-form-context";

const useGeneralTheme = () => {
  const {
    formObj: { theme },
  } = useFormContext();
  return {
    ...getDefaultThemeProperties(),
    ...theme,
  } as FormTheme;
};

export default useGeneralTheme;
