/**
 * EOC Custom Tool: Lint Check
 *
 * Multi-language linter that auto-detects the project's linting tool.
 * Supports: ESLint/Biome (JS/TS), Pylint/Ruff (Python), golangci-lint (Go)
 */

import { tool } from "@opencode-ai/plugin"
import { z } from "zod"
import { spawnSync } from "child_process"
import * as fs from "fs"
import { validatePath } from "../lib/validation"

export default tool({
  name: "lint-check",
  description: "Run linter on files or directories. Auto-detects ESLint, Biome, Ruff, Pylint, or golangci-lint.",
  parameters: z.object({
    target: z.string().optional().describe("File or directory to lint (default: current directory)"),
    fix: z.boolean().optional().describe("Auto-fix issues if supported (default: false)"),
    linter: z.string().optional().describe("Override linter: eslint, biome, ruff, pylint, golangci-lint (default: auto-detect)"),
  }),
  execute: async ({ target = ".", fix = false, linter }) => {
    // Validate target path for security
    try {
      validatePath(target)
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }

    // Auto-detect linter using cross-platform fs.existsSync
    let detected = linter
    if (!detected) {
      // Check for Biome config
      if (fs.existsSync('biome.json') || fs.existsSync('biome.jsonc')) {
        detected = "biome"
      }
      // Check for ESLint config
      else if (
        fs.existsSync('.eslintrc.json') ||
        fs.existsSync('.eslintrc.js') ||
        fs.existsSync('.eslintrc.cjs') ||
        fs.existsSync('eslint.config.js') ||
        fs.existsSync('eslint.config.mjs')
      ) {
        detected = "eslint"
      }
      // Check for Ruff in pyproject.toml
      else if (fs.existsSync('pyproject.toml')) {
        try {
          const content = fs.readFileSync('pyproject.toml', 'utf-8')
          if (content.includes('ruff')) {
            detected = "ruff"
          }
        } catch {
          // Ignore read errors
        }
      }
      // Check for golangci-lint config
      else if (fs.existsSync('.golangci.yml') || fs.existsSync('.golangci.yaml')) {
        detected = "golangci-lint"
      }
      // Fall back to eslint
      else {
        detected = "eslint"
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