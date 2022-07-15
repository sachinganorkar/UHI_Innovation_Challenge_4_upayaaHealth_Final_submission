import { setBlockRendererSettings } from "../blocks";

import metadata from "./block.json";
import rendererSettings from "./settings";

const { name } = metadata;

setBlockRendererSettings(name, rendererSettings);

export { name, metadata, rendererSettings };
