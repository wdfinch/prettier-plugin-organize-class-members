import { ClassMethod, MethodDefinition } from "jscodeshift"
import { ParserOptions } from "prettier"

export const getMethodType = (
  options: ParserOptions
): typeof MethodDefinition => {
  if (options.parser === "typescript") {
    return ClassMethod as unknown as typeof MethodDefinition
  } else {
    return MethodDefinition
  }
}
