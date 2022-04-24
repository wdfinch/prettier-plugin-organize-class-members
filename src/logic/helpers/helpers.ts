import { namedTypes } from 'ast-types/gen/namedTypes'
import { ClassMethod, ClassPrivateProperty, ClassProperty } from 'jscodeshift'
import _ from 'lodash'

export const getNodeName = (node: namedTypes.ClassBody['body'][number]) => {
  if (node.type === 'ClassPrivateProperty') {
    return (node as ClassPrivateProperty).key.id.name
  }

  return ((node as ClassMethod | ClassProperty).key as namedTypes.Identifier)
    .name
}

export const sortNodesByName = (nodes: namedTypes.ClassBody['body']) => {
  return _.sortBy(nodes, (n) => {
    return getNodeName(n).toLowerCase()
  })
}
