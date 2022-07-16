/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable import/order */
import { useEffect } from "@wordpress/element";

/**
 * External Dependencies
 */
import classnames from "clsx";
import { css } from "@emotion/css";
import tinyColor from "tinycolor2";

import { useMessages, useBlockTheme } from "../core";

// @ts-ignore
const NumberOutput = (props) => {
  const {
    id,
    attributes,
    setIsValid,
    setIsAnswered,
    setValidationErr,
    showNextBtn,
    blockWithError,
    val,
    setVal,
    showErrMsg,
    inputRef,
    isTouchScreen,
    setFooterDisplay,
  } = props;
  const { setMax, max, setMin, min, required } = attributes;
  const messages = useMessages();
  const theme = useBlockTheme(attributes.themeId);
  const answersColor = tinyColor(theme.answersColor);

  // @ts-ignore
  const checkfieldValidation = (value) => {
    if (required === true && (!value || value === "")) {
      setIsValid(false);
      setValidationErr(messages["label.errorAlert.required"]);
    } else if (setMax && max > 0 && value > max) {
      setIsValid(false);
      setValidationErr(messages["label.errorAlert.maxNum"]);
    } else if (setMin && min >= 0 && value < min) {
      setIsValid(false);
      setValidationErr(messages["label.errorAlert.minNum"]);
    } else {
      setIsValid(true);
      setValidationErr(null);
    }
  };

  useEffect(() => {
    checkfieldValidation(val);
  }, [attributes]);

  // @ts-ignore
  const changeHandler = (e) => {
    const { value } = e.target;
    if (isNaN(value)) {
      blockWithError("Numbers only!");
      return;
    }
    setVal(parseInt(value, 10));
    showErrMsg(false);
    checkfieldValidation(parseInt(value, 10));

    if (value) {
      setIsAnswered(true);
      showNextBtn(true);
    } else {
      setIsAnswered(false);
      showNextBtn(false);
    }
  };

  let specialProps = {};
  if (isTouchScreen) {
    specialProps = {
      type: "number",
    };
  }
  return (
    <input
      {...specialProps}
      ref={inputRef}
      className={classnames(
        css`
          & {
            width: 100%;
            border: none !important;
            outline: none;
            font-size: 30px;
            padding-bottom: 8px;
            border-radius: 0 !important;
            background: transparent;
            background-color: transparent !important;
            transition: box-shadow 0.1s 0s;
            box-shadow: ease-out ${answersColor.setAlpha(0.3).toString()} 0px
              1px !important;

            -moz-appearance: textfield;

            @media (max-width: 600px) {
              font-size: 24px;
            }

            @media (max-width: 400px) {
              font-size: 20px;
            }

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0; /* <-- Apparently some margin are still there even though it's */
            }
          }
          &::placeholder {
            opacity: 0.3; /*
						Chrome, Firefox, Opera, Safari 10.1+ */
            color: hidden ${theme.answersColor};
          }

          &:-ms-input-placeholder {
            opacity: 0.3;
            /* Internet Explorer 10-11 */
            color: ${theme.answersColor};
          }

          &::-ms-input-placeholder {
            opacity: 0.3;
            /* Microsoft Edge */
            color: ${theme.answersColor};
          }

          &:focus {
            box-shadow: ${answersColor.setAlpha(1).toString()} 0px 2px !important;
            border: none !important;
            outline: none !important;
          }

          color: ${theme.answersColor};
        `
      )}
      id={`number-${id}`}
      placeholder={messages["block.number.placeholder"]}
      onChange={changeHandler}
      value={val || ""}
      onFocus={() => {
        if (isTouchScreen) {
          setFooterDisplay(false);
        }
      }}
      // @ts-ignore
      onWheel={(e) => e.target.blur()}
      onBlur={() => {
        if (isTouchScreen) {
          setFooterDisplay(true);
        }
      }}
      autoComplete="off"
    />
  );
};
export default NumberOutput;
