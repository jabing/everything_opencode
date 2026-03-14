# npm 发布快速参考

## 快速发布流程

### 1. 注册和登录

```bash
# 访问 https://www.npmjs.com/ 注册账号

# 登录 npm
npm login
# 输入用户名、密码、邮箱、2FA 码

# 验证登录
npm whoami
```

### 2. 验证包名

```bash
# 检查包名是否可用
npm view easy-opencode

# 如果显示 "404 Not Found"，说明包名可用
# 如果显示包信息，说明已被占用
```

### 3. 验证 package.json

```bash
# 查看当前配置
cat package.json

# 检查必需字段：
# - name: 包名
# - version: 版本号
# - description: 描述
# - main: 入口文件
# - bin: 命令行工具
# - license: 许可证
# - repository: Git 仓库
```

### 4. 准备发布文件

```bash
# 查看将要发布的文件
npm pack --dry-run

# 创建 tarball 测试
npm pack

# 这会创建: easy-opencode-1.8.0.tgz
```

### 5. 本地测试

```bash
# 使用 npm link 本地测试
npm link

# 在另一个目录测试
cd /tmp/test
npm link easy-opencode
npx easy-opencode install
```

### 6. 发布到 npm

```bash
# 首次发布
npm publish

# 或发布为 beta
npm publish --tag beta

# 发布特定目录
npm publish --prefix ./dist

# 发布到组织（作用域包）
npm publish --access public
```

### 7. 验证发布

```bash
# 查看 npm 上的包
npm view easy-opencode

# 查看版本列表
npm view easy-opencode versions

# 测试安装
cd /tmp/test-install
npm install easy-opencode
npx easy-opencode install
```

### 8. 发布新版本

```bash
# 更新版本号
npm version patch    # 1.8.0 -> 1.8.1
npm version minor    # 1.8.0 -> 1.9.0
npm version major    # 1.8.0 -> 2.0.0

# 发布新版本
npm publish

# 推送到 GitHub
git add .
git commit -m "chore: release 1.8.1"
git tag v1.8.1
git push origin main
git push origin v1.8.1
```

## 常用命令

### 认证

```bash
npm login
npm whoami
npm logout
```

### 包管理

```bash
npm view easy-opencode
npm view easy-opencode versions
npm view easy-opencode --json
npm search easy-opencode
```

### 版本管理

```bash
npm version patch
npm version minor
npm version major
npm version prerelease --preid beta
```

### 发布

```bash
npm publish
npm publish --tag beta
npm publish --access public
npm publish --dry-run
npm pack
```

### 所有者管理

```bash
npm owner ls easy-opencode
npm owner add username easy-opencode
npm owner rm username easy-opencode
```

## 错误处理

### E401 Unauthorized

```bash
# 重新登录
npm login

# 或使用 token
# 访问: https://www.npmjs.com/settings/tokens
# 创建 token
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN
```

### E403 Forbidden

```bash
# 检查包名是否被占用
npm view easy-opencode

# 更换包名
# 编辑 package.json
{
  "name": "easy-opencode-ai"
}
```

### version already exists

```bash
# 查看已发布版本
npm view easy-opencode versions

# 更新版本号
npm version patch
```

### 包太大

```bash
# 检查 tarball 大小
npm pack
ls -lh *.tgz

# 优化 .npmignore
cat > .npmignore << 'EOF'
.git
node_modules
tests
docs
*.md
!README.md
!AGENTS.md
!LICENSE
EOF
```

## GitHub Actions 自动发布

### 创建 .github/workflows/publish.yml

```yaml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Publish to npm
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 设置 GitHub Secrets

1. 访问 https://www.npmjs.com/settings/tokens
2. 创建 automation token
3. 复制 token
4. 在 GitHub repo 设置中添加：
   - Settings → Secrets and variables → Actions
   - New repository secret
   - Name: `NPM_TOKEN`
   - Value: 你的 token

### 触发发布

```bash
# 更新版本
npm version patch

# 提交并打标签
git add .
git commit -m "chore: bump version"
git tag v1.8.1

# 推送到 GitHub
git push origin main
git push origin v1.8.1
```

## 安全最佳实践

1. **启用 2FA**
   - 访问: https://www.npmjs.com/settings/authentication
   - 启用两步验证

2. **使用 Automation Token**
   - 创建专用 token
   - 限制 token 权限
   - 定期轮换 token

3. **审查依赖**
   ```bash
   npm audit
   npm audit fix
   ```

## 快速检查清单

发布前检查：

- [ ] npm 已登录 (`npm whoami`)
- [ ] package.json 配置正确
- [ ] README.md 完整
- [ ] LICENSE 文件存在
- [ ] .npmignore 配置正确
- [ ] 本地测试通过 (`npm link`)
- [ ] tarball 验证通过 (`npm pack`)

---

## 获取帮助

- npm 文档: https://docs.npmjs.com/
- 发布文档: https://docs.npmjs.com/cli/v9/commands/npm-publish
- 问题报告: https://github.com/npm/cli/issues
