# ESLint Configuration

This project uses ESLint to ensure code quality and maintain consistent coding standards.

## Configuration

The ESLint configuration is defined in `eslint.config.mjs` using the new flat config format that was
introduced in ESLint v9.

## Key Features

- TypeScript support with type checking
- Import sorting and organization
- Express API specific rules
- Special configurations for test files
- Enforced return types for TypeScript functions (with warnings)

## Usage

```bash
# Run ESLint to check for issues
npm run lint

# Run ESLint and automatically fix issues where possible
npm run lint:fix
```

## Rules

The configuration includes:

- General JavaScript best practices
- TypeScript-specific rules like enforcing return types
- Import organization and sorting
- Special relaxed rules for test files
- Proper handling of unused variables (prefixed with underscore)

## Warnings vs Errors

The current configuration treats most issues as warnings rather than errors to ease the transition.
This includes:

- Missing function return types
- Console statements
- Use of `any` type

## Integration with Other Tools

This ESLint setup works alongside:

- Prettier for code formatting
- TypeScript for static type checking
- Vitest for testing

## Extending

To modify the ESLint configuration:

1. Edit the `eslint.config.mjs` file
2. Add, remove, or modify rules as needed
3. Run `npm run lint` to test your changes
