import { ClassBody, Collection } from "jscodeshift"
import { organizeConstructorMethod } from "./organizeMethods"
import { organizeClassProperties } from "./organizeProperties"

export const organizeTSClasses = (body: Collection<ClassBody>) => {
  organizeConstructorMethod(body)
  organizeClassProperties(body)
}
