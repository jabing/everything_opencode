# Easy OpenCode - 快速开始指南

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/jabing/everything_opencode?style=social)](https://github.com/jabing/easy_opencode)
[![npm version](https://img.shields.io/npm/v/easy-opencode)](https://www.npmjs.com/package/easy-opencode)

> 面向 OpenCode 的生产级 AI 编码插件，提供 14 个专业代理、50+ 技能、33 个命令和自动化钩子工作流。

---

## 🚀 5 分钟快速开始（Windows / Linux）

### 前置条件

- **Node.js**: v14.0.0 或更高版本
- **npm**: v6.0.0 或更高版本

### 第一步：安装 Node.js（如果没有）

#### Windows
1. 访问 https://nodejs.org/
2. 下载 **LTS 版本**（推荐 v20.x）
3. 运行安装程序（使用默认设置）
4. 打开新的命令提示符或 PowerShell
5. 验证：
```cmd
node --version
npm --version
```

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

node --version
npm --version
```

#### Linux (CentOS/RHEL)
```bash
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

node --version
npm --version
```

### 第二步：安装 OpenCode

```bash
# 全局安装 OpenCode
npm install -g opencode

# 验证安装
opencode --version
```

**如果遇到权限问题：**

**Windows:** 以管理员身份运行 PowerShell
```powershell
# 右键 PowerShell → "以管理员身份运行"
npm install -g opencode
```

**Linux:** 配置 npm 全局目录
```bash
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

npm install -g opencode
```

### 第三步：安装 EOC (Easy OpenCode)

```bash
# 全局安装 EOC
npm install -g easy-opencode

# 或使用 npx（无需全局安装）
npx easy-opencode install
```

### 第四步：在项目中配置 EOC

```bash
# 进入你的项目目录
cd your-project

# 运行 EOC 安装程序
eoc-install

# 或使用 npx
npx easy-opencode install
```

选择 **1**（项目级安装，推荐）。

### 第五步：配置 DeepSeek API Key

#### 获取 API Key

1. 访问 https://platform.deepseek.com/
2. 注册/登录
3. 创建 API Key
4. 复制 API Key（格式：`sk-xxxxxxxxxxxx`）

#### 配置方法

在项目根目录创建 `opencode.json`：

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

**替换 `YOUR_DEEPSEEK_API_KEY_HERE` 为你的实际 API Key。**

### 第六步：开始使用

```bash
# 启动 OpenCode
opencode
```

在 OpenCode 中测试：

```
/agents
```

你应该看到 14 个专业代理！

---

## ✅ 验证安装

运行环境检查：

```bash
# 检查系统环境
npx easy-opencode check
```

或手动检查：

```bash
# 检查 Node.js
node --version

# 检查 npm
npm --version

# 检查 OpenCode
opencode --version

# 检查 EOC
eoc-install --help
```

---

## 🎯 快速使用

### 规划功能

```
/plan 创建用户认证系统
```

### 测试驱动开发

```
/tdd 实现用户登录接口
```

### 代码审查

```
/code-review 检查最近的代码变更
```

### 安全审查

```
/security 检查认证代码安全性
```

---

## 📖 核心功能

### 14 个专业代理

- **planner** - 复杂功能的实现规划
- **architect** - 系统设计和可扩展性决策
- **tdd-guide** - 测试驱动开发工作流
- **code-reviewer** - 代码质量和可维护性审查
- **security-reviewer** - 安全漏洞检测
- **build-error-resolver** - 修复构建和类型错误
- **e2e-runner** - 端到端 Playwright 测试
- **refactor-cleaner** - 清理死代码
- **doc-updater** - 文档和代码图更新
- **go-reviewer** - Go 代码审查专家
- **go-build-resolver** - Go 构建错误修复
- **database-reviewer** - PostgreSQL/Supabase 优化
- **python-reviewer** - Python 代码审查专家

### 50+ 技能

涵盖：
- **编码规范** - TypeScript、JavaScript、Python、Go
- **后端模式** - API 设计、数据库优化、缓存
- **前端模式** - React、Next.js、状态管理
- **安全** - 输入验证、身份验证、密钥管理
- **测试** - TDD 工作流、E2E 测试、覆盖率分析
- **DevOps** - Docker 模式、部署、CI/CD

### 33 个命令

快速访问命令：
- `/plan` - 创建实现计划
- `/tdd` - 强制 TDD 工作流
- `/code-review` - 审查代码变更
- `/security` - 安全审查
- `/build-fix` - 修复构建错误
- `/e2e` - 生成 E2E 测试
- `/refactor-clean` - 移除死代码

---

## 🆘 常见问题

### Q: opencode 命令未找到？

**Windows:**
1. 检查 npm 全局路径：`npm config get prefix`
2. 添加到系统 PATH：
   - 系统属性 → 高级 → 环境变量
   - 编辑 Path，添加 npm 路径（如 `C:\Users\YourName\AppData\Roaming\npm`）
   - 重启命令提示符

**Linux:**
```bash
# 检查路径
npm config get prefix
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Q: DeepSeek API Key 如何配置？

创建 `opencode.json` 文件：

```json
{
  "model": "deepseek/deepseek-chat",
  "api_key": "你的API Key"
}
```

或使用环境变量（更安全）：

```bash
export OPENCODE_API_KEY="你的API Key"
```

### Q: 如何更新 EOC？

```bash
npm update -g easy-opencode
```

### Q: 如何卸载？

```bash
npm uninstall -g easy-opencode

# 删除配置
rm -rf ~/.opencode  # 全局
rm -rf .opencode     # 项目级
```

---

## 📚 更多文档

- [完整安装指南](FULL_INSTALLATION_GUIDE.md) - 从零开始的详细教程
- [npm 安装指南](NPM_INSTALLATION.md) - npm 安装详细说明
- [主 README](../README.md) - 完整功能文档
- [技能文档](../skills/) - 50+ 技能说明

---

## 🤝 获取帮助

- 📖 文档: [GitHub](https://github.com/jabing/easy_opencode)
- 🐛 问题: [Issues](https://github.com/jabing/easy_opencode/issues)
- 💬 讨论: [Discussions](https://github.com/jabing/easy_opencode/discussions)
- 🌐 DeepSeek: [平台](https://platform.deepseek.com/)

---

**祝你编码愉快！🎉**

Made with ❤️ by Easy OpenCode Team
