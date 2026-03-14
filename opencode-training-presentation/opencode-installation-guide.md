---
marp: true
theme: gaia
paginate: true
backgroundColor: #fff
color: #333
---

<!-- _class: lead -->

# OpenCode 安装与配置指南
## 从零开始打造AI编码助手

<br>
<br>

**部门内部培训文档**

---

## 📋 目录

1. **Node.js 安装**
2. **OpenCode 安装**
3. **Easy-OpenCode 部署**
4. **DeepSeek API Key 配置**
5. **开始使用 OpenCode**
6. **常见问题与解决方案**

---

# 第1章：Node.js 安装

---

## 什么是 Node.js？

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时，用于构建快速、可扩展的网络应用。

- ✅ 跨平台支持（Windows/macOS/Linux）
- ✅ 强大的包管理器（npm）
- ✅ OpenCode 的运行基础

---

## 📥 安装 Node.js

### 方式一：官方安装包（推荐）

1. **访问官网**
   ```
   https://nodejs.org/
   ```

2. **下载 LTS 版本**
   - 选择 LTS（长期支持）版本
   - 根据操作系统选择对应安装包

3. **运行安装程序**
   - Windows：双击 `.msi` 文件
   - macOS：双击 `.pkg` 文件
   - Linux：按照官网指南操作

---

## 📥 安装 Node.js（Linux 方式）

### Ubuntu/Debian
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### CentOS/RHEL
```bash
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs
```

### 验证安装
```bash
node --version
npm --version
```

---

## ✅ Node.js 安装验证

打开终端/命令行，执行：

```bash
node --version
```

预期输出：
```
v20.x.x 或 v18.x.x
```

```bash
npm --version
```

预期输出：
```
10.x.x
```

**如果看到版本号，说明安装成功！** 🎉

---

# 第2章：OpenCode 安装

---

## 🚀 OpenCode 简介

OpenCode 是一个强大的 AI 编码助手，提供：
- 🤖 13 个专业 AI Agent
- ⚡ 50+ 工作流技能
- 🛠️ 33 个命令
- 🔗 自动化工作流

---

## 📦 安装 OpenCode

### 方式一：通过 Homebrew（macOS/Linux）

```bash
brew install opencode
```

### 方式二：通过 NPM（所有平台）

```bash
npm install -g opencode
```

### 验证安装

```bash
opencode --version
```

---

## ✅ OpenCode 安装验证

在终端执行：

```bash
opencode --help
```

你应该看到帮助信息，包括：
- 版本号
- 可用命令列表
- Agent 列表

**如果看到帮助信息，安装成功！** 🎉

---

# 第3章：Easy-OpenCode 部署

---

## 🌟 Easy-OpenCode 是什么？

Easy-OpenCode (EOC) 是面向 OpenCode 的生产级 AI 编码插件，提供：

### 核心特性
- 🤖 **14 个专业 AI Agent** - 规划、架构、代码审查、安全审查、TDD 指导等
- ⚡ **50+ 工作流技能** - 涵盖编码规范、前后端模式、安全、测试、DevOps
- 🛠️ **33 个命令** - `/plan`、`/tdd`、`/code-review`、`/security` 等快捷命令
- 🔗 **自动化钩子** - 文件编辑时自动格式化、类型检查、安全扫描

### 核心优势
- 📦 一键安装，开箱即用
- 🎯 TDD 驱动开发，确保代码质量
- 🔒 内置安全审查，防止漏洞
- 🚀 自动化工作流，提升开发效率

---

## 📦 安装 Easy-OpenCode

### 方式一：全局安装（推荐）⭐

```bash
# 全局安装 EOC
npm install -g easy-opencode

# 验证安装
eoc-install --version
```

### 方式二：使用 npx（无需全局安装）

```bash
# 直接使用 npx 运行
npx easy-opencode install
```

### 在项目中安装 Easy-OpenCode

```bash
# 进入你的项目目录
cd your-project

# 运行 EOC 安装程序
eoc-install

# 或使用 npx
npx easy-opencode install
```

安装选项：
1. **Project-level** - 安装到当前项目 `.opencode/`（推荐）
2. **Global** - 安装到 OpenCode 全局配置目录

**推荐选择：Project-level**（便于项目管理）

---

## ✅ 安装验证

安装完成后，重启 OpenCode 并验证：

```bash
opencode
```

在 OpenCode 中执行：
```
/agents
```

你应该看到 **13 个 Agent**（3个可见 + 10个隐藏）

