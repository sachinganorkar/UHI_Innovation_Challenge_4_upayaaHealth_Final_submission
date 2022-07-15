import { registerBlockType } from "../blocks/registration";
import { name, metadata, rendererSettings } from "../date-block";

const register = () => {
  registerBlockType(name, {
    ...metadata,
    ...rendererSettings,
  });
};

export default register;
