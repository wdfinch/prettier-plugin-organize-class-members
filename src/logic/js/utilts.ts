import { ClassMethod, MethodDefinition } from "jscodeshift"
import { SupportedParsers } from "../types"

export const getMethodType = (parser: SupportedParsers): typeof ClassMethod => {
  if (parser === "tsx") {
    return ClassMethod
  } else {
    return MethodDefinition as unknown as typeof ClassMethod
  }
}