```
/help
```

你应该看到所有可用命令

---

# 第4章：DeepSeek API Key 配置

---

## 🔑 什么是 DeepSeek API Key？

DeepSeek 是一个强大的 AI 模型提供商，为 OpenCode 提供智能编码能力。

- 🧠 高性能 AI 模型
- 💰 性价比高
- 🌐 中文支持优秀

---

## 📝 获取 DeepSeek API Key

### 1. 注册账号
访问：https://platform.deepseek.com/
- 使用邮箱或手机号注册
- 完成身份验证

### 2. 创建 API Key
- 进入控制台
- 选择 "API Keys"
- 点击 "Create API Key"
- 复制生成的 Key（仅显示一次！）

---

## 🔧 配置 API Key

### 方法一：环境变量（推荐）

```bash
# 在 ~/.bashrc 或 ~/.zshrc 中添加
export DEEPSEEK_API_KEY="your-api-key-here"

# 重新加载配置
source ~/.bashrc  # 或 source ~/.zshrc
```

### 方法二：项目级配置

```bash
# 在项目根目录创建 .env 文件
echo "DEEPSEEK_API_KEY=your-api-key-here" > .env
```

### 方法三：OpenCode 配置文件（持久化）

```bash
# 编辑 OpenCode 配置文件
# 文件位置：~/.config/opencode/opencode.json
```

在配置文件中添加：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "env": {
    "DEEPSEEK_API_KEY": "your-api-key-here"
  }
}
```

### 方法四：命令行配置（临时）

```bash
# 启动时通过环境变量传递
DEEPSEEK_API_KEY="your-api-key-here" opencode
```

---

## 🔒 安全注意事项

⚠️ **重要提醒：**

- ❌ **永远不要**将 API Key 提交到 Git
- ✅ 将 `.env` 添加到 `.gitignore`
- ✅ 定期轮换 API Key
- ✅ 为不同项目使用不同的 Key

```bash
# 添加到 .gitignore
echo ".env" >> .gitignore
```

---

## ✅ API Key 验证

测试 API Key 是否配置正确：

```bash
echo $DEEPSEEK_API_KEY
```

应该显示你的 API Key。

在 OpenCode 中测试：
```
/test-connection
```

应该显示连接成功的消息。

---

# 第5章：开始使用 Easy-OpenCode

---

## 🎯 快速开始

### 1. 启动 OpenCode

```bash
opencode
```

### 2. 创建或打开项目

```bash
# 创建新项目
mkdir my-project
cd my-project
opencode

# 或打开现有项目
cd existing-project
opencode
```

---

## 💬 Easy-OpenCode 基础使用

### 方式一：对话式交互（通用）
```
帮我创建一个 React 组件，用于显示用户列表
```

### 方式二：使用 EOC 命令（推荐）

```bash
# 规划功能
/plan 帮我创建一个用户管理 API

# TDD 开发
/tdd 使用 TDD 方式实现用户认证

# 代码审查
/code-review 审查这段代码的性能

# 安全审查
/security 检查这段代码的安全性

