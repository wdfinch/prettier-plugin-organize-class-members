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
const getMethodByAccessibility = (body, accessibility, options) => {
    let nodes = findMethods(body, accessibility, options);
    if (nodes.length === 0) {
        return null;
    }
    if (options.pluginOptions.groupSortOrder === "alphabetical") {
        nodes = lodash_1.default.sortBy(nodes, (n) => getNodeName(n));
    }
    options.pluginOptions.groupOrder.forEach((o) => {
        if (o === "getterThenSetter") {
            nodes = [...getGetterAndSetters(nodes), ...nodes];
        }
    });
    return lodash_1.default.uniqBy(nodes, (g) => getNodeName(g));
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