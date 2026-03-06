# Harness Audit Command

Audit agent harness configuration for issues and misconfigurations.

## Usage

/harness-audit              # Full audit
/harness-audit --quick      # Quick check
/harness-audit --verbose    # Detailed report

## Checks Performed

- Agent configuration validation
- Command template verification
- Missing dependencies
- File path validation
- Permission checks

## Output

- PASS: Configuration is valid
- WARN: Non-critical issues found
- FAIL: Critical issues requiring attention
