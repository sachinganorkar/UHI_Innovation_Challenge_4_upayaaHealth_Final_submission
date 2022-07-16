/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable sonarjs/no-collapsible-if */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/order */
/* eslint-disable no-nested-ternary */
/**
 * WordPress Dependencies
 */
import { useSelect, useDispatch } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";

/**
 * External Dependencies
 */
import classNames from "clsx";
import { css } from "@emotion/css";
// @ts-expect-error types
import Loader from "react-loader-spinner";

/**
 * Internal Dependencies
 */
import { useBlockTheme, useFormContext, useMessages } from "../../hooks";
import Button from "../button";
import { __experimentalUseFieldRenderContext } from "../field-render";
import HTMLParser from "../html-parser";

const SubmitBtn: React.FC = () => {
  const messages = useMessages();
  const { isLastField, isActive, attributes } =
    __experimentalUseFieldRenderContext();
  const theme = useBlockTheme(attributes?.themeId);

  const {
    goToBlock,
    setIsReviewing,
    setIsSubmitting,
    setIsFieldValid,
    setFieldValidationErr,
    setSubmissionErr,
    completeForm,
  } = useDispatch("quillForms/renderer-core");
  const { onSubmit } = useFormContext();
  const [isWaitingPending, setIsWaitingPending] = useState(false);

  const {
    answers,
    firstInvalidFieldId,
    pendingMsg,
    isSubmitting,
    submissionErr,
  } = useSelect((select) => {
    return {
      answers: select("quillForms/renderer-core").getAnswers(),
      pendingMsg: select("quillForms/renderer-core").getPendingMsg(),
      isSubmitting: select("quillForms/renderer-core").isSubmitting(),
      firstInvalidFieldId: select(
        "quillForms/renderer-core"
      ).getFirstInvalidFieldId(),
      submissionErr: select("quillForms/renderer-core").getSubmissionErr(),
    };
  });

  const handleKeyDown = (e: { key: string; metaKey: any }) => {
    if (e.key === "Enter") {
      if (e.metaKey) {
        submitHandler();
      }
    }
  };

  const goToFirstInvalidField = () => {
    if (firstInvalidFieldId) goToBlock(firstInvalidFieldId);
  };
  useEffect(() => {
    if (isLastField && isActive) {
      setIsReviewing(false);
      window.addEventListener("keydown", handleKeyDown);
    } else {
      removeEventListener("keydown", handleKeyDown);
    }

    return () => removeEventListener("keydown", handleKeyDown);
  }, [isLastField, isActive]);

  const submitHandler = () => {
    if (pendingMsg === false) {
      reviewAndSubmit();
    } else {
      setIsWaitingPending(true);
    }
  };

  const reviewAndSubmit = () => {
    setIsReviewing(false);
    if (firstInvalidFieldId) {
      setTimeout(() => {
        setIsReviewing(true);
      }, 50);

      setTimeout(() => {
        goToFirstInvalidField();
      }, 100);
    } else {
      setIsSubmitting(true);
      onSubmit(
        { answers },
        {
          setIsSubmitting,
          setIsFieldValid,
          setFieldValidationErr,
          setIsReviewing,
          goToBlock,
          completeForm,
          setSubmissionErr,
        }
      );
    }
  };

  useEffect(() => {
    if (isWaitingPending && pendingMsg === false) {
      setIsWaitingPending(false);
      reviewAndSubmit();
    }
  }, [isWaitingPending, pendingMsg]);

  return (
    <div className="renderer-core-submit-btn-wrapper">
      <Button
        className="renderer-core-submit-btn"
        onClick={() => {
          if (!isSubmitting) submitHandler();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.stopPropagation();
            if (!isSubmitting) submitHandler();
          }
        }}
        theme={theme}
      >
        <HTMLParser
          value={
            isWaitingPending ? pendingMsg || "" : messages["label.submitBtn"]
          }
        />
        {(isWaitingPending || isSubmitting) && (
          <Loader
            className="renderer-core-submit-btn__loader"
            type="TailSpin"
            color="#fff"
            height={20}
            width={20}
          />
        )}
      </Button>
      {submissionErr && (
        <div
          className={classNames(
            "renderer-core-submit-error",
            css`
              color: ${theme.questionsColor};
              margin-top: 15px;
            `
          )}
        >
          {submissionErr}
        </div>
      )}
    </div>
  );
};
export default SubmitBtn;
