# 包名变更说明

## 变更内容

**旧包名**: `everything-opencode`  
**新包名**: `easy-opencode`

## 变更原因

`everything-opencode` 包名已被占用，因此改为 `easy-opencode`。

## 已更新的文件

以下文件已更新以使用新的包名：

1. **核心配置文件**
   - `package.json` - 包名更新为 `easy-opencode`
   - `bin/eoc-install.js` - 更新包名引用
   - `scripts/npm-install.js` - 更新包名引用
   - `scripts/npm-postinstall.js` - 更新包名引用

2. **文档文件**
   - `README.md` - 所有包名引用已更新
   - `QUICKSTART.md` - 所有包名引用已更新
   - `docs/FULL_INSTALLATION_GUIDE.md` - 更新为 Easy OpenCode
   - `docs/ZH_QUICKSTART.md` - 更新为 Easy OpenCode
   - `docs/INSTALLATION_CHECKLIST.md` - 更新包名引用
   - `docs/NPM_INSTALLATION.md` - 更新包名引用
   - `docs/NPM_PUBLISHING_GUIDE.md` - 更新包名引用
   - `docs/PUBLISH_QUICK_REFERENCE.md` - 更新包名引用

3. **脚本文件**
   - `scripts/install.js` - 更新标题为 Easy OpenCode

## 安装命令变更

### 旧命令（不再使用）

\`\`\`bash
npm install -g everything-opencode
npx everything-opencode install
\`\`\`

### 新命令（现在使用）

\`\`\`bash
# 全局安装
npm install -g easy-opencode

# 或使用 npx
npx easy-opencode install

# 验证安装
eoc-install --help
\`\`\`

## 包信息

- **包名**: `easy-opencode`
- **版本**: `1.8.0`
- **npm URL**: https://www.npmjs.com/package/easy-opencode
- **安装 URL**: `npm install easy-opencode`

## 兼容性说明

### 二进制命令

安装命令仍然是 `eoc-install`，因为：

1. **用户友好**: 简短易记的命令
2. **向后兼容**: 如果之前使用了 `everything-opencode`，升级后无需改变使用习惯
3. **功能清晰**: EOC = Easy OpenCode

### 旧版本迁移

如果用户之前安装了 `everything-opencode`（如果已发布），需要：

\`\`\`bash
# 卸载旧版本
npm uninstall -g everything-opencode

# 安装新版本
npm install -g easy-opencode

# 使用相同的命令
eoc-install
\`\`\`

## GitHub 仓库

GitHub 仓库名称 **不需要变更**：

- **仓库**: `everything_opencode` (保持不变)
- **发布**: 发布为 `easy-opencode` 包
- **用户可见**: GitHub 仓库名不会影响 npm 使用

## 验证清单

在发布前验证：

- [ ] `package.json` 中的 `name` 为 `"easy-opencode"`
- [ ] 所有文档文件中的包名已更新
- [ ] `npm pack --dry-run` 显示正确的包名
- [ ] 二进制命令名称仍然为 `eoc-install`
- [ ] README.md 中的安装命令已更新

## 快速验证

\`\`\`bash
# 1. 检查 package.json
cat package.json | grep '"name"'

# 应该显示: "name": "easy-opencode"

# 2. 测试打包
npm pack --dry-run | head -5

# 应该显示: npm notice 📦  easy-opencode@1.8.0

# 3. 验证二进制命令
cat package.json | grep -A2 '"bin"'

# 应该显示: "bin": { "eoc-install": "./bin/eoc-install.js" }
\`\`\`

## 发布准备

发布到 npm 时使用：

\`\`\`bash
# 1. 确认 npm 已登录
npm whoami

# 2. 测试打包
npm pack

# 3. 验证 tarball
tar -tzf easy-opencode-1.8.0.tgz | head -20

# 4. 发布
npm publish
\`\`\`

## 常见问题

### Q: 为什么选择 `easy-opencode`？

**A**: 
- ✅ 名称简短易记
- ✅ 反映项目理念：让编码变得简单
- ✅ 在 npm 上可用
- ✅ 保留了 "opencode" 标识

### Q: 命令为什么不改为 `easy-install`？

**A**: 
- `eoc-install` 已成为项目的一部分
- 保持命令一致性
- EOC = Easy OpenCode 的缩写

### Q: 用户需要改变使用习惯吗？

**A**: 不需要！
- 安装命令改变：`npm install -g easy-opencode`
- 但使用命令不变：`eoc-install`
- 使用体验保持一致

---

**变更日期**: 2026-03-09  
**变更原因**: 包名冲突（everything-opencode 已被占用）  
**新包名**: easy-opencode
