/**
 * EOC Logger - Redirects all hook output to log file instead of TUI
 * 
 * This prevents TUI corruption by writing all output to a dedicated log file
 * instead of stdout/stderr which can interfere with terminal displays.
 * 
 * Log file location: .opencode/eoc.log (relative to project root)
 */

import * as fs from 'fs';
import * as path from 'path';

// Log file path - relative to project root
const LOG_DIR = '.opencode';
const LOG_FILE = 'eoc.log';

/**
 * Get the log file path, creating directory if needed
 */
function getLogPath(): string {
  // Try to find project root by looking for common markers
  let projectRoot = process.cwd();
  
  // Walk up to find project root (has package.json or .git)
  let current = projectRoot;
  for (let i = 0; i < 5; i++) {
    if (fs.existsSync(path.join(current, 'package.json')) || 
        fs.existsSync(path.join(current, '.git'))) {
      projectRoot = current;
      break;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  
  const logDir = path.join(projectRoot, LOG_DIR);
  if (!fs.existsSync(logDir)) {
    try {
      fs.mkdirSync(logDir, { recursive: true });
    } catch {
      // Can't create dir, use temp
      return path.join(process.env.TEMP || '/tmp', 'eoc.log');
    }
  }
  
  return path.join(logDir, LOG_FILE);
}

/**
 * Format timestamp for log entries
 */
function timestamp(): string {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
}

/**
 * Write to log file (appends)
 */
function writeLog(level: string, message: string): void {
  try {
    const logPath = getLogPath();
    const entry = `[${timestamp()}] [${level.toUpperCase().padEnd(5)}] ${message}\n`;
    fs.appendFileSync(logPath, entry, { encoding: 'utf-8' });
  } catch {
    // Silently fail - don't corrupt TUI
  }
}

/**
 * Logger interface matching console methods
 */
export const logger = {
  log: (message: string) => writeLog('info', message),
  info: (message: string) => writeLog('info', message),
  warn: (message: string) => writeLog('warn', message),
  error: (message: string) => writeLog('error', message),
  debug: (message: string) => writeLog('debug', message),
  
  /**
   * Log multi-line output as single line with summary
   */
  logMultiLine: (level: string, prefix: string, lines: string[], maxLines: number = 3) => {
    if (lines.length === 0) return;
    if (lines.length <= maxLines) {
      writeLog(level, `${prefix}: ${lines.join(' | ')}`);
    } else {
      writeLog(level, `${prefix}: ${lines.slice(0, maxLines).join(' | ')} (+${lines.length - maxLines} more)`);
    }
  },
  
  /**
   * Get log file path for viewing
   */
  getLogPath,
  
  /**
   * Clear log file
   */
  clear: () => {
    try {
      const logPath = getLogPath();
      fs.writeFileSync(logPath, '', { encoding: 'utf-8' });
    } catch {
      // Silently fail
    }
  },
};

export default logger;
