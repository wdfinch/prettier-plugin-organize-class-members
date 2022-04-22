"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsers = exports.plugin = void 0;
const constants_1 = require("./constants");
const logic_1 = require("./logic");
const babelParsers = require("prettier/parser-babel");
const typescriptParsers = require("prettier/parser-typescript");
const validateOptionsHelpers_1 = require("./validateOptionsHelpers");
const organizeClasses = (code, options) => {
    for (const skip of constants_1.SKIP_ORGANIZE_COMMENTS) {
        if (code.includes(skip)) {
            return code;
        }
    }
    try {
        const o = {
            sectionOrder: options.sectionOrder,
            accessibilityOrder: options.accessibilityOrder,
            groupOrder: options.groupOrder,
            groupSortOrder: options.groupSortOrder
        };
        (0, validateOptionsHelpers_1.areOptionsValid)(o);
        return (0, logic_1.organize)(code, o);
    }
    catch (e) {
        if (!!process.env.DEBUG) {
            console.error(e);
        }
        return code;
    }
};
const withPreprocess = (parser) => ({
    ...parser,
    preprocess: (code, options) => organizeClasses(parser.preprocess ? parser.preprocess(code, options) : code, options),
});
exports.plugin = {
    parsers: {
        babel: withPreprocess(babelParsers.parsers.babel),
        typescript: withPreprocess(typescriptParsers.parsers.typescript),
    },
    options: constants_1.defaultPluginOptions,
};
exports.parsers = exports.plugin.parsers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FBd0U7QUFDeEUsbUNBQWtDO0FBQ2xDLHNEQUFzRDtBQUN0RCxnRUFBZ0U7QUFFaEUscUVBQXdEO0FBRXhELE1BQU0sZUFBZSxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQXVDLEVBQUUsRUFBRTtJQUNoRixLQUFLLE1BQU0sSUFBSSxJQUFJLGtDQUFzQixFQUFFO1FBQ3pDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQTtTQUNaO0tBQ0Y7SUFFRCxJQUFJO1FBQ0YsTUFBTSxDQUFDLEdBQWtCO1lBQ3ZCLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtZQUNsQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsa0JBQWtCO1lBQzlDLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVTtZQUM5QixjQUFjLEVBQUUsT0FBTyxDQUFDLGNBQWM7U0FDdkMsQ0FBQTtRQUdELElBQUEsd0NBQWUsRUFBQyxDQUFDLENBQUMsQ0FBQTtRQUVsQixPQUFPLElBQUEsZ0JBQVEsRUFBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDekI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDakI7UUFFRCxPQUFPLElBQUksQ0FBQTtLQUNaO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxjQUFjLEdBQUcsQ0FBQyxNQUFjLEVBQVUsRUFBRSxDQUFDLENBQUM7SUFDbEQsR0FBRyxNQUFNO0lBQ1QsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQzVCLGVBQWUsQ0FDYixNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUMzRCxPQUF5QyxDQUMxQztDQUNKLENBQUMsQ0FBQTtBQUVXLFFBQUEsTUFBTSxHQUFXO0lBQzVCLE9BQU8sRUFBRTtRQUNQLEtBQUssRUFBRSxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDakQsVUFBVSxFQUFFLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO0tBQ2pFO0lBQ0QsT0FBTyxFQUFFLGdDQUFvQjtDQUM5QixDQUFBO0FBRVksUUFBQSxPQUFPLEdBQ2xCLGNBQU0sQ0FBQyxPQUFPLENBQUEifQ==