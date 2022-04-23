"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPluginOptionsSupportOption = exports.defaultPluginOptions = exports.defaultSortOrderSupportOption = exports.defaultGroupSortOrder = exports.defaultGroupOrderSupportOption = exports.defaultGroupOrder = exports.defaultAccessibilityOrderSupportOption = exports.defaultAccessibilityOrder = exports.defaultSectionOrderSupportOption = exports.defaultSectionOrder = exports.SKIP_ORGANIZE_COMMENTS = void 0;
exports.SKIP_ORGANIZE_COMMENTS = [
    "// organize-classes-ignore",
    "// tslint:disable:organized-classes",
];
const sortAttributesOption = {
    since: "1.0.0",
    category: "Global",
    type: "path",
    array: true,
};
exports.defaultSectionOrder = [
    "staticProperties",
    "staticMethods",
    "properties",
    "constructor",
    "methods",
];
exports.defaultSectionOrderSupportOption = {
    ...sortAttributesOption,
    default: [{ value: exports.defaultSectionOrder }],
    description: "List of string values to determine the sort order of the class sections",
};
exports.defaultAccessibilityOrder = [
    "public",
    "protected",
    "private",
];
exports.defaultAccessibilityOrderSupportOption = {
    ...sortAttributesOption,
    default: [{ value: exports.defaultAccessibilityOrder }],
    description: "List of string values to determine the sort order of the class sections",
};
exports.defaultGroupOrder = ["everythingElse"];
exports.defaultGroupOrderSupportOption = {
    ...sortAttributesOption,
    default: [{ value: exports.defaultGroupOrder }],
    description: "List of string values to determine the sort order of the class sections",
};
exports.defaultGroupSortOrder = "none";
exports.defaultSortOrderSupportOption = {
    category: "Global",
    choices: [
        { value: "alphabetical", description: "Sort each group alphabetically." },
        { value: "none", description: "Perform no group sorting." },
    ],
    since: "1.0.0",
    type: "choice",
    default: exports.defaultGroupSortOrder,
    description: "List of string values to determine the sort order of the class sections",
};
exports.defaultPluginOptions = {
    sectionOrder: exports.defaultSectionOrder,
    accessibilityOrder: exports.defaultAccessibilityOrder,
    groupOrder: exports.defaultGroupOrder,
    groupSortOrder: exports.defaultGroupSortOrder,
};
exports.defaultPluginOptionsSupportOption = {
    sectionOrder: exports.defaultSectionOrderSupportOption,
    accessibilityOrder: exports.defaultAccessibilityOrderSupportOption,
    groupOrder: exports.defaultGroupOrderSupportOption,
    groupSortOrder: exports.defaultSortOrderSupportOption,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFhYSxRQUFBLHNCQUFzQixHQUFHO0lBQ3BDLDRCQUE0QjtJQUM1QixxQ0FBcUM7Q0FDdEMsQ0FBQTtBQUVELE1BQU0sb0JBQW9CLEdBQTJCO0lBQ25ELEtBQUssRUFBRSxPQUFPO0lBQ2QsUUFBUSxFQUFFLFFBQVE7SUFDbEIsSUFBSSxFQUFFLE1BQU07SUFDWixLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUE7QUFFWSxRQUFBLG1CQUFtQixHQUFpQjtJQUMvQyxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLFlBQVk7SUFDWixhQUFhO0lBQ2IsU0FBUztDQUNWLENBQUE7QUFFWSxRQUFBLGdDQUFnQyxHQUEyQjtJQUN0RSxHQUFHLG9CQUFvQjtJQUN2QixPQUFPLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSwyQkFBbUIsRUFBRSxDQUFDO0lBQ3pDLFdBQVcsRUFDVCx5RUFBeUU7Q0FDNUUsQ0FBQTtBQUVZLFFBQUEseUJBQXlCLEdBQXVCO0lBQzNELFFBQVE7SUFDUixXQUFXO0lBQ1gsU0FBUztDQUNWLENBQUE7QUFFWSxRQUFBLHNDQUFzQyxHQUEyQjtJQUM1RSxHQUFHLG9CQUFvQjtJQUN2QixPQUFPLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxpQ0FBeUIsRUFBRSxDQUFDO0lBQy9DLFdBQVcsRUFDVCx5RUFBeUU7Q0FDNUUsQ0FBQTtBQUVZLFFBQUEsaUJBQWlCLEdBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRWxELFFBQUEsOEJBQThCLEdBQTJCO0lBQ3BFLEdBQUcsb0JBQW9CO0lBQ3ZCLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLHlCQUFpQixFQUFFLENBQUM7SUFDdkMsV0FBVyxFQUNULHlFQUF5RTtDQUM1RSxDQUFBO0FBRVksUUFBQSxxQkFBcUIsR0FBbUIsTUFBTSxDQUFBO0FBRTlDLFFBQUEsNkJBQTZCLEdBQ3hDO0lBQ0UsUUFBUSxFQUFFLFFBQVE7SUFDbEIsT0FBTyxFQUFFO1FBQ1AsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxpQ0FBaUMsRUFBRTtRQUN6RSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLDJCQUEyQixFQUFFO0tBQzVEO0lBQ0QsS0FBSyxFQUFFLE9BQU87SUFDZCxJQUFJLEVBQUUsUUFBUTtJQUNkLE9BQU8sRUFBRSw2QkFBcUI7SUFDOUIsV0FBVyxFQUNULHlFQUF5RTtDQUM1RSxDQUFBO0FBRVUsUUFBQSxvQkFBb0IsR0FBa0I7SUFDakQsWUFBWSxFQUFFLDJCQUFtQjtJQUNqQyxrQkFBa0IsRUFBRSxpQ0FBeUI7SUFDN0MsVUFBVSxFQUFFLHlCQUFpQjtJQUM3QixjQUFjLEVBQUUsNkJBQXFCO0NBQ3RDLENBQUE7QUFFWSxRQUFBLGlDQUFpQyxHQUcxQztJQUNGLFlBQVksRUFBRSx3Q0FBZ0M7SUFDOUMsa0JBQWtCLEVBQUUsOENBQXNDO0lBQzFELFVBQVUsRUFBRSxzQ0FBOEI7SUFDMUMsY0FBYyxFQUFFLHFDQUE2QjtDQUM5QyxDQUFBIn0=