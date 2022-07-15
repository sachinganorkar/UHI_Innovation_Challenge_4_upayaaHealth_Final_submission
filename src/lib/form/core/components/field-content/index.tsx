/* eslint-disable import/order */
/* eslint-disable import/no-cycle */
/**
 * WordPress Depndencies
 */
import { useState } from "@wordpress/element";

/**
 * External Dependencies
 */
import classnames from "clsx";

/**
 * Internal Depndencies
 */
import BlockOutput from "../field-display-wrapper";
import FieldHeader from "../field-header";

const FieldContent: React.FC = () => {
  const [isShaking, setIsShaking] = useState<boolean>(false);

  return (
    <div
      className={classnames("renderer-components-field-content", {
        "is-shaking": isShaking,
      })}
    >
      <FieldHeader />
      <BlockOutput
        isShaking={isShaking}
        setIsShaking={(val) => {
          setIsShaking(val);
        }}
      />
    </div>
  );
};

export default FieldContent;
