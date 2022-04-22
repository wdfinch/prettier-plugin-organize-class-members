import { namedTypes } from "ast-types/gen/namedTypes"

export type Sections =
  | "staticProperties"
  | "staticMethods"
  | "properties"
  | "constructor"
  | "methods"

export type Order = Sections[]

export type Accessibility = "public" | "private" | "protected"
export type AccessibilityOrder = Accessibility[]

export type Groups = "getterThenSetter" | "everythingElse"
export type GroupOrder = Groups[]
export type SortOrder = "alphabetical" | "none"

export interface PluginOptions {
  order: Order
  accessibilityOrder: AccessibilityOrder
  groupOrder: GroupOrder
  sortOrder: SortOrder
}

export type SectionsToSort = Record<
  Sections,
  namedTypes.ClassBody["body"] | null
>
