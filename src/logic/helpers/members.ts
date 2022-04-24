import { namedTypes } from 'ast-types/gen/namedTypes'
import {
  ClassMethod,
  ClassPrivateMethod,
  ClassProperty,
  Collection,
} from 'jscodeshift'
import _ from 'lodash'
import { Accessibility } from '../../types'
import { getGetterAndSetters, getNodesNotInGroup } from './groups'
import { getNodeName } from './helpers'
import { MemberAccessibilityGroup, Options } from './types'

const doesNodeMatchAccessibility = (
  node:
    | namedTypes.ClassMethod
    | namedTypes.ClassProperty
    | namedTypes.ClassPrivateProperty,
  accessibility: Accessibility
) => {
  if (node.type === 'ClassPrivateProperty') {
    return accessibility === 'private'
  }

  let a = node.accessibility
  const isConventionalPrivateMethod = getNodeName(node)[0] === '_'

  if (isConventionalPrivateMethod) {
    a = 'private'
  }

  if (!a) {
    a = 'public'
  }

  return accessibility === a
}

export const getConstructorMethod = (
  body: Collection<namedTypes.ClassBody>
): namedTypes.ClassBody['body'] | null => {
  const methods = body
    .find(ClassMethod, {
      key: {
        type: 'Identifier',
      },
    })
    .paths()

  const methodNodes = methods.map((n) => n.node)

  if (methodNodes.length === 0) {
    return null
  }

  return methodNodes.filter((m) => m.kind === 'constructor')
}

const findMethods = (
  body: Collection<namedTypes.ClassBody>,
  accessibility: Accessibility,
  options: Options
): namedTypes.ClassBody['body'] => {
  let methods = body
    .find(ClassMethod, {
      static: options.getStaticMethods,
      key: {
        type: 'Identifier',
      },
    })
    .paths()

  methods = methods.filter(({ node }) => {
    if (node.kind === 'constructor') {
      return false
    }

    return doesNodeMatchAccessibility(node, accessibility)
  })

  const methodNodes = methods.map((n) => n.node)

  if (accessibility === 'private') {
    const privateMethods = body
      .find(ClassPrivateMethod, { static: options.getStaticMethods })
      .paths()
      .map((n) => n.node)

    return [...methodNodes, ...privateMethods]
  }

  return methodNodes
}

const findProperties = (
  body: Collection<namedTypes.ClassBody>,
  accessibility: Accessibility,
  options: Options
): namedTypes.ClassBody['body'] => {
  let properties = body
    .find(ClassProperty, {
      static: options.getStaticMethods,
    })
    .paths()

  properties = properties.filter(({ node }) => {
    return doesNodeMatchAccessibility(node, accessibility)
  })

  return properties.map((n) => n.node)
}

const getMembersByAccessibility = (
  body: Collection<namedTypes.ClassBody>,
  accessibility: Accessibility,
  options: Options
): namedTypes.ClassBody['body'] | null => {
  let nodes: namedTypes.ClassBody['body']
  if (options.memberType === 'method') {
    nodes = findMethods(body, accessibility, options)
  } else {
    nodes = findProperties(body, accessibility, options)
  }

  if (nodes.length === 0) {
    return null
  }

  const groupedNodes: namedTypes.ClassBody['body'][] = []
  options.pluginOptions.classGroupOrder.forEach((o) => {
    if (o === 'gettersAndSetters') {
      groupedNodes.push(getGetterAndSetters(nodes, options))
    }
    if (o === 'everythingElse') {
      groupedNodes.push(getNodesNotInGroup(nodes, options))
    }
  })

  return _.flatten(groupedNodes)
}

export const getMembers = (
  body: Collection<namedTypes.ClassBody>,
  options: Options
): namedTypes.ClassBody['body'] => {
  const group: MemberAccessibilityGroup = {
    private: null,
    protected: null,
    public: null,
  }

  group.public = getMembersByAccessibility(body, 'public', options)
  group.protected = getMembersByAccessibility(body, 'protected', options)
  group.private = getMembersByAccessibility(body, 'private', options)

  let sortedByAccessibility: namedTypes.ClassBody['body'] = []
  options.pluginOptions.classAccessibilityOrder.forEach((a) => {
    if (a === 'public' && group.public) {
      sortedByAccessibility = [...sortedByAccessibility, ...group.public]
    } else if (a === 'protected' && group.protected) {
      sortedByAccessibility = [...sortedByAccessibility, ...group.protected]
    } else if (a === 'private' && group.private) {
      sortedByAccessibility = [...sortedByAccessibility, ...group.private]
    }
  })

  return sortedByAccessibility
}
