"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperties = void 0;
const jscodeshift_1 = require("jscodeshift");
const lodash_1 = __importDefault(require("lodash"));
const helpers_1 = require("./helpers");
const findProperties = (body, accessibility, options) => {
    const field = body
        .find(jscodeshift_1.ClassProperty, {
        static: options.getStaticMethods,
    })
        .paths();
    const methodNodes = field.map((n) => n.node);
    return methodNodes.filter((n) => {
        if (accessibility === 'public' && n.accessibility === undefined) {
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
    if (options.pluginOptions.groupSortOrder === 'alphabetical') {
        nodes = lodash_1.default.sortBy(nodes, (n) => (0, helpers_1.getNodeName)(n));
    }
    return lodash_1.default.uniqBy(nodes, (g) => (0, helpers_1.getNodeName)(g));
};
const getProperties = (body, options) => {
    const group = (0, helpers_1.getNewMemberAccessibilityGroup)();
    group.public = getPropertiesByAccessibility(body, 'public', options);
    group.protected = getPropertiesByAccessibility(body, 'protected', options);
    group.private = getPropertiesByAccessibility(body, 'private', options);
    return (0, helpers_1.getMembersSortedByAccessibility)(group, options);
};
exports.getProperties = getProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dpYy9oZWxwZXJzL3Byb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNkNBQXVEO0FBQ3ZELG9EQUFzQjtBQUV0Qix1Q0FJa0I7QUFHbEIsTUFBTSxjQUFjLEdBQUcsQ0FDckIsSUFBc0MsRUFDdEMsYUFBNEIsRUFDNUIsT0FBZ0IsRUFDYyxFQUFFO0lBQ2hDLE1BQU0sS0FBSyxHQUFHLElBQUk7U0FDZixJQUFJLENBQUMsMkJBQWEsRUFBRTtRQUNuQixNQUFNLEVBQUUsT0FBTyxDQUFDLGdCQUFnQjtLQUNqQyxDQUFDO1NBQ0QsS0FBSyxFQUFFLENBQUE7SUFFVixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUMsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDOUIsSUFBSSxhQUFhLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQy9ELE9BQU8sQ0FBQyxDQUFBO1NBQ1Q7YUFBTTtZQUNMLE9BQU8sQ0FBQyxDQUFDLGFBQWEsS0FBSyxhQUFhLENBQUE7U0FDekM7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVELE1BQU0sNEJBQTRCLEdBQUcsQ0FDbkMsSUFBc0MsRUFDdEMsYUFBNEIsRUFDNUIsT0FBZ0IsRUFDcUIsRUFBRTtJQUN2QyxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUV4RCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsY0FBYyxLQUFLLGNBQWMsRUFBRTtRQUMzRCxLQUFLLEdBQUcsZ0JBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFBLHFCQUFXLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUMvQztJQUVELE9BQU8sZ0JBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFBLHFCQUFXLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMvQyxDQUFDLENBQUE7QUFFTSxNQUFNLGFBQWEsR0FBRyxDQUMzQixJQUFzQyxFQUN0QyxPQUFnQixFQUNjLEVBQUU7SUFDaEMsTUFBTSxLQUFLLEdBQUcsSUFBQSx3Q0FBOEIsR0FBRSxDQUFBO0lBRTlDLEtBQUssQ0FBQyxNQUFNLEdBQUcsNEJBQTRCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUNwRSxLQUFLLENBQUMsU0FBUyxHQUFHLDRCQUE0QixDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDMUUsS0FBSyxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRXRFLE9BQU8sSUFBQSx5Q0FBK0IsRUFBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDeEQsQ0FBQyxDQUFBO0FBWFksUUFBQSxhQUFhLGlCQVd6QiJ9