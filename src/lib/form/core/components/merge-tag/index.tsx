/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
/**
 * Internal Dependencies
 */
import { applyFilters } from "@wordpress/hooks";

import AttributeMergeTag from "./attribute";
import FieldMergeTag from "./field";
import ProgressMergeTag from "./progress";

interface Props {
  type: string;
  modifier: string;
}
const MergeTag: React.FC<Props> = ({ type, modifier }: Props) => {
  switch (type) {
    case "field": {
      return <FieldMergeTag modifier={modifier} />;
    }
    case "attribute": {
      return <AttributeMergeTag modifier={modifier} />;
    }
    case "progress": {
      return <ProgressMergeTag modifier={modifier} />;
    }
    default:
      return applyFilters(
        "QuillForms.RendererCore.MergeTag",
        null,
        type,
        modifier
      ) as React.ReactElement<any, any> | null;
  }
};

export default MergeTag;
