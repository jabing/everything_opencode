#!/usr/bin/env node
/**
 * Environment Checker for Everything OpenCode
 * 
 * Checks system requirements and provides installation guidance
 */

const os = require('os');
const { spawnSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logError(message) {
  log(`✗ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ ${message}`, 'cyan');
}

function runCommand(command) {
  const result = spawnSync(command, { shell: true, encoding: 'utf-8' });
  return { stdout: result.stdout.trim(), exitCode: result.status };
}

function checkNodeVersion() {
  const result = runCommand('node --version');
  
  if (result.exitCode !== 0) {
    return { installed: false, version: null };
  }
  
  const version = result.stdout.replace('v', '');
  const [major] = version.split('.').map(Number);
  
  return {
    installed: true,
    version,
    major,
    valid: major >= 14
  };
}

function checkNpmVersion() {
  const result = runCommand('npm --version');
  
  if (result.exitCode !== 0) {
    return { installed: false, version: null };
  }
  
  const version = result.stdout;
  const [major] = version.split('.').map(Number);
  
  return {
    installed: true,
    version,
    major,
    valid: major >= 6
  };
}

function checkOpenCode() {
  const result = runCommand('opencode --version');
  
  return {
    installed: result.exitCode === 0,
    version: result.stdout
  };
}

function checkEOC() {
  const result = runCommand('eoc-install --help');
  
  return {
    installed: result.exitCode === 0,
    version: null
  };
}

function getSystemInfo() {
  const platform = os.platform();
  const release = os.release();
  const arch = os.arch();
  
  let platformName;
  if (platform === 'win32') {
    platformName = 'Windows';
  } else if (platform === 'darwin') {
    platformName = 'macOS';
  } else if (platform === 'linux') {
    platformName = 'Linux';
  } else {
    platformName = platform;
  }
  
  return {
    platform,
    platformName,
    release,
    arch,
    nodeVersion: process.version,
    totalMemory: `${Math.round(os.totalmem() / 1024 / 1024 / 1024)}GB`,
    freeMemory: `${Math.round(os.freemem() / 1024 / 1024 / 1024)}GB`
  };
}

function main() {
  console.log('');
  log('╔═══════════════════════════════════════════════════════════╗', 'bright');
  log('║                                                           ║', 'bright');
  log('║        🔍 EOC Environment Checker                           ║', 'bright');
  log('║                                                           ║', 'bright');
  log('║    Check system requirements for Everything OpenCode       ║', 'bright');
  log('║                                                           ║', 'bright');
  log('╚═══════════════════════════════════════════════════════════╝', 'bright');
  console.log('');
  
  const systemInfo = getSystemInfo();
  
  log('System Information:', 'bright');
  log(`  OS:        ${systemInfo.platformName} ${systemInfo.release}`, 'cyan');
  log(`  Architecture: ${systemInfo.arch}`, 'cyan');
  log(`  Memory:    ${systemInfo.totalMemory} (Available: ${systemInfo.freeMemory})`, 'cyan');
  console.log('');
  
  let allPassed = true;
  
  // Check Node.js
  const nodeCheck = checkNodeVersion();
  console.log('Node.js Check:');
  if (!nodeCheck.installed) {
    logError('Node.js is not installed');
    logInfo('Install Node.js from: https://nodejs.org/');
    allPassed = false;
  } else if (!nodeCheck.valid) {
    logError(`Node.js version ${nodeCheck.version} is too old (requires v14+)`);
    logInfo('Upgrade Node.js to v14 or higher');
    allPassed = false;
  } else {
    logSuccess(`Node.js ${nodeCheck.version} installed`);
  }
  console.log('');
  
  // Check npm
  const npmCheck = checkNpmVersion();
  console.log('npm Check:');
  if (!npmCheck.installed) {
    logError('npm is not installed');
    logInfo('npm should be installed with Node.js');
    allPassed = false;
  } else if (!npmCheck.valid) {
    logError(`npm version ${npmCheck.version} is too old (requires v6+)`);
    logInfo('Upgrade npm to v6 or higher');
    allPassed = false;
  } else {
    logSuccess(`npm ${npmCheck.version} installed`);
  }
  console.log('');
  
  // Check OpenCode
  const openCodeCheck = checkOpenCode();
  console.log('OpenCode Check:');
  if (!openCodeCheck.installed) {
    logError('OpenCode is not installed');
    logInfo('Install OpenCode: npm install -g opencode');
    allPassed = false;
  } else {
    logSuccess(`OpenCode ${openCodeCheck.version} installed`);
  }
  console.log('');
  
  // Check EOC
  const eocCheck = checkEOC();
  console.log('EOC Check:');
  if (!eocCheck.installed) {
    logError('EOC is not installed');
    logInfo('Install EOC: npm install -g everything-opencode');
    allPassed = false;
  } else {
    logSuccess('EOC installed');
  }
  console.log('');
  
  // Summary
  if (allPassed) {
    log('═══════════════════════════════════════════════════════════', 'green');
    log('  ✓ All requirements met!', 'green');
    log('═══════════════════════════════════════════════════════════', 'green');
    console.log('');
    log('Next steps:', 'bright');
    log('  1. Configure DeepSeek API key in opencode.json', 'cyan');
    log('  2. Run: eoc-install in your project', 'cyan');
    log('  3. Start: opencode', 'cyan');
    console.log('');
  } else {
    log('═══════════════════════════════════════════════════════════', 'yellow');
    log('  ⚠ Some requirements are not met', 'yellow');
    log('═══════════════════════════════════════════════════════════', 'yellow');
    console.log('');
    log('Please install the missing dependencies:', 'bright');
    console.log('');
    
    if (!nodeCheck.installed) {
      log('Install Node.js:', 'bright');
      log('  • Windows: Download from https://nodejs.org/', 'cyan');
      log('  • Linux:   See docs/FULL_INSTALLATION_GUIDE.md', 'cyan');
      console.log('');
    }
    
    if (!openCodeCheck.installed) {
      log('Install OpenCode:', 'bright');
      log('  npm install -g opencode', 'cyan');
      console.log('');
    }
    
    if (!eocCheck.installed) {
      log('Install EOC:', 'bright');
      log('  npm install -g everything-opencode', 'cyan');
      console.log('');
    }
    
    log('For detailed installation instructions, see:', 'bright');
    log('  docs/FULL_INSTALLATION_GUIDE.md', 'cyan');
    console.log('');
  }
  
  process.exit(allPassed ? 0 : 1);
}

main();
