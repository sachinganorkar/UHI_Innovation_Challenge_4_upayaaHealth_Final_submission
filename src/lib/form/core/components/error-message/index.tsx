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
import { __experimentalUseFieldRenderContext } from "../field-render";
import HTMLParser from "../html-parser";

interface Props {
  message: string;
}
const ErrorMsgWrapper: React.FC<Props> = ({ message }: Props) => {
  const { attributes } = __experimentalUseFieldRenderContext();
  const theme = useBlockTheme(attributes?.themeId);
  return (
    <div
      className={classnames(
        "renderer-components-error-message-wrapper",
        css`
          background: ${theme.errorsBgColor};
          color: ${theme.errorsFontColor};
        `
      )}
    >
      <HTMLParser value={message} />
    </div>
  );
};
export default ErrorMsgWrapper;
