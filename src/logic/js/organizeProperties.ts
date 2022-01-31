import { namedTypes } from "ast-types/gen/namedTypes"
import { ASTPath, ClassBody, ClassProperty, Collection } from "jscodeshift"
import _ from "lodash"
import { ParserOptions } from "prettier"
import { getName } from "../utils"
import { getMethodType } from "./utilts"

const sortProperties = (methods: Collection<namedTypes.ClassProperty>) => {
  const methodPaths: ASTPath<ClassProperty>[] = []
  methods.forEach((m) => {
    methodPaths.push(_.cloneDeep(m))
  })

  methods.remove()

  return _.sortBy(methodPaths, (m) => getName(m))
}

export const organizeStaticProperties = (
  body: Collection<ClassBody>,
  options: ParserOptions
) => {
  const staticProperties = body.find(ClassProperty, {
    static: true,
  })

  const sorted = sortProperties(staticProperties)

  const staticMethods = body.find(getMethodType(options), {
    static: true,
  })

  if (staticMethods.length > 0) {
    staticMethods.at(0).insertBefore(sorted.map((s) => s.node))
    return
  }

  const constructorMethod = body.find(getMethodType(options), {
    kind: "constructor",
  })

  constructorMethod.insertBefore(sorted.map((s) => s.node))
}
