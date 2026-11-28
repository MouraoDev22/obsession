import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import checkFile from "eslint-plugin-check-file";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

interface RestrictedSyntaxSelector {
  selector: string;
  message: string;
}

const explicitVoidReturnSelectors: RestrictedSyntaxSelector[] = [
  {
    selector:
      ":function[returnType.typeAnnotation.type='TSVoidKeyword'] > BlockStatement:not(:has(> ReturnStatement:last-child))",
    message: "Functions returning void must end with an explicit `return;`.",
  },
  {
    selector:
      ":function[returnType.typeAnnotation.typeName.name='Promise'][returnType.typeAnnotation.typeArguments.params.0.type='TSVoidKeyword'] > BlockStatement:not(:has(> ReturnStatement:last-child))",
    message:
      "Functions returning Promise<void> must end with an explicit `return;`.",
  },
];

const noLocalDeclarationsSelectors: RestrictedSyntaxSelector[] = [
  {
    selector: "TSInterfaceDeclaration",
    message: "Declare interfaces only in files inside an `interfaces/` folder.",
  },
  {
    selector: "TSTypeAliasDeclaration",
    message: "Declare types only in files inside a `types/` folder.",
  },
  {
    selector: "TSEnumDeclaration",
    message: "Declare enums only in files inside an `enums/` folder.",
  },
  {
    selector: "TSTypeLiteral",
    message:
      "Extract type literals to an interface (`interfaces/`) or type (`types/`) file.",
  },
];

export default defineConfig([
  globalIgnores([
    ".cline/**",
    "coverage/**",
    "dist/**",
    "eslint.config.ts",
    "node_modules/**",
    "vite.config.ts",
    "src/generated/**",
    "**/*.d.ts",
  ]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map(
    (config: (typeof tseslint.configs.recommendedTypeChecked)[number]) => ({
      ...config,
      files: ["src/**/*.{ts,tsx}"],
    }),
  ),
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ["src/**/*.{ts,tsx}", "vite.config.ts"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        { selector: "function", format: ["camelCase", "PascalCase"] },
        { selector: "typeLike", format: ["PascalCase"] },
        { selector: "enumMember", format: ["UPPER_CASE"] },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: false,
          allowHigherOrderFunctions: false,
          allowDirectConstAssertionInArrowFunctions: false,
          allowConciseArrowFunctionExpressionsStartingWithVoid: false,
          allowFunctionsWithoutTypeParameters: false,
          allowIIFEs: false,
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/typedef": [
        "error",
        {
          arrayDestructuring: false,
          arrowParameter: true,
          memberVariableDeclaration: true,
          objectDestructuring: false,
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
          variableDeclarationIgnoreFunction: false,
        },
      ],
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "arrow-body-style": ["error", "always"],
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "prefer-const": "error",
      "no-param-reassign": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-restricted-syntax": [
        "error",
        ...explicitVoidReturnSelectors,
        ...noLocalDeclarationsSelectors,
      ],
    },
  },
  {
    files: ["**/*.config.{ts,mjs,js}", "eslint.config.ts"],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      "@typescript-eslint/typedef": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-restricted-syntax": "off",
      "func-style": "off",
      "arrow-body-style": "off",
    },
  },
  {
    files: ["**/interfaces/*.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...explicitVoidReturnSelectors,
        {
          selector: "TSTypeAliasDeclaration",
          message: "Only interfaces are allowed in `interfaces/`.",
        },
        {
          selector: "TSEnumDeclaration",
          message: "Only interfaces are allowed in `interfaces/`.",
        },
        {
          selector: "Program > TSInterfaceDeclaration",
          message: "The interface must be exported.",
        },
        {
          selector:
            "Program > ExportNamedDeclaration > TSInterfaceDeclaration ~ *",
          message: "Only one interface per file.",
        },
      ],
    },
  },
  {
    files: ["**/types/*.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...explicitVoidReturnSelectors,
        {
          selector: "TSInterfaceDeclaration",
          message: "Only types are allowed in `types/`.",
        },
        {
          selector: "TSEnumDeclaration",
          message: "Only types are allowed in `types/`.",
        },
        {
          selector: "Program > TSTypeAliasDeclaration",
          message: "The type must be exported.",
        },
      ],
    },
  },
  {
    files: ["**/enums/*.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...explicitVoidReturnSelectors,
        {
          selector: "TSInterfaceDeclaration",
          message: "Only enums are allowed in `enums/`.",
        },
        {
          selector: "TSTypeAliasDeclaration",
          message: "Only enums are allowed in `enums/`.",
        },
        {
          selector: "TSEnumDeclaration[const=true]",
          message:
            "Do not use `const enum` (incompatible with isolatedModules).",
        },
        {
          selector: "Program > TSEnumDeclaration",
          message: "The enum must be exported.",
        },
        {
          selector: "Program > ExportNamedDeclaration ~ ExportNamedDeclaration",
          message: "Only one enum per file.",
        },
      ],
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/no-index": "off",
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/interfaces/*.ts": "PASCAL_CASE",
          "**/types/*.ts": "PASCAL_CASE",
          "**/enums/*.ts": "PASCAL_CASE",
          "**/components/*/index.tsx": "CAMEL_CASE",
          "**/utils/*/index.ts": "CAMEL_CASE",
        },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  prettier,
]);
