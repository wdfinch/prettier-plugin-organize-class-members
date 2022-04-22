import { AccessibilityOrder, GroupOrder, Order, SortOrder } from "./types"

export const defaultOrder: Order = [
  "staticProperties",
  "staticMethods",
  "properties",
  "constructor",
  "methods",
]

export const defaultAccessibilityOrder: AccessibilityOrder = [
  "public",
  "protected",
  "private",
]

export const defaultGroupOrder: GroupOrder = [
  "getterThenSetter",
  "everythingElse",
]

export const defaultSortOrder: SortOrder = "alphabetical"
