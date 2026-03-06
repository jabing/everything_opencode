# Plankton Code Quality Skill

Write-time code quality enforcement with automatic formatting and linting.

## When to Activate

- After writing/editing code
- Before committing changes
- When quality issues are detected

## What It Does

1. **Auto-format** - Runs Prettier/formatter on edited files
2. **Lint check** - Runs ESLint/Ruff/linter
3. **Auto-fix** - Attempts to fix issues automatically
4. **Report** - Shows remaining issues that need manual attention

## Configuration

Uses .prettierrc for formatting rules.

## Usage

/plankton              # Full quality check
/plankton --format     # Format only
/plankton --lint       # Lint only
/plankton --fix        # Auto-fix issues

## Supported Languages

- TypeScript/JavaScript
- Python
- JSON/YAML
- Markdown
