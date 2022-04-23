"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMethods = exports.getConstructorMethod = void 0;
const jscodeshift_1 = require("jscodeshift");
const lodash_1 = __importDefault(require("lodash"));
const helpers_1 = require("./helpers");
const getConstructorMethod = (body) => {
    const constructorMethod = body.find(jscodeshift_1.ClassMethod, {
        kind: "constructor",
    });
    if (constructorMethod.length === 0) {
        return null;
    }
    return constructorMethod.paths().map((n) => n.node);
};
exports.getConstructorMethod = getConstructorMethod;
const getNodeName = (node) => node.key.name;
const findMethods = (body, accessibility, options) => {
    let methods = body
        .find(jscodeshift_1.ClassMethod, {
        kind: "method",
        static: options.getStaticMethods,
        key: {
            type: "Identifier",
        },
    })
        .paths();
    methods = methods.filter(({ node }) => {
        let a = node.accessibility;
        const isConventionalPrivateMethod = getNodeName(node)[0] === "_";
        if (isConventionalPrivateMethod) {
            a = "private";
        }
        if (!a) {
            a = "public";
        }
        return accessibility === a;
    });
    const methodNodes = methods.map((n) => n.node);
    if (accessibility === "private") {
        const privateMethods = body
            .find(jscodeshift_1.ClassPrivateMethod, { static: options.getStaticMethods })
            .paths()
            .map((n) => n.node);
        return [...methodNodes, ...privateMethods];
    }
    return methodNodes;
};
const getGetterAndSetters = (nodes) => {
    const getterAndSetters = new Map();
    nodes.forEach((node) => {
        const name = getNodeName(node);
        if (!name) {
            return nodes;
        }
        if (name.startsWith("get") || name.startsWith("set")) {
            const nameWithoutGetSet = name.substring(3);
            if (!getterAndSetters.get(nameWithoutGetSet)) {
                getterAndSetters.set(nameWithoutGetSet, {
                    setter: null,
                    getter: null,
                });
            }
            if (name.startsWith("get")) {
                getterAndSetters.set(nameWithoutGetSet, {
                    ...getterAndSetters.get(nameWithoutGetSet),
                    getter: node,
                });
            }
            if (name.startsWith("set")) {
                getterAndSetters.set(nameWithoutGetSet, {
                    ...getterAndSetters.get(nameWithoutGetSet),
                    setter: node,
                });
            }
        }
    });
    const output = [];
    getterAndSetters.forEach((gs) => {
        if (gs.getter) {
            output.push(gs.getter);
        }
        if (gs.setter) {
            output.push(gs.setter);
        }
    });
    return output;
};
const getNodesNotInGroup = (nodes, options) => {
    const g = options.pluginOptions.groupOrder;
    const newNodes = lodash_1.default.cloneDeep(nodes);
    if (g.includes('getterThenSetter')) {
        const getterAndSetters = getGetterAndSetters(nodes);
        lodash_1.default.remove(newNodes, n => !!getterAndSetters.find(g => lodash_1.default.isEqual(g, n)));
    }
    return newNodes;
};
const getMethodByAccessibility = (body, accessibility, options) => {
    let nodes = findMethods(body, accessibility, options);
    if (nodes.length === 0) {
        return null;
    }
    if (options.pluginOptions.groupSortOrder === "alphabetical") {
        nodes = lodash_1.default.sortBy(nodes, (n) => getNodeName(n));
    }
    const groupedNodes = [];
    options.pluginOptions.groupOrder.forEach((o) => {
        if (o === "getterThenSetter") {
            groupedNodes.push(getGetterAndSetters(nodes));
        }
        if (o === 'everythingElse') {
            groupedNodes.push(getNodesNotInGroup(nodes, options));
        }
    });
    return lodash_1.default.flatten(groupedNodes);
};
const getMethods = (body, options) => {
    const group = (0, helpers_1.getNewMemberAccessibilityGroup)();
    group.public = getMethodByAccessibility(body, "public", options);
    group.protected = getMethodByAccessibility(body, "protected", options);
    group.private = getMethodByAccessibility(body, "private", options);
    return (0, helpers_1.getMembersSortedByAccessibility)(group, options);
};
exports.getMethods = getMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dpYy9oZWxwZXJzL21ldGhvZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNkNBQXlFO0FBQ3pFLG9EQUFzQjtBQUV0Qix1Q0FHa0I7QUFHWCxNQUFNLG9CQUFvQixHQUFHLENBQ2xDLElBQXNDLEVBQ0QsRUFBRTtJQUN2QyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQVcsRUFBRTtRQUMvQyxJQUFJLEVBQUUsYUFBYTtLQUNwQixDQUFDLENBQUE7SUFFRixJQUFJLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEMsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUVELE9BQU8saUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDckQsQ0FBQyxDQUFBO0FBWlksUUFBQSxvQkFBb0Isd0JBWWhDO0FBRUQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUEwQyxFQUFFLEVBQUUsQ0FDL0QsSUFBb0IsQ0FBQyxHQUE2QixDQUFDLElBQUksQ0FBQTtBQUUzRCxNQUFNLFdBQVcsR0FBRyxDQUNsQixJQUFzQyxFQUN0QyxhQUE0QixFQUM1QixPQUFnQixFQUNjLEVBQUU7SUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSTtTQUNmLElBQUksQ0FBQyx5QkFBVyxFQUFFO1FBQ2pCLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0I7UUFDaEMsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFlBQVk7U0FDbkI7S0FDRixDQUFDO1NBQ0QsS0FBSyxFQUFFLENBQUE7SUFFVixPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNw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