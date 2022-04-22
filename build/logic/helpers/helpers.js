"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMembersSortedByAccessibility = exports.getNewMemberAccessibilityGroup = void 0;
const getNewMemberAccessibilityGroup = () => ({
    private: null,
    protected: null,
    public: null,
});
exports.getNewMemberAccessibilityGroup = getNewMemberAccessibilityGroup;
const getMembersSortedByAccessibility = (group, options) => {
    let sortedByAccessibility = [];
    options.pluginOptions.accessibilityOrder.forEach((a) => {
        if (a === "public" && group.public) {
            sortedByAccessibility = [...sortedByAccessibility, ...group.public];
        }
        else if (a === "protected" && group.protected) {
            sortedByAccessibility = [...sortedByAccessibility, ...group.protected];
        }
        else if (a === "private" && group.private) {
            sortedByAccessibility = [...sortedByAccessibility, ...group.private];
        }
    });
    return sortedByAccessibility;
};
exports.getMembersSortedByAccessibility = getMembersSortedByAccessibility;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dpYy9oZWxwZXJzL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR08sTUFBTSw4QkFBOEIsR0FBRyxHQUE2QixFQUFFLENBQUMsQ0FBQztJQUM3RSxPQUFPLEVBQUUsSUFBSTtJQUNiLFNBQVMsRUFBRSxJQUFJO0lBQ2YsTUFBTSxFQUFFLElBQUk7Q0FDYixDQUFDLENBQUE7QUFKVyxRQUFBLDhCQUE4QixrQ0FJekM7QUFFSyxNQUFNLCtCQUErQixHQUFHLENBQzdDLEtBQStCLEVBQy9CLE9BQWdCLEVBQ2hCLEVBQUU7SUFDRixJQUFJLHFCQUFxQixHQUFpQyxFQUFFLENBQUE7SUFDNUQsT0FBTyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNyRCxJQUFJLENBQUMsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNsQyxxQkFBcUIsR0FBRyxDQUFDLEdBQUcscUJBQXFCLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDcEU7YUFBTSxJQUFJLENBQUMsS0FBSyxXQUFXLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUMvQyxxQkFBcUIsR0FBRyxDQUFDLEdBQUcscUJBQXFCLEVBQUUsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDdkU7YUFBTSxJQUFJLENBQUMsS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUMzQyxxQkFBcUIsR0FBRyxDQUFDLEdBQUcscUJBQXFCLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDckU7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8scUJBQXFCLENBQUE7QUFDOUIsQ0FBQyxDQUFBO0FBaEJZLFFBQUEsK0JBQStCLG1DQWdCM0MifQ==