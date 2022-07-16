/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import { css } from "@emotion/css";
import { useState } from "@wordpress/element";
import classnames from "clsx";
import tinyColor from "tinycolor2";

import { useMessages } from "../core";

// @ts-ignore
const ChoiceItem = ({ order, selected, choiceLabel, clickHandler, theme }) => {
  const { answersColor } = theme;
  const messages = useMessages();
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      role="presentation"
      className={classnames(
        "multipleChoice__optionWrapper",
        {
          selected,
          clicked: isClicked,
        },
        css`
          background: ${tinyColor(answersColor).setAlpha(0.1).toString()};

          border-color: ${answersColor};
          color: ${answersColor};

          &:hover {
            background: ${tinyColor(answersColor).setAlpha(0.2).toString()};
          }

          &.selected {
            background: ${tinyColor(answersColor).setAlpha(0.75).toString()};
            color: ${tinyColor(answersColor).isDark() ? "#fff" : "#333"};

            .multipleChoice__optionKey {
              color: ${tinyColor(answersColor).isDark() ? "#fff" : "#333"};

              border-color: ${tinyColor(answersColor).isDark()
                ? "#fff"
                : "#333"};
            }
          }
        `
      )}
      onClick={() => {
        clickHandler();
        if (!selected) {
          setIsClicked(false);
          setTimeout(() => {
            setIsClicked(true);
          }, 0);
        }
      }}
    >
      <span className="multipleChoice__optionLabel">{choiceLabel}</span>
      <span
        className={classnames(
          "multipleChoice__optionKey",
          css`
            background: ${tinyColor(answersColor).setAlpha(0.1).toString()};
            color: ${answersColor};
            border-color: ${tinyColor(answersColor).setAlpha(0.4).toString()};
          `
        )}
      >
        <span
          className={classnames(
            "multipleChoice__optionKeyTip",
            css`
              background: ${answersColor};
              color: ${tinyColor(answersColor).isDark() ? "#fff" : "#333"};
            `
          )}
        >
          {messages["label.hintText.key"]}
        </span>
        {order}
      </span>
    </div>
  );
};

export default ChoiceItem;
