import { ClassBody, ClassPropertyDefinition, Collection } from "jscodeshift"

export const organizeStaticProperties = (body: Collection<ClassBody>) => {
  const properties = body.find(ClassPropertyDefinition)

  properties.forEach((p) => {
    console.log(p)
  })
}
