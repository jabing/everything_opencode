# Quality Gate Command

Run quality gate checks before commit or deployment.

## Usage

/quality-gate               # Full quality check
/quality-gate --lint        # Lint only
/quality-gate --test        # Tests only
/quality-gate --type        # Type check only

## Checks Performed

- [ ] Lint passes
- [ ] Type check passes
- [ ] Tests pass (80%+ coverage)
- [ ] No console.log statements
- [ ] No hardcoded secrets

## Output

PASS/FAIL for each check with details
