import { namedTypes } from 'ast-types/gen/namedTypes'
import { ClassMethod } from 'jscodeshift'
import _ from 'lodash'
import { getNodeName, sortNodesByName } from '../helpers'
import { ClassBody, Options } from '../types'

interface GetterAndSetter {
  getter: ClassBody | null
  setter: ClassBody | null
}

export const getGetterAndSetters = (
  nodes: namedTypes.ClassBody['body'],
  options: Options
): namedTypes.ClassBody['body'] => {
  let getterAndSetters = new Map<string, GetterAndSetter>()

  nodes.forEach((node) => {
    if (node.type !== 'ClassMethod') {
      return
    }

    node = node as ClassMethod
    let name = getNodeName(node)

    if (!name) {
      return nodes
    }

    const kind = node.kind
    const isGet = name.startsWith('get') || kind === 'get'
    const isSet = name.startsWith('set') || kind === 'set'

    if (isGet || isSet) {
      if (kind !== 'get' && kind !== 'set') {
        name = name.substring(3)
      }

      if (!getterAndSetters.get(name)) {
        getterAndSetters.set(name, {
          setter: null,
          getter: null,
        })
      }

      if (isGet) {
        getterAndSetters.set(name, {
          ...getterAndSetters.get(name)!,
          getter: node,
        })
      }

      if (isSet) {
        getterAndSetters.set(name, {
          ...getterAndSetters.get(name)!,
          setter: node,
        })
      }
    }
  })

  if (options.pluginOptions.classGroupSortOrder === 'alphabetical') {
    getterAndSetters = new Map(
      _.sortBy([...getterAndSetters], (s) => s[0].toUpperCase())
    )
  }

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
  if (g.includes('gettersAndSetters')) {
    const getterAndSetters = getGetterAndSetters(nodes, options)
    nodes = nodes.filter((n) => !getterAndSetters.find((g) => _.isEqual(g, n)))
  }

  if (options.pluginOptions.classGroupSortOrder === 'alphabetical') {
    nodes = sortNodesByName(nodes)
  }

  return nodes
}
