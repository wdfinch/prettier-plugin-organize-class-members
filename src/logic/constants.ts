import { AccessibilityOrder, GroupOrder, Order } from "./types"

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

export const defaultGroupOrder: GroupOrder = ["everythingElse"]
