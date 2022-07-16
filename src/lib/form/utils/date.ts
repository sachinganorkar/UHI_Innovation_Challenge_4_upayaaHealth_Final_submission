import { registerBlockType } from "../blocks";
import { name, metadata, rendererSettings } from "../date-block";

const register = () => {
  registerBlockType(name, {
    ...metadata,
    ...rendererSettings,
  });
};

export default register;
