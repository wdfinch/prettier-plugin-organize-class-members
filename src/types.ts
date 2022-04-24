import { ParserOptions } from 'prettier'

export type Section =
  | 'staticProperties'
  | 'staticMethods'
  | 'properties'
  | 'constructor'
  | 'methods'

export type SectionOrder = Section[]
export type Accessibility = 'public' | 'private' | 'protected'
export type AccessibilityOrder = Accessibility[]

export type Groups = 'gettersAndSetters' | 'everythingElse'
export type GroupOrder = Groups[]
export type GroupSortOrder = 'alphabetical' | 'none'

export interface PluginOptions {
  classSectionOrder: SectionOrder
  classAccessibilityOrder: AccessibilityOrder
  classGroupOrder: GroupOrder
  classGroupSortOrder: GroupSortOrder
}

export type ParserOptionsWithCustomOptions = ParserOptions & PluginOptions
