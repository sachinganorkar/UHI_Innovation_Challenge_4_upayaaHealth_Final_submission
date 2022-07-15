/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * External Dependencies
 */
// @ts-expect-error types
import { css } from "emotion";

const ArrowIcon = ({ theme }: any) => {
  return (
    <svg
      className={css`
        fill: ${theme.buttonsFontColor};
      `}
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
    </svg>
  );
};
export default ArrowIcon;