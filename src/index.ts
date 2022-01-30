import { readFileSync } from "fs"
import { resolve } from "path"
import { format } from "prettier"
import { plugin } from "./plugin"

const code: string = readFileSync(
  resolve(__dirname, "../examples/exampleClassJS.js"),
  "utf8"
)

format(code, {
  parser: "babel",
  plugins: [plugin],
})
