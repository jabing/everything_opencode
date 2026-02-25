/**
 * OpenCode Hook: File Edited
 * Triggered when: file.edited
 */

import { HookContext } from '.opencode/types';
import { spawnSync } from 'child_process';

/**
 * Validates a file path to prevent command injection.
 * Uses allowlist approach - only safe characters permitted.
 */
function validatePath(path: string): boolean {
  const safePattern = /^[a-zA-Z0-9_\-./\\]+$/
  return safePattern.test(path)
}

export async function fileEdited(context: HookContext) {
  const filePath = context.filePath;
  
  // Validate file path for security
  if (!validatePath(filePath)) {
    console.warn(`[Security] Invalid file path rejected: ${filePath}`);
    return context;
  }
  
  // TypeScript validation - run tsc --noEmit for changed file
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    try {
      // Use spawnSync with array args, no shell, for security
      const result = spawnSync('npx', ['tsc', '--noEmit'], {
        cwd: process.cwd(),
        timeout: 10000,
        stdio: 'pipe',
        shell: false
      });
      
      if (result.stderr && result.stderr.length > 0 && result.stderr.toString().includes('error')) {
        console.error(`[TypeScript Error] ${filePath}:`);
        console.error(result.stderr.toString());
      }
    } catch (error) {
      console.error(`[TypeScript Check Failed] ${filePath}:`, error);
    }
  }
  
  // Auto-formatting with Prettier
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    try {
      // Use spawnSync with array args, no shell, for security
      const result = spawnSync('npx', ['prettier', '--write', filePath], {
        cwd: process.cwd(),
        timeout: 5000,
        stdio: 'pipe',
        shell: false
      });
      
      if (result.stderr && result.stderr.length > 0) {
        console.warn(`[Prettier Warning] ${filePath}:`);
        console.warn(result.stderr.toString());
      }
    } catch (error) {
      console.warn(`[Format Failed] ${filePath}:`, error);
    }
  }
  
  // Console.log warning check
  try {
    const fileContent = require('fs').readFileSync(filePath, 'utf-8');
    if (fileContent.includes('console.log') || fileContent.includes('console.error')) {
      console.warn(`[Debug Statement Found] ${filePath} contains console.log/error`);
    }
  } catch (error) {
    // File might not exist or not be readable - skip
  }
  
  return context;
}
