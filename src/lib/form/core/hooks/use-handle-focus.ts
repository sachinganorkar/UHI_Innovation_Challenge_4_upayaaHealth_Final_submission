/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sonarjs/no-duplicate-string */
/**
 * WordPress Dependencies
 */
import { useSelect } from "@wordpress/data";
import { findDOMNode, useEffect } from "@wordpress/element";

let focusTimer: NodeJS.Timeout;
const useHandleFocus = (
  inputRef: any,
  isActive: boolean,
  isTouchScreen: boolean
) => {
  const { isAnimating, currentBlockId } = useSelect((select) => {
    return {
      isAnimating: select("quillForms/renderer-core").isAnimating(),
      currentBlockId: select("quillForms/renderer-core").getCurrentBlockId(),
    };
  });

  const { isFocused } = useSelect((select) => {
    return {
      isFocused: select("quillForms/renderer-core").isFocused(),
    };
  });

  const isVisible = (ref: any) => {
    if (!ref?.current) return false;
    const current = ref?.current?.inputElement
      ? ref.current.inputElement
      : ref.current;
    const rect = (findDOMNode(current) as Element)?.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight ||
          document.documentElement.clientHeight) /* or $(window).height() */ &&
      rect.right <=
        (window.innerWidth ||
          document.documentElement.clientWidth) /* or $(window).width() */
    );
  };

  useEffect(() => {
    if (!isTouchScreen && isFocused && isActive && !isAnimating) {
      if (isVisible(inputRef)) {
        focusTimer = setTimeout(() => {
          if (inputRef?.current?.focus) {
            inputRef.current.focus();
          } else if (inputRef?.current?.inputElement?.focus) {
            inputRef.current.inputElement.focus();
          }
        });
      } else if (
        currentBlockId &&
        document?.querySelector(
          `#block-${currentBlockId} .renderer-components-field-wrapper__content-wrapper`
        )
      ) {
        focusTimer = setTimeout(() => {
          (
            document.querySelector(
              `#block-${currentBlockId} .renderer-components-field-wrapper__content-wrapper`
            ) as HTMLElement
          ).focus();
        });
      }
    }
  }, [isFocused, isActive, isAnimating]);

  useEffect(() => {
    if (!isActive) {
      clearTimeout(focusTimer);
    }
    if (
      inputRef?.current?.blur &&
      !isActive &&
      document.activeElement === inputRef.current
    ) {
      inputRef.current.blur();
    }
  }, [inputRef, isActive]);
};

export default useHandleFocus;
