/* eslint-disable import/no-cycle */
/**
 * External Dependencies
 */
import classnames from "clsx";
// @ts-expect-error types
import { css } from "emotion";

/**
 * Internal Dependencies
 */
import useBlockTheme from "../../hooks/use-block-theme";
import { __experimentalUseFieldRenderContext } from "../field-render/context";
import HtmlParser from "../html-parser";

const BlockLabel: React.FC = () => {
  const { attributes } = __experimentalUseFieldRenderContext();
  let label = "...";
  if (attributes?.label) label = attributes.label;
  if (attributes?.required) label += " *";
  const theme = useBlockTheme(attributes?.themeId);

  return (
    <div
      className={classnames(
        "renderer-components-block-label",
        css`
          color: ${theme.questionsColor};
        `
      )}
    >
      <HtmlParser value={label} />
    </div>
  );
};
export default BlockLabel;
