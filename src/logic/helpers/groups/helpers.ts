import { namedTypes } from 'ast-types/gen/namedTypes'
import { ClassMethod } from 'jscodeshift'
import _ from 'lodash'
import { getNodeName } from '../helpers'
import { ClassBody, Options } from '../types'

interface GetterAndSetter {
  getter: ClassBody | null
  setter: ClassBody | null
}

export const getGetterAndSetters = (
  nodes: namedTypes.ClassBody['body']
): namedTypes.ClassBody['body'] => {
  const getterAndSetters = new Map<string, GetterAndSetter>()

  nodes.forEach((node) => {
    if (node.type !== 'ClassMethod') {
      return
    }

    node = node as ClassMethod
    const name = getNodeName(node)

    if (!name) {
      return nodes
    }

    const kind = node.kind
    const isGet = name.startsWith('get') || kind === 'get'
    const isSet = name.startsWith('set') || kind === 'set'

    if (isGet || isSet) {
      const nameWithoutGetSet = name.substring(3)

      if (!getterAndSetters.get(nameWithoutGetSet)) {
        getterAndSetters.set(nameWithoutGetSet, {
          setter: null,
          getter: null,
        })
      }

      if (isGet) {
        getterAndSetters.set(nameWithoutGetSet, {
          ...getterAndSetters.get(nameWithoutGetSet)!,
          getter: node,
        })
      }

      if (isSet) {
        getterAndSetters.set(nameWithoutGetSet, {
          ...getterAndSetters.get(nameWithoutGetSet)!,
          setter: node,
        })
      }
    }
  })

  const output: namedTypes.ClassBody['body'] = []
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
  nodes: namedTypes.ClassBody['body'],
  options: Options
): namedTypes.ClassBody['body'] => {
  const g = options.pluginOptions.classGroupOrder
  const newNodes: namedTypes.ClassBody['body'] = _.cloneDeep(nodes)
  if (g.includes('getterThenSetter')) {
    const getterAndSetters = getGetterAndSetters(nodes)
    _.remove(newNodes, (n) => !!getterAndSetters.find((g) => _.isEqual(g, n)))
  }

  return newNodes
}
