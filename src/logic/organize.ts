import { namedTypes } from "ast-types/gen/namedTypes"
import { ClassBody } from "jscodeshift"
import { ParserOptions } from "prettier"
import {
  defaultAccessibilityOrder,
  defaultGroupOrder,
  defaultOrder,
} from "./constants"
import { getConstructorMethod, getMethods } from "./js"
import { PluginOptions, SectionsToSort } from "./types"
import { hasDuplicates } from "./utils"
import jscodeshift = require("jscodeshift")

export const organize = (code: string, options: ParserOptions) => {
  const root = jscodeshift.withParser("tsx")(code)
  const body = root.find(ClassBody)

  if (body.length === 0) {
    return root.toSource()
  }

  const pluginOptions: PluginOptions = {
    order: defaultOrder,
    sortOrder: "alphabetical",
    accessibilityOrder: defaultAccessibilityOrder,
    groupOrder: defaultGroupOrder,
  }

  const sectionsToSort: SectionsToSort = {
    constructor: getConstructorMethod(body),
    methods: getMethods(body, pluginOptions),
  }

  if (hasDuplicates(defaultOrder)) {
    throw new Error("Duplicate sort order options is not permitted")
  }

  let sorted: (namedTypes.ClassBody["body"] | null)[] = []
  defaultOrder.forEach((item) => {
    if (item === "constructor") {
      sorted.push(sectionsToSort.constructor)
    } else if (item === "methods") {
      sorted.push(sectionsToSort.methods)
    }
  })

  const sortedWithoutNull = sorted.filter(
    (s) => !!s
  ) as namedTypes.ClassBody["body"][]

  body.replaceWith((path) => {
    path.node.body = sortedWithoutNull.flat()
    return path.node
  })

  // organizeMethods(body, options)
  // organizeStaticMethods(body, options)
  // organizePrivateMethods(body, options)
  // organizeStaticProperties(body, options)
  //
  // if (options.parser === "typescript") {
  //   organizeClassProperties(body)
  //   organizePrivateProtectedClassMethods(body)
  // }

  console.log(root.toSource())

  return code
}
