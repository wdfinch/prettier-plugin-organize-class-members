"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodesNotInGroup = exports.getGetterAndSetters = void 0;
const lodash_1 = __importDefault(require("lodash"));
const helpers_1 = require("../helpers");
const getGetterAndSetters = (nodes) => {
    const getterAndSetters = new Map();
    nodes.forEach((node) => {
        if (node.type !== 'ClassMethod') {
            return;
        }
        node = node;
        const name = (0, helpers_1.getNodeName)(node);
        if (!name) {
            return nodes;
        }
        const kind = node.kind;
        const isGet = name.startsWith('get') || kind === 'get';
        const isSet = name.startsWith('set') || kind === 'set';
        if (isGet || isSet) {
            const nameWithoutGetSet = name.substring(3);
            if (!getterAndSetters.get(nameWithoutGetSet)) {
                getterAndSetters.set(nameWithoutGetSet, {
                    setter: null,
                    getter: null,
                });
            }
            if (isGet) {
                getterAndSetters.set(nameWithoutGetSet, {
                    ...getterAndSetters.get(nameWithoutGetSet),
                    getter: node,
                });
            }
            if (isSet) {
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
exports.getGetterAndSetters = getGetterAndSetters;
const getNodesNotInGroup = (nodes, options) => {
    const g = options.pluginOptions.groupOrder;
    const newNodes = lodash_1.default.cloneDeep(nodes);
    if (g.includes('getterThenSetter')) {
        const getterAndSetters = (0, exports.getGetterAndSetters)(nodes);
        lodash_1.default.remove(newNodes, (n) => !!getterAndSetters.find((g) => lodash_1.default.isEqual(g, n)));
    }
    return newNodes;
};
exports.getNodesNotInGroup = getNodesNotInGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2dpYy9oZWxwZXJzL2dyb3Vwcy9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLG9EQUFzQjtBQUN0Qix3Q0FBd0M7QUFRakMsTUFBTSxtQkFBbUIsR0FBRyxDQUNqQyxLQUFtQyxFQUNMLEVBQUU7SUFDaEMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBMkIsQ0FBQTtJQUUzRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDckIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBRTtZQUMvQixPQUFNO1NBQ1A7UUFFRCxJQUFJLEdBQUcsSUFBbUIsQ0FBQTtRQUMxQixNQUFNLElBQUksR0FBRyxJQUFBLHFCQUFXLEVBQUMsSUFBSSxDQUFDLENBQUE7UUFFOUIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLEtBQUssQ0FBQTtRQUN0RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxLQUFLLENBQUE7UUFFdEQsSUFBSSxLQUFLLElBQUksS0FBSyxFQUFFO1lBQ2xCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUUzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBQzVDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRTtvQkFDdEMsTUFBTSxFQUFFLElBQUk7b0JBQ1osTUFBTSxFQUFFLElBQUk7aUJBQ2IsQ0FBQyxDQUFBO2FBQ0g7WUFFRCxJQUFJLEtBQUssRUFBRTtnQkFDVCxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUU7b0JBQ3RDLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFFO29CQUMzQyxNQUFNLEVBQUUsSUFBSTtpQkFDYixDQUFDLENBQUE7YUFDSDtZQUVELElBQUksS0FBSyxFQUFFO2dCQUNULGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRTtvQkFDdEMsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUU7b0JBQzNDLE1BQU0sRUFBRSxJQUFJO2lCQUNiLENBQUMsQ0FBQTthQUNIO1NBQ0Y7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLE1BQU0sTUFBTSxHQUFpQyxFQUFFLENBQUE7SUFDL0MsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDOUIsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDdkI7UUFDRCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7WUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUN2QjtJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUE7QUExRFksUUFBQSxtQkFBbUIsdUJBMEQvQjtBQUVNLE1BQU0sa0JBQWtCLEdBQUcsQ0FDaEMsS0FBbUMsRUFDbkMsT0FBZ0IsRUFDYyxFQUFFO0lBQ2hDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFBO0lBQzFDLE1BQU0sUUFBUSxHQUFpQyxnQkFBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNqRSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUNsQyxNQUFNLGdCQUFnQixHQUFHLElBQUEsMkJBQW1CLEVBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkQsZ0JBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQzNFO0lBRUQsT0FBTyxRQUFRLENBQUE7QUFDakIsQ0FBQyxDQUFBO0FBWlksUUFBQSxrQkFBa0Isc0JBWTlCIn0=