# Semantic Versioning and Release Guidelines

This project follows [Semantic Versioning 2.0.0](https://semver.org/) and uses automated tools to
enforce versioning rules and generate changelogs.

## Versioning Rules

Given a version number MAJOR.MINOR.PATCH, increment the:

1. **MAJOR** version when you make incompatible API changes
2. **MINOR** version when you add functionality in a backward compatible manner
3. **PATCH** version when you make backward compatible bug fixes

Additional labels for pre-release and build metadata are available as extensions to the
MAJOR.MINOR.PATCH format.

## Commit Message Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.
Commit messages should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

The commit type must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify source or test files
- **revert**: Reverts a previous commit

### Scopes

The scope can be anything specifying the place of the commit change. For example:

- `core`
- `config`
- `deps`
- `ui`
- `api`
- etc.

### Examples

```
feat(ui): add new button component
fix(api): handle missing user data
docs: update README with new setup instructions
refactor(core): simplify data processing logic
```

## Automatic Versioning and Changelog

The project uses `standard-version` to automatically:

- Determine the next version number based on commit messages
- Update the version in package.json
- Generate/update the CHANGELOG.md file
- Create a git tag with the new version

### Release Commands

- `pnpm release`: Release a new version automatically determined by commit history
- `pnpm release:patch`: Force a patch release
- `pnpm release:minor`: Force a minor release
- `pnpm release:major`: Force a major release
- `pnpm release:dry-run`: Preview the next release without making changes

## Creating Commits

Use the guided commit tool to ensure your commits follow the convention:

```bash
pnpm commit
```

This will launch an interactive prompt that will help you create a properly formatted commit
message.

## Pre-commit Hooks

The project includes pre-commit hooks that:

1. Lint and format your code
2. Validate your commit messages against the Conventional Commits standard

These hooks help maintain code quality and ensure proper versioning.

## CI/CD Integration

The GitHub Actions workflow automatically:

1. Builds and tests the project
2. Creates a new release when commits are pushed to the main branch
3. Publishes the package to npm

## Benefits of This System

- **Automated Versioning**: No manual version number changes required
- **Automatic Changelog**: Release notes are generated automatically
- **Consistent History**: Commit history is clean and follows a standard format
- **Release Automation**: New versions are created and published automatically
