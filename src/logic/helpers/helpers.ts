import { namedTypes } from 'ast-types/gen/namedTypes'
import { ClassMethod } from 'jscodeshift'

export const getNodeName = (node: namedTypes.ClassBody['body'][number]) =>
  ((node as ClassMethod).key as namedTypes.Identifier).name
