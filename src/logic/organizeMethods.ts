import { namedTypes } from "ast-types/gen/namedTypes"
import { ASTPath, ClassBody, Collection, MethodDefinition } from "jscodeshift"
import _ from "lodash"

interface GetSetMap {
  get: ASTPath<MethodDefinition> | null
  set: ASTPath<MethodDefinition> | null
}

export const organizeGetAndSetMethods = (body: Collection<ClassBody>) => {
  const methods = body.find(MethodDefinition, {
    kind: "method",
  })

  const groupedMethods: Record<string, GetSetMap> = {}

  const getMethodName = (name: string) => {
    const n = name.substring(3)
    if (!groupedMethods[n]) {
      groupedMethods[n] = {
        get: null,
        set: null,
      }
    }

    return n
  }

  const methodsToReplace: number[] = []

  methods.forEach((method, i) => {
    const name = (method.node.key as namedTypes.Identifier).name
    if (name.match(/^get.*/)) {
      methodsToReplace.push(i)
      groupedMethods[getMethodName(name)]!.get = _.cloneDeep(method)
    } else if (name.match(/^set.*/)) {
      methodsToReplace.push(i)
      groupedMethods[getMethodName(name)]!.set = _.cloneDeep(method)
    }
  })

  methodsToReplace.forEach((i) => {
    methods.at(i).remove()
  })

  const sortedMethods = _(groupedMethods).toPairs().sortBy(0).value()

  const methodsToInsert: ASTPath<MethodDefinition>[] = []
  sortedMethods.forEach((method) => {
    const m = method[1]
    if (m.get) {
      methodsToInsert.push(method[1].get!)
    }
    if (m.set) {
      methodsToInsert.push(method[1].set!)
    }
  })

  const constructorMethod = body.find(MethodDefinition, {
    kind: "constructor",
  })

  constructorMethod.insertAfter(methodsToInsert.map((m) => m.node))

  if (methods.length === 0) {
    return
  }
}

export const organizeNonGetSetMethods = () => {}

export const moveConstructorToTop = (body: Collection<ClassBody>) => {
  const methods = body.find(MethodDefinition)

  if (methods.length === 0) {
    return
  }

  const constructorMethod = body.find(MethodDefinition, {
    kind: "constructor",
  })

  methods.at(0).insertBefore(constructorMethod.nodes()[0])
  constructorMethod.remove()
}
