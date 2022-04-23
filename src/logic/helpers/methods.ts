import { namedTypes } from "ast-types/gen/namedTypes"
import { ClassMethod, ClassPrivateMethod, Collection } from "jscodeshift"
import _ from "lodash"
import { Accessibility } from "../../types"
import {
  getMembersSortedByAccessibility,
  getNewMemberAccessibilityGroup,
} from "./helpers"
import { ClassBody, Options } from "./types"

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

const getNodeName = (node: namedTypes.ClassBody["body"][number]) =>
  ((node as ClassMethod).key as namedTypes.Identifier).name

const findMethods = (
  body: Collection<namedTypes.ClassBody>,
  accessibility: Accessibility,
  options: Options
): namedTypes.ClassBody["body"] => {
  let methods = body
    .find(ClassMethod, {
      kind: "method",
      static: options.getStaticMethods,
      key: {
        type: "Identifier",
      },
    })
    .paths()

  methods = methods.filter(({ node }) => {
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

interface GetterAndSetter {
  getter: ClassBody | null
  setter: ClassBody | null
}

const getGetterAndSetters = (
  nodes: namedTypes.ClassBody["body"]
): namedTypes.ClassBody["body"] => {
  const getterAndSetters = new Map<string, GetterAndSetter>()

  nodes.forEach((node) => {
    const name = getNodeName(node)

    if (!name) {
      return nodes
    }

    if (name.startsWith("get") || name.startsWith("set")) {
      const nameWithoutGetSet = name.substring(3)

      if (!getterAndSetters.get(nameWithoutGetSet)) {
        getterAndSetters.set(nameWithoutGetSet, {
          setter: null,
          getter: null,
        })
      }

      if (name.startsWith("get")) {
        getterAndSetters.set(nameWithoutGetSet, {
          ...getterAndSetters.get(nameWithoutGetSet)!,
          getter: node,
        })
      }

      if (name.startsWith("set")) {
        getterAndSetters.set(nameWithoutGetSet, {
          ...getterAndSetters.get(nameWithoutGetSet)!,
          setter: node,
        })
      }
    }
  })

  const output: namedTypes.ClassBody["body"] = []
  getterAndSetters.forEach((gs) => {
    if (gs.getter) {
      output.push(gs.getter)
    }
    if (gs.setter) {
      output.push(gs.setter)
    }
  })

  return output
}

const getNodesNotInGroup = (
  nodes: namedTypes.ClassBody["body"],
  options: Options
): namedTypes.ClassBody["body"] => {
  const g = options.pluginOptions.groupOrder
  const newNodes: namedTypes.ClassBody["body"] = _.cloneDeep(nodes)
  if (g.includes("getterThenSetter")) {
    const getterAndSetters = getGetterAndSetters(nodes)
    _.remove(newNodes, (n) => !!getterAndSetters.find((g) => _.isEqual(g, n)))
  }

  return newNodes
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
