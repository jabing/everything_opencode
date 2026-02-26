/**
 * OpenCode Hook: Session End
 * Triggered when: session.deleted
 * 
 * All output redirected to log file to prevent TUI corruption
 */

import logger from './logger';

export async function sessionEnd(context: { sessionId?: string }) {
  const endTime = new Date().toISOString();
  
  // Log to file instead of console
  logger.info(`Session ended at ${endTime}`);
  
  return {
    ...context,
    sessionEndTime: endTime,
    sessionStatus: 'ended',
  };
}
