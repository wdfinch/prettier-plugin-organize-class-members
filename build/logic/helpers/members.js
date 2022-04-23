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
    if (node.type === 'ClassPrivateProperty') {
        return accessibility === 'private';
    }
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
    return properties.map((n) => n.node);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dpYy9oZWxwZXJzL21lbWJlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNkNBS29CO0FBQ3BCLG9EQUFzQjtBQUV0QixxQ0FBa0U7QUFDbEUsdUNBQXVDO0FBR3ZDLE1BQU0sMEJBQTBCLEdBQUcsQ0FDakMsSUFHbUMsRUFDbkMsYUFBNEIsRUFDNUIsRUFBRTtJQUNGLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxzQkFBc0IsRUFBRTtRQUN4QyxPQUFPLGFBQWEsS0FBSyxTQUFTLENBQUE7S0FDbkM7SUFFRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFBO0lBQzFCLE1BQU0sMkJBQTJCLEdBQUcsSUFBQSxxQkFBVyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQTtJQUVoRSxJQUFJLDJCQUEyQixFQUFFO1FBQy9CLENBQUMsR0FBRyxTQUFTLENBQUE7S0FDZDtJQUVELElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDTixDQUFDLEdBQUcsUUFBUSxDQUFBO0tBQ2I7SUFFRCxPQUFPLGFBQWEsS0FBSyxDQUFDLENBQUE7QUFDNUIsQ0FBQyxDQUFBO0FBRU0sTUFBTSxvQkFBb0IsR0FBRyxDQUNsQyxJQUFzQyxFQUNELEVBQUU7SUFDdkMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUFXLEVBQUU7UUFDL0MsSUFBSSxFQUFFLGFBQWE7S0FDcEIsQ0FBQyxDQUFBO0lBRUYsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2xDLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxPQUFPLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3JELENB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