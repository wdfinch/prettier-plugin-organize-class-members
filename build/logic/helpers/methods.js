"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMembers = exports.getConstructorMethod = void 0;
const jscodeshift_1 = require("jscodeshift");
const lodash_1 = __importDefault(require("lodash"));
const groups_1 = require("./groups");
const helpers_1 = require("./helpers");
const doesNodeMatchAccessibility = (node, accessibility) => {
    let a = node.accessibility;
    const isConventionalPrivateMethod = (0, helpers_1.getNodeName)(node)[0] === '_';
    if (isConventionalPrivateMethod) {
        a = 'private';
    }
    if (!a) {
        a = 'public';
    }
    return accessibility === a;
};
const getConstructorMethod = (body) => {
    const constructorMethod = body.find(jscodeshift_1.ClassMethod, {
        kind: 'constructor',
    });
    if (constructorMethod.length === 0) {
        return null;
    }
    return constructorMethod.paths().map((n) => n.node);
};
exports.getConstructorMethod = getConstructorMethod;
const findMethods = (body, accessibility, options) => {
    let methods = body
        .find(jscodeshift_1.ClassMethod, {
        static: options.getStaticMethods,
        key: {
            type: 'Identifier',
        },
    })
        .paths();
    methods = methods.filter(({ node }) => {
        if (node.kind === 'constructor') {
            return false;
        }
        return doesNodeMatchAccessibility(node, accessibility);
    });
    const methodNodes = methods.map((n) => n.node);
    if (accessibility === 'private') {
        const privateMethods = body
            .find(jscodeshift_1.ClassPrivateMethod, { static: options.getStaticMethods })
            .paths()
            .map((n) => n.node);
        return [...methodNodes, ...privateMethods];
    }
    return methodNodes;
};
const findProperties = (body, accessibility, options) => {
    let properties = body
        .find(jscodeshift_1.ClassProperty, {
        static: options.getStaticMethods,
    })
        .paths();
    properties = properties.filter(({ node }) => {
        return doesNodeMatchAccessibility(node, accessibility);
    });
    const propertyNodes = properties.map((n) => n.node);
    if (accessibility === 'private') {
        const privateMethods = body
            .find(jscodeshift_1.ClassPrivateProperty, { static: options.getStaticMethods })
            .paths()
            .map((n) => n.node);
        return [...propertyNodes, ...privateMethods];
    }
    return propertyNodes;
};
const getMembersByAccessibility = (body, accessibility, options) => {
    let nodes;
    if (options.memberType === 'method') {
        nodes = findMethods(body, accessibility, options);
    }
    else {
        nodes = findProperties(body, accessibility, options);
    }
    if (nodes.length === 0) {
        return null;
    }
    if (options.pluginOptions.groupSortOrder === 'alphabetical') {
        nodes = lodash_1.default.sortBy(nodes, (n) => (0, helpers_1.getNodeName)(n));
    }
    const groupedNodes = [];
    options.pluginOptions.groupOrder.forEach((o) => {
        if (o === 'getterThenSetter') {
            groupedNodes.push((0, groups_1.getGetterAndSetters)(nodes));
        }
        if (o === 'everythingElse') {
            groupedNodes.push((0, groups_1.getNodesNotInGroup)(nodes, options));
        }
    });
    return lodash_1.default.flatten(groupedNodes);
};
const getMembers = (body, options) => {
    const group = {
        private: null,
        protected: null,
        public: null,
    };
    group.public = getMembersByAccessibility(body, 'public', options);
    group.protected = getMembersByAccessibility(body, 'protected', options);
    group.private = getMembersByAccessibility(body, 'private', options);
    let sortedByAccessibility = [];
    options.pluginOptions.accessibilityOrder.forEach((a) => {
        if (a === 'public' && group.public) {
            sortedByAccessibility = [...sortedByAccessibility, ...group.public];
        }
        else if (a === 'protected' && group.protected) {
            sortedByAccessibility = [...sortedByAccessibility, ...group.protected];
        }
        else if (a === 'private' && group.private) {
            sortedByAccessibility = [...sortedByAccessibility, ...group.private];
        }
    });
    return sortedByAccessibility;
};
exports.getMembers = getMembers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dpYy9oZWxwZXJzL21ldGhvZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNkNBTW9CO0FBQ3BCLG9EQUFzQjtBQUV0QixxQ0FBa0U7QUFDbEUsdUNBQXVDO0FBR3ZDLE1BQU0sMEJBQTBCLEdBQUcsQ0FDakMsSUFBdUQsRUFDdkQsYUFBNEIsRUFDNUIsRUFBRTtJQUNGLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUE7SUFDMUIsTUFBTSwyQkFBMkIsR0FBRyxJQUFBLHFCQUFXLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFBO0lBRWhFLElBQUksMkJBQTJCLEVBQUU7UUFDL0IsQ0FBQyxHQUFHLFNBQVMsQ0FBQTtLQUNkO0lBRUQsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNOLENBQUMsR0FBRyxRQUFRLENBQUE7S0FDYjtJQUVELE9BQU8sYUFBYSxLQUFLLENBQUMsQ0FBQTtBQUM1QixDQUFDLENBQUE7QUFFTSxNQUFNLG9CQUFvQixHQUFHLENBQ2xDLElBQXNDLEVBQ0QsRUFBRTtJQUN2QyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQVcsRUFBRTtRQUMvQyxJQUFJLEVBQUUsYUFBYTtLQUNwQixDQUFDLENBQUE7SUFFRixJQUFJLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEMsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUVELE9BQU8saUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDckQsQ0FBQyxDQUFBO0FBWlksUUFBQSxvQkFBb0Isd0JBWWhDO0FBRUQsTUFBTSxXQUFXLEdBQUcsQ0FDbEIsSUFBc0MsRUFDdEMsYUFBNEIsRUFD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