# 修复构建错误
/build-fix 帮我修复 TypeScript 错误
```

---

## 🤖 Easy-OpenCode Agent 介绍

### eoc_planner - 规划专家
使用场景：复杂功能规划、架构设计

```bash
/plan 帮我规划一个电商购物车功能
```

### eoc_tdd - TDD 指导
使用场景：测试驱动开发

```bash
/tdd 帮我用 TDD 方式实现用户认证
```

### eoc_code_reviewer - 代码审查
使用场景：代码质量检查

```bash
/code-review 审查这段代码的性能
```

### eoc_security - 安全审查
使用场景：安全漏洞检测

```bash
/security 检查这段代码的安全问题
```

### eoc_architect - 架构设计
使用场景：系统设计、性能优化

```bash
/architect 设计一个高可用的微服务架构
```

---

## 🛠️ Easy-OpenCode 常用命令速查

| 命令 | 功能 | 示例 |
|------|------|------|
| `/plan` | 创建实现计划 | `/plan 用户管理系统` |
| `/tdd` | TDD 开发流程 | `/tdd 用户登录功能` |
| `/code-review` | 代码审查 | `/code-review src/user.ts` |
| `/security` | 安全审查 | `/security src/auth.ts` |
| `/build-fix` | 修复构建错误 | `/build-fix TypeScript` |
| `/architect` | 架构设计 | `/architect 微服务架构` |
| `/e2e` | 生成 E2E 测试 | `/e2e 用户注册流程` |
| `/refactor-clean` | 清理死代码 | `/refactor-clean src` |
| `/compact` | 压缩上下文 | `/compact` |
| `/verify` | 验证代码质量 | `/verify` |
| `/help` | 查看帮助 | `/help` |

---

## 📝 实战示例：创建一个用户管理 API

### 步骤1：规划

```bash
/plan 帮我创建一个用户管理 API
- CRUD 操作
- 输入验证
- 错误处理
```

**输出：** 完整的实现计划和架构设计

---

### 步骤2：TDD 实现

```bash
/tdd 使用 TDD 方式实现用户 API
- 先写测试（RED）
- 实现代码（GREEN）
- 重构优化（IMPROVE）
```

**输出：** 测试代码 + 实现代码 + 80%+ 覆盖率

---

### 步骤3：安全审查

```bash
/security 检查用户 API 的安全性
- 验证输入
- 防止 SQL 注入
- 权限检查
```

**输出：** 安全检查报告和修复建议

---

### 步骤4：代码审查

```bash
/code-review 审查用户 API 的代码质量
- 代码规范
- 性能优化
- 可维护性
```

**输出：** 代码质量报告和改进建议

---

### 步骤5：生成 E2E 测试

```bash
/e2e 为用户 API 生成端到端测试
- 用户注册
- 用户登录
- 用户信息查询
```

---

## 🎬 实时演示：Easy-OpenCode 工作流

### 演示场景：开发一个待办事项列表

#### 1️⃣ 规划阶段

```bash
$ opencode
$ /plan 创建一个待办事项应用
- 用户可以添加、删除、标记完成
- 支持本地存储
- 使用 React + TypeScript
```

**OpenCode 输出：**
```
✅ 实现计划已生成

架构设计：
├── components/
│   ├── TodoList.tsx
│   ├── TodoItem.tsx
│   └── AddTodo.tsx
├── hooks/
│   └── useTodos.ts
├── types/
│   └── todo.ts
└── App.tsx

技术栈：
- React 18
- TypeScript 5
- localStorage API

下一步：使用 /tdd 开始 TDD 开发
```

---

#### 2️⃣ TDD 开发阶段

```bash
/tdd 实现 TodoList 组件
```

**OpenCode 输出：**
```
✅ 测试已创建 (RED)
├── TodoList.test.tsx
└── 测试用例：5 个

✅ 实现已完成 (GREEN)
├── TodoList.tsx
└── 所有测试通过 ✅

✅ 代码已重构 (IMPROVE)
├── 提取可复用逻辑
└── 优化性能

📊 测试覆盖率：87%
```

---

#### 3️⃣ 安全审查阶段

```bash
/security 检查待办事项应用的安全性
```

**OpenCode 输出：**
```
✅ 安全审查完成

🔒 安全检查结果：
├── XSS 防护：✅ 通过
├── 输入验证：✅ 通过
├── 数据存储：✅ 安全
└── 敏感数据：✅ 无泄露

建议：
- 使用 Content Security Policy
- 实施 Rate Limiting（如需 API）
```

---

#### 4️⃣ 代码审查阶段

```bash
/code-review 审查代码质量
```

**OpenCode 输出：**
```
✅ 代码审查完成

📊 代码质量评分：A+

检查项：
├── 代码规范：✅ 符合 ESLint
├── 类型安全：✅ TypeScript 严格模式
├── 性能：✅ 使用 React.memo 优化
└── 可维护性：✅ 组件拆分合理

改进建议：
- 添加 JSDoc 注释
- 提取常量到配置文件
```

---

#### 5️⃣ E2E 测试阶段

```bash
/e2e 为待办事项应用生成 E2E 测试
```

**OpenCode 输出：**
```
✅ E2E 测试已生成

测试文件：
├── todo-app.spec.ts
└── 测试场景：3 个

测试场景：
1. ✅ 添加待办事项
2. ✅ 标记完成
3. ✅ 删除待办事项

