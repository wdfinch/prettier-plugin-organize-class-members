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

**Stability**

This plugin is new and currently in **beta**. It has not been extensively tested in large complex projects. Therefore if you
are using this plugin for the first time, **please run prettier in dry run mode or in a state where you can
easily rollback**.

## Installation

```sh
npm install --save-dev prettier-plugin-organize-class-members
```

```sh
yarn add --dev prettier-plugin-organize-class-members
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
    // your other prettier options
}
```

### Options

`classSectionOrder`

Details: Specify the order of various sections in your classes.\
Type: `string[]`

**Supported values:**

1. `constructor` - Matches the constructor function of the class.
2. `methods` - Matches all non-static methods.
3. `staticMethods`  - Matches all static methods.
4. `properties` - Matches all non-static declared properties/fields in the class.
5. `staticProperties` - Matches all static declared properties/fields in the class.

Default Value: `['staticProperties','staticMethods','properties','constructor','methods']`

_If you modify this option, you must follow these rules:_

1. Each value must be used.
2. No duplicates or unsupported strings may be used.

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

Details: Within a section, specify the order of members (methods and properties) by accessibility.\
Type: `string[]`

**Supported values:**

1. `private` - Matches private members. The following members are considered private. 
   1. Those preceded by the [typescript](https://www.typescriptlang.org/docs/handbook/2/classes.html#private) `private` keyword.
   2. Those preceded with a `#`. See [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) for more details.
   3. Those preceded with an `_` (conventional private members). See [here](https://stackoverflow.com/questions/4484424/is-the-underscore-prefix-for-property-and-method-names-merely-a-convention) for more details.
2. `protected` - Matches all protected members. The following members are considered protected.
    1. Those preceded by the [typescript](https://www.typescriptlang.org/docs/handbook/2/classes.html#protected) `protected` keyword.
3. `public` - Matches all public members. The following members are considered public.
    1. Those preceded by the [typescript](https://www.typescriptlang.org/docs/handbook/2/classes.html#public) `public` keyword.
    2. Those preceded by neither `_`, `#`, `private`, nor `protected`.

Default Value: `['public','protected','private']`

_If you modify this option, you must follow these rules:_

1. Each value must be used.
2. No duplicates or unsupported strings may be used.


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

Details: Within levels of accessibility, divide the members into groups. For example getter and setter methods can be grouped together.\
Type: `string[]`

**Supported values:**

1. `gettersAndSetters` - Matches getter and setter methods. A getter or setter is one of the following:
   1. A method with the word `get` or `set` at the start (ex: `getDog() {}`)
   2. A typescript getter and or setter. See [here](https://www.typescriptlang.org/docs/handbook/2/classes.html#getters--setters) for more details.
2. `everythingElse` - Matches all remaining members that could not be assigned to a group.

Default Value: `['everythingElse']`

_If you modify this option, you must follow these rules:_

1. `everythingElse` must be used.
2. No duplicates or unsupported strings may be used.


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

Details: Within a group, sort the items.
Type: `string`

**Supported values:**

1. `alphabetical` - Sort all members alphabetically within their group with the following conventions:
   1. If the `gettersAndSetters` options is used in `classSectionOrder`, then getters and setters will remain together. Ex. `getDog()` and `setDog()` will remain next to each other and the letter `D` will be used for sorting
   2. Members names are sorted by their lowercase values. Ex. The Dog() and dog() methods would appear next to each other after sorting. 
2. `none` - Perform no sorting and keep the original order.

Default Value: `'none'`

Example :
```js
// .prettierrc.cjs

module.exports = {
   classGroupSortOrder: 'alphabetical',
}
```
---

## Troubleshooting / FAQ

Q: This plugin isn't working with another Javascript/Typescript prettier plugin like [
prettier-plugin-organize-imports](https://github.com/simonhaenisch/prettier-plugin-organize-imports). How can I use both?

A: Many plugins override the same prettier parsers and are therefore incompatible with each other. A workaround is to run them independently by specifying the exact plugin to use. This can be with the following command:

```sh
prettier --write FILES_TO_WRITE --no-plugin-search --plugin=prettier-plugin-organize-class-members
```

This will run this plugin in isolation and not cause conflicts with other plugins.

## Rationale/Disclaimer

This plugin acts outside
of [Prettier's scope](https://prettier.io/docs/en/rationale#what-prettier-is-_not_-concerned-about) because "Prettier
only prints code. It does not transform it." and organizing classes is a code transformation because it changes the AST.

However, moving members around in classes does not alter the execution of the code at all and therefore is purely
cosmetic. _This plugin does and will strictly adhere to the principle of not making any transformations that alter code
execution_.

## Acknowledgments

1. I followed a similar format to [prettier-plugin-organize-imports](https://github.com/simonhaenisch/prettier-plugin-organize-imports) when writing this plugin.
2. I use [jscodeshift](https://github.com/facebook/jscodeshift) to transform the AST.
3. I followed [eslint-plugin-sort-class-members](https://github.com/bryanrsmith/eslint-plugin-sort-class-members) as a guide for supported options and design. I wrote this plugin because I prefer to use prettier to resolve formatting issues and eslint for issues that require manual fixes.

## License

[MIT](/license).