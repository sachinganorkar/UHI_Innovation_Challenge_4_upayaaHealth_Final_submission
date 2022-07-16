/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable import/order */
import { useState, useEffect, useRef } from "@wordpress/element";

/**
 * External Dependencies
 */
import classnames from "clsx";
import { css } from "@emotion/css";
import tinyColor from "tinycolor2";

import { useTheme } from "../core";

// @ts-ignore
let selectionTimer;

const ChoiceItem = ({
  // @ts-ignore
  choice,
  // @ts-ignore
  blockId,
  // @ts-ignore
  choiceIndex,
  // @ts-ignore
  val,
  // @ts-ignore
  clickHandler,
  // @ts-ignore
  showDropdown,
  // @ts-ignore
  clicked,
  // @ts-ignore
  hovered,
}) => {
  const [isBeingSelected, setIsBeingSelected] = useState(false);
  const item = useRef();

  useEffect(() => {
    if (!showDropdown) setIsBeingSelected(false);
  }, [showDropdown]);
  const theme = useTheme();
  const answersColor = tinyColor(theme.answersColor);
  const isSelected = val && val === choice.value;
  useEffect(() => {
    // @ts-ignore
    if (clicked) item.current.click();
    return () => {
      clicked = false;
    };
  }, [clicked]);
  return (
    <div
      // @ts-ignore
      ref={item}
      id={`block-${blockId}-option-${choiceIndex}`}
      className={classnames(
        "dropdown__choiceWrapper",
        {
          selected: isSelected,
          isBeingSelected,
        },
        css`
					background: ${
            hovered
              ? answersColor.setAlpha(0.2).toString()
              : answersColor.setAlpha(0.1).toString()
          };

					border-color: ${theme.answersColor};
					color: ${theme.answersColor};

					&:hover {
						background: ${answersColor.setAlpha(0.2).toString()};
					}

					&.selected {
						background: ${tinyColor(theme.answersColor).setAlpha(0.75).toString()};
						color: ${tinyColor(theme.answersColor).isDark() ? "#fff" : "#333"}
				`
      )}
      role="presentation"
      onClick={() => {
        if (isSelected) {
          // @ts-ignore
          clearTimeout(selectionTimer);
        }
        if (!isSelected) setIsBeingSelected(true);
        clickHandler();
        selectionTimer = setTimeout(() => {
          if (isBeingSelected) setIsBeingSelected(false);
        }, 400);
      }}
    >
      {choice.label}
    </div>
  );
};

export default ChoiceItem;
