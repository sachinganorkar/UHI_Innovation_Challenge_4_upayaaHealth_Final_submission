import registerDataBlock from "./date";
import registerDropdownBlock from "./dropdown";
import registerLongTextBlock from "./long-text";
import registerMultipleChoiceBlock from "./multiple-choice";
import registerNumberBlock from "./number";
import registerShortTextBlock from "./short-text";

const registerCoreBlocks = () => {
  registerDataBlock();
  registerShortTextBlock();
  registerNumberBlock();
  registerMultipleChoiceBlock();
  registerLongTextBlock();
  registerDropdownBlock();
};

export default registerCoreBlocks;
