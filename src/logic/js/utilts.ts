import { ClassMethod, MethodDefinition } from "jscodeshift"
import { ParserOptions } from "prettier"

export const getMethodType = (options: ParserOptions): typeof ClassMethod => {
  if (options.parser === "typescript") {
    return ClassMethod
  } else {
    return MethodDefinition as unknown as typeof ClassMethod
  }
}
