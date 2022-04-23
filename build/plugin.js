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
    options: constants_1.defaultPluginOptionsSupportOption,
};
exports.parsers = exports.plugin.parsers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FHb0I7QUFDcEIsbUNBQWtDO0FBRWxDLHFFQUEwRDtBQUMxRCxzREFBc0Q7QUFDdEQsZ0VBQWdFO0FBRWhFLE1BQU0sZUFBZSxHQUFHLENBQ3RCLElBQVksRUFDWixPQUF1QyxFQUN2QyxFQUFFO0lBQ0YsS0FBSyxNQUFNLElBQUksSUFBSSxrQ0FBc0IsRUFBRTtRQUN6QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsT0FBTyxJQUFJLENBQUE7U0FDWjtLQUNGO0lBRUQsSUFBSTtRQUNGLE1BQU0sQ0FBQyxHQUFrQjtZQUN2QixZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVk7WUFDbEMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLGtCQUFrQjtZQUM5QyxVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVU7WUFDOUIsY0FBYyxFQUFFLE9BQU8sQ0FBQyxjQUFjO1NBQ3ZDLENBQUE7UUFHRCxJQUFBLHdDQUFlLEVBQUMsQ0FBQyxDQUFDLENBQUE7UUFFbEIsT0FBTyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQ3pCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRTtZQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ2pCO1FBRUQsT0FBTyxJQUFJLENBQUE7S0FDWjtBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sY0FBYyxHQUFHLENBQUMsTUFBYyxFQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELEdBQUcsTUFBTTtJQUNULFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUM1QixlQUFlLENBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDM0QsT0FBeUMsQ0FDMUM7Q0FDSixDQUFDLENBQUE7QUFFVyxRQUFBLE1BQU0sR0FBVztJQUM1QixPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2pELFVBQVUsRUFBRSxjQUFjLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztLQUNqRTtJQUNELE9BQU8sRUFBRSw2Q0FBaUM7Q0FDM0MsQ0FBQTtBQUVZLFFBQUEsT0FBTyxHQUNsQixjQUFNLENBQUMsT0FBTyxDQUFBIn0=