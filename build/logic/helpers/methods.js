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
        const a = node.accessibility;
        const isConventionalPrivateMethod = getNodeName(node)[0] === "_";
        if (accessibility === "private" &&
            (isConventionalPrivateMethod || a === "private")) {
            return true;
        }
        else if (accessibility === "protected" && a === "protected") {
            return true;
        }
        else if (accessibility === "public" && (a === "public" || !a)) {
            return true;
        }
        return false;
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