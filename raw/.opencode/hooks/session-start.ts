/**
 * OpenCode Hook: Session Start
 * Triggered when: session.created
 */

import { HookContext } from '.opencode/types';

export async function sessionStart(context: HookContext) {
  // Log session start for tracking
  const sessionId = context.sessionId;
  const startTime = new Date().toISOString();
  
  // You can add additional logging here
  console.log(`[Session Started] ID: ${sessionId}, Time: ${startTime}`);
  
  return context;
}
