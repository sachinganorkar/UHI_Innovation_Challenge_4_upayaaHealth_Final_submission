/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line import/order
import { Fragment } from "@wordpress/element";

/**
 * External Dependencies
 */
import classNames from "clsx";
// @ts-expect-error types deps
import { css } from "emotion";

/**
 * Internal Dependencies
 */
import useBlockTheme from "../../hooks/use-block-theme";
import { __experimentalUseFieldRenderContext } from "../field-render/context";
import HTMLParser from "../html-parser";

const BlockDesc: React.FC = () => {
  const { attributes } = __experimentalUseFieldRenderContext();
  if (!attributes || !attributes.description) return null;
  const theme = useBlockTheme(attributes.themeId);
  const { description } = attributes;
  return (
    <Fragment>
      {description && description !== "" && (
        <div
          className={classNames(
            "renderer-components-block-description",
            css`
              color: ${theme.questionsColor};
            `
          )}
        >
          <HTMLParser value={description} />
        </div>
      )}
    </Fragment>
  );
};
export default BlockDesc;
