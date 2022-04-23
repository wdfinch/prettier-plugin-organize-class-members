"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organize = void 0;
const jscodeshift_1 = require("jscodeshift");
const helpers_1 = require("./helpers");
const jscodeshift = require("jscodeshift");
const organize = (code, pluginOptions) => {
    const root = jscodeshift.withParser('tsx')(code);
    const body = root.find(jscodeshift_1.ClassBody);
    if (body.length === 0) {
        return root.toSource();
    }
    const sectionsToSort = {
        constructor: (0, helpers_1.getConstructorMethod)(body),
        methods: (0, helpers_1.getMembers)(body, {
            pluginOptions,
            getStaticMethods: false,
            memberType: 'method',
        }),
        staticMethods: (0, helpers_1.getMembers)(body, {
            pluginOptions,
            getStaticMethods: true,
            memberType: 'method',
        }),
        properties: (0, helpers_1.getMembers)(body, {
            pluginOptions: pluginOptions,
            getStaticMethods: false,
            memberType: 'property',
        }),
        staticProperties: (0, helpers_1.getMembers)(body, {
            pluginOptions: pluginOptions,
            getStaticMethods: true,
            memberType: 'property',
        }),
    };
    const sorted = [];
    pluginOptions.sectionOrder.forEach((item) => {
        if (item === 'constructor') {
            sorted.push(sectionsToSort.constructor);
        }
        else if (item === 'methods') {
            sorted.push(sectionsToSort.methods);
        }
        else if (item === 'staticMethods') {
            sorted.push(sectionsToSort.staticMethods);
        }
        else if (item === 'properties') {
            sorted.push(sectionsToSort.properties);
        }
        else if (item === 'staticProperties') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbG9naWMvb3JnYW5pemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkNBQXVDO0FBRXZDLHVDQUE0RDtBQUU1RCwyQ0FBMkM7QUFFcEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFZLEVBQUUsYUFBNEIsRUFBRSxFQUFFO0lBQ3JFLE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDaEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBUyxDQUFDLENBQUE7SUFFakMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNyQixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtLQUN2QjtJQUVELE1BQU0sY0FBYyxHQUFtQjtRQUNyQyxXQUFXLEVBQUUsSUFBQSw4QkFBb0IsRUFBQyxJQUFJLENBQUM7UUFDdkMsT0FBTyxFQUFFLElBQUEsb0JBQVUsRUFBQyxJQUFJLEVBQUU7WUFDeEIsYUFBYTtZQUNiLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsVUFBVSxFQUFFLFFBQVE7U0FDckIsQ0FBQztRQUNGLGFBQWEsRUFBRSxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFO1lBQzlCLGFBQWE7WUFDYixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLFVBQVUsRUFBRSxRQUFRO1NBQ3JCLENBQUM7UUFDRixVQUFVLEVBQUUsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRTtZQUMzQixhQUFhLEVBQUUsYUFBYTtZQUM1QixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLFVBQVUsRUFBRSxVQUFVO1NBQ3ZCLENBQUM7UUFDRixnQkFBZ0IsRUFBRSxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFO1lBQ2pDLGFBQWEsRUFBRSxhQUFhO1lBQzVCLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsVUFBVSxFQUFFLFVBQVU7U0FDdkIsQ0FBQztLQUNILENBQUE7SUFFRCxNQUFNLE1BQU0sR0FBNEMsRUFBRSxDQUFBO0lBQzFELGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDMUMsSUFBSSxJQUFJLEtBQUssYUFBYSxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQ3hDO2FBQU0sSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3BDO2FBQU0sSUFBSSxJQUFJLEtBQUssZUFBZSxFQUFFO1lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1NBQzFDO2FBQU0sSUFBSSxJQUFJLEtBQUssWUFBWSxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1NBQ3ZDO2FBQU0sSUFBSSxJQUFJLEtBQUssa0JBQWtCLEVBQUU7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtTQUM3QztJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNyQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDdUIsQ0FBQTtJQUVuQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtJQUU1QixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUN4QixDQUFDLENBQUE7QUEzRFksUUFBQSxRQUFRLFlBMkRwQiJ9