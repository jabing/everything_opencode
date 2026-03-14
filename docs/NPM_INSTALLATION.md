# npm Installation Guide for Easy OpenCode

## Quick Start

```bash
# Install EOC via npm (recommended)
npm install -g easy-opencode

# Or use npx (no global install needed)
npx easy-opencode install
```

Then run the installer in your project:

```bash
cd your-project
eoc-install
```

## Installation Methods

### Method 1: Global Installation

Install EOC globally, then run `eoc-install` in any project:

```bash
# Install globally
npm install -g easy-opencode

# Verify installation
eoc-install --help

# Use in your project
cd your-project
eoc-install
```

**Pros:**
- One-time installation
- Available in all projects
- `eoc-install` command always available

**Cons:**
- Requires global npm install
- Updates require reinstall

### Method 2: Local Installation (npx)

Use npx to run EOC installer without installing globally:

```bash
# Run installer directly with npx
npx easy-opencode install

# Or install locally in your project
cd your-project
npm install --save-dev easy-opencode
npx eoc-install
```

**Pros:**
- No global install needed
- Version locked to project
- Always uses latest version

**Cons:**
- Slightly slower on first run (downloads)
- Requires internet connection

## Interactive Installer

After running `eoc-install`, you'll see:

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║        🚀 Easy OpenCode Installer                   ║
║                                                           ║
║     AI-powered development agents for OpenCode            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

Choose installation type:

  1) Project-level (recommended)
     • Only affects current project
     • Full control over configuration
     • Different versions per project

  2) Global
     • Available in ALL projects
     • Single installation
     • Unified configuration

Enter your choice (1 or 2):
```

### Option 1: Project-Level Installation

Creates `.opencode/` directory in your project with:

- Custom hooks configuration
- Project-specific settings
- No interference with other projects

```bash
# Result: Your project structure
your-project/
├── .opencode/
│   ├── hooks/
│   ├── plugins/
│   └── instructions/
├── opencode.json  ← Updated with EOC configuration
└── src/
```

### Option 2: Global Installation

Installs to OpenCode's global config directory:

```bash
# Global location
~/.opencode/

# Result: Available in ALL projects
```

## Verification

After installation, verify EOC is working:

```bash
# Start OpenCode
cd your-project
opencode

# Check available agents
/agents

# Check available commands
/help
```

You should see:
- **3 visible agents**: eoc_build, eoc_planner, eoc_code_reviewer
- **11 hidden agents**: tdd-guide, security-reviewer, etc.
- **33+ commands**: /plan, /tdd, /code-review, etc.

## Uninstallation

### Global Uninstallation

```bash
npm uninstall -g easy-opencode

# Remove OpenCode configuration
rm -rf ~/.opencode
```

### Local Uninstallation

```bash
cd your-project
npm uninstall easy-opencode

# Remove EOC from project
rm -rf .opencode/
rm opencode.json  # or remove EOC entries from it
```

## Troubleshooting

### "command not found: eoc-install"

**Solution:** Make sure npm bin directory is in your PATH:

```bash
# Add to ~/.bashrc or ~/.zshrc
export PATH="$PATH:$(npm bin -g)"

# Or use npx instead
npx easy-opencode install
```

### Permission Denied

**Solution:** Make sure the bin script is executable:

```bash
chmod +x node_modules/easy-opencode/bin/eoc-install.js
```

### EOC Agents Not Showing

**Solution:** Verify OpenCode configuration:

```bash
# Check opencode.json exists
cat opencode.json

# Verify it includes EOC instructions
cat ~/.opencode/opencode.json
```

## Version Management

### Check Current Version

```bash
npm list -g easy-opencode
```

### Update to Latest

```bash
npm update -g easy-opencode
```

### Install Specific Version

```bash
npm install -g easy-opencode@1.8.0
```

## CI/CD Integration

Add EOC to your CI/CD pipeline:

```yaml
# .github/workflows/eoc-setup.yml
- name: Install Easy OpenCode
  run: |
    npm install -g easy-opencode
    cd ${{ github.workspace }}
    eoc-install <<< "1"  # Auto-select project-level installation
```

## Next Steps

After installing EOC:

1. **Read the documentation**: Check out available skills in `skills/` directory
2. **Try a command**: Run `/plan` to create an implementation plan
3. **Use an agent**: Call `/tdd` for test-driven development
4. **Explore hooks**: Check `.opencode/hooks/` for automated workflows

## Support

- 📖 Documentation: [README.md](../README.md)
- 🐛 Issues: [GitHub Issues](https://github.com/jabing/easy_opencode/issues)
- 💬 Discussion: [GitHub Discussions](https://github.com/jabing/easy_opencode/discussions)

---

Happy coding with EOC! 🚀
