import { setBlockRendererSettings } from "../blocks";

import metadata from "./block.json";
import display from "./display";

const { name } = metadata;

const rendererSettings = {
  display,
};

setBlockRendererSettings(name, rendererSettings);

export { name, metadata, rendererSettings };
