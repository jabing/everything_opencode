/**
 * OpenCode Hook: Shell Execution (After)
 * Triggered when: tool.execute.after
 * 
 * All output redirected to log file to prevent TUI corruption
 */

import logger from './logger';

export async function afterShellExecution(context: { command?: string; exitCode?: number }) {
  const command = context.command || '';
  const exitCode = context.exitCode;
  
  // Build analysis - log to file
  if (command.includes('build') || command.includes('tsc')) {
    if (exitCode !== 0) {
      logger.error(`Build failed (exit ${exitCode}): ${command.substring(0, 100)}`);
    } else {
      logger.info(`Build success`);
    }
  }
  
  // Test execution - log to file
  if (command.includes('test') || command.includes('jest')) {
    if (exitCode !== 0) {
      logger.error(`Tests failed (exit ${exitCode})`);
    } else {
      logger.info(`Tests passed`);
    }
  }
  
  return context;
}
