# Loop Start Command

Start an autonomous loop for repetitive tasks.

## Usage

/loop-start <task>          # Start loop with task
/loop-start --stop          # Stop current loop
/loop-start --status        # Check loop status

## Examples

/loop-start Run tests and fix failures
/loop-start --stop

## Notes

- Loops run until task succeeds or max iterations reached
- Use --stop to interrupt a running loop
