import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2026, // Uses ECMAScript 2026
      sourceType: "module", // Allows the use of ES modules
      parser: tsParser, // Uses the TypeScript parser
    },
    rules: {
      // Style rules and best practices
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable", // Applies the rule to variables
          format: ["camelCase", "PascalCase", "UPPER_CASE"], // Allows camelCase, PascalCase and UPPER_CASE
          leadingUnderscore: "allow", // Allows leading underscores (e.g., _privateVar)
        },
      ],
      semi: ["error", "always"], // Requires semicolons at the end of statements
      quotes: ["error", "double", { avoidEscape: true }], // Double quotes, unless escaping would be needed
      indent: ["error", 2, { SwitchCase: 1 }], // 2-space indent; indent switch cases (matches Prettier)
      "no-trailing-spaces": "error", // Prohibits trailing whitespace at the end of lines
      "prefer-const": "error", // Requires 'const' for variables that are never reassigned
      "no-param-reassign": "error", // Prohibits reassigning function parameters
      "array-bracket-spacing": ["error", "never"], // Prohibits spaces inside array brackets
      "comma-dangle": ["error", "always-multiline"], // Requires trailing commas in multiline objects/arrays

      // Additional recommended rules
      "@typescript-eslint/no-unused-vars": "error", // Error if a variable is unused
      "object-curly-spacing": ["error", "always"], // Requires spaces inside curly braces
      "arrow-parens": ["error", "always"], // Requires parentheses in arrow functions
      "no-var": "error", // Prohibits the use of 'var'
      "no-multiple-empty-lines": ["error", { max: 1 }], // Limits consecutive empty lines
    },
  },
]);
