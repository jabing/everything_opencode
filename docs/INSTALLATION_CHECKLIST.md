# 安装检查清单

使用此清单验证你的安装是否完成。

---

## ✅ 系统要求检查

- [ ] 操作系统版本：Windows 10+ / Ubuntu 20.04+ / CentOS 7+
- [ ] Node.js 版本：v14.0.0 或更高
- [ ] npm 版本：v6.0.0 或更高
- [ ] 可用磁盘空间：至少 500MB
- [ ] 可用内存：至少 4GB

**验证命令：**
```bash
node --version    # 应该显示 v14.0.0 或更高
npm --version     # 应该显示 6.0.0 或更高
```

---

## ✅ Node.js 和 npm 安装检查

- [ ] Node.js 已安装
- [ ] npm 已安装
- [ ] Node.js 和 npm 版本符合要求
- [ ] 可以在命令行访问 `node` 命令
- [ ] 可以在命令行访问 `npm` 命令

**验证命令：**
```bash
node --version
npm --version
npm config get prefix
```

**预期输出：**
```
v20.11.0
10.2.4
/usr/local  # Windows: C:\Users\YourName\AppData\Roaming\npm
```

---

## ✅ OpenCode 安装检查

- [ ] OpenCode 已全局安装
- [ ] `opencode` 命令可用
- [ ] 可以运行 `opencode --version`
- [ ] npm 全局路径在 PATH 中

**验证命令：**
```bash
opencode --version
```

**预期输出：**
```
opencode v2.x.x
```

**如果失败：**
```bash
# 检查安装位置
npm list -g opencode

# 检查 PATH
echo $PATH  # Linux/Mac
echo %PATH%  # Windows

# 重新安装（如果需要）
npm install -g opencode
```

---

## ✅ EOC 安装检查

- [ ] `easy-opencode` 已全局安装
- [ ] `eoc-install` 命令可用
- [ ] 可以运行 `eoc-install --help`
- [ ] 可以运行 `eoc-install`

**验证命令：**
```bash
eoc-install --help
```

**预期输出：**
显示 EOC 安装程序帮助信息

**如果失败：**
```bash
# 检查安装
npm list -g easy-opencode

# 重新安装
npm install -g easy-opencode

# 或使用 npx
npx easy-opencode install
```

---

## ✅ 项目配置检查

- [ ] 在项目中运行了 `eoc-install`
- [ ] 选择了安装类型（推荐项目级）
- [ ] 项目根目录存在 `.opencode/` 目录
- [ ] 项目根目录存在或更新了 `opencode.json`
- [ ] `.opencode/` 目录包含必要文件

**验证命令：**
```bash
cd your-project
ls -la .opencode/
cat opencode.json
```

**预期结构：**
```
.opencode/
├── hooks/
├── plugins/
└── instructions/
```

---

## ✅ DeepSeek API Key 配置检查

- [ ] 已获取 DeepSeek API Key
- [ ] API Key 格式正确（以 `sk-` 开头）
- [ ] 已配置 API Key 到 `opencode.json` 或环境变量
- [ ] 已测试 API Key 连接

**验证命令：**
```bash
# 查看配置
cat opencode.json

# 或查看环境变量
echo $OPENCODE_API_KEY  # Linux/Mac
echo %OPENCODE_API_KEY%  # Windows
```

**配置示例：**
```json
{
  "model": "deepseek/deepseek-chat",
  "api_key": "sk-xxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**测试：**
```bash
opencode
# 然后在 OpenCode 中测试连接
```

---

## ✅ OpenCode 集成检查

- [ ] 可以启动 OpenCode：`opencode`
- [ ] 可以看到 EOC 代理：`/agents`
- [ ] 可以使用 EOC 命令：`/help`
- [ ] DeepSeek 模型可以正常响应

**验证命令：**
```bash
cd your-project
opencode
```

**在 OpenCode 中测试：**
```
/agents
```

**预期输出：**
应该看到 14 个代理（3 个可见，11 个隐藏）

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

**测试 DeepSeek：**
```
你好，请用 DeepSeek 模型回复我。
```

---

## ✅ 基本功能测试

- [ ] 可以使用 `/plan` 命令
- [ ] 可以使用 `/tdd` 命令
- [ ] 可以使用 `/code-review` 命令
- [ ] 可以使用 `/security` 命令
- [ ] 代理可以正常响应
- [ ] 代码生成和编辑功能正常

**测试命令：**
```
/plan 创建一个简单的 Hello World 应用
/tdd 编写一个用户登录测试
/code-review 检查当前代码
/security 检查输入验证代码
```

---

## 🎯 完成检查

如果以上所有项目都打勾 ✓，恭喜你！

你的 Easy OpenCode 安装完成！🎉

### 下一步：

1. **阅读文档** - 查看 [完整文档](../README.md)
2. **学习技能** - 探索 [50+ 技能](../skills/)
3. **开始项目** - 创建你的第一个 AI 辅助项目
4. **尝试命令** - 使用 `/plan`、`/tdd`、`/code-review` 等命令

---

## 🆘 故障排除

### 检查清单项目失败

**1. Node.js/npm 未安装或版本过低：**
- [x] 访问 https://nodejs.org/ 下载最新 LTS 版本
- [x] 运行安装程序
- [x] 验证：`node --version`、`npm --version`

**2. opencode 命令未找到：**
- [x] 检查 npm 全局路径：`npm config get prefix`
- [x] 将路径添加到系统 PATH
- [x] 重启终端
- [x] 验证：`opencode --version`

**3. eoc-install 命令未找到：**
- [x] 检查安装：`npm list -g easy-opencode`
- [x] 重新安装：`npm install -g easy-opencode`
- [x] 验证：`eoc-install --help`

**4. DeepSeek API Key 无效：**
- [x] 确认 API Key 格式：`sk-xxxxxxxxxxxx`
- [x] 检查是否有空格或引号
- [x] 验证 API Key 在 DeepSeek 平台是否有效
- [x] 检查 `opencode.json` 配置
- [x] 重启 OpenCode

**5. EOC 代理未显示：**
- [x] 确认运行了 `eoc-install`
- [x] 检查 `.opencode/` 目录是否存在
- [x] 检查 `opencode.json` 配置
- [x] 重新运行 `eoc-install`

---

## 📞 获取帮助

如果问题仍未解决：

- 📖 [完整安装指南](FULL_INSTALLATION_GUIDE.md) - 详细步骤说明
- 🐛 [GitHub Issues](https://github.com/jabing/easy_opencode/issues) - 报告问题
- 💬 [GitHub Discussions](https://github.com/jabing/easy_opencode/discussions) - 社区讨论
- 🌐 [DeepSeek Platform](https://platform.deepseek.com/) - API 支持

---

**祝你使用愉快！🚀**
