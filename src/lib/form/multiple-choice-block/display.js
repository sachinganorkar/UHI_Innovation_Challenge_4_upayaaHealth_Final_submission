/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable sonarjs/no-extra-arguments */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "@wordpress/element";

import { useMessages } from "../core";

/**
 * Internal Dependencies
 */
import ChoicesWrapper from "./choices-wrapper";

/**
 * @type {NodeJS.Timeout}
 */
let multipleChoiceTimer;
// @ts-ignore
const MultipleChoiceOutput = (props) => {
  const {
    id,
    attributes,
    setIsValid,
    setIsAnswered,
    showNextBtn,
    setValidationErr,
    val,
    setVal,
    next,
    isActive,
    isAnimating,
    showErrMsg,
  } = props;
  const { multiple, required } = attributes;
  const messages = useMessages();
  const [choiceClicked, setChoiceClicked] = useState(null);
  const checkfieldValidation = () => {
    if (required === true && (!val || val.length === 0)) {
      setIsValid(false);
      setValidationErr(messages["label.errorAlert.required"]);
    } else {
      setIsValid(true);
      setValidationErr(null);
    }
  };

  useEffect(() => {
    return () => clearTimeout(multipleChoiceTimer);
  }, []);

  useEffect(() => {
    if (!isActive) {
      clearTimeout(multipleChoiceTimer);
    }
    if (!isActive && !isAnimating) {
      setChoiceClicked(null);
    }
  }, [isActive, isAnimating]);

  useEffect(() => {
    clearTimeout(multipleChoiceTimer);
    if (choiceClicked && val?.length > 0 && !multiple) {
      multipleChoiceTimer = setTimeout(() => {
        next();
      }, 600);
    }
  }, [choiceClicked]);

  useEffect(() => {
    // @ts-ignore
    checkfieldValidation(val);
  }, [attributes]);

  useEffect(() => {
    // @ts-ignore
    checkfieldValidation(val);
    if (val?.length > 0) {
      setIsAnswered(true);
    } else {
      setIsAnswered(false);
    }
    if (multiple) {
      if (val?.length > 0) {
        showNextBtn(true);
      } else {
        showNextBtn(false);
      }
    } else {
      showNextBtn(false);
    }
  }, [val, attributes]);

  return (
    <div className="qf-multiple-choice-block-renderer">
      <ChoicesWrapper
        // @ts-ignore
        attributes={attributes}
        id={id}
        val={val}
        setVal={setVal}
        // @ts-ignore
        setChoiceClicked={(val) => {
          showErrMsg(false);
          setChoiceClicked(val);
        }}
      />
    </div>
  );
};
export default MultipleChoiceOutput;
