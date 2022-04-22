"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPluginOptions = exports.defaultSortOrderSupportOption = exports.defaultGroupOrderSupportOption = exports.defaultGroupOrder = exports.defaultAccessibilityOrderSupportOption = exports.defaultAccessibilityOrder = exports.defaultSectionOrderSupportOption = exports.defaultSectionOrder = exports.SKIP_ORGANIZE_COMMENTS = void 0;
exports.SKIP_ORGANIZE_COMMENTS = [
    '// organize-classes-ignore',
    '// tslint:disable:organized-classes'
];
const sortAttributesOption = {
    since: '1.0.0',
    category: 'Global',
    type: 'path',
    array: true
};
exports.defaultSectionOrder = [
    'staticProperties',
    'staticMethods',
    'properties',
    'constructor',
    'methods'
];
exports.defaultSectionOrderSupportOption = {
    ...sortAttributesOption,
    default: [{ value: exports.defaultSectionOrder }],
    description: 'List of string values to determine the sort order of the class sections'
};
exports.defaultAccessibilityOrder = [
    'public',
    'protected',
    'private'
];
exports.defaultAccessibilityOrderSupportOption = {
    ...sortAttributesOption,
    default: [{ value: exports.defaultAccessibilityOrder }],
    description: 'List of string values to determine the sort order of the class sections'
};
exports.defaultGroupOrder = ['everythingElse'];
exports.defaultGroupOrderSupportOption = {
    ...sortAttributesOption,
    default: [{ value: exports.defaultGroupOrder }],
    description: 'List of string values to determine the sort order of the class sections'
};
exports.defaultSortOrderSupportOption = {
    category: 'Global',
    choices: [
        { value: 'alphabetical', description: 'Sort each group alphabetically.' },
        { value: 'none', description: 'Perform no group sorting.' }
    ],
    since: '1.0.0',
    type: 'choice',
    default: 'none',
    description: 'List of string values to determine the sort order of the class sections'
};
exports.defaultPluginOptions = {
    sectionOrder: exports.defaultSectionOrderSupportOption,
    accessibilityOrder: exports.defaultAccessibilityOrderSupportOption,
    groupOrder: exports.defaultGroupOrderSupportOption,
    groupSortOrder: exports.defaultSortOrderSupportOption
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFTYSxRQUFBLHNCQUFzQixHQUFHO0lBQ2xDLDRCQUE0QjtJQUM1QixxQ0FBcUM7Q0FDeEMsQ0FBQTtBQUdELE1BQU0sb0JBQW9CLEdBQTJCO0lBQ2pELEtBQUssRUFBRSxPQUFPO0lBQ2QsUUFBUSxFQUFFLFFBQVE7SUFDbEIsSUFBSSxFQUFFLE1BQU07SUFDWixLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUE7QUFFWSxRQUFBLG1CQUFtQixHQUFpQjtJQUM3QyxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLFlBQVk7SUFDWixhQUFhO0lBQ2IsU0FBUztDQUNaLENBQUE7QUFFWSxRQUFBLGdDQUFnQyxHQUEyQjtJQUNwRSxHQUFHLG9CQUFvQjtJQUN2QixPQUFPLEVBQUUsQ0FBQyxFQUFDLEtBQUssRUFBRSwyQkFBbUIsRUFBQyxDQUFDO0lBQ3ZDLFdBQVcsRUFBRSx5RUFBeUU7Q0FDekYsQ0FBQTtBQUVZLFFBQUEseUJBQXlCLEdBQXVCO0lBQ3pELFFBQVE7SUFDUixXQUFXO0lBQ1gsU0FBUztDQUNaLENBQUE7QUFFWSxRQUFBLHNDQUFzQyxHQUEyQjtJQUMxRSxHQUFHLG9CQUFvQjtJQUN2QixPQUFPLEVBQUUsQ0FBQyxFQUFDLEtBQUssRUFBRSxpQ0FBeUIsRUFBQyxDQUFDO0lBQzdDLFdBQVcsRUFBRSx5RUFBeUU7Q0FDekYsQ0FBQTtBQUVZLFFBQUEsaUJBQWlCLEdBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRWxELFFBQUEsOEJBQThCLEdBQTJCO0lBQ2xFLEdBQUcsb0JBQW9CO0lBQ3ZCLE9BQU8sRUFBRSxDQUFDLEVBQUMsS0FBSyxFQUFFLHlCQUFpQixFQUFDLENBQUM7SUFDckMsV0FBVyxFQUFFLHlFQUF5RTtDQUN6RixDQUFBO0FBRVksUUFBQSw2QkFBNkIsR0FBd0M7SUFDOUUsUUFBUSxFQUFFLFFBQVE7SUFDbEIsT0FBTyxFQUFFO1FBQ0wsRUFBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxpQ0FBaUMsRUFBQztRQUN2RSxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLDJCQUEyQixFQUFDO0tBQzVEO0lBQ0QsS0FBSyxFQUFFLE9BQU87SUFDZCxJQUFJLEVBQUUsUUFBUTtJQUNkLE9BQU8sRUFBRSxNQUFNO0lBQ2YsV0FBVyxFQUFFLHlFQUF5RTtDQUN6RixDQUFBO0FBRVksUUFBQSxvQkFBb0IsR0FBK0M7SUFDNUUsWUFBWSxFQUFFLHdDQUFnQztJQUM5QyxrQkFBa0IsRUFBRSw4Q0FBc0M7SUFDMUQsVUFBVSxFQUFFLHNDQUE4QjtJQUMxQyxjQUFjLEVBQUUscUNBQTZCO0NBQ2hELENBQUEifQ==