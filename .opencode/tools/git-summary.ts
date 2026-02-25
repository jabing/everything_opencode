/**
 * ECC Custom Tool: Git Summary
 *
 * Provides a comprehensive git status including branch info, status,
 * recent log, and diff against base branch.
 */

import { tool } from "@opencode-ai/plugin"
import { z } from "zod"

/**
 * Validates a git branch name to prevent command injection.
 * Git branch names should only contain alphanumeric, dash, underscore, dot, and slash.
 */
function validateBranchName(branch: string): string {
  // Git branch name pattern: alphanumeric, dash, underscore, dot, slash
  const validPattern = /^[a-zA-Z0-9_\-./]+$/
  if (!validPattern.test(branch)) {
    throw new Error(`Invalid branch name: contains invalid characters`)
  }
  return branch
}

export default tool({
  name: "git-summary",
  description: "Get comprehensive git summary: branch, status, recent log, and diff against base branch.",
  parameters: z.object({
    depth: z.number().optional().describe("Number of recent commits to show (default: 5)"),
    includeDiff: z.boolean().optional().describe("Include diff against base branch (default: true)"),
    baseBranch: z.string().optional().describe("Base branch for comparison (default: main)"),
  }),
  execute: async ({ depth = 5, includeDiff = true, baseBranch = "main" }, { $ }) => {
    const results: Record<string, string> = {}

    // Validate baseBranch for security
    let safeBaseBranch: string
    try {
      safeBaseBranch = validateBranchName(baseBranch)
    } catch (error) {
      return { error: `Invalid baseBranch parameter: ${(error as Error).message}` }
    }

    try {
      results.branch = (await $`git branch --show-current`.text()).trim()
    } catch {
      results.branch = "unknown"
    }

    try {
      results.status = (await $`git status --short`.text()).trim()
    } catch {
      results.status = "unable to get status"
    }

    try {
      results.log = (await $`git log --oneline -${depth}`.text()).trim()
    } catch {
      results.log = "unable to get log"
    }

    if (includeDiff) {
      try {
        results.stagedDiff = (await $`git diff --cached --stat`.text()).trim()
      } catch {
        results.stagedDiff = ""
      }

      try {
        // Use validated branch name - pass as separate argument to prevent injection
        results.branchDiff = (await $`git diff ${safeBaseBranch}...HEAD --stat`.text()).trim()
      } catch {
        results.branchDiff = `unable to diff against ${safeBaseBranch}`
      }
    }

    return results
  },
})
