import { namedTypes } from "ast-types/gen/namedTypes"
import {
  ASTPath,
  ClassBody,
  ClassProperty,
  Collection,
  MethodDefinition,
} from "jscodeshift"
import _ from "lodash"

const getPropertyName = (method: ASTPath<namedTypes.ClassProperty>) =>
  (method.node.key as namedTypes.Identifier).name

const sortProperties = (methods: Collection<namedTypes.ClassProperty>) => {
  const methodPaths: ASTPath<ClassProperty>[] = []
  methods.forEach((m) => {
    methodPaths.push(_.cloneDeep(m))
  })

  methods.remove()

  return _.sortBy(methodPaths, (m) => getPropertyName(m))
}

export const organizeStaticProperties = (body: Collection<ClassBody>) => {
  const staticProperties = body.find(ClassProperty, {
    static: true,
  })

  const sorted = sortProperties(staticProperties)

  const staticMethods = body.find(MethodDefinition, {
    static: true,
  })

  if (staticMethods.length > 0) {
    staticMethods.at(0).insertBefore(sorted.map((s) => s.node))
    return
  }

  const constructorMethod = body.find(MethodDefinition, {
    kind: "constructor",
  })

  constructorMethod.insertBefore(sorted.map((s) => s.node))
}

interface PropertiesByGroup {
  private: ASTPath<namedTypes.ClassProperty>[]
  protected: ASTPath<namedTypes.ClassProperty>[]
  public: ASTPath<namedTypes.ClassProperty>[]
}

export const organizeTSClassProperties = (body: Collection<ClassBody>) => {
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

  const staticMethods = body.find(MethodDefinition, {
    static: true,
  })

  if (staticMethods.length > 0) {
    staticMethods.at(0).insertAfter(sortedProperties.map((s) => s.node))
    return
  }
}
