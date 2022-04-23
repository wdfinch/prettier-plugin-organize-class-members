import { namedTypes as nt } from 'ast-types/gen/namedTypes'

declare module 'ast-types/gen/namedTypes' {
  namespace namedTypes {
    interface ClassProperty {
      accessibility: nt.ClassProperty['access']
    }
  }
}
