import { ClassBody, MethodDefinition } from "jscodeshift"
import { ParserOptions } from "prettier"
import jscodeshift = require("jscodeshift")

export const organize = (code: string, options: ParserOptions) => {
  const root = jscodeshift(code)

  const body = root.find(ClassBody)

  if (body.length === 0) {
    return root.toSource()
  }

  const methods = body.find(MethodDefinition)

  // place constructor function above other methods
  if (methods.length > 0) {
    const constructorMethod = body.find(MethodDefinition, {
      kind: "constructor",
    })

    methods.at(0).insertBefore(constructorMethod.nodes()[0])
    constructorMethod.remove()
  }

  // group get and set methods

  console.log(root.toSource())

  return code
}
