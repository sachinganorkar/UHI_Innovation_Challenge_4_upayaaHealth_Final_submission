import { registerBlockType } from "../blocks";
import { name, metadata, rendererSettings } from "../number-block";

const register = () => {
  // @ts-expect-error object deconstruct
  registerBlockType(name, {
    ...metadata,
    ...rendererSettings,
  });
};

export default register;
