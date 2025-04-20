import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-node";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  // Base JS configuration
  js.configs.recommended,

  // TypeScript configuration
  ...tseslint.configs.recommended,

  // Custom configuration for all files
  {
    files: ["**/*.js", "**/*.ts"],
    plugins: {
      import: importPlugin,
      node: nodePlugin,
    },
    rules: {
      // General rules
      "no-console": "warn",
      eqeqeq: "error",

      // TypeScript specific rules
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Import rules
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // Node specific
      "node/no-missing-import": "off", // TypeScript handles this
      "node/no-unsupported-features/es-syntax": "off", // Allow modern ES features
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
  },

  // Specific configuration for TypeScript source files
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: ".",
      },
    },
    rules: {
      // Additional TypeScript specific rules for source files
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },

  // Specific rules for test files
  {
    files: ["**/*.test.ts", "**/*.spec.ts", "tests/**/*.ts"],
    rules: {
      // Relax certain rules for test files
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },

  // Config for non-TypeScript JS files
  {
    files: ["*.js", "*.cjs", "*.mjs"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  // Special config for commitlint.config.js
  {
    files: ["commitlint.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        module: "writable",
      },
    },
  },

  // Add Prettier config last to disable any conflicting rules
  prettierConfig,
]);
