import { namedTypes } from 'ast-types/gen/namedTypes'
import { Section } from '../types'

export type SectionsToSort = Record<
  Section,
  namedTypes.ClassBody['body'] | null
>
