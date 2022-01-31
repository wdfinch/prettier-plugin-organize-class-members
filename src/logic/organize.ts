import { ClassBody } from "jscodeshift"
import { ParserOptions } from "prettier"
import {
  organizeConstructorMethod,
  organizeGetAndSetMethods,
  organizeMethods,
  organizePrivateMethods,
  organizeStaticMethods,
  organizeStaticProperties,
} from "./js"
import { organizePrivateProtectedClassMethods } from "./ts"
import { organizeClassProperties } from "./ts/organizeProperties"
import jscodeshift = require("jscodeshift")

export const organize = (code: string, options: ParserOptions) => {
  let parser
  if (options.parser === "typescript") {
    parser = "tsx"
  } else {
    parser = "babel"
  }

  const root = jscodeshift.withParser(parser)(code)

  const body = root.find(ClassBody)

  if (body.length === 0) {
    return root.toSource()
  }

  organizeConstructorMethod(body, options)
  organizeGetAndSetMethods(body, options)
  organizeMethods(body, options)
  organizeStaticMethods(body, options)
  organizePrivateMethods(body, options)
  organizeStaticProperties(body, options)

  if (options.parser === "typescript") {
    organizeClassProperties(body)
    organizePrivateProtectedClassMethods(body)
  }

  console.log(root.toSource())

  return code
}
