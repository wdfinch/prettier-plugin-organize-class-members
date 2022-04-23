"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsers = exports.plugin = void 0;
const constants_1 = require("./constants");
const logic_1 = require("./logic");
const validateOptionsHelpers_1 = require("./validateOptionsHelpers");
const babelParsers = require("prettier/parser-babel");
const typescriptParsers = require("prettier/parser-typescript");
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
            groupSortOrder: options.groupSortOrder,
        };
        (0, validateOptionsHelpers_1.areOptionsValid)(o);
        return (0, logic_1.organize)(code, o);
    }
    catch (e) {
        console.error(e);
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
    options: constants_1.defaultPluginOptionsSupportOption,
};
exports.parsers = exports.plugin.parsers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FHb0I7QUFDcEIsbUNBQWtDO0FBRWxDLHFFQUEwRDtBQUMxRCxzREFBc0Q7QUFDdEQsZ0VBQWdFO0FBRWhFLE1BQU0sZUFBZSxHQUFHLENBQ3RCLElBQVksRUFDWixPQUF1QyxFQUN2QyxFQUFFO0lBQ0YsS0FBSyxNQUFNLElBQUksSUFBSSxrQ0FBc0IsRUFBRTtRQUN6QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsT0FBTyxJQUFJLENBQUE7U0FDWjtLQUNGO0lBRUQsSUFBSTtRQUNGLE1BQU0sQ0FBQyxHQUFrQjtZQUN2QixZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVk7WUFDbEMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLGtCQUFrQjtZQUM5QyxVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVU7WUFDOUIsY0FBYyxFQUFFLE9BQU8sQ0FBQyxjQUFjO1NBQ3ZDLENBQUE7UUFHRCxJQUFBLHdDQUFlLEVBQUMsQ0FBQyxDQUFDLENBQUE7UUFFbEIsT0FBTyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQ3pCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hCLE9BQU8sSUFBSSxDQUFBO0tBQ1o7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLGNBQWMsR0FBRyxDQUFDLE1BQWMsRUFBVSxFQUFFLENBQUMsQ0FBQztJQUNsRCxHQUFHLE1BQU07SUFDVCxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FDNUIsZUFBZSxDQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQzNELE9BQXlDLENBQzFDO0NBQ0osQ0FBQyxDQUFBO0FBRVcsUUFBQSxNQUFNLEdBQVc7SUFDNUIsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFLGNBQWMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNqRCxVQUFVLEVBQUUsY0FBYyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7S0FDakU7SUFDRCxPQUFPLEVBQUUsNkNBQWlDO0NBQzNDLENBQUE7QUFFWSxRQUFBLE9BQU8sR0FDbEIsY0FBTSxDQUFDLE9BQU8sQ0FBQSJ9