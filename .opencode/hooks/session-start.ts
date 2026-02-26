/**
 * OpenCode Hook: Session Start
 * Triggered when: session.created
 * 
 * All output redirected to log file to prevent TUI corruption
 */

import logger from './logger';

export async function sessionStart(context: { sessionId?: string }) {
  const sessionId = context.sessionId;
  const startTime = new Date().toISOString();
  
  // Log to file instead of console
  logger.info(`Session started: ${sessionId} at ${startTime}`);
  
  return {
    ...context,
    sessionStartTime: startTime,
    sessionStatus: 'started',
  };
}
