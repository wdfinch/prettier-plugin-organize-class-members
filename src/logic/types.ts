import { namedTypes } from "ast-types/gen/namedTypes"

export type Sections =
  | "staticProperties"
  | "staticMethods"
  | "properties"
  | "constructor"
  | "methods"

export type Order = Sections[]

type Accessibility = "public" | "protected" | "private"
export type AccessibilityOrder = Accessibility[]
export type Groups = "getterThenSetter" | "everythingElse"
export type GroupOrder = Groups[]

export interface PluginOptions {
  order: Order
  sortOrder: "alphabetical" | "none"
  accessibilityOrder: AccessibilityOrder
  groupOrder: GroupOrder
}

export type InternalSortSection = "constructor" | "methods"

export type SectionsToSort = Record<
  InternalSortSection,
  namedTypes.ClassBody["body"] | null
>

export interface MemberAccessibilityGroup {
  public: namedTypes.ClassBody["body"] | null
  private: namedTypes.ClassBody["body"] | null
  protected: namedTypes.ClassBody["body"] | null
}

export type Filter = "public" | "private" | "protected"
