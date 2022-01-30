import { namedTypes } from "ast-types/gen/namedTypes"
import { ASTPath, ClassBody, ClassProperty, Collection } from "jscodeshift"
import _ from "lodash"
import { getPropertyName } from "../utils"

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
      propertiesByGroup.private.push(property)
    } else if (accessibility === "protected") {
      propertiesByGroup.protected.push(property)
    } else {
      propertiesByGroup.public.push(property)
    }
  })

  _.forOwn(propertiesByGroup, (value, key) => {
    propertiesByGroup[key as keyof PropertiesByGroup] = _.sortBy(value, (p) =>
      getPropertyName(p)
    )
  })

  const sortedProperties = [
    ...propertiesByGroup.private,
    ...propertiesByGroup.protected,
    ...propertiesByGroup.public,
  ]

  const staticMethods = body.find(ClassProperty, {
    static: true,
  })

  if (staticMethods.length > 0) {
    staticMethods.at(0).insertAfter(sortedProperties.map((s) => s.node))
    return
  }
}
