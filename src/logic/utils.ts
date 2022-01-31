import { namedTypes } from "ast-types/gen/namedTypes"
import {
  ASTPath,
  ClassMethod,
  ClassProperty,
  MethodDefinition,
} from "jscodeshift"

export const getName = <
  ASTType extends ClassMethod | MethodDefinition | ClassProperty
>(
  method: ASTPath<ASTType>
) => (method.node.key as namedTypes.Identifier).name

export const hasDuplicates = (array: any[]) =>
  new Set(array).size != array.length
