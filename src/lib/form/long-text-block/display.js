/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable import/order */
import { css } from "@emotion/css";
import { useEffect } from "@wordpress/element";

/**
 * External Dependencies
 */
import classnames from "clsx";
import TextareaAutosize from "react-autosize-textarea";
import tinyColor from "tinycolor2";

import { useMessages, HTMLParser, useBlockTheme } from "../core";

// @ts-ignore
const LongTextOutput = (props) => {
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
    // next,
    inputRef,
    isTouchScreen,
    setFooterDisplay,
  } = props;
  const { setMaxCharacters, maxCharacters, required } = attributes;
  const theme = useBlockTheme(attributes.themeId);
  const messages = useMessages();
  const answersColor = tinyColor(theme.answersColor);

  // @ts-ignore
  const checkfieldValidation = (value) => {
    if (required === true && (!value || value === "")) {
      setIsValid(false);
      setValidationErr(messages["label.errorAlert.required"]);
    } else if (
      setMaxCharacters &&
      maxCharacters > 0 &&
      value?.length > maxCharacters
    ) {
      setIsValid(false);
      setValidationErr(messages["label.errorAlert.maxCharacters"]);
    } else {
      setIsValid(true);
      setValidationErr(null);
    }
  };

  useEffect(() => {
    checkfieldValidation(val);
  }, [attributes]);

  // @ts-ignore
  const keyDownHandler = (e) => {
    // Enter was pressed with shift key or not
    if (e.keyCode === 13) {
      if (e.shiftKey) {
        // prevent default behavior
        e.stopPropagation();
      } else {
        e.preventDefault();
      }
    }
  };

  // @ts-ignore
  const changeHandler = (e) => {
    const { value } = e.target;
    if (setMaxCharacters && maxCharacters > 0 && value.length > maxCharacters) {
      blockWithError(messages["label.errorAlert.maxCharacters"]);
    } else {
      setVal(value);
      showErrMsg(false);
      checkfieldValidation(value);
    }
    if (value !== "") {
      setIsAnswered(true);
      showNextBtn(true);
    } else {
      setIsAnswered(false);
      showNextBtn(false);
    }
  };

  return (
    <>
      <TextareaAutosize
        ref={inputRef}
        onKeyDown={keyDownHandler}
        className={classnames(
          css`
            & {
              width: 100%;
              padding: 0;
              border: none;
              outline: none;
              border-radius: 0;
              font-size: 30px;
              padding-bottom: 8px;
              background: transparent;
              transition: box-shadow 0.1s 0s;
              resize: none;
              box-shadow: ease-out ${answersColor.setAlpha(0.3).toString()} 0px
                1px;
              @media (max-width: 600px) {
                font-size: 24px;
              }

              @media (max-width: 400px) {
                font-size: 20px;
              }
            }

            &::placeholder {
              opacity: 0.3;
              /* Chrome, Firefox, Opera, Safari 10.1+ */
              color: ${theme.answersColor};
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
              box-shadow: ${answersColor.setAlpha(1).toString()} 0px 2px;
            }

            color: ${theme.answersColor};
          `
        )}
        id={`longText-${id}`}
        placeholder={messages["block.longText.placeholder"]}
        onChange={changeHandler}
        value={val && val.length > 0 ? val : ""}
        onFocus={() => {
          if (isTouchScreen) {
            setFooterDisplay(false);
          }
        }}
        onBlur={() => {
          if (isTouchScreen) {
            setFooterDisplay(true);
          }
        }}
        autoComplete="off"
      />
      {!isTouchScreen && (
        <div
          className={classnames(
            "qf-blocklib-long-text-block-renderer__hint-text",
            css`
              margin-top: 12px;
              color: ${theme.questionsColor};
              font-size: 14px;
            `
          )}
        >
          <HTMLParser value={messages["block.longText.hint"]} />
        </div>
      )}
    </>
  );
};
export default LongTextOutput;
