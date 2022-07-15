/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
/**
 * QuillForms dependencies
 */

/**
 * WordPress Dependencies
 */
import { createContext, useContext, useMemo } from "@wordpress/element";

/**
 * External Dependencies
 */
import { noop } from "lodash";

import type { BlockAttributes } from "../../../types";

interface FieldRenderContext {
  id: string | undefined;
  blockName: string | undefined;
  attributes: BlockAttributes | undefined;
  shouldBeRendered: boolean;
  isActive: boolean;
  isSubmitBtnVisible: boolean;
  isErrMsgVisible: boolean;
  showNextBtn: (x: boolean) => void;
  showErrMsg: (x: boolean) => void;
  next: () => void;
  isLastField: boolean;
}
const Context = createContext<FieldRenderContext>({
  id: undefined,
  blockName: undefined,
  attributes: undefined,
  isActive: false,
  shouldBeRendered: false,
  isSubmitBtnVisible: false,
  isErrMsgVisible: false,
  showErrMsg: noop,
  showNextBtn: noop,
  next: noop,
  isLastField: false,
});
const { Provider } = Context;

export const FieldRenderContextProvider = ({ value, children }: any) => {
  return (
    <Provider value={useMemo(() => value, Object.values(value))}>
      {children}
    </Provider>
  );
};

/**
 * A hook that returns the block render context.
 *
 * @return {Object} Block render context
 */
export function __experimentalUseFieldRenderContext(): FieldRenderContext {
  return useContext(Context);
}
