import type { Parser, ParserOptions, Plugin } from "prettier"
import { SKIP_ORGANIZE_COMMENTS } from "./constants"
import { organize } from "./logic"
const { parsers: babelParsers } = require("prettier/parser-babel")

const organizeClasses = (code: string, options: ParserOptions) => {
  for (const skip of SKIP_ORGANIZE_COMMENTS) {
    if (code.includes(skip)) {
      return code
    }
  }
  try {
    return organize(code, options)
  } catch (e) {
    if (!!process.env.DEBUG) {
      console.error(e)
    }

    return code
  }

  return code
}

const withPreprocess = (parser: Parser): Parser => ({
  ...babelParsers.babel,
  preprocess: (code, options) =>
    organizeClasses(
      parser.preprocess ? parser.preprocess(code, options) : code,
      options
    ),
})

export const plugin: Plugin = {
  parsers: {
    babel: withPreprocess(babelParsers.babel),
  },
}

export const parsers: { [parserName: string]: Parser } | undefined =
  plugin.parsers
