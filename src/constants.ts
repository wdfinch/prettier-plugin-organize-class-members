import {
  ChoiceSupportOption,
  PathArraySupportOption,
  SupportOption,
} from "prettier"
import {
  AccessibilityOrder,
  GroupOrder,
  GroupSortOrder,
  PluginOptions,
  SectionOrder,
} from "./types"

export const SKIP_ORGANIZE_COMMENTS = [
  "// organize-classes-ignore",
  "// tslint:disable:organized-classes",
]

const sortAttributesOption: PathArraySupportOption = {
  since: "1.0.0",
  category: "Global",
  type: "path",
  array: true,
}

export const defaultSectionOrder: SectionOrder = [
  "staticProperties",
  "staticMethods",
  "properties",
  "constructor",
  "methods",
]

export const defaultSectionOrderSupportOption: PathArraySupportOption = {
  ...sortAttributesOption,
  default: [{ value: defaultSectionOrder }],
  description:
    "List of string values to determine the sort order of the class sections",
}

export const defaultAccessibilityOrder: AccessibilityOrder = [
  "public",
  "protected",
  "private",
]

export const defaultAccessibilityOrderSupportOption: PathArraySupportOption = {
  ...sortAttributesOption,
  default: [{ value: defaultAccessibilityOrder }],
  description:
    "List of string values to determine the sort order of the class sections",
}

export const defaultGroupOrder: GroupOrder = ["everythingElse"]

export const defaultGroupOrderSupportOption: PathArraySupportOption = {
  ...sortAttributesOption,
  default: [{ value: defaultGroupOrder }],
  description:
    "List of string values to determine the sort order of the class sections",
}

export const defaultSortOrderSupportOption: ChoiceSupportOption<GroupSortOrder> =
  {
    category: "Global",
    choices: [
      { value: "alphabetical", description: "Sort each group alphabetically." },
      { value: "none", description: "Perform no group sorting." },
    ],
    since: "1.0.0",
    type: "choice",
    default: "none",
    description:
      "List of string values to determine the sort order of the class sections",
  }

export const defaultPluginOptions: Record<keyof PluginOptions, SupportOption> =
  {
    sectionOrder: defaultSectionOrderSupportOption,
    accessibilityOrder: defaultAccessibilityOrderSupportOption,
    groupOrder: defaultGroupOrderSupportOption,
    groupSortOrder: defaultSortOrderSupportOption,
  }
