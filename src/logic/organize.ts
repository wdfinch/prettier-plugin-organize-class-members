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
  organizeGetAndSetMethods(body)
  organizeMethods(body)
  organizeStaticMethods(body)
  organizePrivateMethods(body)
  organizeStaticProperties(body)

  console.log(root.toSource())

  return code
}
