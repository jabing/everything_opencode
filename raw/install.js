#!/usr/bin/env node
/**
 * install.js — Install claude rules while preserving directory structure.
 * 
 * Usage:
 *   node install.js [--target <claude|cursor>] <language> [<language> ...]
 * 
 * Examples:
 *   node install.js typescript
 *   node install.js typescript python golang
 *   node install.js --target cursor typescript
 *   node install.js --target cursor typescript python golang
 * 
 * Targets:
 *   claude  (default) — Install rules to ~/.claude/rules/
 *   cursor  — Install rules, agents, skills, commands, and MCP to ./.cursor/
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Resolve script directory (handles npm/bun bin symlink)
function getScriptDir() {
  // When running via npx, __dirname points to the actual package location
  return __dirname;
}

const SCRIPT_DIR = getScriptDir();
const RULES_DIR = path.join(SCRIPT_DIR, 'rules');
const CURSOR_SRC = path.join(SCRIPT_DIR, '.cursor');

/**
 * Recursively copy directory contents
 * @param {string} src - Source directory
 * @param {string} dest - Destination directory
 */
function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    return false;
  }
  
  fs.mkdirSync(dest, { recursive: true });
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  
  return true;
}

/**
 * Copy files matching a pattern (prefix)
 * @param {string} srcDir - Source directory
 * @param {string} destDir - Destination directory
 * @param {string} prefix - File prefix to match
 * @returns {boolean} - Whether any files were copied
 */
function copyFilesWithPrefix(srcDir, destDir, prefix) {
  if (!fs.existsSync(srcDir)) {
    return false;
  }
  
  fs.mkdirSync(destDir, { recursive: true });
  
  const files = fs.readdirSync(srcDir).filter(f => f.startsWith(prefix) && f.endsWith('.md'));
  
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    fs.copyFileSync(srcPath, destPath);
  }
  
  return files.length > 0;
}

/**
 * Get available languages from rules directory
 * @returns {string[]} - List of available languages
 */
function getAvailableLanguages() {
  if (!fs.existsSync(RULES_DIR)) {
    return [];
  }
  
  return fs.readdirSync(RULES_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && entry.name !== 'common')
    .map(entry => entry.name);
}

/**
 * Validate language name (prevent path traversal)
 * @param {string} lang - Language name
 * @returns {boolean}
 */
function isValidLanguage(lang) {
  return /^[a-zA-Z0-9_-]+$/.test(lang);
}

/**
 * Print usage information
 */
function printUsage() {
  console.log(`Usage: node install.js [--target <claude|cursor>] <language> [<language> ...]`);
  console.log('');
  console.log('Targets:');
  console.log('  claude  (default) — Install rules to ~/.claude/rules/');
  console.log('  cursor  — Install rules, agents, skills, commands, and MCP to ./.cursor/');
  console.log('');
  console.log('Available languages:');
  
  const languages = getAvailableLanguages();
  for (const lang of languages) {
    console.log(`  - ${lang}`);
  }
}

/**
 * Install for Claude target
 * @param {string[]} languages - Languages to install
 */
function installForClaude(languages) {
  const homeDir = os.homedir();
  const destDir = process.env.CLAUDE_RULES_DIR || path.join(homeDir, '.claude', 'rules');
  
  // Warn if destination already exists
  if (fs.existsSync(destDir)) {
    const files = fs.readdirSync(destDir);
    if (files.length > 0) {
      console.log(`Note: ${destDir}/ already exists. Existing files will be overwritten.`);
      console.log('      Back up any local customizations before proceeding.');
    }
  }
  
  // Always install common rules
  const commonDir = path.join(RULES_DIR, 'common');
  const commonDest = path.join(destDir, 'common');
  
  if (fs.existsSync(commonDir)) {
    console.log(`Installing common rules -> ${commonDest}/`);
    copyDir(commonDir, commonDest);
  }
  
  // Install each requested language
  for (const lang of languages) {
    if (!isValidLanguage(lang)) {
      console.error(`Error: invalid language name '${lang}'. Only alphanumeric, dash, and underscore allowed.`);
      continue;
    }
    
    const langDir = path.join(RULES_DIR, lang);
    const langDest = path.join(destDir, lang);
    
    if (!fs.existsSync(langDir)) {
      console.error(`Warning: rules/${lang}/ does not exist, skipping.`);
      continue;
    }
    
    console.log(`Installing ${lang} rules -> ${langDest}/`);
    copyDir(langDir, langDest);
  }
  
  console.log(`Done. Rules installed to ${destDir}/`);
}

