import type { FormMessages } from "../../types";

import useFormContext from "./use-form-context";

const useMessages = (): FormMessages => {
  const {
    formObj: { messages },
  } = useFormContext();
  return {
    ...(messages as FormMessages),
  };
};

export default useMessages;
