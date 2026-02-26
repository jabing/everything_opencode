#!/usr/bin/env node
/**
 * Everything OpenCode Installation Script
 * 
 * Allows users to choose between:
 * - Project-level installation (current project only)
 * - Global installation (all projects)
 */
const fs = require('fs')
const path = require('path')
const readline = require('readline')

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green')
}

function logError(message) {
  log(`✗ ${message}`, 'red')
}

function logInfo(message) {
  log(`ℹ ${message}`, 'cyan')
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow')
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

/**
 * Prompt user for input
 */
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim())
    })
  })
}

/**
 * Get user's home directory cross-platform
 */
function getHomeDir() {
  return process.env.HOME || process.env.USERPROFILE || process.env.HOMEPATH
}

/**
 * Get global OpenCode config directory
 */
function getGlobalConfigDir() {
  const homeDir = getHomeDir()
  return path.join(homeDir, '.opencode')
}

/**
 * Check if a directory exists
 */
function dirExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory()
  } catch {
    return false
  }
}

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile()
  } catch {
    return false
  }
}

/**
 * Ensure directory exists
 */
function ensureDir(dirPath) {
  if (!dirExists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * Recursively copy a directory
 */
function copyDir(src, dest) {
  if (!dirExists(src)) {
    return false
  }

  ensureDir(dest)

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath)
    }
  }

  return true
}

/**
 * Read JSON file
 */
function readJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content)
  } catch {
    return null
  }
}

/**
 * Write JSON file
 */
function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
}

/**
 * Install at project level
 */
async function installProjectLevel() {
  log('\n📦 Installing Everything OpenCode at PROJECT level...\n', 'bright')
  
  const projectDir = process.cwd()
  const opencodeJsonPath = path.join(projectDir, 'opencode.json')
  
  // Check if opencode.json exists
  if (!fileExists(opencodeJsonPath)) {
    logInfo('Creating opencode.json...')
    
    const config = {
      "$schema": "https://opencode.ai/config.json",
      "plugin": ["./.opencode/plugins"],
      "instructions": [
        "./AGENTS.md",
        "./.opencode/instructions/INSTRUCTIONS.md"
      ]
    }
    
    writeJson(opencodeJsonPath, config)
    logSuccess('Created opencode.json')
  } else {
    // Update existing config
    const config = readJson(opencodeJsonPath)
    
    if (config) {
      // Ensure plugin array exists
      if (!config.plugin) {
        config.plugin = []
      }
      
      // Add EOC plugin if not already present
      const pluginPath = './.opencode/plugins'
      if (!config.plugin.includes(pluginPath)) {
        config.plugin.push(pluginPath)
        writeJson(opencodeJsonPath, config)
        logSuccess('Added EOC plugin to opencode.json')
      } else {
        logInfo('EOC plugin already configured in opencode.json')
      }
    }
  }
  
  logSuccess('Project-level installation complete!')
  logInfo('Run "opencode" in this directory to start.')
  
  return true
}

/**
 * Install globally
 */
