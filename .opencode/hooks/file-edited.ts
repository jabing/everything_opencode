/**
 * OpenCode Hook: File Edited
 * Triggered when: file.edited
 * 
 * All output redirected to log file to prevent TUI corruption
 */

import { spawnSync } from 'child_process';
import * as fs from 'fs';
import logger from './logger';

/**
 * Validates a file path to prevent command injection.
 * Uses allowlist approach - only safe characters permitted.
 */
function validatePath(filePath: string): boolean {
  const safePattern = /^[a-zA-Z0-9_\-./\\]+$/
  return safePattern.test(filePath)
}

export async function fileEdited(context: { filePath: string }) {
  const filePath = context.filePath;
  
  // Validate file path for security
  if (!validatePath(filePath)) {
    logger.warn(`Invalid file path rejected: ${filePath}`);
    return context;
  }
  
  // TypeScript validation - run tsc --noEmit for changed file
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    try {
      const result = spawnSync('npx', ['tsc', '--noEmit'], {
        cwd: process.cwd(),
        timeout: 10000,
        stdio: ['pipe', 'pipe', 'pipe'],
        windowsHide: true,
      });
      
      if (result.status !== 0 && result.stdout && result.stdout.length > 0) {
        const output = result.stdout.toString();
        const errors = output.split('\n').filter(line => line.includes('error TS'));
        if (errors.length > 0) {
          logger.logMultiLine('warn', `TypeScript errors in ${filePath}`, errors, 3);
        }
      }
    } catch (error) {
      logger.error(`TypeScript check failed for ${filePath}: ${error}`);
    }
  }
  
  // Auto-formatting with Prettier
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    try {
      spawnSync('npx', ['prettier', '--write', filePath], {
        cwd: process.cwd(),
        timeout: 5000,
        stdio: ['pipe', 'pipe', 'pipe'],
        windowsHide: true,
      });
    } catch (error) {
      logger.error(`Format failed for ${filePath}: ${error}`);
    }
  }
  
  // Console.log warning check
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const consoleLogMatches = fileContent.match(/console\.log/g);
    const consoleErrorMatches = fileContent.match(/console\.error/g);
    
    if (consoleLogMatches || consoleErrorMatches) {
      const logCount = consoleLogMatches?.length || 0;
      const errCount = consoleErrorMatches?.length || 0;
      logger.warn(`Debug statements in ${filePath}: ${logCount} console.log, ${errCount} console.error`);
    }
  } catch {
    // File might not exist or not be readable - skip
  }
  
  return context;
}
