# Hook Configuration Command

Configure hook runtime behavior and environment variables.

## Usage

/hook-config                    # Interactive configuration
/hook-config profile strict     # Set profile (minimal|standard|strict)
/hook-config disable hook1,hook2 # Disable specific hooks
/hook-config enable all         # Enable all hooks
/hook-config status             # Show current configuration

## Profiles

| Profile | Description |
|---------|-------------|
| minimal | Only essential hooks run |
| standard | Default hooks for most workflows |
| strict | All hooks enabled for maximum automation |

## Environment Variables

Set these before running OpenCode:

export EOC_HOOK_PROFILE=standard
export EOC_DISABLED_HOOKS=pre:bash:tmux-reminder,post:edit:typecheck

## Configuration File

Configuration is stored in .opencode/hooks-config.json
