import _ from 'lodash'
import { defaultAccessibilityOrder, defaultSectionOrder } from './constants'
import {
  AccessibilityOrder,
  GroupOrder,
  GroupSortOrder,
  PluginOptions,
  SectionOrder,
} from './types'

const isSectionOrderValid = (order: SectionOrder) => {
  const getErrorMessage = (message: string) =>
    `${message} is required in the sectionOrder option.`

  if (!order.includes('staticProperties')) {
    throw new Error(getErrorMessage('staticProperties'))
  }

  if (!order.includes('staticMethods')) {
    throw new Error(getErrorMessage('staticMethods'))
  }

  if (!order.includes('constructor')) {
    throw new Error(getErrorMessage('constructor'))
  }

  if (!order.includes('methods')) {
    throw new Error(getErrorMessage('methods'))
  }

  if (!order.includes('properties')) {
    throw new Error(getErrorMessage('properties'))
  }

  if (order.length !== defaultSectionOrder.length) {
    throw new Error(
      'The order option cannot contain invalid or duplicate values'
    )
  }
}

const isAccessibilityOrderValid = (accessibilityOrder: AccessibilityOrder) => {
  const getErrorMessage = (message: string) =>
    `${message} is required in the accessibilityOrder option.`

  if (!accessibilityOrder.includes('public')) {
    throw new Error(getErrorMessage('public'))
  }

  if (!accessibilityOrder.includes('private')) {
    throw new Error(getErrorMessage('private'))
  }

  if (!accessibilityOrder.includes('protected')) {
    throw new Error(getErrorMessage('protected'))
  }

  if (accessibilityOrder.length !== defaultAccessibilityOrder.length) {
    throw new Error(
      'The accessibilityOrder option cannot contain invalid or duplicate values'
    )
  }
}

const isGroupOrderValid = (groupOrder: GroupOrder) => {
  if (!groupOrder.includes('everythingElse')) {
    throw new Error('everythingElse is required in the groupOrder option')
  }

  groupOrder.forEach((g) => {
    if (g !== 'getterThenSetter' && g !== 'everythingElse') {
      throw new Error('groupOrder cannot contain valid values')
    }
  })

  if (_.uniq(groupOrder).length !== groupOrder.length) {
    throw new Error('groupOrder cannot contain duplicate values')
  }
}

const isGroupSortOrderValid = (groupSortOrder: GroupSortOrder) => {
  if (groupSortOrder !== 'alphabetical' && groupSortOrder !== 'none') {
    throw new Error(
      'Invalid value for groupSortOrder. Supported values are "alphabetical" or "none"'
    )
  }
}

export const areOptionsValid = (options: PluginOptions) => {
  isSectionOrderValid(options.classSectionOrder)
  isAccessibilityOrderValid(options.classAccessibilityOrder)
  isGroupOrderValid(options.classGroupOrder)
  isGroupSortOrderValid(options.classGroupSortOrder)
}
