/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from "@emotion/css";
import classname from "clsx";
import { isNaN, isNumber, isString } from "lodash";
import { useState, useEffect } from "react";

const KEY_UP = 38;
const KEY_DOWN = 40;
const IS_IOS =
  typeof navigator !== "undefined"
    ? navigator.userAgent.match(/iPhone|iPad|iPod/i)
    : false;

export function parseText(text: string) {
  if (isNumber(text)) return text;

  if (isString(text)) {
    text = text.trim();

    if (!text) return "";
    const num = parseFloat(text);

    if (!isNaN(num)) {
      return num;
    }
  }

  return "";
}

export function changeValue(
  mod: string,
  value: string | number,
  max: number,
  min: number,
  step: number
) {
  if (value === "") {
    if (isNumber(min)) return min;
    return "";
  }

  // @ts-expect-error string number confusion
  value = mod === "+" ? value + step : value - step;

  if (isNumber(max) && value > max) return max;
  if (isNumber(min) && value < min) return min;

  const p = (step.toString().split(".")[1] || []).length;
  if (p) {
    // @ts-expect-error doesnotexists
    return parseFloat(value.toFixed(p));
  }

  return value;
}

const styles = {
  MozAppearance: "textfield",
  "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
};

const InputNumber = ({
  step,
  min,
  max,
  value,
  onChange,
  onKeyDown,
  enableMobileNumericKeyboard,
  component,
  ...props
}: any) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  function handleChange(text: any) {
    const value = parseText(text);

    setText(value);
    if (onChange) {
      onChange(value);
    }
  }

  function handleWheel(e: { target: { blur: () => void } }) {
    e.target.blur();
  }

  function up() {
    if (onChange) {
      onChange(changeValue("+", value, max, min, step));
    }
  }

  function down() {
    if (onChange) {
      onChange(changeValue("-", value, max, min, step));
    }
  }

  function handleKeyDown(e: { keyCode: number }) {
    if (e.keyCode === KEY_UP) {
      up();
    } else if (e.keyCode === KEY_DOWN) {
      down();
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  const inputProps = {
    value: text,
    onChange: (e: { target: { value: any } }) => {
      if (handleChange) {
        handleChange(e.target.value);
      }
    },
    onKeyDown: handleKeyDown,
    onWheel: handleWheel,
  };

  // if (enableMobileNumericKeyboard) {
  //   return cloneElement(component, {
  //     ...props,
  //     ...inputProps,
  //     // @ts-expect-error assign
  //     className: css(styles),
  //     type: "number",
  //     inputMode: "numeric",
  //     pattern: IS_IOS ? `[0-9]*` : "",
  //     step,
  //     min,
  //     max,
  //   });
  // }

  // return cloneElement(component, {
  //   ...props,
  //   ...inputProps,
  //   // @ts-expect-error assign
  //   className: css(styles),
  //   type: "text",
  // });

  if (enableMobileNumericKeyboard) {
    <input
      {...props}
      {...inputProps}
      type="number"
      inputMode="numeric"
      pattern={IS_IOS ? `[0-9]*` : ""}
      step={step}
      min={min}
      max={max}
      className={
        // @ts-expect-error styles
        classname(css(styles), props.className)
      }
    />;
  }
  return (
    <input
      {...props}
      {...inputProps}
      className={
        // @ts-expect-error styles
        classname(css(styles), props.className)
      }
    />
  );
};

// const Input = ({ onChange, ...props }: any) => {
//   function handleChange(e: { target: { value: any } }) {
//     if (onChange) {
//       onChange(e.target.value);
//     }
//   }
//   return <input {...props} onChange={handleChange} />;
// };

InputNumber.defaultProps = {
  autoComplete: "off",
  enableMobileNumericKeyboard: false,
  value: "",
  step: 1,
};

export default InputNumber;
