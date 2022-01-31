import { namedTypes } from "ast-types/gen/namedTypes"
import { ASTPath, ClassBody, ClassMethod, Collection } from "jscodeshift"
import _ from "lodash"
import {
  Filter,
  MemberAccessibilityGroup,
  PluginOptions,
  SupportedParsers,
} from "../types"
import { getName } from "../utils"
import { getMethodType } from "./utilts"

const getPrivateMethodName = (method: ASTPath<namedTypes.MethodDefinition>) =>
  (method.node.key as namedTypes.PrivateName).id.name

const isGetSetMethod = (methodName: string): boolean =>
  !!methodName.match(/^(get|set).*/)

const findMethods = (
  body: Collection<ClassBody>,
  options: SupportedParsers,
  filter: Filter
): ASTPath<namedTypes.ClassMethod>[] => {
  let methods = body
    .find(getMethodType(options), {
      kind: "method",
      key: {
        type: "Identifier",
      },
    })
    .paths()

  methods = methods.filter((method) => {
    const a = method.node.accessibility
    const isConventionalPrivateMethod = getName(method)[0] === "_"
    const isPublic = filter === "public" && a === undefined

    if (filter !== "private" && isConventionalPrivateMethod) {
      return false
    }

    if (filter === "private" && isConventionalPrivateMethod) {
      return true
    }

    if (isPublic) {
      return true
    }

    return a === filter
  })

  if (filter === "private") {
    const privateMethods = body
      .find(getMethodType(options), {
        kind: "method",
        key: {
          type: "PrivateName",
        },
      })
      .paths()

    return [...methods, ...privateMethods]
  }

  return methods
}

export const getConstructorMethod = (
  body: Collection<ClassBody>,
  parser: SupportedParsers
): namedTypes.ClassBody["body"] | null => {
  const constructorMethod = body.find(getMethodType(parser), {
    kind: "constructor",
  })

  if (constructorMethod.length === 0) {
    return null
  }

  return constructorMethod.paths().map((n) => n.node)
}

const getMethodByAccessibility = (
  body: Collection<ClassBody>,
  parser: SupportedParsers,
  filter: Filter,
  options: PluginOptions
): namedTypes.ClassBody["body"] | null => {
  let paths = findMethods(body, parser, filter)

  if (paths.length === 0) {
    return null
  }

  if (options.groupOrder.includes("getterThenSetter")) {
    paths = paths.filter((method) => {
      const name = getName(method)
      return !isGetSetMethod(name)
    })
  }

  if (options.sortOrder === "alphabetical") {
    paths = _.sortBy(paths, (m) => getName(m))
  }

  return paths.map((m) => m.node)
}

export const getMethods = (
  body: Collection<ClassBody>,
  parser: SupportedParsers,
  options: PluginOptions
): namedTypes.ClassBody["body"] => {
  const group: MemberAccessibilityGroup = {
    private: null,
    protected: null,
    public: null,
  }

  group.public = getMethodByAccessibility(body, parser, "public", options)
  group.protected = getMethodByAccessibility(body, parser, "protected", options)
  group.private = getMethodByAccessibility(body, parser, "private", options)

  let sortedByAccessibility: namedTypes.ClassBody["body"] = []
  options.accessibilityOrder.forEach((a) => {
    if (a === "public" && group.public) {
      sortedByAccessibility = [...sortedByAccessibility, ...group.public]
    } else if (a === "protected" && group.protected) {
      sortedByAccessibility = [...sortedByAccessibility, ...group.protected]
    } else if (a === "private" && group.private) {
      sortedByAccessibility = [...sortedByAccessibility, ...group.private]
    }
  })

  return sortedByAccessibility
}

interface GetSetMap {
  get: ASTPath<ClassMethod> | null
  set: ASTPath<ClassMethod> | null
}

// const getGetSetMethods = (
//   body: Collection<ClassBody>,
//   parser: SupportedParsers,
//   options: ParserOptions
// ): namedTypes.ClassBody["body"] | null => {
//   let methods = findMethods(body, parser, "public")
//   const groupedMethods: Record<string, GetSetMap> = {}
//
//   const getGetterSetterName = (name: string) => {
//     const n = name.substring(3)
//     if (!groupedMethods[n]) {
//       groupedMethods[n] = {
//         get: null,
//         set: null,
//       }
//     }
//
//     return n
//   }
//
//   methods.forEach((method) => {
//     const name = getName(method)
//     if (name.match(/^get.*/)) {
//       groupedMethods[getGetterSetterName(name)]!.get = _.cloneDeep(method)
//     } else if (name.match(/^set.*/)) {
//       groupedMethods[getGetterSetterName(name)]!.set = _.cloneDeep(method)
//     }
//   })
//
//   const sortedMethods = _(groupedMethods).toPairs().sortBy(0).value()
//
//   const methodsToInsert: ASTPath<ClassMethod>[] = []
//   sortedMethods.forEach((method) => {
//     const m = method[1]
//     if (m.get) {
//       methodsToInsert.push(method[1].get!)
//     }
//     if (m.set) {
//       methodsToInsert.push(method[1].set!)
//     }
//   })
//
//   if (methods.length === 0) {
//     return null
//   }
//
//   return methodsToInsert.map((m) => m.node)
// }

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
