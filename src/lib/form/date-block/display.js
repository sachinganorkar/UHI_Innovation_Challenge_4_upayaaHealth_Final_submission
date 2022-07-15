/* eslint-disable consistent-return */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/**
 * External Dependencies
 */
import classnames from "clsx";
import dayJs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
// @ts-ignore
import { css } from "emotion";
// @ts-ignore
import MaskedInput from "react-text-mask";
import tinyColor from "tinycolor2";
// @ts-ignore types
// @ts-ignore types

/**
 * Internal Dependencies
 */
import { useMessages, useBlockTheme } from "../core";

import createAutoCorrectedDatePipe from "./create-autocorrected-date-pipe";

// @ts-ignore
const DateOutput = (props) => {
  const {
    // id,
    attributes,
    setIsValid,
    // isPreview,
    setIsAnswered,
    setValidationErr,
    showNextBtn,
    showErrMsg,
    val,
    setVal,
    setFooterDisplay,
    isTouchScreen,
    // isActive,
    inputRef,
  } = props;
  const { format, separator, required } = attributes;
  const theme = useBlockTheme(attributes.themeId);
  const messages = useMessages();
  const answersColor = tinyColor(theme.answersColor);

  const getPlaceholder = () => {
    if (format === "MMDDYYYY") {
      return `MM${separator}DD${separator}YYYY`;
    }
    if (format === "DDMMYYYY") {
      return `DD${separator}MM${separator}YYYY`;
    }
    if (format === "YYYYMMDD") {
      return `YYYY${separator}MM${separator}DD`;
    }
  };

  // @ts-ignore
  const checkFieldValidation = (value) => {
    dayJs.extend(CustomParseFormat);
    const date = dayJs(value, getPlaceholder(), true);
    if (required === true && (!value || value === "")) {
      setIsValid(false);
      setValidationErr(messages["label.errorAlert.required"]);
    } else if (!date.isValid() && value) {
      setIsValid(false);
      setValidationErr(messages["label.errorAlert.date"]);
    } else {
      setIsValid(true);
      setValidationErr(null);
    }
  };

  // @ts-ignore
  const changeHandler = (e) => {
    const { value } = e.target;
    setVal(value);
    showErrMsg(false);
    checkFieldValidation(value);

    if (value !== "") {
      setIsAnswered(true);
      showNextBtn(true);
    } else {
      setIsAnswered(false);
      showNextBtn(false);
    }
  };

  const autoCorrectedDatePipe = createAutoCorrectedDatePipe(
    // @ts-ignore
    getPlaceholder().toLowerCase()
  );

  const getMask = () => {
    if (format === "YYYYMMDD") {
      return [
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        separator,
        /\d/,
        /\d/,
        separator,
        /\d/,
        /\d/,
      ];
    }
    return [
      /\d/,
      /\d/,
      separator,
      /\d/,
      /\d/,
      separator,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ];
  };

  return (
    <MaskedInput
      onChange={changeHandler}
      ref={inputRef}
      className={classnames(
        css`
          & {
            width: 100%;
            border: none;
            outline: none;
            font-size: 30px;
            padding-bottom: 8px;
            background: transparent;
            transition: box-shadow 0.1s 0s;
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
      placeholder={getPlaceholder()}
      mask={getMask()}
      pipe={autoCorrectedDatePipe}
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
  );
};
export default DateOutput;
