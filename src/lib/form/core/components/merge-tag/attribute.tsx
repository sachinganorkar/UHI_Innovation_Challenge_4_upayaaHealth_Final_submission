/* eslint-disable import/no-cycle */
import { __experimentalUseFieldRenderContext } from "../field-render";

interface Props {
  modifier: string;
}
const AttributeMergeTag: React.FC<Props> = ({ modifier }: Props) => {
  const { attributes } = __experimentalUseFieldRenderContext();
  let modifierRender: React.ReactNode = <>&apos;_ _ _ _ _&apos;</>;
  if (attributes && attributes[modifier]) {
    modifierRender = <> {attributes[modifier]} </>;
  }
  return (
    <span className="renderer-core-attribute-merge-tag">{modifierRender}</span>
  );
};
export default AttributeMergeTag;
