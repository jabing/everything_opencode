/**
 * EOC Custom Tool: Lint Check
 *
 * Multi-language linter that auto-detects the project's linting tool.
 * Supports: ESLint/Biome (JS/TS), Pylint/Ruff (Python), golangci-lint (Go)
 */

import { tool } from "@opencode-ai/plugin"
import { z } from "zod"
import { spawnSync } from "child_process"

/**
 * Validates a target path to prevent command injection.
 * Uses allowlist approach - only safe characters permitted.
 */
function validateTarget(path: string): string {
  // Allowlist: only alphanumeric, dash, underscore, dot, forward slash, backslash
  // Also allow space for paths like "my directory/"
  const safePattern = /^[a-zA-Z0-9_\-./\\ ]+$/
  if (!safePattern.test(path)) {
    throw new Error(`Invalid target path: contains unsafe characters`)
  }
  return path
}

export default tool({
  name: "lint-check",
  description: "Run linter on files or directories. Auto-detects ESLint, Biome, Ruff, Pylint, or golangci-lint.",
  parameters: z.object({
    target: z.string().optional().describe("File or directory to lint (default: current directory)"),
    fix: z.boolean().optional().describe("Auto-fix issues if supported (default: false)"),
    linter: z.string().optional().describe("Override linter: eslint, biome, ruff, pylint, golangci-lint (default: auto-detect)"),
  }),
  execute: async ({ target = ".", fix = false, linter }, { $ }) => {
    // Validate target path for security
    try {
      validateTarget(target)
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }

    // Auto-detect linter
    let detected = linter
    if (!detected) {
      try {
        await $`test -f biome.json || test -f biome.jsonc`
        detected = "biome"
      } catch {
        try {
          await $`test -f .eslintrc.json || test -f .eslintrc.js || test -f .eslintrc.cjs || test -f eslint.config.js || test -f eslint.config.mjs`
          detected = "eslint"
        } catch {
          try {
            await $`test -f pyproject.toml && grep -q "ruff" pyproject.toml`
            detected = "ruff"
          } catch {
            try {
              await $`test -f .golangci.yml || test -f .golangci.yaml`
              detected = "golangci-lint"
            } catch {
              // Fall back based on file extensions in target
              detected = "eslint"
            }
          }
        }
      }
    }

    // Build command arrays for safe execution
    const commands: Record<string, string[]> = {
      biome: fix 
        ? ["npx", "@biomejs/biome", "lint", "--write", target]
        : ["npx", "@biomejs/biome", "lint", target],
      eslint: fix 
        ? ["npx", "eslint", "--fix", target]
        : ["npx", "eslint", target],
      ruff: fix 
        ? ["ruff", "check", "--fix", target]
        : ["ruff", "check", target],
      pylint: ["pylint", target],
      "golangci-lint": fix 
        ? ["golangci-lint", "run", "--fix", target]
        : ["golangci-lint", "run", target],
    }

    const cmdArgs = commands[detected]
    if (!cmdArgs) {
      return { success: false, message: `Unknown linter: ${detected}` }
    }

    try {
      // Use spawnSync with array args to prevent command injection
      const result = spawnSync(cmdArgs[0], cmdArgs.slice(1), {
        cwd: process.cwd(),
        stdio: 'pipe',
        shell: false
      })

      if (result.status === 0) {
        return { success: true, linter: detected, output: result.stdout?.toString() || '', issues: 0 }
      } else {
        return {
          success: false,
          linter: detected,
          output: result.stdout?.toString() || "",
          errors: result.stderr?.toString() || "",
        }
      }
    } catch (error: unknown) {
      const err = error as { message?: string }
      return {
        success: false,
        linter: detected,
        output: "",
        errors: err.message || "Lint check failed",
      }
    }
  },
})
