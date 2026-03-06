#!/usr/bin/env node
/**
 * Hook Configuration Management Script
 * 
 * Manages hook runtime configuration via environment variables and config file.
 */
const fs = require("fs");
const path = require("path");

const CONFIG_FILE = path.join(__dirname, "..", ".opencode", "hooks-config.json");

const PROFILES = ["minimal", "standard", "strict"];

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
  } catch (error) {
    return { profile: "standard", disabled: [], overrides: {} };
  }
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2) + "\n");
}

function getProfile() {
  return process.env.ECC_HOOK_PROFILE || loadConfig().profile || "standard";
}

function setProfile(profile) {
  if (!PROFILES.includes(profile)) {
    console.error(`Invalid profile: ${profile}. Valid options: ${PROFILES.join(", ")}`);
    process.exit(1);
  }
  const config = loadConfig();
  config.profile = profile;
  saveConfig(config);
  console.log(`Hook profile set to: ${profile}`);
}

function getDisabledHooks() {
  const envHooks = process.env.ECC_DISABLED_HOOKS;
  if (envHooks) {
    return envHooks.split(",").map(h => h.trim()).filter(h => h);
  }
  return loadConfig().disabled || [];
}

function disableHooks(hooks) {
  const config = loadConfig();
  hooks.forEach(hook => {
    if (!config.disabled.includes(hook)) {
      config.disabled.push(hook);
    }
  });
  saveConfig(config);
  console.log(`Disabled hooks: ${hooks.join(", ")}`);
}

function enableHooks(hooks) {
  const config = loadConfig();
  if (hooks.includes("all")) {
    config.disabled = [];
    console.log("Enabled all hooks");
  } else {
    config.disabled = config.disabled.filter(h => !hooks.includes(h));
    console.log(`Enabled hooks: ${hooks.join(", ")}`);
  }
  saveConfig(config);
}

function getStatus() {
  const config = loadConfig();
  const envProfile = process.env.ECC_HOOK_PROFILE;
  const envDisabled = process.env.ECC_DISABLED_HOOKS;
  
  console.log("\n=== Hook Configuration Status ===\n");
  console.log(`Profile (file): ${config.profile}`);
  if (envProfile) {
    console.log(`Profile (env):   ${envProfile} (overrides file)`);
  }
  console.log(`\nDisabled hooks (${config.disabled.length}):`);
  if (config.disabled.length === 0) {
    console.log("  (none)");
  } else {
    config.disabled.forEach(h => console.log(`  - ${h}`));
  }
  if (envDisabled) {
    console.log(`\nDisabled by env (${envDisabled}):`);
    envDisabled.split(",").forEach(h => console.log(`  - ${h.trim()}`));
  }
  console.log("");
}

function showHelp() {
  console.log(`
Hook Configuration Management

Usage:
  node hooks-config.js profile <minimal|standard|strict>  Set profile
  node hooks-config.js disable <hook1,hook2,...>         Disable hooks
  node hooks-config.js enable <hook1,hook2,...|all>      Enable hooks
  node hooks-config.js status                            Show status
  node hooks-config.js help                              Show this help

Environment Variables:
  ECC_HOOK_PROFILE       Set profile (minimal|standard|strict)
  ECC_DISABLED_HOOKS     Comma-separated list of disabled hooks

Examples:
  node hooks-config.js profile strict
  node hooks-config.js disable pre:bash:security-scan
  node hooks-config.js enable all
  node hooks-config.js status
`);
}

// CLI
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "profile":
    setProfile(args[1]);
    break;
  case "disable":
    if (args[1]) disableHooks(args[1].split(","));
    break;
  case "enable":
    if (args[1]) enableHooks(args[1].split(","));
    break;
  case "status":
    getStatus();
    break;
  case "help":
  default:
    showHelp();
}
