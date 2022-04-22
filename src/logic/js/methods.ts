import { namedTypes } from "ast-types/gen/namedTypes"
import { ClassMethod, ClassPrivateMethod, Collection } from "jscodeshift"
import _ from "lodash"
import { Filter, MemberAccessibilityGroup, PluginOptions } from "../types"

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
  filter: Filter
): namedTypes.ClassBody["body"] => {
  let methods = body
    .find(ClassMethod, {
      kind: "method",
      key: {
        type: "Identifier",
      },
    })
    .paths()

  methods = methods.filter((method) => {
    const a = method.node.accessibility
    const isConventionalPrivateMethod = getNodeName(method.node)[0] === "_"
    const isPublic = filter === "public" || a === undefined

    if (filter !== "private" && isConventionalPrivateMethod) {
      return false
    }

    if (filter === "private" && isConventionalPrivateMethod) {
      return true
    }

    if (isPublic) {
      return true
    }

    return a === filter
  })

  const methodNodes = methods.map((n) => n.node)

  if (filter === "private") {
    const privateMethods = body
      .find(ClassPrivateMethod)
      .paths()
      .map((n) => n.node)

    return [...methodNodes, ...privateMethods]
  }

  return methodNodes
}

type ClassBody = namedTypes.ClassBody["body"] extends (infer U)[] ? U : never

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

  let output: namedTypes.ClassBody["body"] = []
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
  filter: Filter,
  options: PluginOptions
): namedTypes.ClassBody["body"] | null => {
  let nodes = findMethods(body, filter)

  if (nodes.length === 0) {
    return null
  }

  if (options.sortOrder === "alphabetical") {
    nodes = _.sortBy(nodes, (n) => getNodeName(n))
  }

  options.groupOrder.forEach((o) => {
    if (o === "getterThenSetter") {
      nodes = [...getGetterAndSetters(nodes), ...nodes]
    }
  })

  return _.uniqBy(nodes, (g) => getNodeName(g))
}

export const getMethods = (
  body: Collection<namedTypes.ClassBody>,
  options: PluginOptions
): namedTypes.ClassBody["body"] => {
  const group: MemberAccessibilityGroup = {
    private: null,
    protected: null,
    public: null,
  }

  group.public = getMethodByAccessibility(body, "public", options)
  group.protected = getMethodByAccessibility(body, "protected", options)
  group.private = getMethodByAccessibility(body, "private", options)

  let sortedByAccessibility: namedTypes.ClassBody["body"] = []
  options.accessibilityOrder.forEach((a) => {
    if (a === "public" && group.public) {
      sortedByAccessibility = [...sortedByAccessibility, ...group.public]
    } else if (a === "protected" && group.protected) {
      sortedByAccessibility = [...sortedByAccessibility, ...group.protected]
    } else if (a === "private" && group.private) {
      sortedByAccessibility = [...sortedByAccessibility, ...group.private]
    }
  })

  return sortedByAccessibility
}
