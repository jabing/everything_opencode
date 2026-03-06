# Session Recovery Command

Recover from crashed or corrupted sessions.

## Usage

/session-recover              # Auto-detect and recover
/session-recover --list       # List recoverable sessions
/session-recover <session-id> # Recover specific session

## Examples

### List all sessions
/session-recover --list

### Recover last valid session
/session-recover

## Related

- Session validator: node scripts/session-validator.js
