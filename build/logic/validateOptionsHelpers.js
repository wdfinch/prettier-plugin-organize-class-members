"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areOptionsValid = void 0;
const constants_1 = require("./constants");
const isOrderValid = (order) => {
    const getErrorMessage = (message) => `${message} are required in order option`;
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
    if (order.length !== constants_1.defaultOrder.length) {
        throw new Error("The order option cannot contain invalid or duplicate values");
    }
};
const areOptionsValid = (options) => {
    isOrderValid(options.order);
};
exports.areOptionsValid = areOptionsValid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVPcHRpb25zSGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dpYy92YWxpZGF0ZU9wdGlvbnNIZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUEwQztBQUcxQyxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFO0lBQ3BDLE1BQU0sZUFBZSxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FDMUMsR0FBRyxPQUFPLCtCQUErQixDQUFBO0lBRTNDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFBO0tBQ3JEO0lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDcEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtLQUNsRDtJQUVELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7S0FDaEQ7SUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0tBQzVDO0lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtLQUMvQztJQUVELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyx3QkFBWSxDQUFDLE1BQU0sRUFBRTtRQUN4QyxNQUFNLElBQUksS0FBSyxDQUNiLDZEQUE2RCxDQUM5RCxDQUFBO0tBQ0Y7QUFDSCxDQUFDLENBQUE7QUFFTSxNQUFNLGVBQWUsR0FBRyxDQUFDLE9BQXNCLEVBQUUsRUFBRTtJQUN4RCxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzdCLENBQUMsQ0FBQTtBQUZZLFFBQUEsZUFBZSxtQkFFM0IifQ==