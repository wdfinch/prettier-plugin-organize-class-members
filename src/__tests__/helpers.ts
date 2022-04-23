import { readdirSync, readFileSync } from 'fs'
import _ from 'lodash'
import { resolve } from 'path'
import { format } from 'prettier'
import { defaultSectionOrder } from '../constants'
import { plugin } from '../plugin'
import { PluginOptions, SectionOrder } from '../types'

export const getFileName = (dirName: string[], ioFileName: string): string =>
  readdirSync(resolve(...dirName)).find((f) => f.includes(ioFileName))!

export const getInput = (dirName: string[]) =>
  readFileSync(resolve(...dirName, getFileName(dirName, 'input')), 'utf8')

export const getOutput = (dirName: string[]) =>
  readFileSync(resolve(...dirName, getFileName(dirName, 'output')), 'utf8')

export const getFormattedOutput = (
  dirName: string[],
  options?: Partial<PluginOptions>
) =>
  format(getInput(dirName), {
    parser: 'typescript',
    plugins: [plugin],
    ...(options ?? {}),
    semi: false,
    singleQuote: true,
  })

export const getSectionOrderOption = (...order: SectionOrder): SectionOrder =>
  _.uniq([...order, ...defaultSectionOrder])
