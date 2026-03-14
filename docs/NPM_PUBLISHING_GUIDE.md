# npm 发布完整指南

本指南将指导你完成在 npm 上发布 Easy OpenCode 的完整流程。

## 目录

- [准备工作](#准备工作)
- [步骤 1：注册 npm 账号](#步骤-1注册-npm-账号)
- [步骤 2：配置 npm 认证](#步骤-2配置-npm-认证)
- [步骤 3：验证 package.json](#步骤-3验证-packagejson)
- [步骤 4：准备发布文件](#步骤-4准备发布文件)
- [步骤 5：测试包](#步骤-5测试包)
- [步骤 6：发布到 npm](#步骤-6发布到-npm)
- [步骤 7：验证发布](#步骤-7验证发布)
- [步骤 8：后续维护](#步骤-8后续维护)
- [常见问题](#常见问题)

---

## 准备工作

在开始之前，确保你具备：

- ✅ Node.js v14+ 和 npm v6+
- ✅ Git 仓库已创建
- ✅ package.json 已正确配置
- ✅ README.md 包含完整文档
- ✅ LICENSE 文件已添加

### 检查当前状态

```bash
# 检查 Node.js 和 npm 版本
node --version
npm --version

# 检查 Git 仓库
git status

# 查看 package.json
cat package.json
```

---

## 步骤 1：注册 npm 账号

### 1.1 创建 npm 账号

访问 [npm 官网](https://www.npmjs.com/) 并注册账号：

1. 访问 https://www.npmjs.com/signup
2. 填写注册表单：
   - **用户名**: 将是你的包所有者
   - **邮箱**: 需要验证
   - **密码**: 建议使用强密码
3. 验证邮箱（会收到验证邮件）
4. 启用两步验证（2FA）**强烈推荐**

### 1.2 启用两步验证

```bash
# 登录后访问
https://www.npmjs.com/settings/authentication

# 启用 "Two-factor authentication"
# 选择：
#   - SMS（短信）
#   - Authenticator App（推荐）
```

**推荐使用 Authenticator App**：
- Google Authenticator
- Authy
- Microsoft Authenticator
- 1Password
- Bitwarden

---

## 步骤 2：配置 npm 认证

### 2.1 登录 npm

```bash
npm login
```

系统会提示你输入：

```
Username: your-username
Password: your-password
Email: your-email@example.com
Enter one-time password: 123456  # 如果启用了 2FA
```

### 2.2 验证登录

```bash
npm whoami
```

应该显示你的用户名：

```
your-username
```

### 2.3 检查当前注册表

```bash
npm config get registry
```

确保是官方注册表：

```
https://registry.npmjs.org/
```

**如果不是，设置为官方注册表：**

```bash
npm config set registry https://registry.npmjs.org/
```

### 2.4 查看 npm 配置

```bash
npm config list
npm config list --json  # JSON 格式
```

### 2.5 为组织创建（可选）

如果你想要在组织名下发布：

```bash
# 创建组织（在 npm 网站上）
# 访问：https://www.npmjs.com/org/create

# 然后在 package.json 中使用组织作用域
{
  "name": "@your-org/easy-opencode"
}
```

---

## 步骤 3：验证 package.json

### 3.1 检查必需字段

确保 `package.json` 包含所有必需字段：

```json
{
  "name": "easy-opencode",
  "version": "1.8.0",
  "description": "Production-ready AI coding plugin for OpenCode with 14 specialized agents, 50+ skills, 34 commands, and automated hook workflows.",
  "main": "index.js",
  "bin": {
    "eoc-install": "./bin/eoc-install.js"
  },
  "scripts": {
    "install": "node scripts/npm-install.js",
    "postinstall": "node scripts/npm-postinstall.js"
  },
  "keywords": [
    "opencode",
    "ai",
    "agents",
    "coding",
    "tdd",
    "development",
    "productivity"
  ],
  "author": "Easy OpenCode Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/jabing/easy_opencode.git"
  },
  "bugs": {
    "url": "https://github.com/jabing/easy_opencode/issues"
  },
  "homepage": "https://github.com/jabing/easy_opencode#readme",
  "engines": {
    "node": ">=14.0.0"
  },
  "files": [
    "agents/",
    "skills/",
    "commands/",
    "prompts/",
    ".opencode/",
    "AGENTS.md",
    "scripts/",
    "bin/"
  ]
}
```

### 3.2 验证包名可用性

```bash
npm search easy-opencode

# 或使用 npm view
npm view easy-opencode
```

如果包名已被占用，需要选择其他名称：

```bash
# 检查包名是否可用
npm view easy-opencode 2>&1

# 如果显示 "404 Not Found"，说明包名可用
# 如果显示包信息，说明已被占用
```

**备选包名：**
- `easy-opencode`
- `eoc-opencode`
- `@your-username/easy-opencode` (作用域包)

### 3.3 检查依赖

```bash
# 查看生产依赖
npm ls

# 查看所有依赖
npm ls --all

# 查看过时的包
npm outdated
```

### 3.4 验证文件路径

确保 `bin` 脚本存在且可执行：

```bash
ls -la bin/
cat bin/eoc-install.js

# 检查 shebang
head -n 1 bin/eoc-install.js
# 应该显示: #!/usr/bin/env node
```

---

## 步骤 4：准备发布文件

### 4.1 创建 .npmignore

创建 `.npmignore` 文件以排除不需要的文件：

```bash
cat > .npmignore << 'EOF'
# Git
.git/
.gitignore
.gitattributes

# Documentation
docs/
*.md
!AGENTS.md
!README.md
!LICENSE

# CI/CD
.github/
.sisyphus/

# Tests
tests/
*.test.js
*.spec.js
__tests__/

# Config
.prettierrc
.editorconfig

# Node
node_modules/

# Development
.DS_Store
Thumbs.db
*.log
.env
.env.local
.env.*.local
