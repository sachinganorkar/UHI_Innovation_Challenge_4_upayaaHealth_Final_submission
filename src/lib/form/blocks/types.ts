import type { FC } from "react";
import type React from "react";

import type { BlockAttributes, IconRenderer } from "../types";

interface ControlsProps {
  id: string;
  attributes: BlockAttributes | undefined;
  setAttributes(T: Record<string, unknown>): void;
}

interface EntryDetailsProps {
  id: string;
  attributes: BlockAttributes | undefined;
  value: unknown;
}

export interface BlockRendererSettings {
  display?: FC | JSX.Element;
  mergeTag?: FC | JSX.Element;
  counterIcon?: FC | JSX.Element;
  nextBtn?: FC | JSX.Element;
  getNumericVal?: (val: unknown, attributes: BlockAttributes) => number;
  isConditionFulfilled?(
    conditionOperator: string,
    conditionVal: unknown,
    fieldValue: unknown
  ): boolean;
}

export interface BlockAdminSettings {
  title?: string;
  color?: string;
  icon?: IconRenderer;
  controls?: React.ComponentType<ControlsProps>;
  logicControl?: FC | JSX.Element;
  order?: number;
  getChoices?: (args: {
    id: string;
    attributes: BlockAttributes;
  }) => { label: string; value: string }[];
  entryDetails?: React.ComponentType<EntryDetailsProps>;
}

export type BlockSupportedFeatures = {
  attachment?: boolean;
  description?: boolean;
  editable?: boolean;
  required?: boolean;
  logic?: boolean;
  logicConditions?: boolean;
  theme?: boolean;
  numeric?: boolean;
  choices?: boolean;
  payments?: boolean;
  points?: boolean;
};

type LogicalOperator =
  | "is"
  | "is_not"
  | "starts_with"
  | "greater_than"
  | "lower_than"
  | "ends_with"
  | "contains"
  | "not_contains";

export interface BlockTypeSettings
  extends BlockAdminSettings,
    BlockRendererSettings {
  attributes?: Record<
    string,
    {
      type: string;
      default?: unknown;
      [x: string]: unknown;
    }
  >;
  supports: BlockSupportedFeatures;
  logicalOperators?: LogicalOperator[];
}
