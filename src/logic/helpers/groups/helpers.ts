import { namedTypes } from "ast-types/gen/namedTypes"
import _ from "lodash"
import { getNodeName } from "../helpers"
import { ClassBody, Options } from "../types"

interface GetterAndSetter {
  getter: ClassBody | null
  setter: ClassBody | null
}

export const getGetterAndSetters = (
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

export const getNodesNotInGroup = (
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
