/**
 * OpenCode Hook: Shell Execution (After)
 * Triggered when: tool.execute.after
 */

import { HookContext } from '.opencode/types';
import { execSync } from 'child_process';

export async function afterShellExecution(context: HookContext) {
  const command = context.command || '';
  const exitCode = context.exitCode;
  
  // Build analysis
  if (command.includes('build') || command.includes('tsc')) {
    if (exitCode !== 0) {
      console.error(`[Build Failed] Exit code: ${exitCode}, Command: ${command}`);
      console.error('[Suggestion] Check error messages above and fix issues');
    } else {
      console.log(`[Build Success] Command: ${command}`);
    }
  }
  
  // Test execution
  if (command.includes('test') || command.includes('jest')) {
    if (exitCode !== 0) {
      console.error(`[Tests Failed] Exit code: ${exitCode}`);
    } else {
      console.log(`[Tests Passed] All tests passed successfully`);
    }
  }
  
  return context;
}
