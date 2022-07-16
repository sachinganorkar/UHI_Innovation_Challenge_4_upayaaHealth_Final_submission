import { castArray } from "lodash";

import type {
  BlockRendererSettings,
  BlockActionTypes,
  BlockTypeInterface,
} from "../types";

import { ADD_BLOCK_TYPES, SET_BLOCK_RENDERER_SETTINGS } from "./constants";

/**
 * Returns an action object used in registering block renderer settings.
 *
 * @param blockRendererSettings Block renderer settings which define block renderer behavior.
 * @param name                  The block name.
 *
 * @return Action object.
 */
export const setBlockRendererSettings = (
  blockRendererSettings: BlockRendererSettings,
  name: string
): BlockActionTypes => {
  return {
    type: SET_BLOCK_RENDERER_SETTINGS,
    settings: blockRendererSettings,
    name,
  };
};

/**
 * Returns an action object used in signalling that block types have been added.
 *
 * @param blockTypes Block types received.
 *
 * @return Action object.
 */
export const addBlockTypes = (
  blockTypes: BlockTypeInterface | BlockTypeInterface[]
): BlockActionTypes => {
  return {
    type: ADD_BLOCK_TYPES,
    blockTypes: castArray(blockTypes),
  };
};
