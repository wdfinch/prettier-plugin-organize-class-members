import { ClassBody, ClassMethod, Collection } from "jscodeshift"

export const organizeConstructorMethod = (body: Collection<ClassBody>) => {
  const methods = body.find(ClassMethod)

  if (methods.length === 0) {
    return
  }

  const constructorMethod = body.find(ClassMethod, {
    kind: "constructor",
  })

  methods.at(0).insertBefore(constructorMethod.nodes()[0])
  constructorMethod.remove()
}
