import { readFileSync } from "fs"
import _ from "lodash"
import { resolve } from "path"
import { format } from "prettier"
import { defaultSectionOrder } from "../constants"
import { plugin } from "../plugin"
import { PluginOptions, SectionOrder } from "../types"

export const getInput = (dirName: string[]) =>
  readFileSync(resolve(...dirName, "input.ts"), "utf8")

export const getOutput = (dirName: string[]) =>
  readFileSync(resolve(...dirName, "output.ts"), "utf8")

export const getFormattedOutput = (
  dirName: string[],
  options?: Partial<PluginOptions>
) =>
  format(getInput(dirName), {
    parser: "typescript",
    plugins: [plugin],
    ...(options ?? {}),
  })

export const getSectionOrderOption = (...order: SectionOrder): SectionOrder =>
  _.uniq([...order, ...defaultSectionOrder])
