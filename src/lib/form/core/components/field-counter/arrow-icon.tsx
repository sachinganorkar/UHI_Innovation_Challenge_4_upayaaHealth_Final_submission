/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * External Dependencies
 */
import { css } from "@emotion/css";
import classnames from "clsx";

const ArrowIcon = ({ theme }: any) => {
  return (
    <svg
      className={classnames(
        "renderer-components-block-counter__arrow-icon",
        css`
          fill: ${theme.questionsColor};
          stroke: ${theme.questionsColor};
        `
      )}
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
      role="presentation"
    >
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
  );
};

export default ArrowIcon;
