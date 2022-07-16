/* eslint-disable import/order */
import { setBlockRendererSettings } from "../blocks";

import metadata from "./block.json";

/**
 * Internal Dependencies
 */
import rendererSettings from "./settings";

const { name } = metadata;

setBlockRendererSettings(name, rendererSettings);

export { name, metadata, rendererSettings };
