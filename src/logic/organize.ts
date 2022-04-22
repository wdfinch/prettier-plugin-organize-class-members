import { namedTypes } from "ast-types/gen/namedTypes"
import { ClassBody } from "jscodeshift"
import { ParserOptions } from "prettier"
import {
  defaultAccessibilityOrder,
  defaultGroupOrder,
  defaultOrder,
  defaultSortOrder,
} from "./constants"
import { getConstructorMethod, getMethods } from "./helpers"
import { getProperties } from "./helpers/properties"
import { PluginOptions, SectionsToSort } from "./types"
import { areOptionsValid } from "./validateOptionsHelpers"
import jscodeshift = require("jscodeshift")

export const organize = (code: string, options: ParserOptions) => {
  const root = jscodeshift.withParser("tsx")(code)
  const body = root.find(ClassBody)

  if (body.length === 0) {
    return root.toSource()
  }

  const pluginOptions: PluginOptions = {
    order: defaultOrder,
    sortOrder: defaultSortOrder,
    accessibilityOrder: defaultAccessibilityOrder,
    groupOrder: defaultGroupOrder,
  }

  // throw error if options are invalid
  areOptionsValid(pluginOptions)

  const sectionsToSort: SectionsToSort = {
    constructor: getConstructorMethod(body),
    methods: getMethods(body, { pluginOptions, getStaticMethods: false }),
    staticMethods: getMethods(body, { pluginOptions, getStaticMethods: true }),
    properties: getProperties(body, {
      pluginOptions: pluginOptions,
      getStaticMethods: false,
    }),
    staticProperties: getProperties(body, {
      pluginOptions: pluginOptions,
      getStaticMethods: true,
    }),
  }

  const sorted: (namedTypes.ClassBody["body"] | null)[] = []
  defaultOrder.forEach((item) => {
    if (item === "constructor") {
      sorted.push(sectionsToSort.constructor)
    } else if (item === "methods") {
      sorted.push(sectionsToSort.methods)
    } else if (item === "staticMethods") {
      sorted.push(sectionsToSort.staticMethods)
    } else if (item === "properties") {
      sorted.push(sectionsToSort.properties)
    } else if (item === "staticProperties") {
      sorted.push(sectionsToSort.staticProperties)
    }
  })

  const sortedWithoutNull = sorted.filter(
    (s) => !!s
  ) as namedTypes.ClassBody["body"][]

  body.replaceWith((path) => {
    path.node.body = sortedWithoutNull.flat()
    return path.node
  })

  console.log(root.toSource())

  return code
}
