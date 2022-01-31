import { namedTypes } from "ast-types/gen/namedTypes"
import { ClassBody } from "jscodeshift"
import { ParserOptions } from "prettier"
import { defaultSortOrder } from "./constants"
import {
  getConstructorMethod,
  getPublicMethods,
  getSortedGetAndSetPublicMethods,
} from "./js"
import { SectionsToSort } from "./types"
import { hasDuplicates } from "./utils"
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

  const sectionsToSort: SectionsToSort = {
    constructor: getConstructorMethod(body, options),
    getSetMethods: getSortedGetAndSetPublicMethods(body, options),
    publicMethods: getPublicMethods(body, options),
  }

  if (hasDuplicates(defaultSortOrder)) {
    throw new Error("Duplicate sort order options is not permitted")
  }

  let sorted: (namedTypes.ClassBody["body"] | null)[] = []
  defaultSortOrder.forEach((item) => {
    if (item === "constructor") {
      sorted.push(sectionsToSort.constructor)
    } else if (item === "methods") {
      sorted.push(sectionsToSort.getSetMethods)
      sorted.push(sectionsToSort.publicMethods)
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
