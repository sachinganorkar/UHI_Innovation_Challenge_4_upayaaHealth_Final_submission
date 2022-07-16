/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import { join } from "lodash";

// @ts-ignore
const DropdownMergeTag = ({ val, attributes }) => {
  const { choices } = attributes;
  // @ts-ignore
  const mergedChoices = val.map((item) => {
    // @ts-ignore
    const choiceIndex = choices.findIndex((a) => a.value === item);
    let choiceLabel = `Choice ${choiceIndex + 1}`;
    if (choices[choiceIndex].label) {
      choiceLabel = choices[choiceIndex].label;
    }
    return choiceLabel;
  });
  return <>{join(mergedChoices, ",")}</>;
};

export default DropdownMergeTag;
