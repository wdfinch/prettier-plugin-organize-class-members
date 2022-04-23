"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organize = void 0;
const jscodeshift_1 = require("jscodeshift");
const helpers_1 = require("./helpers");
const properties_1 = require("./helpers/properties");
const jscodeshift = require("jscodeshift");
const organize = (code, pluginOptions) => {
    const root = jscodeshift.withParser("tsx")(code);
    const body = root.find(jscodeshift_1.ClassBody);
    if (body.length === 0) {
        return root.toSource();
    }
    const sectionsToSort = {
        constructor: (0, helpers_1.getConstructorMethod)(body),
        methods: (0, helpers_1.getMethods)(body, { pluginOptions, getStaticMethods: false }),
        staticMethods: (0, helpers_1.getMethods)(body, { pluginOptions, getStaticMethods: true }),
        properties: (0, properties_1.getProperties)(body, {
            pluginOptions: pluginOptions,
            getStaticMethods: false,
        }),
        staticProperties: (0, properties_1.getProperties)(body, {
            pluginOptions: pluginOptions,
            getStaticMethods: true,
        }),
    };
    const sorted = [];
    pluginOptions.sectionOrder.forEach((item) => {
        if (item === "constructor") {
            sorted.push(sectionsToSort.constructor);
        }
        else if (item === "methods") {
            sorted.push(sectionsToSort.methods);
        }
        else if (item === "staticMethods") {
            sorted.push(sectionsToSort.staticMethods);
        }
        else if (item === "properties") {
            sorted.push(sectionsToSort.properties);
        }
        else if (item === "staticProperties") {
            sorted.push(sectionsToSort.staticProperties);
        }
    });
    const sortedWithoutNull = sorted.filter((s) => !!s);
    body.replaceWith((path) => {
        path.node.body = sortedWithoutNull.flat();
        return path.node;
    });
    console.log(root.toSource());
    return root.toSource();
};
exports.organize = organize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbG9naWMvb3JnYW5pemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkNBQXVDO0FBRXZDLHVDQUE0RDtBQUM1RCxxREFBb0Q7QUFFcEQsMkNBQTJDO0FBRXBDLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBWSxFQUFFLGFBQTRCLEVBQUUsRUFBRTtJQUNyRSxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQVMsQ0FBQyxDQUFBO0lBRWpDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7S0FDdkI7SUFFRCxNQUFNLGNBQWMsR0FBbUI7UUFDckMsV0FBVyxFQUFFLElBQUEsOEJBQW9CLEVBQUMsSUFBSSxDQUFDO1FBQ3ZDLE9BQU8sRUFBRSxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ3JFLGFBQWEsRUFBRSxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDO1FBQzFFLFVBQVUsRUFBRSxJQUFBLDBCQUFhLEVBQUMsSUFBSSxFQUFFO1lBQzlCLGFBQWEsRUFBRSxhQUFhO1lBQzVCLGdCQUFnQixFQUFFLEtBQUs7U0FDeEIsQ0FBQztRQUNGLGdCQUFnQixFQUFFLElBQUEsMEJBQWEsRUFBQyxJQUFJLEVBQUU7WUFDcEMsYUFBYSxFQUFFLGFBQWE7WUFDNUIsZ0JBQWdCLEVBQUUsSUFBSTtTQUN2QixDQUFDO0tBQ0gsQ0FBQTtJQUVELE1BQU0sTUFBTSxHQUE0QyxFQUFFLENBQUE7SUFDMUQsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQyxJQUFJLElBQUksS0FBSyxhQUFhLEVBQUU7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUE7U0FDeEM7YUFBTSxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDcEM7YUFBTSxJQUFJLElBQUksS0FBSyxlQUFlLEVBQUU7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUE7U0FDMUM7YUFBTSxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUE7U0FDdkM7YUFBTSxJQUFJLElBQUksS0FBSyxrQkFBa0IsRUFBRTtZQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1NBQzdDO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQ3JDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN1QixDQUFBO0lBRW5DLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUN6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBRTVCLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ3hCLENBQUMsQ0FBQTtBQWpEWSxRQUFBLFFBQVEsWUFpRHBCIn0=