async function installGlobal() {
  log('\n🌍 Installing Everything OpenCode GLOBALLY...\n', 'bright')
  
  const globalConfigDir = getGlobalConfigDir()
  const globalConfigPath = path.join(globalConfigDir, 'opencode.json')
  
  logInfo(`Global config directory: ${globalConfigDir}`)
  
  // Ensure global config directory exists
  ensureDir(globalConfigDir)
  
  const projectDir = process.cwd()
  const pluginsDir = path.join(projectDir, '.opencode')
  const skillsDir = path.join(projectDir, 'skills')
  const commandsDir = path.join(projectDir, 'commands')
  const agentsMdPath = path.join(projectDir, 'AGENTS.md')
  
  // Copy directories to global config location
  logInfo('Copying OpenCode configuration...')
  copyDir(pluginsDir, path.join(globalConfigDir, '.opencode'))

  // Copy instructions directory separately
  const instructionsDir = path.join(projectDir, '.opencode', 'instructions')
  if (dirExists(instructionsDir)) {
    logInfo('Copying instructions...')
    copyDir(instructionsDir, path.join(globalConfigDir, 'instructions'))
  }

  logInfo('Copying skills...')
  copyDir(skillsDir, path.join(globalConfigDir, 'skills'))
  
  logInfo('Copying commands...')
  copyDir(commandsDir, path.join(globalConfigDir, 'commands'))
  
  if (fileExists(agentsMdPath)) {
    logInfo('Copying AGENTS.md...')
    fs.copyFileSync(agentsMdPath, path.join(globalConfigDir, 'AGENTS.md'))
  }
  
  // Copy prompts directory (needed for agent prompts)
  const promptsDir = path.join(projectDir, 'prompts')
  if (dirExists(promptsDir)) {
    logInfo('Copying prompts...')
    copyDir(promptsDir, path.join(globalConfigDir, 'prompts'))
  }

  // Update global opencode.json with agent definitions
  // Primary agents (visible in /Agents)
  // Hidden agents (only accessible via commands, use hidden: true)
  const config = {
    $schema: 'https://opencode.ai/config.json',
    instructions: [
      'AGENTS.md',
      'skills/tdd-workflow/SKILL.md',
      'skills/security-review/SKILL.md',
      'skills/coding-standards/SKILL.md',
      'skills/frontend-patterns/SKILL.md',
      'skills/backend-patterns/SKILL.md',
      'skills/e2e-testing/SKILL.md',
      'skills/verification-loop/SKILL.md',
      'skills/api-design/SKILL.md',
      'skills/strategic-compact/SKILL.md',
      'skills/eval-harness/SKILL.md'
    ],
    default_agent: 'eoc_build',
    agent: {
      // === PRIMARY AGENTS (visible) ===
      eoc_build: {
        description: 'EOC - Primary coding agent for development work',
        mode: 'primary',
        tools: { write: true, edit: true, bash: true, read: true }
      },
      'eoc_planner': {
        description: 'EOC - Expert planning specialist for complex features',
        mode: 'primary',
        prompt: '{file:prompts/agents/planner.md}',
        tools: { read: true, bash: true, write: false, edit: false }
      },
      'eoc_code-reviewer': {
        description: 'EOC - Expert code review specialist',
        mode: 'primary',
        prompt: '{file:prompts/agents/code-reviewer.md}',
        tools: { read: true, bash: true, write: false, edit: false }
      },
      // === HIDDEN AGENTS (command-only) ===
      'tdd-guide': {
        description: 'TDD specialist - write tests first, 80%+ coverage',
        hidden: true,
        prompt: '{file:prompts/agents/tdd-guide.md}',
        tools: { read: true, write: true, edit: true, bash: true }
      },
      'security-reviewer': {
        description: 'Security vulnerability detection and audit',
        hidden: true,
        prompt: '{file:prompts/agents/security-reviewer.md}',
        tools: { read: true, bash: true, write: false, edit: false }
      },
      'build-error-resolver': {
        description: 'Fix build and TypeScript errors',
        hidden: true,
        prompt: '{file:prompts/agents/build-error-resolver.md}',
        tools: { read: true, write: true, edit: true, bash: true }
      },
      'e2e-runner': {
        description: 'End-to-end Playwright testing',
        hidden: true,
        prompt: '{file:prompts/agents/e2e-runner.md}',
        tools: { read: true, write: true, edit: true, bash: true }
      },
      'refactor-cleaner': {
        description: 'Remove dead code and consolidate duplicates',
        hidden: true,
        prompt: '{file:prompts/agents/refactor-cleaner.md}',
        tools: { read: true, write: true, edit: true, bash: true }
      },
      'doc-updater': {
        description: 'Documentation and codemap updates',
        hidden: true,
        prompt: '{file:prompts/agents/doc-updater.md}',
        tools: { read: true, write: true, edit: true, bash: true }
      },
      'go-reviewer': {
        description: 'Go code review specialist',
        hidden: true,
        prompt: '{file:prompts/agents/go-reviewer.md}',
        tools: { read: true, bash: true, write: false, edit: false }
      },
      'go-build-resolver': {
        description: 'Fix Go build errors',
        hidden: true,
        prompt: '{file:prompts/agents/go-build-resolver.md}',
        tools: { read: true, write: true, edit: true, bash: true }
      },
      'database-reviewer': {
        description: 'PostgreSQL/Supabase schema and query optimization',
        hidden: true,
        prompt: '{file:prompts/agents/database-reviewer.md}',
        tools: { read: true, bash: true, write: false, edit: false }
      },
      'architect': {
        description: 'System design and scalability decisions',
        hidden: true,
        prompt: '{file:prompts/agents/architect.md}',
        tools: { read: true, bash: true, write: false, edit: false }
      },
      'python-reviewer': {
        description: 'Python code review specialist',
        hidden: true,
        prompt: '{file:prompts/agents/python-reviewer.md}',
        tools: { read: true, bash: true, write: false, edit: false }
      }
    },
    plugin: ['.opencode'],
    command: {
      plan: {
        description: 'Create a detailed implementation plan for complex features',
        template: '{file:commands/plan.md}\n\n$ARGUMENTS',
        agent: 'eoc_planner',
        subtask: true
      },
      tdd: {
        description: 'Enforce TDD workflow with 80%+ test coverage',
        template: '{file:commands/tdd.md}\n\n$ARGUMENTS',
        agent: 'tdd-guide',
        subtask: true
      },
      'code-review': {
        description: 'Review code for quality, security, and maintainability',
        template: '{file:commands/code-review.md}\n\n$ARGUMENTS',
        agent: 'eoc_code-reviewer',
        subtask: true
      },
      security: {
        description: 'Run comprehensive security review',
        template: '{file:commands/security.md}\n\n$ARGUMENTS',
        agent: 'security-reviewer',
        subtask: true
      },
      'build-fix': {
        description: 'Fix build and TypeScript errors with minimal changes',
        template: '{file:commands/build-fix.md}\n\n$ARGUMENTS',
        agent: 'build-error-resolver',
        subtask: true
      },
      e2e: {
        description: 'Generate and run E2E tests with Playwright',
        template: '{file:commands/e2e.md}\n\n$ARGUMENTS',
        agent: 'e2e-runner',
        subtask: true
      },
      'refactor-clean': {
        description: 'Remove dead code and consolidate duplicates',
        template: '{file:commands/refactor-clean.md}\n\n$ARGUMENTS',
        agent: 'refactor-cleaner',
        subtask: true
      },
      orchestrate: {
        description: 'Orchestrate multiple agents for complex tasks',
        template: '{file:commands/orchestrate.md}\n\n$ARGUMENTS',
        agent: 'eoc_planner',
        subtask: true
      },
      'update-docs': {
        description: 'Update documentation',
        template: '{file:commands/update-docs.md}\n\n$ARGUMENTS',
        agent: 'doc-updater',
        subtask: true
      },
      'update-codemaps': {
        description: 'Update codemaps',
        template: '{file:commands/update-codemaps.md}\n\n$ARGUMENTS',
        agent: 'doc-updater',
        subtask: true
      },
      'test-coverage': {
        description: 'Analyze test coverage',
        template: '{file:commands/test-coverage.md}\n\n$ARGUMENTS',
        agent: 'tdd-guide',
        subtask: true
      },
      'go-review': {
        description: 'Go code review',
        template: '{file:commands/go-review.md}\n\n$ARGUMENTS',
        agent: 'go-reviewer',
        subtask: true
      },
      'go-test': {
        description: 'Go TDD workflow',
        template: '{file:commands/go-test.md}\n\n$ARGUMENTS',
        agent: 'tdd-guide',
        subtask: true
      },
      'go-build': {
        description: 'Fix Go build errors',
        template: '{file:commands/go-build.md}\n\n$ARGUMENTS',
        agent: 'go-build-resolver',
        subtask: true
      }
    }
  }
  writeJson(globalConfigPath, config)
  logSuccess('Updated global opencode.json')
  logSuccess('\nGlobal installation complete!')
  logInfo('EOC is now available in ALL your projects.')
  logInfo(`Global config location: ${globalConfigDir}`)
  
  return true
}

