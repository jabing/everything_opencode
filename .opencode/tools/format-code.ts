/**
 * ECC Custom Tool: Format Code
 *
 * Language-aware code formatter that auto-detects the project's formatter.
 * Supports: Biome/Prettier (JS/TS), Black (Python), gofmt (Go), rustfmt (Rust)
 */

import { tool } from "@opencode-ai/plugin"
import { z } from "zod"
import { spawnSync } from "child_process"

/**
 * Validates a file path to prevent command injection.
 * Uses allowlist approach - only safe characters permitted.
 */
function validatePath(path: string): string {
  // Allowlist: only alphanumeric, dash, underscore, dot, forward slash, backslash
  const safePattern = /^[a-zA-Z0-9_\-./\\]+$/
  if (!safePattern.test(path)) {
    throw new Error(`Invalid file path: contains unsafe characters`)
  }
  return path
}

export default tool({
  name: "format-code",
  description: "Format a file using the project's configured formatter. Auto-detects Biome, Prettier, Black, gofmt, or rustfmt.",
  parameters: z.object({
    filePath: z.string().describe("Path to the file to format"),
    formatter: z.string().optional().describe("Override formatter: biome, prettier, black, gofmt, rustfmt (default: auto-detect)"),
  }),
  execute: async ({ filePath, formatter }, { $ }) => {
    const ext = filePath.split(".").pop()?.toLowerCase() || ""

    // Validate file path for security
    try {
      validatePath(filePath)
    } catch (error) {
      return { formatted: false, error: (error as Error).message }
    }

    // Auto-detect formatter based on file extension and config files
    let detected = formatter
    if (!detected) {
      if (["ts", "tsx", "js", "jsx", "json", "css", "scss"].includes(ext)) {
        // Check for Biome first, then Prettier
        try {
          await $`test -f biome.json || test -f biome.jsonc`
          detected = "biome"
        } catch {
          detected = "prettier"
        }
      } else if (["py", "pyi"].includes(ext)) {
        detected = "black"
      } else if (ext === "go") {
        detected = "gofmt"
      } else if (ext === "rs") {
        detected = "rustfmt"
      }
    }

    if (!detected) {
      return { formatted: false, message: `No formatter detected for .${ext} files` }
    }

    // Define commands as arrays for safe execution
    const commands: Record<string, string[]> = {
      biome: ["npx", "@biomejs/biome", "format", "--write", filePath],
      prettier: ["npx", "prettier", "--write", filePath],
      black: ["black", filePath],
      gofmt: ["gofmt", "-w", filePath],
      rustfmt: ["rustfmt", filePath],
    }

    const cmdArgs = commands[detected]
    if (!cmdArgs) {
      return { formatted: false, message: `Unknown formatter: ${detected}` }
    }

    try {
      // Use spawnSync with array args to prevent command injection
      const result = spawnSync(cmdArgs[0], cmdArgs.slice(1), {
        cwd: process.cwd(),
        stdio: 'pipe',
        shell: false
      })
      
      if (result.status === 0) {
        return { formatted: true, formatter: detected, output: result.stdout?.toString() || '' }
      } else {
        return { formatted: false, formatter: detected, error: result.stderr?.toString() || 'Format failed' }
      }
    } catch (error: unknown) {
      const err = error as { message?: string }
      return { formatted: false, formatter: detected, error: err.message || "Format failed" }
    }
  },
})
