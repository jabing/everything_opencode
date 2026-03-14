#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const installDir = path.resolve(__dirname, "..");
let version = "1.9.9";
try { version = JSON.parse(fs.readFileSync(path.join(installDir, "package.json"))).version; } catch (e) {}
const suppressOutput = process.env.EOC_SKIP_POSTINSTALL_OUTPUT === "true" || process.env.npm_config_loglevel === "silent";

function getHomeDir() { return process.env.HOME || process.env.USERPROFILE || process.env.HOMEPATH; }
function dirExists(dirPath) { try { return fs.statSync(dirPath).isDirectory(); } catch { return false; } }
function fileExists(filePath) { try { return fs.statSync(filePath).isFile(); } catch { return false; } }
function ensureDir(dirPath) { if (!dirExists(dirPath)) fs.mkdirSync(dirPath, { recursive: true }); }

function copyDir(src, dest) {
  if (!dirExists(src)) return false;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const sp = path.join(src, entry.name);
    const dp = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(sp, dp);
    else if (entry.isFile() && !fileExists(dp)) {
      fs.copyFileSync(sp, dp);
    }
  }
  return true;
}

if (!suppressOutput) {
  console.log("\n🌍 Installing Easy OpenCode...");
  console.log("=================================");
}
const homeDir = getHomeDir();
const globalDir = path.join(homeDir, ".opencode");
if (!suppressOutput) console.log("📁 Installing to:", globalDir);

ensureDir(globalDir);

// Copy EOC files (only if not exists)
copyDir(path.join(installDir, ".opencode"), globalDir);
copyDir(path.join(installDir, "skills"), path.join(globalDir, "skills"));
copyDir(path.join(installDir, "commands"), path.join(globalDir, "commands"));
copyDir(path.join(installDir, "prompts"), path.join(globalDir, "prompts"));

if (fileExists(path.join(installDir, "AGENTS.md")) && !fileExists(path.join(globalDir, "AGENTS.md"))) {
  fs.copyFileSync(path.join(installDir, "AGENTS.md"), path.join(globalDir, "AGENTS.md"));
}

// Generate/merge opencode.json
const opencodeJsonPath = path.join(globalDir, "opencode.json");
let opencodeConfig = {};
if (fileExists(opencodeJsonPath)) {
  try {
    opencodeConfig = JSON.parse(fs.readFileSync(opencodeJsonPath));
    if (!suppressOutput) console.log("📝 Merging with existing opencode.json...");
  } catch (e) {
    if (!suppressOutput) console.log("⚠️  Existing opencode.json invalid, creating new...");
  }
}

// EOC default configuration - ✅ 修复路径为 ./ 开头
const eocConfig = {
  "$schema": "https://opencode.ai/config.json",
  "default_agent": "eoc_build",
  "instructions": [
    "AGENTS.md",
    "./skills/tdd-workflow/SKILL.md",
    "./skills/security-review/SKILL.md",
    "./skills/coding-standards/SKILL.md",
    "./skills/frontend-patterns/SKILL.md",
    "./skills/backend-patterns/SKILL.md",
    "./skills/e2e-testing/SKILL.md",
    "./skills/verification-loop/SKILL.md",
    "./skills/api-design/SKILL.md",
    "./skills/strategic-compact/SKILL.md",
    "./skills/eval-harness/SKILL.md"
  ],
  "agent": {
    "eoc_build": {
      "description": "EOC - Primary coding agent for development work",
      "mode": "primary",
      "tools": { "write": true, "edit": true, "bash": true, "read": true }
    },
    "eoc_planner": {
      "description": "EOC - Expert planning specialist for complex features",
      "mode": "primary",
      "prompt": "{file:./prompts/agents/planner.md}",
      "tools": { "read": true, "bash": true, "write": false, "edit": false }
    },
    "eoc_code_reviewer": {
      "description": "EOC - Expert code review specialist",
      "mode": "primary",
      "prompt": "{file:./prompts/agents/code-reviewer.md}",
      "tools": { "read": true, "bash": true, "write": false, "edit": false }
    },
    "tdd-guide": {
      "description": "TDD specialist - write tests first, 80%+ coverage",
      "hidden": true,
      "prompt": "{file:./prompts/agents/tdd-guide.md}",
      "tools": { "read": true, "write": true, "edit": true, "bash": true }
    },
    "security-reviewer": {
      "description": "Security vulnerability detection and audit",
      "hidden": true,
      "prompt": "{file:./prompts/agents/security-reviewer.md}",
      "tools": { "read": true, "bash": true, "write": false, "edit": false }
    },
    "build-error-resolver": {
      "description": "Fix build and TypeScript errors",
      "hidden": true,
      "prompt": "{file:./prompts/agents/build-error-resolver.md}",
      "tools": { "read": true, "write": true, "edit": true, "bash": true }
    }
  },
  "plugin": ["./.opencode/plugins"],
  "command": {
    "plan": { "description": "Create implementation plan", "template": "{file:./commands/plan.md}\n\n$ARGUMENTS", "agent": "eoc_planner", "subtask": true },
    "tdd": { "description": "Enforce TDD workflow", "template": "{file:./commands/tdd.md}\n\n$ARGUMENTS", "agent": "tdd-guide", "subtask": true },
    "code-review": { "description": "Review code quality", "template": "{file:./commands/code-review.md}\n\n$ARGUMENTS", "agent": "eoc_code_reviewer", "subtask": true }
  }
};

// Merge configurations (user config takes priority)
const mergedConfig = {
  ...eocConfig,
  ...opencodeConfig,
  instructions: [...new Set([...(eocConfig.instructions || []), ...(opencodeConfig.instructions || [])])],
  agent: { ...eocConfig.agent, ...opencodeConfig.agent },
  plugin: [...new Set([...(eocConfig.plugin || []), ...(opencodeConfig.plugin || [])])],
  command: { ...eocConfig.command, ...opencodeConfig.command }
};

// Save merged config
fs.writeFileSync(opencodeJsonPath, JSON.stringify(mergedConfig, null, 2) + "\n");

if (!suppressOutput) {
  console.log("\n✅ Installation complete!");
  console.log("📂 Config location:", globalDir);
  console.log("📝 opencode.json generated/merged successfully");
  console.log("\n🎉 Run: opencode, then type: /agents\n");
}
