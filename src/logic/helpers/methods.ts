import { namedTypes } from "ast-types/gen/namedTypes"
import { ClassMethod, ClassPrivateMethod, Collection } from "jscodeshift"
import _ from "lodash"
import { Accessibility } from "../../types"
import { getGetterAndSetters, getNodesNotInGroup } from "./groups"
import {
  getMembersSortedByAccessibility,
  getNewMemberAccessibilityGroup,
  getNodeName,
} from "./helpers"
import { Options } from "./types"

export const getConstructorMethod = (
  body: Collection<namedTypes.ClassBody>
): namedTypes.ClassBody["body"] | null => {
  const constructorMethod = body.find(ClassMethod, {
    kind: "constructor",
  })

  if (constructorMethod.length === 0) {
    return null
  }

  return constructorMethod.paths().map((n) => n.node)
}

const findMethods = (
  body: Collection<namedTypes.ClassBody>,
  accessibility: Accessibility,
  options: Options
): namedTypes.ClassBody["body"] => {
  let methods = body
    .find(ClassMethod, {
      static: options.getStaticMethods,
      key: {
        type: "Identifier",
      },
    })
    .paths()

  methods = methods.filter(({ node }) => {
    if (node.kind === "constructor") {
      return false
    }

    let a = node.accessibility
    const isConventionalPrivateMethod = getNodeName(node)[0] === "_"

    if (isConventionalPrivateMethod) {
      a = "private"
    }

    if (!a) {
      a = "public"
    }

    return accessibility === a
  })

  const methodNodes = methods.map((n) => n.node)

  if (accessibility === "private") {
    const privateMethods = body
      .find(ClassPrivateMethod, { static: options.getStaticMethods })
      .paths()
      .map((n) => n.node)

    return [...methodNodes, ...privateMethods]
  }

  return methodNodes
}

const getMethodByAccessibility = (
  body: Collection<namedTypes.ClassBody>,
  accessibility: Accessibility,
  options: Options
): namedTypes.ClassBody["body"] | null => {
  let nodes = findMethods(body, accessibility, options)

  if (nodes.length === 0) {
    return null
  }

  if (options.pluginOptions.groupSortOrder === "alphabetical") {
    nodes = _.sortBy(nodes, (n) => getNodeName(n))
  }

  const groupedNodes: namedTypes.ClassBody["body"][] = []
  options.pluginOptions.groupOrder.forEach((o) => {
    if (o === "getterThenSetter") {
      groupedNodes.push(getGetterAndSetters(nodes))
    }
    if (o === "everythingElse") {
      groupedNodes.push(getNodesNotInGroup(nodes, options))
    }
  })

  return _.flatten(groupedNodes)
}

export const getMethods = (
  body: Collection<namedTypes.ClassBody>,
  options: Options
): namedTypes.ClassBody["body"] => {
  const group = getNewMemberAccessibilityGroup()

  group.public = getMethodByAccessibility(body, "public", options)
  group.protected = getMethodByAccessibility(body, "protected", options)
  group.private = getMethodByAccessibility(body, "private", options)

  return getMembersSortedByAccessibility(group, options)
}
