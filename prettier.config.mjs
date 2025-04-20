/**
 * Prettier configuration for API Gateway
 *
 * @see https://prettier.io/docs/en/options.html for more options
 */

/** @type {import("prettier").Config} */
const config = {
  // Basic formatting
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",

  // JSX formatting
  jsxSingleQuote: false,
  bracketSameLine: false,

  // Spacing
  trailingComma: "es5",
  bracketSpacing: true,

  // Markdown and Documentation
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  endOfLine: "lf",
  embeddedLanguageFormatting: "auto",

  // TypeScript specific
  arrowParens: "always",

  // Plugins
  plugins: ["prettier-plugin-organize-imports"],

  // File overrides
  overrides: [
    {
      files: "*.{json,yaml,yml}",
      options: {
        tabWidth: 2,
      },
    },
    {
      files: "*.md",
      options: {
        proseWrap: "always",
      },
    },
  ],
};

export default config;
