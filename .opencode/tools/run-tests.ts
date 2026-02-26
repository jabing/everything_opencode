/**
 * Run Tests Tool
 *
 * Custom OpenCode tool to run test suites with various options.
 * Automatically detects the package manager and test framework.
 */

import { tool } from "@opencode-ai/plugin/tool"
import * as path from "path"
import * as fs from "fs"
import { execSync } from "child_process"

export default tool({
  description:
    "Run the test suite with optional coverage, watch mode, or specific test patterns. Automatically detects package manager (npm, pnpm, yarn, bun) and test framework.",
  args: {
    pattern: tool.schema
      .string()
      .optional()
      .describe("Test file pattern or specific test name to run"),
    coverage: tool.schema
      .boolean()
      .optional()
      .describe("Run with coverage reporting (default: false)"),
    watch: tool.schema
      .boolean()
      .optional()
      .describe("Run in watch mode for continuous testing (default: false)"),
    updateSnapshots: tool.schema
      .boolean()
      .optional()
      .describe("Update Jest/Vitest snapshots (default: false)"),
  },
  async execute(args, context) {
    const { pattern, coverage, watch, updateSnapshots } = args
    const cwd = context.worktree || context.directory

    // Detect package manager
    const packageManager = await detectPackageManager(cwd)

    // Detect test framework
    const testFramework = await detectTestFramework(cwd)

    // Build command
    let cmd: string[] = [packageManager]

    if (packageManager === "npm") {
      cmd.push("run", "test")
    } else {
      cmd.push("test")
    }

    // Add options based on framework
    const testArgs: string[] = []

    if (coverage) {
      testArgs.push("--coverage")
    }

    if (watch) {
      testArgs.push("--watch")
    }

    if (updateSnapshots) {
      testArgs.push("-u")
    }

    if (pattern) {
      if (testFramework === "jest" || testFramework === "vitest") {
        testArgs.push("--testPathPattern", pattern)
      } else {
        testArgs.push(pattern)
      }
    }

    // Add -- separator for npm
    if (testArgs.length > 0) {
      if (packageManager === "npm") {
        cmd.push("--")
      }
      cmd.push(...testArgs)
    }

    const command = cmd.join(" ")

    return JSON.stringify({
      command,
      packageManager,
      testFramework,
      options: {
        pattern: pattern || "all tests",
        coverage: coverage || false,
        watch: watch || false,
        updateSnapshots: updateSnapshots || false,
      },
      instructions: `Run this command to execute tests:\n\n${command}`,
    })
  },
})

/**
 * Check if a command/binary is available on the system.
 * Cross-platform: uses Node.js stdio handling to avoid shell redirect issues
 * on Windows + Git Bash where `2>nul` creates an actual file.
 */
function isCommandAvailable(command: string): boolean {
  try {
    const checkCmd = process.platform === "win32" ? "where" : "which"
    execSync(`${checkCmd} ${command}`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],  // stdin, stdout, stderr (ignore)
      windowsHide: true,
    })
    return true
  } catch {
    return false
  }
}

/**
 * Detect package manager from lock files and environment
 * Priority:
 * 1. CLAUDE_PACKAGE_MANAGER env var (if valid and available)
 * 2. Lock file detection (must be available on system)
 * 3. Fallback to npm (always available with Node.js)
 */
async function detectPackageManager(cwd: string): Promise<string> {
  // Check environment variable first
  const envPm = process.env.CLAUDE_PACKAGE_MANAGER
  if (envPm && ["npm", "pnpm", "yarn", "bun"].includes(envPm)) {
    if (envPm === "npm" || isCommandAvailable(envPm)) {
      return envPm
    }
  }

  // Lock file to package manager mapping (ordered by preference)
  // Note: bun.lock is the new text-based format (bun 1.0+), bun.lockb is legacy binary format
  const lockFileMappings: Array<{ file: string; pm: string }> = [
    { file: "package-lock.json", pm: "npm" },    // npm - most common, always available
    { file: "pnpm-lock.yaml", pm: "pnpm" },
    { file: "yarn.lock", pm: "yarn" },
    { file: "bun.lock", pm: "bun" },           // bun 1.0+ (text format)
    { file: "bun.lockb", pm: "bun" },          // bun < 1.0 (binary format)
  ]

  // Check lock files in order
  for (const { file, pm } of lockFileMappings) {
    if (fs.existsSync(path.join(cwd, file))) {
      // Verify the package manager is actually available on this system
      if (pm === "npm" || isCommandAvailable(pm)) {
        return pm
      }
      // Package manager not available, continue to next option
    }
  }

  // Fallback to npm (always available with Node.js)
  return "npm"
}

async function detectTestFramework(cwd: string): Promise<string> {
  const packageJsonPath = path.join(cwd, "package.json")

  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))
      const deps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      }

      if (deps.vitest) return "vitest"
      if (deps.jest) return "jest"
      if (deps.mocha) return "mocha"
      if (deps.ava) return "ava"
      if (deps.tap) return "tap"
    } catch {
      // Ignore parse errors
    }
  }

  return "unknown"
}
