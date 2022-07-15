/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
import { useDispatch } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";

/**
 * External Dependencies
 */
import { cloneDeep, map, omit, size } from "lodash";

/**
 * Internal Dependencies
 */
import useBlocks from "../../hooks/use-blocks";
import useEditableFields from "../../hooks/use-editable-fields";
import useFormContext from "../../hooks/use-form-context";
import type { Screen } from "../../store/types";
import FormFlow from "../form-flow";

interface Props {
  applyLogic: boolean;
}

const FormWrapper: React.FC<Props> = ({ applyLogic }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const editableFields = useEditableFields();
  const blocks = useBlocks();
  const { insertEmptyFieldAnswer, goToBlock } = useDispatch(
    "quillForms/renderer-core"
  );
  const { isPreview } = useFormContext();
  const { setSwiper } = useDispatch("quillForms/renderer-core");
  useEffect(() => {
    if (!isPreview) {
      editableFields.forEach((field) =>
        insertEmptyFieldAnswer(field.id, field.name)
      );
      const welcomeScreens = map(
        cloneDeep(blocks).filter((block) => block.name === "welcome-screen"),
        (block) => omit(block, ["name"])
      ) as [] | Screen[];

      const thankyouScreens = map(
        cloneDeep(blocks).filter((block) => block.name === "thankyou-screen"),
        (block) => omit(block, ["name"])
      ) as [] | Screen[];
      setSwiper({
        walkPath: cloneDeep(
          blocks.filter(
            (block) =>
              block.name !== "thankyou-screen" &&
              block.name !== "welcome-screen"
          )
        ),
        welcomeScreens:
          size(welcomeScreens) === 0 ? [] : (welcomeScreens as Screen[]),
        thankyouScreens:
          size(thankyouScreens) === 0 ? [] : (thankyouScreens as Screen[]),
      });

      setIsMounted(true);
    }
  }, [JSON.stringify(blocks)]);

  useEffect(() => {
    if (isMounted) {
      const firstBlock = blocks && blocks[0] ? blocks[0] : undefined;

      setTimeout(() => {
        if (firstBlock?.id) {
          goToBlock(firstBlock.id);
        }
      }, 100);
    }
  }, [isMounted]);

  return <FormFlow applyLogic={applyLogic} />;
};

export default FormWrapper;
