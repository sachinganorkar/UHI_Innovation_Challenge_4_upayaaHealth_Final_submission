/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// @ts-ignore
const DropdownMergeTag = ({ val, attributes }) => {
  const { choices } = attributes;
  // @ts-ignore
  const choiceIndex = choices.findIndex((a) => a.value === val);
  let label = "_ _ _ _";
  if (choices[choiceIndex]) {
    label = choices[choiceIndex].label;

    if (!label) {
      // @ts-ignore
      label = `Choice ${index + 1}`;
    }
  }
  return <>{label}</>;
};

export default DropdownMergeTag;