/**
 * Install for Cursor target
 * @param {string[]} languages - Languages to install
 */
function installForCursor(languages) {
  const destDir = '.cursor';
  
  console.log(`Installing Cursor configs to ${destDir}/`);
  
  // --- Rules ---
  const cursorRulesSrc = path.join(CURSOR_SRC, 'rules');
  const cursorRulesDest = path.join(destDir, 'rules');
  
  if (fs.existsSync(cursorRulesSrc)) {
    console.log(`Installing common rules -> ${cursorRulesDest}/`);
    copyFilesWithPrefix(cursorRulesSrc, cursorRulesDest, 'common-');
    
    // Install language-specific rules
    for (const lang of languages) {
      if (!isValidLanguage(lang)) {
        console.error(`Error: invalid language name '${lang}'. Only alphanumeric, dash, and underscore allowed.`);
        continue;
      }
      
      const found = copyFilesWithPrefix(cursorRulesSrc, cursorRulesDest, `${lang}-`);
      if (found) {
        console.log(`Installing ${lang} rules -> ${cursorRulesDest}/`);
      } else {
        console.error(`Warning: no Cursor rules for '${lang}' found, skipping.`);
      }
    }
  }
  
  // --- Agents ---
  const agentsSrc = path.join(CURSOR_SRC, 'agents');
  const agentsDest = path.join(destDir, 'agents');
  if (fs.existsSync(agentsSrc)) {
    console.log(`Installing agents -> ${agentsDest}/`);
    copyDir(agentsSrc, agentsDest);
  }
  
  // --- Skills ---
  const skillsSrc = path.join(CURSOR_SRC, 'skills');
  const skillsDest = path.join(destDir, 'skills');
  if (fs.existsSync(skillsSrc)) {
    console.log(`Installing skills -> ${skillsDest}/`);
    copyDir(skillsSrc, skillsDest);
  }
  
  // --- Commands ---
  const commandsSrc = path.join(CURSOR_SRC, 'commands');
  const commandsDest = path.join(destDir, 'commands');
  if (fs.existsSync(commandsSrc)) {
    console.log(`Installing commands -> ${commandsDest}/`);
    copyDir(commandsSrc, commandsDest);
  }
  
  // --- Hooks ---
  const hooksJsonSrc = path.join(CURSOR_SRC, 'hooks.json');
  const hooksJsonDest = path.join(destDir, 'hooks.json');
  if (fs.existsSync(hooksJsonSrc)) {
    console.log(`Installing hooks config -> ${hooksJsonDest}`);
    fs.copyFileSync(hooksJsonSrc, hooksJsonDest);
  }
  
  const hooksDirSrc = path.join(CURSOR_SRC, 'hooks');
  const hooksDirDest = path.join(destDir, 'hooks');
  if (fs.existsSync(hooksDirSrc)) {
    console.log(`Installing hook scripts -> ${hooksDirDest}/`);
    copyDir(hooksDirSrc, hooksDirDest);
  }
  
  // --- MCP Config ---
  const mcpJsonSrc = path.join(CURSOR_SRC, 'mcp.json');
  const mcpJsonDest = path.join(destDir, 'mcp.json');
  if (fs.existsSync(mcpJsonSrc)) {
    console.log(`Installing MCP config -> ${mcpJsonDest}`);
    fs.copyFileSync(mcpJsonSrc, mcpJsonDest);
  }
  
  console.log(`Done. Cursor configs installed to ${destDir}/`);
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  
  // Parse --target flag
  let target = 'claude';
  let languages = [];
  
  if (args[0] === '--target') {
    if (!args[1]) {
      console.error('Error: --target requires a value (claude or cursor)');
      process.exit(1);
    }
    target = args[1];
    
    if (target !== 'claude' && target !== 'cursor') {
      console.error(`Error: unknown target '${target}'. Must be 'claude' or 'cursor'.`);
      process.exit(1);
    }
    
    languages = args.slice(2);
  } else {
    languages = args;
  }
  
  // Show usage if no languages specified
  if (languages.length === 0) {
    printUsage();
    process.exit(1);
  }
  
  // Execute based on target
  if (target === 'claude') {
    installForClaude(languages);
  } else if (target === 'cursor') {
    installForCursor(languages);
  }
}

main();
