/**
 * OpenCode Hook: Shell Execution (Before)
 * Triggered when: tool.execute.before
 */

import { HookContext } from '.opencode/types';
import { spawnSync } from 'child_process';

export async function beforeShellExecution(context: HookContext) {
  const command = context.command || '';
  
  // Tmux dev server blocker
  if (command.includes('dev server') || command.includes('next dev') || command.includes('vite dev')) {
    const hasTmux = spawnSync('tmux', ['-L'], { stdio: 'pipe' });
    const hasTmuxOutput = hasTmux.stdout?.toString();
    
    if (hasTmuxOutput && !hasTmuxOutput.includes('no server')) {
      console.warn('[Tmux Reminder] dev server detected but tmux session not active. Consider starting: tmux new -s dev');
      console.warn('[Suggested Command] tmux new -s dev -n node');
    }
  }
  
  return context;
}
