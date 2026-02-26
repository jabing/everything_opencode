#!/usr/bin/env node
/**
 * Everything OpenCode Uninstallation Script
 * 
 * Removes all EOC files from global config directory
 * while preserving user's other configurations
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
 * Recursively delete a directory
 */
function removeDir(dirPath) {
  if (!dirExists(dirPath)) {
    return false
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      removeDir(fullPath)
    } else if (entry.isFile()) {
      fs.unlinkSync(fullPath)
    }
  }

  fs.rmdirSync(dirPath)
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
 * EOC-specific directories and files to remove
 */
const EOC_DIRS = [
  'prompts',        // EOC prompt files
  'skills',         // EOC skills
  'commands',       // EOC commands
  'agents',         // EOC agents (old version)
  'instructions',   // EOC instructions (old version)
  '.opencode',      // EOC plugin directory
]

const EOC_FILES = [
  'AGENTS.md',      // EOC agent instructions
]

// EOC agent names to remove from config
const EOC_AGENTS = [
  'eoc_build',
  'eoc_planner',
  'eoc_code-reviewer',
  'tdd-guide',
  'security-reviewer',
  'build-error-resolver',
  'e2e-runner',
  'refactor-cleaner',
  'doc-updater',
  'go-reviewer',
  'go-build-resolver',
  'database-reviewer',
  'architect',
  'python-reviewer',
]

// EOC plugin reference
const EOC_PLUGIN = '.opencode'

/**
 * Remove EOC agents from opencode.json while preserving other config
 */
function cleanConfig(globalConfigPath) {
  if (!fileExists(globalConfigPath)) {
    logInfo('No opencode.json found, skipping config cleanup')
    return false
  }

  const config = readJson(globalConfigPath)
  if (!config) {
    logWarning('Could not read opencode.json, skipping')
    return false
  }

  let modified = false

  // Remove EOC agents
  if (config.agent) {
    for (const agentName of EOC_AGENTS) {
      if (config.agent[agentName]) {
        delete config.agent[agentName]
        logInfo(`Removed agent: ${agentName}`)
        modified = true
      }
    }

    // Clean up empty agent object
    if (Object.keys(config.agent).length === 0) {
      delete config.agent
    }
  }

  // Remove EOC plugin reference
  if (config.plugin && Array.isArray(config.plugin)) {
    const originalLength = config.plugin.length
    config.plugin = config.plugin.filter(p => p !== EOC_PLUGIN && p !== './.opencode')
    
    if (config.plugin.length !== originalLength) {
      logInfo('Removed EOC plugin reference')
      modified = true
    }

    // Clean up empty plugin array
    if (config.plugin.length === 0) {
      delete config.plugin
    }
  }

  // Remove default_agent if it was EOC
  if (config.default_agent && EOC_AGENTS.includes(config.default_agent)) {
    delete config.default_agent
    logInfo('Removed EOC default_agent setting')
    modified = true
  }

  // Save modified config
  if (modified) {
    // Check if config is now empty or minimal
    const remainingKeys = Object.keys(config)
    if (remainingKeys.length === 0 || (remainingKeys.length === 1 && remainingKeys[0] === '$schema')) {
      // Config is empty, backup and remove
      const backupPath = `${globalConfigPath}.eoc-backup`
      fs.copyFileSync(globalConfigPath, backupPath)
      logInfo(`Created backup: ${backupPath}`)
      
      // Remove the file
      fs.unlinkSync(globalConfigPath)
      logSuccess('Removed empty opencode.json')
    } else {
      // Save cleaned config
      writeJson(globalConfigPath, config)
      logSuccess('Cleaned opencode.json (preserved other settings)')
    }
  } else {
    logInfo('No EOC configuration found in opencode.json')
  }

  return modified
}

/**
 * Main uninstallation flow
 */
