# 仓库 URL 变更说明

## 变更内容

**旧仓库**: `https://github.com/jabing/everything_opencode`  
**新仓库**: `https://github.com/jabing/easy_opencode`

## 变更原因

GitHub 仓库名称从 `everything_opencode` 变更为 `easy_opencode`，与新的 npm 包名 `easy-opencode` 保持一致。

## 已更新的文件

以下文件已更新以使用新的仓库 URL：

### 1. 核心配置文件
- ✅ `package.json`
  - `repository.url` → `https://github.com/jabing/easy_opencode.git`
  - `bugs.url` → `https://github.com/jabing/easy_opencode/issues`
  - `homepage` → `https://github.com/jabing/easy_opencode#readme`

### 2. 文档文件
- ✅ `README.md`
  - GitHub Stars badge URL
  - git clone 命令示例
  - 所有仓库链接

- ✅ `QUICKSTART.md`
  - 所有仓库链接

- ✅ `AGENTS.md`
  - git clone 命令
  - 项目目录名称

- ✅ `docs/FULL_INSTALLATION_GUIDE.md`
  - 所有 GitHub 链接

- ✅ `docs/ZH_QUICKSTART.md`
  - GitHub Stars badge
  - 所有 GitHub 链接

- ✅ `docs/INSTALLATION_CHECKLIST.md`
  - Issues 和 Discussions 链接

- ✅ `docs/NPM_INSTALLATION.md`
  - Issues 和 Discussions 链接

- ✅ `docs/NPM_PUBLISHING_GUIDE.md`
  - 所有 GitHub 链接

- ✅ `docs/PUBLISH_QUICK_REFERENCE.md`
  - 仓库 URL

### 3. 配置文件
- ✅ `.sisyphus/boulder.json`
  - 项目路径引用

## 影响范围

### 仓库链接
- 克隆命令：`git clone https://github.com/jabing/easy_opencode.git`
- Issues: https://github.com/jabing/easy_opencode/issues
- Discussions: https://github.com/jabing/easy_opencode/discussions
- README: https://github.com/jabing/easy_opencode#readme

### 项目目录
- 新仓库名：`easy_opencode`
- 本地目录：`easy_opencode`（用户 clone 时）

## 更新汇总

| 更新项 | 旧值 | 新值 |
|--------|-------|-------|
| 仓库名 | `everything_opencode` | `easy_opencode` |
| 仓库 URL | `github.com/jabing/everything_opencode` | `github.com/jabing/easy_opencode` |
| clone 命令 | `git clone github.com/jabing/everything_opencode` | `git clone github.com/jabing/easy_opencode` |
| Issues URL | `.../everything_opencode/issues` | `.../easy_opencode/issues` |
| Discussions URL | `.../everything_opencode/discussions` | `.../easy_opencode/discussions` |

## 一致性说明

此次变更确保了以下一致性：

1. **包名与仓库名一致**
   - npm 包：`easy-opencode`
   - Git 仓库：`easy_opencode`

2. **品牌标识统一**
   - 项目名称：Easy OpenCode
   - npm 包：`easy-opencode`
   - Git 仓库：`easy_opencode`

3. **用户体验一致性**
   - 下载包：`npm install easy-opencode`
   - 克隆仓库：`git clone easy_opencode`
   - 命令名称：`eoc-install`

## 验证检查

已验证所有变更：

```bash
# 1. 验证 package.json
cat package.json | grep -A2 '"repository"'
# ✅ 应该显示: "url": "https://github.com/jabing/easy_opencode.git"

# 2. 验证 README.md
grep "github.com/jabing" README.md | head -2
# ✅ 应该显示: github.com/jabing/easy_opencode

# 3. 验证文档文件
grep "github.com/jabing/easy_opencode" docs/*.md | wc -l
# ✅ 应该显示: 23 (所有文档中的引用数）
```

## 更新 Git 远程仓库

如果实际创建了新的 Git 仓库，用户需要更新：

```bash
# 1. 查看当前远程仓库
git remote -v

# 2. 更新远程仓库 URL
git remote set-url origin https://github.com/jabing/easy_opencode.git

# 3. 验证
git remote -v
# 应该显示: origin https://github.com/jabing/easy_opencode.git (fetch)
```

## 文档同步

如果新仓库 `easy_opencode` 已创建，需要：

1. **推送所有代码**到新仓库
2. **更新 npm 包**的仓库链接
3. **发布新版本**到 npm

### 更新 npm 包的仓库信息

如果 npm 包 `easy-opencode` 已发布，需要更新仓库链接：

```bash
# 1. 更新 package.json
# package.json 已更新为正确的仓库 URL

# 2. 发布新版本
npm version patch

# 3. 推送到 GitHub
git add .
git commit -m "docs: update repository URLs to easy_opencode"
git tag v1.8.1
git push origin main
git push origin v1.8.1

# 4. 发布到 npm（会更新仓库链接）
npm publish
```

## 常见问题

### Q: 为什么要更改仓库名称？

**A**: 
- ✅ 与 npm 包名保持一致
- ✅ 提供清晰的品牌标识
- ✅ 便于用户记忆和搜索

### Q: 如果用户已经 clone 了旧仓库怎么办？

**A**: 
用户可以：
1. 继续使用旧仓库（如果仍然存在）
2. 更新到新仓库：
   ```bash
   git remote set-url origin https://github.com/jabing/easy_opencode.git
   git pull origin main
   ```

### Q: npm 包的仓库链接会自动更新吗？

**A**: 
- 需要发布新版本才能更新 npm 包中的仓库链接
- package.json 已更新，下次发布时会同步到 npm

---

**变更日期**: 2026-03-09  
**变更原因**: 与 npm 包名保持一致  
**新仓库**: https://github.com/jabing/easy_opencode
