import { namedTypes } from "ast-types/gen/namedTypes"
import {
  ASTPath,
  ClassBody,
  ClassMethod,
  Collection,
  MethodDefinition,
} from "jscodeshift"
import _ from "lodash"
import { ParserOptions } from "prettier"
import { getName } from "../utils"
import { getMethodType } from "./utilts"

const getPrivateMethodName = (method: ASTPath<namedTypes.MethodDefinition>) =>
  (method.node.key as namedTypes.PrivateName).id.name

const isGetSetMethod = (methodName: string): boolean =>
  !!methodName.match(/^(get|set).*/)

interface SortMethodsOptions {
  isPrivate: boolean
}

const sortMethods = (
  methods: Collection<namedTypes.MethodDefinition>,
  options?: Partial<SortMethodsOptions>
) => {
  const methodPaths: ASTPath<MethodDefinition>[] = []
  methods.forEach((m) => {
    methodPaths.push(_.cloneDeep(m))
  })

  methods.remove()

  return _.sortBy(methodPaths, (m) => {
    if (options?.isPrivate) {
      return getPrivateMethodName(m)
    } else {
      getName<MethodDefinition>(m)
    }
  })
}

const getMethods = (
  body: Collection<ClassBody>,
  options: ParserOptions,
  filter: "public" | "private" | "protected"
) => {
  const methods = body.find(getMethodType(options), {
    kind: "method",
    key: {
      type: "Identifier",
    },
  })

  return methods.filter((method) => {
    const a = method.node.accessibility

    if (filter === "public" && a === undefined) {
      return true
    }

    return a === filter
  })
}

export const getConstructorMethod = (
  body: Collection<ClassBody>,
  options: ParserOptions
): namedTypes.ClassBody["body"] | null => {
  const constructorMethod = body.find(getMethodType(options), {
    kind: "constructor",
  })

  if (constructorMethod.length === 0) {
    return null
  }

  return constructorMethod.paths().map((n) => n.node)
}

interface GetSetMap {
  get: ASTPath<ClassMethod> | null
  set: ASTPath<ClassMethod> | null
}

export const getSortedGetAndSetPublicMethods = (
  body: Collection<ClassBody>,
  options: ParserOptions
): namedTypes.ClassBody["body"] | null => {
  let methods = getMethods(body, options, "public")
  const groupedMethods: Record<string, GetSetMap> = {}

  const getGetterSetterName = (name: string) => {
    const n = name.substring(3)
    if (!groupedMethods[n]) {
      groupedMethods[n] = {
        get: null,
        set: null,
      }
    }

    return n
  }

  methods.forEach((method) => {
    const name = getName(method)
    if (name.match(/^get.*/)) {
      groupedMethods[getGetterSetterName(name)]!.get = _.cloneDeep(method)
    } else if (name.match(/^set.*/)) {
      groupedMethods[getGetterSetterName(name)]!.set = _.cloneDeep(method)
    }
  })

  const sortedMethods = _(groupedMethods).toPairs().sortBy(0).value()

  const methodsToInsert: ASTPath<ClassMethod>[] = []
  sortedMethods.forEach((method) => {
    const m = method[1]
    if (m.get) {
      methodsToInsert.push(method[1].get!)
    }
    if (m.set) {
      methodsToInsert.push(method[1].set!)
    }
  })

  if (methods.length === 0) {
    return null
  }

  return methodsToInsert.map((m) => m.node)
}

export const getPublicMethods = (
  body: Collection<ClassBody>,
  options: ParserOptions
): namedTypes.ClassBody["body"] | null => {
  let methods = getMethods(body, options, "public")

  methods = methods.filter((method) => {
    const name = getName(method)
    return !isGetSetMethod(name)
  })

  const sorted = _.sortBy(methods.paths(), (m) => getName(m))
  return sorted.map((m) => m.node)
}
//
// export const organizeStaticMethods = (
//   body: Collection<ClassBody>,
//   options: ParserOptions
// ) => {
//   const constructorMethod = body.find(getMethodType(options), {
//     kind: "constructor",
//   })
//
//   const staticMethods = body.find(getMethodType(options), {
//     static: true,
//   })
//
//   const sorted = sortMethods(staticMethods)
//   constructorMethod.insertBefore(sorted.map((m) => m.node))
// }
//
// export const organizePrivateMethods = (
//   body: Collection<ClassBody>,
//   options: ParserOptions
// ) => {
//   const privateMethods = body.find(getMethodType(options), {
//     kind: "method",
//     key: {
//       type: "PrivateName",
//     },
//   })
//
//   const sorted = sortMethods(privateMethods, { isPrivate: true })
//   const methods = getMethods(body, options)
//   methods.at(methods.length - 1).insertAfter(sorted.map((m) => m.node))
// }
