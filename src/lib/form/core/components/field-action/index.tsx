/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * External Dependencies
 */
import { css } from "@emotion/css";
import classnames from "clsx";

/**
 * Internal Dependencies
 */
import useBlockTheme from "../../hooks/use-block-theme";
import useBlockTypes from "../../hooks/use-block-types";
import useMessages from "../../hooks/use-messages";
import Button from "../button";
import { __experimentalUseFieldRenderContext } from "../field-render";
import HTMLParser from "../html-parser";

const FieldAction = ({ clickHandler, show }: any) => {
  const messages = useMessages();
  const { blockName, isSubmitBtnVisible, attributes } =
    __experimentalUseFieldRenderContext();
  const theme = useBlockTheme(attributes?.themeId);

  if (!blockName) return null;
  const blockType = useBlockTypes()[blockName];
  const isTouchScreen =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0;

  return (
    <div
      className={classnames("renderer-core-field-action", {
        "is-visible": isSubmitBtnVisible || show,
      })}
    >
      {blockType?.nextBtn ? (
        // @ts-expect-error component
        <blockType.nextBtn onClick={clickHandler} />
      ) : (
        <>
          <Button theme={theme} onClick={clickHandler}>
            <HTMLParser value={messages["label.button.ok"]} />
          </Button>
          {!isTouchScreen && (
            <div
              className={classnames(
                "renderer-core-field-action__helper-text",
                css`
                  color: ${theme.questionsColor};
                  font-size: 15px;
                `
              )}
            >
              <HTMLParser value={messages["label.hintText.enter"]} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FieldAction;
