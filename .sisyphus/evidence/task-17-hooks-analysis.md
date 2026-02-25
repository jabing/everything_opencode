# Cursor Hooks Analysis

## Hooks Structure

### Event Types Found

1. **Session Management**
   - sessionStart
   - sessionEnd

2. **Shell Execution**
   - beforeShellExecution
   - afterShellExecution

3. **File Edit**
   - beforeFileEdit
   - afterFileEdit

4. **MCP Execution**
   - beforeMCPExecution
   - afterMCPExecution

5. **File Read**
   - beforeReadFile
   - afterReadFile

6. **Prompt Submission**
   - beforeSubmitPrompt
   - afterSubmitPrompt

7. **Subagent Management**
   - subagentStart
   - subagentStop

8. **Tab File Read**
   - beforeTabFileRead
   - afterTabFileEdit

9. **Context Management**
   - preCompact
   - stop

## Hook Mapping to OpenCode

| Cursor Hook | OpenCode Equivalent | Status |
|------------|--------------------|--------|
| sessionStart | session.created | Migrate |
| sessionEnd | session.deleted | Migrate |
| beforeShellExecution | tool.execute.before | Migrate |
| afterShellExecution | tool.execute.after | Migrate |
| beforeFileEdit | file.edited | Migrate |
| afterFileEdit | file.edited | Migrate |
| beforeReadFile | file.edited | Migrate |
| afterReadFile | file.edited | Migrate |
| beforeSubmitPrompt | - | N/A (OpenCode doesn't have submit prompt event) |
| afterSubmitPrompt | - | N/A |
| subagentStart | - | N/A (OpenCode handles subagents differently) |
| subagentStop | - | N/A |
| beforeTabFileRead | file.edited | Migrate |
| afterTabFileEdit | file.edited | Migrate |
| preCompact | - | N/A |
| stop | session.idle | Migrate |

## Hooks to Migrate

### High Priority (Core Development)
1. sessionStart → session.created (session tracking)
2. sessionEnd → session.deleted (cleanup)
3. beforeShellExecution → tool.execute.before (block tmux, warnings)
4. afterShellExecution → tool.execute.after (log analysis)
5. beforeFileEdit → file.edited (TypeScript check, auto-format)
6. afterFileEdit → file.edited (console.log warning)

### Medium Priority (Quality)
7. beforeReadFile → file.edited (sensitive file warnings)
8. afterReadFile → file.edited
9. beforeTabFileRead → file.edited (block secrets reading)
10. afterTabFileEdit → file.edited (formatting)

### Low Priority (Observability)
11. preCompact → (not needed)
12. stop → session.idle (desktop notification)

## OpenCode Hook Format

OpenCode hooks should be in `.opencode/hooks/` directory as TypeScript files:

```typescript
// File: .opencode/hooks/session-start.ts
export async function sessionStart(context: HookContext) {
  // Session start logic
}

// File: .opencode/hooks/file-edited.ts
export async function fileEdited(context: HookContext) {
  // TypeScript validation
  // Auto-formatting
}
```

## Total Count

- Total Hooks: 12 (session + shell + file events)
- Files to Create: 6 TS files
- Status: Ready for migration
