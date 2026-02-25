/**
 * OpenCode Hook: Session End
 * Triggered when: session.deleted
 */

import { HookContext } from '.opencode/types';

export async function sessionEnd(context: HookContext) {
  const sessionId = context.sessionId;
  const endTime = new Date().toISOString();
  
  console.log(`[Session Ended] ID: ${sessionId}, Time: ${endTime}`);
  
  // Cleanup operations can be added here
  // e.g., close database connections, save final state
  
  return context;
}
