const baseRules = {
	// Logic rules
	"array-callback-return": "error",
	"no-compare-neg-zero": "error",
	"no-cond-assign": "error",
	"no-const-assign": "error",
	"no-constant-binary-expression": "error",
	"no-constant-condition": "warn",
	"no-dupe-args": "error",
	"no-dupe-else-if": "error",
	"no-dupe-keys": "warn",
	"no-duplicate-case": "error",
	"no-duplicate-imports": "error",
	"no-func-assign": "error",
	"no-inner-declarations": "error",
	"no-irregular-whitespace": ["error", { skipStrings: true }],
	"no-loss-of-precision": "error",
	"no-sparse-arrays": "error",
	"no-template-curly-in-string": "error",
	// Suggestion rules
	"arrow-body-style": ["error", "always"],
	"block-scoped-var": "error",
	camelcase: [
		"error",
		{ properties: "always", ignoreDestructuring: false, ignoreImports: false, ignoreGlobals: false }
	],
	"capitalized-comments": ["error", "always"],
	curly: ["error", "multi", "consistent"],
	"dot-notation": "error",
	// React rules
	"react/react-in-jsx-scope": "off",
	"react/jsx-uses-react": "off",
	// Stylistic
	"@stylistic/block-spacing": ["error", "always"],
	"@stylistic/comma-spacing": ["error", { before: false, after: true }],
	"@stylistic/computed-property-spacing": ["error", "never"],
	"@stylistic/eol-last": ["error", "always"],
	"@stylistic/function-call-spacing": ["error", "never"],
	"@stylistic/jsx-closing-bracket-location": [1, "line-aligned"],
	"@stylistic/jsx-curly-newline": ["error", "consistent"],
	"@stylistic/jsx-curly-spacing": ["error", { when: "never" }],
	"@stylistic/jsx-equals-spacing": [2, "never"],
	// "@stylistic/jsx/jsx-indent": [1, 2, { checkAttributes: true, indentLogicalExpressions: true }],
	// "@stylistic/jsx/jsx-max-props-per-line": [1, { maximum: 2 }]
};
module.exports = {
	env: {
		node: true,
		es2022: true,
		browser: true
	},
	plugins: ["@stylistic"],
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	settings: {
		react: { version: "detect" }
	},
	rules: baseRules,
	overrides: [
		{
			files: ["*.js", "*.jsx"],
			parser: "@babel/eslint-parser",
			parserOptions: {
				requireConfigFile: false
			},
			extends: ["plugin:react/recommended"],
			rules: {
				...baseRules
			}
		},
		{
			files: ["*.astro"],
			parser: "astro-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"]
			},
			extends: ["plugin:astro/recommended", "plugin:astro/jsx-a11y-strict"],
			rules: {
				...baseRules
			}
		},
		{
			files: ["*.ts"],
			parser: "@typescript-eslint/parser",
			extends: ["plugin:@typescript-eslint/recommended"],
			rules: {
				"@typescript-eslint/no-unused-vars": [
					"error",
					{ argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" }
				],
				"@typescript-eslint/no-non-null-assertion": "off"
			}
		},
		{
			files: ["**/*.astro/*.js", "*.astro/*.js"],
			parser: "@typescript-eslint/parser"
		}
	]
};
