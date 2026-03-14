# 完整安装指南：从零开始安装 Easy OpenCode

本指南将帮助你从零开始在 Windows 或 Linux 上安装 OpenCode、EOC，并配置 DeepSeek API key。

## 目录

- [系统要求](#系统要求)
- [步骤 1：安装 Node.js](#步骤-1安装-nodejs)
- [步骤 2：安装 OpenCode](#步骤-2安装-opencode)
- [步骤 3：安装 Easy OpenCode (EOC)](#步骤-3安装-easy-opencode-eoc)
- [步骤 4：配置 DeepSeek API Key](#步骤-4配置-deepseek-api-key)
- [步骤 5：验证安装](#步骤-5验证安装)
- [常见问题](#常见问题)

---

## 系统要求

### 最低要求
- **操作系统**: Windows 10+, Linux (Ubuntu 20.04+, CentOS 7+, etc.)
- **Node.js**: v14.0.0 或更高版本
- **npm**: v6.0.0 或更高版本
- **磁盘空间**: 至少 500MB 可用空间
- **内存**: 建议 4GB 或更多

### 推荐配置
- **Node.js**: v18.x LTS 或 v20.x LTS
- **npm**: v9.x 或更高
- **磁盘空间**: 1GB 或更多

---

## 步骤 1：安装 Node.js

### Windows 系统

#### 方法 1：使用官方安装程序（推荐）

1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 **LTS（长期支持）版本**（推荐 v20.x）
3. 运行下载的安装程序（`.msi` 文件）
4. 按照安装向导完成安装（建议使用默认设置）
5. 安装完成后，打开新的命令提示符或 PowerShell

#### 验证安装

打开命令提示符或 PowerShell，运行：

```cmd
node --version
npm --version
```

你应该看到类似输出：

```cmd
C:\> node --version
v20.11.0

C:\> npm --version
10.2.4
```

### Linux 系统

#### Ubuntu/Debian

使用 NodeSource 仓库安装最新 LTS 版本：

```bash
# 更新包列表
sudo apt-get update

# 安装必要的工具
sudo apt-get install -y curl gnupg

# 添加 NodeSource 仓库（Node.js 20.x LTS）
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# 安装 Node.js 和 npm
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

#### CentOS/RHEL/Fedora

```bash
# 更新包列表
sudo yum update -y

# 添加 NodeSource 仓库（Node.js 20.x LTS）
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -

# 安装 Node.js 和 npm
sudo yum install -y nodejs

# 验证安装
node --version
npm --version
```

#### 通用方法：使用 NVM（推荐多版本管理）

```bash
# 下载并安装 NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载 shell 配置
source ~/.bashrc  # 或 source ~/.zshrc

# 安装最新的 Node.js LTS 版本
nvm install --lts
nvm use --lts

# 设置为默认版本
nvm alias default lts/*

# 验证安装
node --version
npm --version
```

---

## 步骤 2：安装 OpenCode

### Windows 系统

OpenCode 通过 npm 全局安装：

```cmd
# 以管理员身份运行 PowerShell 或命令提示符
npm install -g opencode
```

如果遇到权限问题，请确保以管理员身份运行命令提示符。

**PowerShell 示例：**

```powershell
# 右键点击 PowerShell，选择"以管理员身份运行"
npm install -g opencode
```

### Linux 系统

```bash
# 全局安装 OpenCode
sudo npm install -g opencode

# 或者不需要 sudo（如果配置了 npm 全局目录）
npm install -g opencode
```

**配置 npm 全局目录（避免使用 sudo）：**

```bash
# 创建全局 npm 目录
mkdir -p ~/.npm-global

# 配置 npm 使用该目录
npm config set prefix '~/.npm-global'

# 添加到 PATH
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# 现在可以不使用 sudo 安装
npm install -g opencode
```

### 验证 OpenCode 安装

```bash
# Windows 或 Linux
opencode --version
```

你应该看到版本信息：

```cmd
C:\> opencode --version
opencode v2.x.x
```

**如果遇到 "command not found" 错误：**

**Windows:**
1. 确认 npm 全局安装路径：`npm config get prefix`
2. 将该路径添加到系统 PATH：
   - 打开"系统属性" → "高级" → "环境变量"
   - 在"系统变量"中找到 `Path`，点击编辑
   - 添加 npm 全局路径，如 `C:\Users\YourName\AppData\Roaming\npm`
   - 重启命令提示符

**Linux:**
```bash
# 检查 npm 全局路径
npm config get prefix

# 添加到 PATH（假设路径是 ~/.npm-global/bin）
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## 步骤 3：安装 Easy OpenCode (EOC)

### Windows 系统

#### 方法 1：使用 npm 全局安装（推荐）

```cmd
# 以管理员身份运行 PowerShell 或命令提示符
npm install -g easy-opencode
```

#### 方法 2：使用 npx（无需全局安装）

```cmd
npx easy-opencode install
```

### Linux 系统

#### 方法 1：使用 npm 全局安装（推荐）

```bash
npm install -g easy-opencode
```

#### 方法 2：使用 npx（无需全局安装）

```bash
npx easy-opencode install
```

### 在项目中安装 EOC

安装后，在你想使用 EOC 的项目中运行：

```bash
# 进入你的项目目录
cd your-project

# 运行 EOC 安装程序
eoc-install
```

或者使用 npx：

```bash
npx easy-opencode install
```

### 选择安装类型

安装程序会显示：

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

**推荐选择 `1`（项目级安装）**，这样每个项目可以有独立的配置。

安装完成后，你会看到：

```
✓ Project-level installation complete!
Run "opencode" in this directory to start.
```

---

## 步骤 4：配置 DeepSeek API Key

### 获取 DeepSeek API Key

1. 访问 [DeepSeek 官网](https://platform.deepseek.com/)
2. 注册或登录账号
3. 进入 API Keys 页面
4. 点击"Create new key"创建新的 API key
5. 复制 API key（格式类似：`sk-xxxxxxxxxxxxxxxxxxxx`）

**注意：** API key 只会在创建时显示一次，请妥善保存！

### 配置方法

#### 方法 1：在 opencode.json 中配置（推荐）

在你的项目根目录创建或编辑 `opencode.json` 文件：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "deepseek/deepseek-chat",
  "small_model": "deepseek/deepseek-coder",
  "api_key": "YOUR_DEEPSEEK_API_KEY_HERE",
  "plugin": ["./.opencode/plugins"],
  "instructions": [
    "AGENTS.md",
    ".opencode/instructions/INSTRUCTIONS.md"
  ]
}
```

**替换 `YOUR_DEEPSEEK_API_KEY_HERE` 为你的实际 API key。**

#### 方法 2：使用环境变量（更安全）

**Windows:**

```cmd
# 临时设置（当前会话有效）
setx OPENCODE_API_KEY "YOUR_DEEPSEEK_API_KEY_HERE"

# PowerShell
$env:OPENCODE_API_KEY="YOUR_DEEPSEEK_API_KEY_HERE"
```

**Linux/macOS:**

```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
echo 'export OPENCODE_API_KEY="YOUR_DEEPSEEK_API_KEY_HERE"' >> ~/.bashrc
source ~/.bashrc
```

#### 方法 3：全局配置（所有项目）

编辑全局配置文件 `~/.opencode/opencode.json`：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "deepseek/deepseek-chat",
  "small_model": "deepseek/deepseek-coder",
  "api_key": "YOUR_DEEPSEEK_API_KEY_HERE",
  "instructions": [
    "AGENTS.md",
    "skills/tdd-workflow/SKILL.md",
    "skills/security-review/SKILL.md"
  ]
}
```

### DeepSeek 模型选择

DeepSeek 提供以下模型，根据需要选择：

| 模型 | 用途 | 推荐场景 |
|------|------|----------|
| `deepseek-chat` | 通用对话 | 默认主模型 |
| `deepseek-coder` | 代码生成 | 编码任务 |

**配置示例：**

```json
{
  "model": "deepseek/deepseek-chat",
  "small_model": "deepseek/deepseek-coder"
}
```

### 测试 API Key 配置

```bash
# 启动 OpenCode
cd your-project
opencode

# 在 OpenCode 中测试
/test-model
```

如果配置正确，你应该看到成功的响应。

---

## 步骤 5：验证安装

### 验证 OpenCode

```bash
opencode --version
```

应该显示版本号。

### 验证 EOC 安装

```bash
cd your-project
opencode
```

在 OpenCode 中运行：

```
/agents
```

你应该看到以下代理：

```
Available Agents:

1. eoc_build - EOC - Primary coding agent for development work
2. eoc_planner - EOC - Expert planning specialist for complex features
3. eoc_code_reviewer - EOC - Expert code review specialist

Hidden agents (via commands):
- tdd-guide
- security-reviewer
- build-error-resolver
- e2e-runner
- refactor-cleaner
- doc-updater
- go-reviewer
- go-build-resolver
- database-reviewer
- architect
- python-reviewer
```

### 验证命令

在 OpenCode 中运行：

```
/help
```

你应该看到 33+ 可用命令，包括：

- `/plan` - 创建实现计划
- `/tdd` - TDD 工作流
- `/code-review` - 代码审查
- `/security` - 安全审查
- `/build-fix` - 修复构建错误
- 等等...

### 验证 DeepSeek API

在 OpenCode 中发送一个测试消息：

```
你好！请用 DeepSeek 模型回复我。
```

如果收到回复，说明 API key 配置成功。

---

## 常见问题

### Q1: Windows 上 npm install -g 失败，提示权限不足

**解决方案：**

1. 以管理员身份运行 PowerShell
   - 右键点击 PowerShell
   - 选择"以管理员身份运行"

2. 或者配置 npm 全局目录到用户目录：
```cmd
npm config set prefix "%APPDATA%\npm"
```

### Q2: Linux 上 npm install -g 需要 sudo，如何避免？

**解决方案：**

配置 npm 使用用户目录：

```bash
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Q3: opencode 命令未找到

**Windows:**

```cmd
# 查找 npm 全局安装路径
npm config get prefix

# 将该路径添加到系统 PATH
# 1. 打开系统属性
# 2. 高级 → 环境变量
# 3. 编辑 Path 变量，添加上述路径
# 4. 重启命令提示符
```

**Linux:**

```bash
# 确保路径在 PATH 中
echo $PATH | grep npm

# 如果没有，添加到 ~/.bashrc
npm config get prefix
# 假设输出是 /home/user/.npm-global
echo 'export PATH=/home/user/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Q4: DeepSeek API key 配置后仍然报错

**检查清单：**

1. 确认 API key 格式正确（以 `sk-` 开头）
2. 确认没有多余的空格或引号
3. 检查 API key 是否有效（登录 DeepSeek 平台验证）
4. 确认配置文件位置正确
5. 尝试重新启动 OpenCode

**调试命令：**

```bash
# 查看配置
cat opencode.json

# 或全局配置
cat ~/.opencode/opencode.json
```

### Q5: EOC 安装后找不到 .opencode 目录

**可能原因：**

- 选择的是全局安装（选项 2）
- 项目级安装失败

**解决方案：**

1. 检查全局安装目录：
```bash
ls ~/.opencode/
```

2. 或重新运行安装程序：
```bash
cd your-project
eoc-install
```

选择选项 1（项目级安装）。

### Q6: Node.js 版本过旧，如何升级？

**Windows:**
1. 下载最新 LTS 版本：https://nodejs.org/
2. 运行安装程序覆盖旧版本

**Linux (使用 NVM):**

```bash
# 安装最新 LTS
nvm install --lts
nvm use --lts
nvm alias default lts/*
```

**Linux (包管理器):**

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Q7: 如何切换不同的 AI 模型提供商？

编辑 `opencode.json`：

```json
{
  "model": "deepseek/deepseek-chat",
  "api_key": "YOUR_DEEPSEEK_API_KEY",
  "base_url": "https://api.deepseek.com"
}
```

**其他提供商示例：**

```json
// OpenAI
{
  "model": "gpt-4",
  "api_key": "YOUR_OPENAI_KEY",
  "base_url": "https://api.openai.com/v1"
}

// Anthropic Claude
{
  "model": "claude-3-sonnet-20240229",
  "api_key": "YOUR_ANTHROPIC_KEY",
  "base_url": "https://api.anthropic.com"
}
```

### Q8: 如何卸载 EOC？

**卸载全局安装：**

```bash
npm uninstall -g easy-opencode

# 如果使用了 sudo
sudo npm uninstall -g easy-opencode
```

**清理配置：**

```bash
# 删除全局配置
rm -rf ~/.opencode

# 或删除项目级配置
rm -rf .opencode/
rm opencode.json  # 或手动移除 EOC 相关配置
```

---

## 下一步

安装完成后，你可以：

1. 📖 阅读 [完整文档](../README.md)
2. 🎓 学习 [可用技能](../skills/)
3. 🚀 开始你的第一个项目
4. 💡 尝试 `/plan` 命令创建实现计划
5. 🧪 使用 `/tdd` 进行测试驱动开发

---

## 获取帮助

- 📖 文档: [GitHub README](https://github.com/jabing/easy_opencode)
- 🐛 问题报告: [GitHub Issues](https://github.com/jabing/easy_opencode/issues)
- 💬 讨论: [GitHub Discussions](https://github.com/jabing/easy_opencode/discussions)
- 🌐 DeepSeek API: [DeepSeek Platform](https://platform.deepseek.com/)

---

**祝你编码愉快！🎉**
