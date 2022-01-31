import { namedTypes } from "ast-types/gen/namedTypes"
import { ParserOptions } from "prettier"

export type Sections =
  | "staticProperties"
  | "staticMethods"
  | "properties"
  | "constructor"
  | "methods"
export type SortOrder = Sections[]
export interface PluginOptions {
  sortOrder: SortOrder
  parserOptions: ParserOptions
}

export type InternalSortSection =
  | "constructor"
  | "getSetMethods"
  | "publicMethods"

export type SectionsToSort = Record<
  InternalSortSection,
  namedTypes.ClassBody["body"] | null
>
