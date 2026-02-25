/**
 * OpenCode Hook: File Edited
 * Triggered when: file.edited
 */

import { HookContext } from '.opencode/types';
import { execSync } from 'child_process';

export async function fileEdited(context: HookContext) {
  const filePath = context.filePath;
  
  // TypeScript validation - run tsc --noEmit for changed file
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    try {
      const result = execSync('npx tsc --noEmit', {
        cwd: process.cwd(),
        timeout: 10000
      });
      
      if (result.stderr && result.stderr.includes('error')) {
        console.error(`[TypeScript Error] ${filePath}:`);
        console.error(result.stderr);
      }
    } catch (error) {
      console.error(`[TypeScript Check Failed] ${filePath}:`, error);
    }
  }
  
  // Auto-formatting with Prettier
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    try {
      const result = execSync('npx prettier --write "' + filePath + '"', {
        cwd: process.cwd(),
        timeout: 5000
      });
      
      if (result.stderr) {
        console.warn(`[Prettier Warning] ${filePath}:`);
        console.warn(result.stderr);
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
