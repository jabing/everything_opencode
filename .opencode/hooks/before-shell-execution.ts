/**
 * OpenCode Hook: Shell Execution (Before)
 * Triggered when: tool.execute.before
 * 
 * All output redirected to log file to prevent TUI corruption
 */

import { spawnSync } from 'child_process';
import logger from './logger';

export async function beforeShellExecution(context: { command?: string }) {
  const command = context.command || '';
  
  // Tmux dev server check - log to file
  if (command.includes('dev server') || command.includes('next dev') || command.includes('vite dev')) {
    try {
      const hasTmux = spawnSync('tmux', ['-L'], { 
        stdio: ['pipe', 'pipe', 'pipe'],
        windowsHide: true,
      });
      const hasTmuxOutput = hasTmux.stdout?.toString();
      
      if (hasTmuxOutput && !hasTmuxOutput.includes('no server')) {
        logger.info(`Tmux reminder: consider 'tmux new -s dev -n node'`);
      }
    } catch {
      // tmux not available - ignore
    }
  }
  
  return context;
}
