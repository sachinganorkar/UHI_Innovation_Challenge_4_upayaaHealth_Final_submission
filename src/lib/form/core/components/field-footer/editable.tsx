/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-cycle */
/**
 * WordPress Dependencies
 */
import { useSelect } from "@wordpress/data";

/**
 * Internal Dependencies
 */
import ErrMsg from "../error-message";
import FieldAction from "../field-action";
import { __experimentalUseFieldRenderContext } from "../field-render";
import SubmitBtn from "../submit-btn";

interface Props {
  id: string | undefined;
  shakingErr: string | null;
}
const EditableBlockFooter: React.FC<Props> = ({ id, shakingErr }: Props) => {
  if (!id) return null;
  const { isValid, validationErr } = useSelect((select) => {
    return {
      isValid: select("quillForms/renderer-core").isValidField(id),
      validationErr: select("quillForms/renderer-core").getFieldValidationErr(
        id
      ),
    };
  });
  const { next, isErrMsgVisible, showErrMsg, isLastField } =
    __experimentalUseFieldRenderContext();
  return (
    <>
      {shakingErr ||
      (!isValid && validationErr?.length > 0 && isErrMsgVisible) ? (
        <ErrMsg message={(shakingErr || validationErr) as string} />
      ) : isLastField ? (
        <SubmitBtn />
      ) : (
        <FieldAction
          clickHandler={() => {
            if (validationErr && !isValid) {
              showErrMsg(true);
            } else {
              next();
            }
          }}
        />
      )}
    </>
  );
};
export default EditableBlockFooter;
