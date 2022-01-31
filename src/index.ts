import { readFileSync } from "fs"
import { resolve } from "path"
import { format } from "prettier"
import { plugin } from "./plugin"

const jsClass: string = readFileSync(
  resolve(__dirname, "../examples/exampleClass.js"),
  "utf8"
)

const tsClass: string = readFileSync(
  resolve(__dirname, "../examples/exampleClass.ts"),
  "utf8"
)

// format(jsClass, {
//   parser: "babel",
//   plugins: [plugin],
// })

format(tsClass, {
  parser: "typescript",
  plugins: [plugin],
})
