"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperties = void 0;
const jscodeshift_1 = require("jscodeshift");
const lodash_1 = __importDefault(require("lodash"));
const helpers_1 = require("./helpers");
const getNodeName = (node) => node.key.name;
const findProperties = (body, accessibility, options) => {
    const field = body
        .find(jscodeshift_1.ClassProperty, {
        static: options.getStaticMethods,
    })
        .paths();
    const methodNodes = field.map((n) => n.node);
    return methodNodes.filter((n) => {
        if (accessibility === "public" && n.accessibility === undefined) {
            return n;
        }
        else {
            return n.accessibility === accessibility;
        }
    });
};
const getPropertiesByAccessibility = (body, accessibility, options) => {
    let nodes = findProperties(body, accessibility, options);
    if (nodes.length === 0) {
        return null;
    }
    if (options.pluginOptions.groupSortOrder === "alphabetical") {
        nodes = lodash_1.default.sortBy(nodes, (n) => getNodeName(n));
    }
    return lodash_1.default.uniqBy(nodes, (g) => getNodeName(g));
};
const getProperties = (body, options) => {
    const group = (0, helpers_1.getNewMemberAccessibilityGroup)();
    group.public = getPropertiesByAccessibility(body, "public", options);
    group.protected = getPropertiesByAccessibility(body, "protected", options);
    group.private = getPropertiesByAccessibility(body, "private", options);
    return (0, helpers_1.getMembersSortedByAccessibility)(group, options);
};
exports.getProperties = getProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dpYy9oZWxwZXJzL3Byb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNkNBQW9FO0FBQ3BFLG9EQUFzQjtBQUN0Qix1Q0FHa0I7QUFJbEIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUEwQyxFQUFFLEVBQUUsQ0FDL0QsSUFBb0IsQ0FBQyxHQUE2QixDQUFDLElBQUksQ0FBQTtBQUUzRCxNQUFNLGNBQWMsR0FBRyxDQUNyQixJQUFzQyxFQUN0QyxhQUE0QixFQUM1QixPQUFnQixFQUNjLEVBQUU7SUFDaEMsTUFBTSxLQUFLLEdBQUcsSUFBSTtTQUNmLElBQUksQ0FBQywyQkFBYSxFQUFFO1FBQ25CLE1BQU0sRUFBRSxPQUFPLENBQUMsZ0JBQWdCO0tBQ2pDLENBQUM7U0FDRCxLQUFLLEVBQUUsQ0FBQTtJQUVWLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM1QyxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUM5QixJQUFJLGFBQWEsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDL0QsT0FBTyxDQUFDLENBQUE7U0FDVDthQUFNO1lBQ0wsT0FBTyxDQUFDLENBQUMsYUFBYSxLQUFLLGFBQWEsQ0FBQTtTQUN6QztJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRUQsTUFBTSw0QkFBNEIsR0FBRyxDQUNuQyxJQUFzQyxFQUN0QyxhQUE0QixFQUM1QixPQUFnQixFQUNxQixFQUFFO0lBQ3ZDLElBQUksS0FBSyxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRXhELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDdEIsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUVELElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxjQUFjLEtBQUssY0FBYyxFQUFFO1FBQzNELEtBQUssR0FBRyxnQkFBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQy9DO0lBRUQsT0FBTyxnQkFBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQy9DLENBQUMsQ0FBQTtBQUVNLE1BQU0sYUFBYSxHQUFHLENBQzNCLElBQXNDLEVBQ3RDLE9BQWdCLEVBQ2MsRUFBRTtJQUNoQyxNQUFNLEtBQUssR0FBRyxJQUFBLHdDQUE4QixHQUFFLENBQUE7SUFFOUMsS0FBSyxDQUFDLE1BQU0sR0FBRyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3BFLEtBQUssQ0FBQyxTQUFTLEdBQUcsNEJBQTRCLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUMxRSxLQUFLLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFdEUsT0FBTyxJQUFBLHlDQUErQixFQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUN4RCxDQUFDLENBQUE7QUFYWSxRQUFBLGFBQWEsaUJBV3pCIn0=