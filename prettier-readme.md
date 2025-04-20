# Prettier Configuration

This project uses Prettier for consistent code formatting and style enforcement.

## Configuration

The Prettier configuration is defined in `prettier.config.mjs`.

## Key Features

- **Code Style**: Enforces consistent styling across the codebase
- **Import Organization**: Automatically organizes imports
- **ESLint Integration**: Works seamlessly with ESLint
- **File-Specific Rules**: Applies special formatting to different file types

## Usage

```bash
# Format all files
npm run format

# Check if files are properly formatted (without changing them)
npm run format:check

# Same as format, alias for clarity
npm run format:fix
```

## Configuration Details

### Basic Formatting

- **Print Width**: 100 characters
- **Tab Width**: 2 spaces
- **Semicolons**: Required at the end of statements
- **Quotes**: Double quotes by default
- **Trailing Commas**: ES5-compatible trailing commas

### TypeScript Specific

- **Arrow Functions**: Always use parentheses around parameters
- **Import Organization**: Automatic sorting and grouping of imports

### File Type Overrides

- **JSON/YAML**: 2-space indentation
- **Markdown**: Wrap prose to fit the print width

## Integration with ESLint

The ESLint configuration has been updated to include `eslint-config-prettier`, which disables ESLint
rules that might conflict with Prettier. This ensures the two tools work well together.

## Pre-commit Hook (Optional Enhancement)

For a better developer experience, consider adding a pre-commit hook using Husky to automatically
format code when committing:

```bash
# Install Husky
npm install --save-dev husky lint-staged

# Setup Husky
npx husky init
```

Then add this to your package.json:

```json
"lint-staged": {
  "*.{js,ts,jsx,tsx}": [
    "prettier --write",
    "eslint --fix"
  ],
  "*.{json,css,md,yml,yaml}": [
    "prettier --write"
  ]
}
```

And create a pre-commit hook:

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```
