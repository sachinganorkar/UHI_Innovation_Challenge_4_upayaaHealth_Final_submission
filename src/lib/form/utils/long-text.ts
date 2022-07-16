import { registerBlockType } from "../blocks";
import { name, metadata, rendererSettings } from "../long-text-block";

const register = () => {
  // @ts-expect-error object deconstruct
  registerBlockType(name, {
    ...metadata,
    ...rendererSettings,
  });
};

export default register;
