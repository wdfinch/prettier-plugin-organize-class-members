"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.areOptionsValid = void 0;
const constants_1 = require("./constants");
const lodash_1 = __importDefault(require("lodash"));
const isSectionOrderValid = (order) => {
    const getErrorMessage = (message) => `${message} is required in the sectionOrder option.`;
    if (!order.includes("staticProperties")) {
        throw new Error(getErrorMessage("staticProperties"));
    }
    if (!order.includes("staticMethods")) {
        throw new Error(getErrorMessage("staticMethods"));
    }
    if (!order.includes("constructor")) {
        throw new Error(getErrorMessage("constructor"));
    }
    if (!order.includes("methods")) {
        throw new Error(getErrorMessage("methods"));
    }
    if (!order.includes("properties")) {
        throw new Error(getErrorMessage("properties"));
    }
    if (order.length !== constants_1.defaultSectionOrder.length) {
        throw new Error("The order option cannot contain invalid or duplicate values");
    }
};
const isAccessibilityOrderValid = (accessibilityOrder) => {
    const getErrorMessage = (message) => `${message} is required in the accessibilityOrder option.`;
    if (!accessibilityOrder.includes("public")) {
        throw new Error(getErrorMessage("public"));
    }
    if (!accessibilityOrder.includes("private")) {
        throw new Error(getErrorMessage("private"));
    }
    if (!accessibilityOrder.includes("protected")) {
        throw new Error(getErrorMessage("protected"));
    }
    if (accessibilityOrder.length !== constants_1.defaultAccessibilityOrder.length) {
        throw new Error("The accessibilityOrder option cannot contain invalid or duplicate values");
    }
};
const isGroupOrderValid = (groupOrder) => {
    if (!groupOrder.includes("everythingElse")) {
        throw new Error('everythingElse is required in the groupOrder option');
    }
    groupOrder.forEach((g) => {
        if (g !== 'getterThenSetter' && g !== 'everythingElse') {
            throw new Error('groupOrder cannot contain valid values');
        }
    });
    if (lodash_1.default.uniq(groupOrder).length !== groupOrder.length) {
        throw new Error('groupOrder cannot contain duplicate values');
    }
};
const isGroupSortOrderValid = (groupSortOrder) => {
    if (groupSortOrder !== 'alphabetical' && groupSortOrder !== 'none') {
        throw new Error('Invalid value for groupSortOrder. Supported values are "alphabetical" or "none"');
    }
};
const areOptionsValid = (options) => {
    isSectionOrderValid(options.sectionOrder);
    isAccessibilityOrderValid(options.accessibilityOrder);
    isGroupOrderValid(options.groupOrder);
    isGroupSortOrderValid(options.groupSortOrder);
};
exports.areOptionsValid = areOptionsValid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVPcHRpb25zSGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0ZU9wdGlvbnNIZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJDQUEwRTtBQUUxRSxvREFBc0I7QUFFdEIsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtJQUNsRCxNQUFNLGVBQWUsR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFLENBQzFDLEdBQUcsT0FBTywwQ0FBMEMsQ0FBQTtJQUV0RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQTtLQUNyRDtJQUVELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7S0FDbEQ7SUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO0tBQ2hEO0lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtLQUM1QztJQUVELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7S0FDL0M7SUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssK0JBQW1CLENBQUMsTUFBTSxFQUFFO1FBQy9D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