运行测试：
$ npx playwright test todo-app.spec.ts
```

---

### 演示总结

通过 Easy-OpenCode，我们：
1. ✅ **5 分钟内**完成功能规划
2. ✅ **15 分钟内**实现并测试核心功能
3. ✅ **3 分钟内**完成安全审查
4. ✅ **3 分钟内**完成代码审查
5. ✅ **5 分钟内**生成 E2E 测试

**总计：约 30 分钟完成从 0 到 1 的开发！** 🚀

---

## 🎓 最佳实践

### 1. 明确需求
- 详细描述功能需求
- 提供相关上下文
- 说明技术栈限制

### 2. 分步执行
- 复杂任务分步骤
- 每步验证结果
- 保存中间成果

### 3. 版本管理
- 定期提交代码
- 写清晰的提交信息
- 使用分支管理特性

---

# 第6章：常见问题与解决方案

---

## ❓ 问题1：Node.js 安装失败

**症状：** `command not found: node`

**解决方案：**
1. 检查安装是否成功：重新运行安装程序
2. 检查 PATH 环境变量：
   ```bash
   echo $PATH
   ```
3. 手动添加到 PATH：
   ```bash
   export PATH="$PATH:/usr/local/bin"
   ```

---

## ❓ 问题2：OpenCode 安装失败

**症状：** `npm install -g opencode` 失败

**解决方案：**
1. 检查网络连接
2. 使用 sudo（仅 Linux/macOS）：
   ```bash
   sudo npm install -g opencode
   ```
3. 清除 npm 缓存：
   ```bash
   npm cache clean --force
   npm install -g opencode
   ```

---

## ❓ 问题3：API Key 不生效

**症状：** "API Key not configured" 错误

**解决方案：**
1. 验证环境变量：
   ```bash
   echo $DEEPSEEK_API_KEY
   ```
2. 检查 .env 文件是否在项目根目录
3. 重启 OpenCode：
   ```bash
   # 退出 OpenCode
   exit
   # 重新启动
   opencode
   ```

---

## ❓ 问题4：Agent 不可用

**症状：** 执行 `/agents` 看不到所有 Agent

**解决方案：**
1. 确认 Easy-OpenCode 安装成功：
   ```bash
   ls ~/.config/opencode/agents/
   ```
2. 重新安装 Easy-OpenCode：
   ```bash
   node scripts/install.js
   ```
3. 清除缓存并重启：
   ```bash
   rm -rf ~/.config/opencode/.cache
   opencode
   ```

---

## 📞 获取帮助

### 文档资源
- 📖 OpenCode 官方文档
- 📚 AGENTS.md 使用指南
- 💡 SKILLS 目录中的技能文档

### 技术支持
- 🐛 提 Issue 到 GitHub
- 💬 团队内部技术交流群
- 📧 联系技术支持邮箱

---

# 总结

---

## 🎉 恭喜！

你已经成功完成了：

✅ Node.js 安装与配置
✅ OpenCode 安装与验证
✅ **Easy-OpenCode (EOC) 部署**
✅ DeepSeek API Key 配置
✅ **EOC 命令和操作掌握**

你现在拥有了：
- 🤖 **14 个专业 AI Agent**
- ⚡ **50+ 工作流技能**
- 🛠️ **33 个快捷命令**
- 🔗 **自动化工作流**

---

## 🚀 下一步行动

### 1. 立即实践
```bash
# 创建测试项目
mkdir my-eoc-project
cd my-eoc-project
eoc-install

# 启动 OpenCode
opencode

# 尝试第一个命令
/plan 创建一个简单的计数器组件
```

### 2. 深入学习
- 📖 阅读 `AGENTS.md` - 了解所有 Agent
- 💡 探索 `skills/` 目录 - 掌握 50+ 技能
- 📚 查看 `commands/` - 熟悉所有命令
- 🎓 参考实战示例 - 学习最佳实践

### 3. 团队协作
- 💬 分享使用经验和技巧
- 📋 建立团队编码规范
- 🔄 定期技术交流和培训
- 📊 追踪使用效果和效率提升

---

## 📚 参考资源

### 官方文档
- **Easy-OpenCode GitHub**: https://github.com/jabing/easy_opencode
- **OpenCode 官方**: https://github.com/opencode-ai/opencode
- **DeepSeek 平台**: https://platform.deepseek.com/

### 内部资源
- 📖 `AGENTS.md` - Agent 完整指南
- 🎯 `skills/` - 技能详细文档
- 🛠️ `commands/` - 命令使用说明
- 🔗 `hooks/` - 自动化工作流配置

### 社区支持
- 🐛 GitHub Issues - 报告问题和建议
- 💬 技术交流群 - 团队内部讨论
- 📧 技术支持 - 获取专业帮助

---

<!-- _class: lead -->

# Q&A

## 感谢聆听！

<br>

**如有疑问，欢迎提问**
