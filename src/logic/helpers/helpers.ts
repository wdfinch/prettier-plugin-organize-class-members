import { namedTypes } from "ast-types/gen/namedTypes"
import { MemberAccessibilityGroup, Options } from "./types"

export const getNewMemberAccessibilityGroup = (): MemberAccessibilityGroup => ({
  private: null,
  protected: null,
  public: null,
})

export const getMembersSortedByAccessibility = (
  group: MemberAccessibilityGroup,
  options: Options
) => {
  let sortedByAccessibility: namedTypes.ClassBody["body"] = []
  options.pluginOptions.accessibilityOrder.forEach((a) => {
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
