# Prettier Plugin: Organize Class Members

> Organize your Javascript and Typescript classes to keep them consistent.

A plugin that makes Prettier organize your Javascript and Typescript class members.

**Features**

* 👍 Supports .js, .jsx, .ts, .tsx files.
* 🚀 Works out of the box - zero-config required.
* 💪 Customizable - control exactly how your classes are organized.
* 🤓 No more messy diffs or merge conflicts from people using different class orderings strategies.
* 🤯 Never worry about manually ordering class members again
* 😌 Safe - modifying the order of class members has no effect on code execution.

**Caveat**

This plugin inherits, extends, and overrides the built-in Prettier parsers for `babel` and `typescript`. Therefore it's
incompatible with other plugins that do the same. See the troubleshooting section below for more details.

## Installation

```sh
npm install --save-dev prettier-plugin-organize-class-members
```

```sh
yarn add --dev prettier-plugin-organize-imports
```

_`prettier` is a peer dependencies, so make sure you have those installed in your project._

## Usage

The plugin will be loaded by Prettier automatically. No configuration needed.

Files containing the substring `// organize-class-members-ignore` or `// tslint:disable:organize-class-members` are
skipped.

## Configuration

This plugin works out of the box and requires no configuration to get started. You may customize how this plugin
organizes your classes using the options below in your prettier config file.

_Note if you are using a `.prettierrc.cjs`, you may add the following line to get type support for the options:_

```js
// .prettierrc.cjs

module.exports = {
    plugins: [require.resolve('prettier-plugin-organize-class-members')],
    // your other prettier settings
}
```

### Options

`classSectionOrder`

Details: Specify the order of various sections in your classes\
Type: `string[]`

**Supported values:**

1. `constructor` - matches the constructor function of the class
2. `methods` - matches all non-static methods
3. `staticMethods`  - matches all static methods
4. `properties` - matches all non-static declared instance variables/fields in the class
5. `staticProperties` - matches all static declared instance variables/fields in the class

Default Value: `['staticProperties','staticMethods','properties','constructor','methods']`

_If you modify this option, you must follow these rules:_

1. Each value must be used.
2. no duplicates or unsupported strings may be used.


```js
// .prettierrc.cjs

module.exports = {
    // invalid ❌ - missing staticProperties and methods
    classSectionOrder: ['constructor', 'staticMethods', 'properties'],
    
    // invalid ❌ - constructor is duplcated
    classSectionOrder: ['constructor', 'constructor', 'properties'],

    // invalid ❌ - unsupported values are used
    classSectionOrder: ['someRandomValue', 'someOtherRandomValue', 'properties'],

    // valid ✅ 
    classSectionOrder: ['constructor', 'methods', 'staticMethods', 'properties', 'staticProperties']
}
```
---

`classAccessibilityOrder`

Details: Within a section specify the order of members (methods and properties) by accessibility\
Type: `string[]`

**Supported values:**

1. `private` - matches private members. The following members are considered private. 
   1. those preceded by the [typescript](https://www.typescriptlang.org/docs/handbook/2/classes.html#private) `private` keyword
   2. those preceded with a `#` - see [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) for more details
   3. those preceded with an `_` - conventional private members - see [here](https://stackoverflow.com/questions/4484424/is-the-underscore-prefix-for-property-and-method-names-merely-a-convention) for more details
2. `protected` - matches all protected members. The following members are considered protected.
    1. those preceded by the [typescript](https://www.typescriptlang.org/docs/handbook/2/classes.html#protected) `protected` keyword
3. `public` - matches all public members. The following members are considered public.
    1. those preceded by the [typescript](https://www.typescriptlang.org/docs/handbook/2/classes.html#public) `public` keyword
    2. those preceded by no keyword `_` or `#`

Default Value: `['public','protected','private']`

_If you modify this option, you must follow these rules:_

1. Each value must be used.
2. no duplicates or unsupported strings may be used.


```js
// .prettierrc.cjs

module.exports = {
    // invalid ❌ - missing public
    classAccessibilityOrder: ['private', 'protected'],
    
    // invalid ❌ - private is duplcated
    classAccessibilityOrder: ['private', 'private', 'protected'],

    // invalid ❌ - unsupported values are used
    classAccessibilityOrder: ['someRandomValue', 'someOtherRandomValue', 'private'],

    // valid ✅ 
    classSectionOrder: ['private', 'public', 'protected']
}
```
---

`classGroupOrder`

Details: With levels of accessibility, groups are used to organized members. For example getters and setters can be grouped together.\
Type: `string[]`

**Supported values:**

1. `gettersAndSetters` - matches getter and setter methods. A getter/setter is one of the following:
   1. a method with the word `get` or `set` at the start (ex: `getDog() {}`)
   2. a typescript getter and or setter. See [here](https://www.typescriptlang.org/docs/handbook/2/classes.html#getters--setters) for more details
2. `everythingElse` - matches all remaining members that could not be assigned to a group

Default Value: `['everythingElse']`

_If you modify this option, you must follow these rules:_

1. `everythingElse` must be used.
2. no duplicates or unsupported strings may be used.


```js
// .prettierrc.cjs

module.exports = {
    // invalid ❌ - missing everythingElse
    classGroupOrder: ['gettersAndSetters'],
    
    // invalid ❌ - gettersAndSetters is duplcated
    classSectionOrder: ['gettersAndSetters', 'gettersAndSetters', 'everythingElse'],

    // invalid ❌ - unsupported values are used
    classSectionOrder: ['someRandomValue', 'someOtherRandomValue', 'everythingElse'],

    // valid ✅ 
    classSectionOrder: ['gettersAndSetters', 'everythingElse']
}
```
---

`classGroupSortOrder`

Details: Specify the sort order within a group (ex. all the getters and setters)\
Type: `string`

**Supported values:**

1. `alphabetical` - sort all members alphabetically within their group with the following conventions:
   1.  if the `gettersAndSetters` options is used in `classSectionOrder`, then getters and setters will remain together. Ex `getDog()` and `setDog()` will remain next to each other and the letter `D` will be used for sorting
2. `none` - perform no sorting and keep the original order

Default Value: `'none'`

Example :
```js
// .prettierrc.cjs

module.exports = {
   classGroupSortOrder: 'alphabetical',
}
```
---

## Rationale/Disclaimer

This plugin acts outside
of [Prettier's scope](https://prettier.io/docs/en/rationale#what-prettier-is-_not_-concerned-about) because "Prettier
only prints code. It does not transform it." and organizing classes is a code transformation because it changes the AST.

However, moving members around in classes does not alter the execution of the code at all and therefore is purely
cosmetic. This plugin does and will strictly adhere to the principle of not making any transformations that alter code
execution.

## Stability

This plugin is new and currently in beta. It has not been extensively tested in large complex projects. Therefore if you
are using this plugin for the first time, please run prettier in dry run mode or in a clean state (git) where you can
easily rollback.

## License

[MIT](/license).