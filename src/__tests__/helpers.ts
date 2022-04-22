import { readFileSync } from "fs"
import { resolve } from "path"
import { format } from "prettier"
import { plugin } from "../plugin"

export const getInput = (...dirName: string[]) =>
  readFileSync(resolve(...dirName, "input.ts"), "utf8")

export const getOutput = (...dirName: string[]) =>
  readFileSync(resolve(...dirName, "output.ts"), "utf8")

export const getFormattedOutput = (...dirName: string[]) =>
  format(getInput(...dirName), {
    parser: "typescript",
    plugins: [plugin],
  })
