import { namedTypes } from "ast-types/gen/namedTypes"
import {
  ASTPath,
  ClassBody,
  ClassMethod,
  ClassPrivateMethod,
  Collection,
} from "jscodeshift"
import _ from "lodash"
import { getName } from "../utils"

interface PropertiesByGroup {
  private: ASTPath<namedTypes.ClassMethod>[]
  protected: ASTPath<namedTypes.ClassMethod>[]
}

export const organizePrivateProtectedClassMethods = (
  body: Collection<ClassBody>
) => {
  let methods = body.find(ClassMethod, {
    static: false,
  })

  const propertiesByGroup: PropertiesByGroup = {
    private: [],
    protected: [],
  }

  const methodsToRemove: number[] = []
  methods.forEach((property, i) => {
    const { accessibility } = property.node
    if (accessibility === "private") {
      methodsToRemove.push(i)
      propertiesByGroup.private.push(_.cloneDeep(property))
    } else if (accessibility === "protected") {
      methodsToRemove.push(i)
      propertiesByGroup.protected.push(_.cloneDeep(property))
    }
  })

  methodsToRemove.forEach((i) => methods.at(i).remove())

  _.forOwn(propertiesByGroup, (value, key) => {
    propertiesByGroup[key as keyof PropertiesByGroup] = _.sortBy(value, (p) =>
      getName(p)
    )
  })

  const sortMethods = [
    ...propertiesByGroup.private,
    ...propertiesByGroup.protected,
  ]

  const privateMethods = body.find(ClassPrivateMethod)

  const methodsToInsert = sortMethods.map((m) => m.node)

  if (privateMethods.length > 0) {
    privateMethods.at(privateMethods.length - 1).insertAfter(methodsToInsert)
    return
  }

  methods = body.find(ClassMethod, {
    static: false,
  })

  if (methods.length > 0) {
    methods.at(methods.length - 1).insertAfter(methodsToInsert)
    return
  }

  const constructorMethod = body.find(ClassMethod, {
    kind: "constructor",
  })

  constructorMethod.insertAfter(methodsToInsert)
}
