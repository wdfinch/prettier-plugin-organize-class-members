import { namedTypes } from 'ast-types/gen/namedTypes'
import { ClassBody } from 'jscodeshift'
import { PluginOptions } from '../types'
import { getConstructorMethod, getMembers } from './helpers'
import { SectionsToSort } from './types'
import jscodeshift = require('jscodeshift')

export const organize = (code: string, pluginOptions: PluginOptions) => {
  const root = jscodeshift.withParser('tsx')(code)
  const body = root.find(ClassBody)

  if (body.length === 0) {
    return root.toSource()
  }

  const sectionsToSort: SectionsToSort = {
    constructor: getConstructorMethod(body),
    methods: getMembers(body, {
      pluginOptions,
      getStaticMethods: false,
      memberType: 'method',
    }),
    staticMethods: getMembers(body, {
      pluginOptions,
      getStaticMethods: true,
      memberType: 'method',
    }),
    properties: getMembers(body, {
      pluginOptions: pluginOptions,
      getStaticMethods: false,
      memberType: 'property',
    }),
    staticProperties: getMembers(body, {
      pluginOptions: pluginOptions,
      getStaticMethods: true,
      memberType: 'property',
    }),
  }

  const sorted: (namedTypes.ClassBody['body'] | null)[] = []
  pluginOptions.classSectionOrder.forEach((item) => {
    if (item === 'constructor') {
      sorted.push(sectionsToSort.constructor)
    } else if (item === 'methods') {
      sorted.push(sectionsToSort.methods)
    } else if (item === 'staticMethods') {
      sorted.push(sectionsToSort.staticMethods)
    } else if (item === 'properties') {
      sorted.push(sectionsToSort.properties)
    } else if (item === 'staticProperties') {
      sorted.push(sectionsToSort.staticProperties)
    }
  })

  const sortedWithoutNull = sorted.filter(
    (s) => !!s
  ) as namedTypes.ClassBody['body'][]

  body.replaceWith((path) => {
    path.node.body = sortedWithoutNull.flat()
    return path.node
  })

  console.log(root.toSource())

  return root.toSource()
}
