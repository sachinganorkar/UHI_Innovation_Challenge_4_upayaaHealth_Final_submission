/* eslint-disable import/no-cycle */
/**
 * WordPresss Dependencies
 */
import { memo } from "@wordpress/element";

/**
 * Internal Dependencies
 */
import BlockAttachment from "../field-attachment";
import BlockCounter from "../field-counter";
import BlockDescription from "../field-description";
import BlockTitle from "../field-label";

const QuestionHeader: React.FC = memo(() => {
  return (
    <div className="renderer-components-question-header">
      <BlockCounter />
      <BlockTitle />
      <BlockDescription />
      <BlockAttachment />
    </div>
  );
});

export default QuestionHeader;
