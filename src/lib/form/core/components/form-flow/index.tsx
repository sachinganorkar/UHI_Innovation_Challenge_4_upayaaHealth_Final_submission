/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable sonarjs/no-identical-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
/* eslint-disable no-nested-ternary */
import { useSelect, useDispatch } from "@wordpress/data";
import { Fragment, useEffect, useRef } from "@wordpress/element";

/**
 * External Dependencies
 */
import classnames from "clsx";
import { css } from "@emotion/css";

/**
 * Internal Dependencies
 */
// import { useCurrentTheme } from "../..";
// import configApi from "../../../config";
import useBlocks from "../../hooks/use-blocks";
import useGeneralTheme from "../../hooks/use-general-theme";
import FieldsWrapper from "../fields-wrapper";
import FormFooter from "../form-footer";
import ThankyouScreensWrapper from "../thankyou-screens-wrapper";
import WelcomeScreensWrapper from "../welcome-screens-wrapper";

interface Props {
  applyLogic: boolean;
}
const FormFlow: React.FC<Props> = ({ applyLogic }: Props) => {
  const blocks = useBlocks();
  const generalTheme = useGeneralTheme();

  const { setIsFocused } = useDispatch("quillForms/renderer-core");
  const ref = useRef(null);
  const { isWelcomeScreenActive, isThankyouScreenActive } = useSelect(
    (select) => {
      return {
        isThankyouScreenActive: select(
          "quillForms/renderer-core"
        ).isThankyouScreenActive(),
        isWelcomeScreenActive: select(
          "quillForms/renderer-core"
        ).isWelcomeScreenActive(),
      };
    }
  );

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: { target: any }) {
      // @ts-expect-error contains
      if (ref.current && !ref?.current?.contains(event.target)) {
        setIsFocused(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const keydownHandler = (e: { key: string; preventDefault: () => void }) => {
    // Prevent any keyboard event by default in case of any tab event in general.
    if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  let backgroundImageCSS = "";
  if (generalTheme.backgroundImage && generalTheme.backgroundImage) {
    backgroundImageCSS = `background: url('${generalTheme.backgroundImage}') no-repeat;
			background-size: cover;
			background-position: center;
		`;
  }

  return (
    <div
      ref={ref}
      className={classnames(
        css`
          height: 100%;
          width: 100%;
          ${backgroundImageCSS}
        `,
        "renderer-core-form-flow__wrapper"
      )}
      tabIndex={0}
      onMouseDown={() => setIsFocused(true)}
    >
      <div
        className={classnames(
          "renderer-core-form-flow",
          css`
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: ${generalTheme.backgroundColor};
            font-family: ${generalTheme.font};
          `
        )}
        onClick={() => {
          setIsFocused(true);
        }}
      >
        {generalTheme?.logo?.src && (
          <div className="renderer-core-form-brand-logo">
            <img src={generalTheme.logo.src} />
          </div>
        )}
        {blocks.length > 0 && (
          <Fragment>
            {isWelcomeScreenActive && <WelcomeScreensWrapper />}
            <FieldsWrapper
              isActive={!isWelcomeScreenActive && !isThankyouScreenActive}
              applyLogic={applyLogic}
            />

            {isThankyouScreenActive && <ThankyouScreensWrapper />}
          </Fragment>
        )}
        <FormFooter />
      </div>
    </div>
  );
};
export default FormFlow;
