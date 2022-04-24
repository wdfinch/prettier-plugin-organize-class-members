import { namedTypes } from 'ast-types/gen/namedTypes'
import { ClassBody } from 'jscodeshift'
import _ from 'lodash'
import { PluginOptions } from '../types'
import { getConstructorMethod, getMembers } from './helpers'
import { SectionsToSort } from './types'
import jscodeshift = require('jscodeshift')

export const organize = (code: string, pluginOptions: PluginOptions) => {
  const root = jscodeshift.withParser('tsx')(code)
  const classBodies = root.find(ClassBody)

  if (classBodies.length === 0) {
    return root.toSource()
  }

  _.times(classBodies.length, (i) => {
    const body = classBodies.at(i)
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

    const sorted: namedTypes.ClassBody['body'][] = []
    pluginOptions.classSectionOrder.forEach((item) => {
      if (item === 'constructor') {
        sorted.push(sectionsToSort.constructor!)
      } else if (item === 'methods') {
        sorted.push(sectionsToSort.methods!)
      } else if (item === 'staticMethods') {
        sorted.push(sectionsToSort.staticMethods!)
      } else if (item === 'properties') {
        sorted.push(sectionsToSort.properties!)
      } else if (item === 'staticProperties') {
        sorted.push(sectionsToSort.staticProperties!)
      }
    })

    body.replaceWith((path) => {
      path.node.body = sorted.flat()
      return path.node
    })
  })

  return root.toSource()
}
