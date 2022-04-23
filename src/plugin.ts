import type { Parser, Plugin } from 'prettier'
import {
  defaultPluginOptionsSupportOption,
  SKIP_ORGANIZE_COMMENTS,
} from './constants'
import { organize } from './logic'
import { ParserOptionsWithCustomOptions, PluginOptions } from './types'
import { areOptionsValid } from './validateOptionsHelpers'
import babelParsers = require('prettier/parser-babel')
import typescriptParsers = require('prettier/parser-typescript')

const organizeClasses = (
  code: string,
  options: ParserOptionsWithCustomOptions
) => {
  for (const skip of SKIP_ORGANIZE_COMMENTS) {
    if (code.includes(skip)) {
      return code
    }
  }

  try {
    const o: PluginOptions = {
      sectionOrder: options.sectionOrder,
      accessibilityOrder: options.accessibilityOrder,
      groupOrder: options.groupOrder,
      groupSortOrder: options.groupSortOrder,
    }
    // console.log(o)
    // throw if options are not valid
    areOptionsValid(o)

    return organize(code, o)
  } catch (e) {
    console.error(e)
    return code
  }
}

const withPreprocess = (parser: Parser): Parser => ({
  ...parser,
  preprocess: (code, options) =>
    organizeClasses(
      parser.preprocess ? parser.preprocess(code, options) : code,
      options as ParserOptionsWithCustomOptions
    ),
})

export const plugin: Plugin = {
  parsers: {
    babel: withPreprocess(babelParsers.parsers.babel),
    typescript: withPreprocess(typescriptParsers.parsers.typescript),
  },
  options: defaultPluginOptionsSupportOption,
}

export const parsers: { [parserName: string]: Parser } | undefined =
  plugin.parsers