async function main() {
  console.log('')
  log('╔═══════════════════════════════════════════════════════════╗', 'bright')
  log('║                                                           ║', 'bright')
  log('║        🗑️  Everything OpenCode Uninstaller                ║', 'bright')
  log('║                                                           ║', 'bright')
  log('║     Remove EOC from global OpenCode configuration         ║', 'bright')
  log('║                                                           ║', 'bright')
  log('╚═══════════════════════════════════════════════════════════╝', 'bright')
  console.log('')

  const globalConfigDir = getGlobalConfigDir()
  const globalConfigPath = path.join(globalConfigDir, 'opencode.json')

  logInfo(`Global config directory: ${globalConfigDir}`)
  console.log('')

  if (!dirExists(globalConfigDir)) {
    logWarning('Global OpenCode directory does not exist.')
    logInfo('Nothing to uninstall.')
    rl.close()
    process.exit(0)
  }

  log('This will remove:', 'yellow')
  for (const dir of EOC_DIRS) {
    const dirPath = path.join(globalConfigDir, dir)
    if (dirExists(dirPath)) {
      log(`  - Directory: ${dir}/`, 'blue')
    }
  }
  for (const file of EOC_FILES) {
    const filePath = path.join(globalConfigDir, file)
    if (fileExists(filePath)) {
      log(`  - File: ${file}`, 'blue')
    }
  }
  log(`  - EOC configuration from opencode.json`, 'blue')
  console.log('')

  logWarning('Your other OpenCode settings will be preserved.')
  console.log('')

  const answer = await prompt('Continue with uninstall? (y/N): ')

  if (answer.toLowerCase() !== 'y') {
    log('\nUninstall cancelled.', 'yellow')
    rl.close()
    process.exit(0)
  }

  console.log('')
  log('Removing Everything OpenCode...\n', 'bright')

  // Remove EOC directories
  for (const dir of EOC_DIRS) {
    const dirPath = path.join(globalConfigDir, dir)
    if (dirExists(dirPath)) {
      try {
        removeDir(dirPath)
        logSuccess(`Removed: ${dir}/`)
      } catch (error) {
        logError(`Failed to remove ${dir}/: ${error.message}`)
      }
    } else {
      logInfo(`Not found: ${dir}/`)
    }
  }

  // Remove EOC files
  for (const file of EOC_FILES) {
    const filePath = path.join(globalConfigDir, file)
    if (fileExists(filePath)) {
      try {
        fs.unlinkSync(filePath)
        logSuccess(`Removed: ${file}`)
      } catch (error) {
        logError(`Failed to remove ${file}: ${error.message}`)
      }
    } else {
      logInfo(`Not found: ${file}`)
    }
  }

  // Clean config file
  console.log('')
  log('Cleaning configuration...', 'bright')
  cleanConfig(globalConfigPath)

  // Check if global dir is now empty (except for opencode.json and backup)
  const remainingEntries = fs.readdirSync(globalConfigDir)
    .filter(e => e !== 'opencode.json' && !e.endsWith('.eoc-backup'))
  
  if (remainingEntries.length === 0 && !fileExists(globalConfigPath)) {
    console.log('')
    logInfo('Global config directory is now empty.')
    const removeDirAnswer = await prompt('Remove the entire .opencode directory? (y/N): ')
    if (removeDirAnswer.toLowerCase() === 'y') {
      removeDir(globalConfigDir)
      logSuccess('Removed: .opencode/')
    }
  }

  console.log('')
  log('═══════════════════════════════════════════════════════════', 'green')
  log('  ✓ Uninstallation Complete!', 'green')
  log('═══════════════════════════════════════════════════════════', 'green')
  console.log('')
  log('Everything OpenCode has been removed from your system.', 'cyan')
  log('Your other OpenCode settings have been preserved.', 'cyan')
  console.log('')

  rl.close()
  process.exit(0)
}

// Handle Ctrl+C gracefully
rl.on('close', () => {
  // Ensure readline is closed
})

// Run main
main().catch((error) => {
  logError(`Uninstallation failed: ${error.message}`)
  rl.close()
  process.exit(1)
})
