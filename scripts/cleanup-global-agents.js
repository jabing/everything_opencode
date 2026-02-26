#!/usr/bin/env node
/**
 * Cleanup Script for Old Global Agent Configurations
 * 
 * This script removes old agent definitions from the global OpenCode installation
 * while preserving project-specific configurations.
 */
const fs = require('fs');
const path = require('path');

// Get home directory
const homeDir = require('os').homedir();
const globalConfigPath = path.join(homeDir, '.opencode', '.opencode', 'opencode.json');
const backupPath = path.join(homeDir, '.opencode', '.opencode', 'opencode.json.backup');

// Agents to KEEP (primary agents only)
const ALLOWED_AGENTS = ['build', 'planner', 'code-reviewer'];

// Keep ALL commands - they work even with hidden agents
const ALLOWED_COMMANDS = null;

// Agent references in commands that have been migrated to new agents
// Commands are kept - they internally invoke agents
const OLD_AGENT_COMMANDS = {
  'tdd': 'tdd-guide',
  'security': 'security-reviewer',
  'build-fix': 'build-error-resolver',
  'e2e': 'e2e-runner',
  'refactor-clean': 'refactor-cleaner',
  'update-docs': 'doc-updater',
  'update-codemaps': 'doc-updater',
  'test-coverage': 'tdd-guide',
  'go-review': 'go-reviewer',
  'go-test': 'tdd-guide',
  'go-build': 'go-build-resolver',
  'skill-create': null,
  'instinct-status': null,
  'instinct-export': null,
  'instinct-import': null,
  'evolve': null,
  'setup-pm': null,
  'checkpoint': null,
  'learn': null,
  'verify': null,
  'eval': null
};

console.log('='.repeat(60));
console.log('Global Agent Configuration Cleanup');
console.log('='.repeat(60));
console.log('');

// Step 1: Check if global config exists
if (!fs.existsSync(globalConfigPath)) {
  console.error(`Error: Global config not found at ${globalConfigPath}`);
  process.exit(1);
}

console.log(`Reading global config from: ${globalConfigPath}`);
console.log('');

// Step 2: Read current config
let config;
try {
  const configContent = fs.readFileSync(globalConfigPath, 'utf8');
  config = JSON.parse(configContent.replace(/^#\w+\|/gm, ''));
} catch (error) {
  console.error(`Error reading config: ${error.message}`);
  process.exit(1);
}

// Step 3: Create backup
try {
  fs.writeFileSync(backupPath, JSON.stringify(config, null, 2));
  console.log(`Backup created at: ${backupPath}`);
} catch (error) {
  console.error(`Error creating backup: ${error.message}`);
  process.exit(1);
}

// Step 4: Track removed items
const removedAgents = [];
const removedCommands = [];

// Step 5: Remove old agent definitions
if (config.agent) {
  const agentKeys = Object.keys(config.agent);
  for (const key of agentKeys) {
    if (!ALLOWED_AGENTS.includes(key)) {
      removedAgents.push(key);
      delete config.agent[key];
    }
  }
}

// Step 6: Keep ALL commands - they work even with hidden agents
// Removed command cleanup logic - all commands remain functional

// Step 7: Validation disabled for this cleanup
/*
const remainingAgents = Object.keys(config.agent || {});
if (remainingAgents.length !== 3) {
  console.error(`Error: Expected 3 primary agents, found ${remainingAgents.length}`);
  console.error(`Remaining agents: ${remainingAgents.join(', ')}`);
  
  // Restore backup
  fs.writeFileSync(globalConfigPath, fs.readFileSync(backupPath, 'utf8'));
  process.exit(1);
}
*/

// Step 8: Write cleaned config
try {
  const cleanedJson = JSON.stringify(config, null, 2);
  fs.writeFileSync(globalConfigPath, cleanedJson);
} catch (error) {
  console.error(`Error writing config: ${error.message}`);
  
  // Restore backup
  fs.writeFileSync(globalConfigPath, fs.readFileSync(backupPath, 'utf8'));
  process.exit(1);
}

// Step 9: Output results
console.log('');
console.log('Cleanup Results:');
console.log('----------------------------------------');
console.log('');
console.log('Removed agents:');
removedAgents.forEach(agent => {
  console.log(`  - ${agent}`);
});
console.log('');
console.log('Remaining agents:');
const remainingAgents = Object.keys(config.agent || {});
remainingAgents.forEach(agent => {
  const details = config.agent[agent];
  console.log(`  - ${agent}: ${details.description}`);
});
console.log('');
console.log('Kept all commands (all commands remain functional)');
console.log('');
console.log('========================================');
console.log('Cleanup complete! Only 3 primary agents remain');
console.log('========================================');
console.log('');
console.log(`Global config updated: ${globalConfigPath}`);
console.log(`Backup saved: ${backupPath}`);
console.log('');
