import { namedTypes } from "ast-types/gen/namedTypes"
import {
  ASTPath,
  ClassBody,
  ClassMethod,
  ClassProperty,
  Collection,
} from "jscodeshift"
import _ from "lodash"
import { getName } from "../utils"

interface PropertiesByGroup {
  private: ASTPath<namedTypes.ClassProperty>[]
  protected: ASTPath<namedTypes.ClassProperty>[]
  public: ASTPath<namedTypes.ClassProperty>[]
}

export const organizeClassProperties = (body: Collection<ClassBody>) => {
  const properties = body.find(ClassProperty, {
    static: false,
  })

  const propertiesByGroup: PropertiesByGroup = {
    private: [],
    protected: [],
    public: [],
  }

  properties.forEach((property) => {
    const { accessibility } = property.node
    if (accessibility === "private") {
      propertiesByGroup.private.push(_.cloneDeep(property))
    } else if (accessibility === "protected") {
      propertiesByGroup.protected.push(_.cloneDeep(property))
    } else {
      propertiesByGroup.public.push(_.cloneDeep(property))
    }
  })

  properties.remove()

  _.forOwn(propertiesByGroup, (value, key) => {
    propertiesByGroup[key as keyof PropertiesByGroup] = _.sortBy(value, (p) =>
      getName(p)
    )
  })

  const sortedProperties = [
    ...propertiesByGroup.private,
    ...propertiesByGroup.protected,
    ...propertiesByGroup.public,
  ]

  const constructorMethod = body.find(ClassMethod, {
    kind: "constructor",
  })

  constructorMethod.at(0).insertBefore(sortedProperties.map((s) => s.node))
}
