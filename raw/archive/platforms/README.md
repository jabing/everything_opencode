# Platform Configurations Archive

This directory contains archived platform-specific configurations that were migrated to opencode-only format.

## Archived Platforms

| Platform | Original Location | Archived Date |
|----------|------------------|---------------|
| Cursor | `raw/.cursor/` | 2026-02-25 |
| Claude Desktop | `raw/.claude/` | 2026-02-25 |
| Claude Plugin | `raw/.claude-plugin/` | 2026-02-25 |
| Codex | `raw/.codex/` | 2026-02-25 |
| OpenAI Agents | `raw/.agents/` | 2026-02-25 |

## Purpose

These configurations were archived as part of OpenCode-only migration. They are preserved for:
- Historical reference
- Potential future migration needs
- Audit trail

## Restoration

To restore any platform configuration:
```bash
cp -r raw/archive/platforms/.{platform}/ raw/.{platform}/
```