/**
 * Main installation flow
 */
async function main() {
  console.log('')
  log('╔═══════════════════════════════════════════════════════════╗', 'bright')
  log('║                                                           ║', 'bright')
  log('║        🚀 Everything OpenCode Installer                   ║', 'bright')
  log('║                                                           ║', 'bright')
  log('║     AI-powered development agents for OpenCode            ║', 'bright')
  log('║                                                           ║', 'bright')
  log('╚═══════════════════════════════════════════════════════════╝', 'bright')
  console.log('')
  
  log('Choose installation type:\n', 'bright')
  log('  1) Project-level (recommended)', 'cyan')
  log('     • Only affects current project', 'blue')
  log('     • Full control over configuration', 'blue')
  log('     • Different versions per project\n', 'blue')
  
  log('  2) Global', 'cyan')
  log('     • Available in ALL projects', 'blue')
  log('     • Single installation', 'blue')
  log('     • Unified configuration\n', 'blue')
  
  const answer = await prompt('Enter your choice (1 or 2): ')
  
  let success = false
  
  switch (answer) {
    case '1':
      success = await installProjectLevel()
      break
    case '2':
      success = await installGlobal()
      break
    default:
      logError('\nInvalid choice. Please run the installer again and enter 1 or 2.')
      rl.close()
      process.exit(1)
  }
  
  rl.close()
  
  if (success) {
    console.log('')
    log('═══════════════════════════════════════════════════════════', 'green')
    log('  ✓ Installation Complete!', 'green')
    log('═══════════════════════════════════════════════════════════', 'green')
    console.log('')
    log('Available agents: planner, architect, tdd-guide, code-reviewer,', 'cyan')
    log('                  security-reviewer, build-error-resolver, e2e-runner,', 'cyan')
    log('                  refactor-cleaner, doc-updater, go-reviewer,', 'cyan')
    log('                  go-build-resolver, database-reviewer', 'cyan')
    console.log('')
    log('Available commands: /plan, /tdd, /code-review, /security,', 'cyan')
    log('                    /build-fix, /e2e, /refactor-clean, /orchestrate,', 'cyan')
    log('                    /verify, and more...', 'cyan')
    console.log('')
    logHappyCoding()
  }
  
  process.exit(success ? 0 : 1)
}

function logHappyCoding() {
  log('Happy coding! 🎉', 'green')
}

// Handle Ctrl+C gracefully
rl.on('close', () => {
  // Ensure readline is closed
})

// Run main
main().catch((error) => {
  logError(`Installation failed: ${error.message}`)
  rl.close()
  process.exit(1)
})
