/**
 * Shared validation utilities for EOC tools
 *
 * Centralizes path and input validation to avoid duplication
 * across multiple tool files.
 */

/**
 * Validates a file/directory path to prevent command injection.
 * Uses allowlist approach - only safe characters permitted.
 *
 * @param path - Path to validate
 * @returns The validated path
 * @throws Error if path contains unsafe characters
 */
export function validatePath(path: string): string {
  // Allowlist: alphanumeric, dash, underscore, dot, forward slash, backslash, space
  const safePattern = /^[a-zA-Z0-9_\-./\\ ]+$/
  if (!safePattern.test(path)) {
    throw new Error(`Invalid path: contains unsafe characters`)
  }
  return path
}

/**
 * Validates a git branch name.
 *
 * @param branch - Branch name to validate
 * @returns The validated branch name
 * @throws Error if branch name is invalid
 */
export function validateBranchName(branch: string): string {
  const validPattern = /^[a-zA-Z0-9_\-./]+$/
  if (!validPattern.test(branch)) {
    throw new Error(`Invalid branch name: ${branch}`)
  }
  return branch
}

/**
 * Validates that a string is not empty.
 *
 * @param value - String to validate
 * @param name - Name of the field for error message
 * @returns The validated string
 * @throws Error if string is empty
 */
export function validateNotEmpty(value: string, name: string): string {
  if (!value || value.trim() === "") {
    throw new Error(`${name} cannot be empty`)
  }
  return value
}

/**
 * Validates a command string for dangerous patterns.
 * Returns true if command appears safe.
 *
 * @param command - Command to validate
 * @returns true if safe, false if dangerous patterns detected
 */
export function isCommandSafe(command: string): boolean {
  const dangerousPatterns = [
    /rm\s+-rf\s+\//,
    />\s*\/dev\/null.*rm/,
    /curl.*\|.*sh/,
    /wget.*\|.*sh/,
    /eval\s*\(/,
  ]

  for (const pattern of dangerousPatterns) {
    if (pattern.test(command)) {
      return false
    }
  }
  return true
}
