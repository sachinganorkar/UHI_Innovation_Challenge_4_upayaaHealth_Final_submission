/* eslint-disable import/order */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable sonarjs/no-duplicate-string */
/**
 * WordPress Dependencies
 */
import { useSelect, useDispatch } from "@wordpress/data";

/**
 * External Dependencies
 */
import classnames from "clsx";
// @ts-expect-error notypes
import { css } from "@emotion/css";

/**
 * Internal Dependencies
 */
import { useCurrentTheme, useFormSettings } from "../../hooks";

import DownIcon from "./down-icon";
import UpIcon from "./up-icon";

const FieldNavigation = () => {
  const { goNext, goPrev } = useDispatch("quillForms/renderer-core");
  const theme = useCurrentTheme();
  const settings = useFormSettings();
  const { currentBlockId, walkPath } = useSelect((select) => {
    return {
      currentBlockId: select("quillForms/renderer-core").getCurrentBlockId(),
      walkPath: select("quillForms/renderer-core").getWalkPath(),
    };
  });
  return (
    <div className="renderer-core-field-navigation">
      <div
        className={classnames(
          "renderer-core-field-navigation__up-icon",
          {
            rotate: settings?.animationDirection === "horizontal",
          },
          css`
            background: ${theme.buttonsBgColor};
          `
        )}
        onClick={() => {
          goPrev();
        }}
      >
        <UpIcon />
      </div>
      <div
        className={classnames(
          "renderer-core-field-navigation__down-icon",
          {
            rotate: settings?.animationDirection === "horizontal",
          },
          css`
            background: ${theme.buttonsBgColor};
          `
        )}
        onClick={() => {
          if (walkPath[walkPath.length - 1].id !== currentBlockId) {
            goNext();
          }
        }}
      >
        <DownIcon />
      </div>
    </div>
  );
};
export default FieldNavigation;
