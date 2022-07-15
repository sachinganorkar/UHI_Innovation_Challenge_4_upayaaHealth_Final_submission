import { select, dispatch } from "@wordpress/data";
/**
 * External Dependencies
 */
import { pick, isPlainObject } from "lodash";

/**
 * Internal Dependencies
 */
import { setBlockRendererSettings } from "./set-block-renderer-settings";
import type { BlockTypeSettings, BlockSupportedFeatures } from "./types";
/**
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  name     Block name.
 * @param  settings Block settings.
 *
 * @return The block settings, if it has been successfully registered;
 * otherwise `undefined`.
 */

const formName = "quillForms/blocks";

export const getDefaultBlockSupports = (): BlockSupportedFeatures => {
  return {
    editable: true,
    required: true,
    attachment: true,
    description: true,
    logic: true,
    logicConditions: true,
    numeric: false,
    choices: false,
    payments: false,
    points: false,
  };
};

export const registerBlockType = (
  name: string,
  settings: BlockTypeSettings
): BlockTypeSettings | undefined => {
  if (typeof name !== "string") {
    // eslint-disable-next-line no-console
    console.error("Block names must be strings.");
    return;
  }

  if (select(formName).getBlockType(name)) {
    // eslint-disable-next-line no-console
    console.error(`Block "${name}" is already registered.`);
    return;
  }

  // eslint-disable-next-line no-param-reassign
  settings.supports = {
    ...getDefaultBlockSupports(),
    ...settings.supports,
  };

  let { attributes } = settings;
  const { supports } = settings;

  if (!attributes || !isPlainObject(attributes)) {
    attributes = {};
  }
  if (supports.required) {
    attributes.required = {
      type: "boolean",
      default: false,
    };
  }

  if (supports.attachment) {
    attributes.attachment = {
      type: "object",
      properties: {
        url: {
          type: "string",
        },
      },
    };
  }

  if (supports.description) {
    attributes.description = {
      type: "string",
      default: "",
    };
  }
  if (supports.theme) {
    attributes.themeId = {
      type: "number",
    };
  }
  attributes.label = {
    type: "string",
    default: "",
  };

  // eslint-disable-next-line no-param-reassign
  settings.attributes = attributes;

  dispatch(formName).addBlockTypes({
    name,
    ...pick(settings, ["attributes", "supports", "logicalOperators"]),
  });

  setBlockRendererSettings(name, settings);
  // eslint-disable-next-line consistent-return
  return settings;
};

/**
 * Returns a registered block type.
 *
 * @param {string} name Block name.
 *
 * @return {?BlockTypeSettingss} Block type.
 */
export function getBlockType(name: string): BlockTypeSettings | undefined {
  return select(formName).getBlockType(name);
}
