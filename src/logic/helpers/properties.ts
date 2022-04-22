import { namedTypes } from "ast-types/gen/namedTypes"
import { ClassMethod, ClassProperty, Collection } from "jscodeshift"
import _ from "lodash"
import { Accessibility } from "../types"
import {
  getMembersSortedByAccessibility,
  getNewMemberAccessibilityGroup,
} from "./helpers"
import { Options } from "./types"

const getNodeName = (node: namedTypes.ClassBody["body"][number]) =>
  ((node as ClassMethod).key as namedTypes.Identifier).name

const findProperties = (
  body: Collection<namedTypes.ClassBody>,
  accessibility: Accessibility,
  options: Options
): namedTypes.ClassBody["body"] => {
  const field = body
    .find(ClassProperty, {
      static: options.getStaticMethods,
    })
    .paths()

  const methodNodes = field.map((n) => n.node)
  return methodNodes.filter((n) => {
    if (accessibility === "public" && n.accessibility === undefined) {
      return n
    } else {
      return n.accessibility === accessibility
    }
  })
}

const getPropertiesByAccessibility = (
  body: Collection<namedTypes.ClassBody>,
  accessibility: Accessibility,
  options: Options
): namedTypes.ClassBody["body"] | null => {
  let nodes = findProperties(body, accessibility, options)

  if (nodes.length === 0) {
    return null
  }

  if (options.pluginOptions.sortOrder === "alphabetical") {
    nodes = _.sortBy(nodes, (n) => getNodeName(n))
  }

  return _.uniqBy(nodes, (g) => getNodeName(g))
}

export const getProperties = (
  body: Collection<namedTypes.ClassBody>,
  options: Options
): namedTypes.ClassBody["body"] => {
  const group = getNewMemberAccessibilityGroup()

  group.public = getPropertiesByAccessibility(body, "public", options)
  group.protected = getPropertiesByAccessibility(body, "protected", options)
  group.private = getPropertiesByAccessibility(body, "private", options)

  return getMembersSortedByAccessibility(group, options)
}
