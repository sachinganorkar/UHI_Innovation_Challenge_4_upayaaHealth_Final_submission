/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/order */
import { sanitizeBlocks } from "../../../blocks";
import getDefaultMessages from "../../../utils/get-default-messages";

/**
 * Internal Dependencies
 */
import type { FormObj, SubmissionDispatchers } from "../../types";
import { FormContextProvider } from "../form-context";
import FormWrapper from "../form-wrapper";

interface Props {
  formId: number;
  formObj: FormObj;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmit: (data: Object, dispatchers: SubmissionDispatchers) => void;
  applyLogic: boolean;
  isPreview: boolean;
}
const Form: React.FC<Props> = ({
  formObj,
  formId,
  onSubmit,
  applyLogic,
  isPreview = false,
}: Props) => {
  // This
  const formatFormObj = (formObj: FormObj): FormObj => {
    // If not in preview mode, sanitize blocks.
    // In preview mode, sanitizing is already done in block editor resolvers.
    if (!isPreview) {
      formObj.blocks = sanitizeBlocks(formObj.blocks);
    }

    formObj.messages = {
      ...getDefaultMessages(),
      ...formObj.messages,
    };
    return formObj;
  };
  return (
    // @ts-expect-error some error
    <FormContextProvider
      value={{
        formObj: formatFormObj(formObj),
        onSubmit,
        isPreview,
        formId,
      }}
    >
      <FormWrapper applyLogic={applyLogic} />
    </FormContextProvider>
  );
};

export default Form;
