import { namedTypes } from "ast-types/gen/namedTypes"
import { ASTPath, ClassBody, Collection, MethodDefinition } from "jscodeshift"
import _ from "lodash"

const getMethodName = (method: ASTPath<namedTypes.MethodDefinition>) =>
  (method.node.key as namedTypes.Identifier).name
const isGetSetMethod = (methodName: string): boolean =>
  !!methodName.match(/^(get|set).*/)

const sortMethods = (methods: Collection<namedTypes.MethodDefinition>) => {
  const methodPaths: ASTPath<MethodDefinition>[] = []
  methods.forEach((m) => {
    methodPaths.push(_.cloneDeep(m))
  })

  methods.remove()

  return _.sortBy(methodPaths, (m) => getMethodName(m))
}

const getMethods = (body: Collection<ClassBody>) =>
  body.find(MethodDefinition, {
    kind: "method",
    key: {
      type: "Identifier",
    },
  })

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

interface GetSetMap {
  get: ASTPath<MethodDefinition> | null
  set: ASTPath<MethodDefinition> | null
}

export const organizeGetAndSetMethods = (body: Collection<ClassBody>) => {
  const methods = body.find(MethodDefinition, {
    kind: "method",
    key: {
      type: "Identifier",
    },
  })

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

  const methodIndexesToReplace: number[] = []

  methods.forEach((method, i) => {
    const name = getMethodName(method)
    if (name.match(/^get.*/)) {
      methodIndexesToReplace.push(i)
      groupedMethods[getGetterSetterName(name)]!.get = _.cloneDeep(method)
    } else if (name.match(/^set.*/)) {
      methodIndexesToReplace.push(i)
      groupedMethods[getGetterSetterName(name)]!.set = _.cloneDeep(method)
    }
  })

  methodIndexesToReplace.forEach((i) => {
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

export const organizeMethods = (body: Collection<ClassBody>) => {
  let methods = getMethods(body)

  const methodIndexesToReplace: number[] = []
  const regularMethods: ASTPath<MethodDefinition>[] = []
  let lastGetSetIndex = 0

  methods.forEach((method, i) => {
    const name = getMethodName(method)
    if (!isGetSetMethod(name)) {
      methodIndexesToReplace.push(i)
      regularMethods.push(_.cloneDeep(method))
    } else {
      lastGetSetIndex = i
    }
  })

  methodIndexesToReplace.forEach((i) => {
    methods.at(i).remove()
  })

  methods = getMethods(body)

  const sortedRegularMethods = _.sortBy(regularMethods, (m) => getMethodName(m))

  methods
    .at(lastGetSetIndex)
    .insertAfter(sortedRegularMethods.map((m) => m.node))
}

export const organizeStaticMethods = (body: Collection<ClassBody>) => {
  const constructorMethod = body.find(MethodDefinition, {
    kind: "constructor",
  })

  const staticMethods = body.find(MethodDefinition, {
    static: true,
  })

  const sorted = sortMethods(staticMethods)
  constructorMethod.insertBefore(sorted.map((m) => m.node))
}

export const organizePrivateMethods = (body: Collection<ClassBody>) => {
  const privateMethods = body.find(MethodDefinition, {
    kind: "method",
    key: {
      type: "PrivateName",
    },
  })
}
