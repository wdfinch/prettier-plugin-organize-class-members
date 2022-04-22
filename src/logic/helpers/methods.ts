import { namedTypes } from "ast-types/gen/namedTypes"
import { ClassMethod, ClassPrivateMethod, Collection } from "jscodeshift"
import _ from "lodash"
import { Accessibility } from "../types"
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

  methods = methods.filter((method) => {
    const a = method.node.accessibility
    const isConventionalPrivateMethod = getNodeName(method.node)[0] === "_"
    const isPublic = accessibility === "public" || a === undefined

    if (accessibility !== "private" && isConventionalPrivateMethod) {
      return false
    }

    if (accessibility === "private" && isConventionalPrivateMethod) {
      return true
    }

    if (isPublic) {
      return true
    }

    return a === accessibility
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

const getMethodByAccessibility = (
  body: Collection<namedTypes.ClassBody>,
  accessibility: Accessibility,
  options: Options
): namedTypes.ClassBody["body"] | null => {
  let nodes = findMethods(body, accessibility, options)

  if (nodes.length === 0) {
    return null
  }

  if (options.pluginOptions.sortOrder === "alphabetical") {
    nodes = _.sortBy(nodes, (n) => getNodeName(n))
  }

  options.pluginOptions.groupOrder.forEach((o) => {
    if (o === "getterThenSetter") {
      nodes = [...getGetterAndSetters(nodes), ...nodes]
    }
  })

  return _.uniqBy(nodes, (g) => getNodeName(g))
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
