# NPM 安装自动配置计划

## 目标
修改 `scripts/npm-install.js`，让全局安装时自动配置 EOC，不需要手动运行 `eoc-install`

## 问题
- 当前 `npm install -g easy-opencode` 只下载包，不自动配置
- 用户需要手动运行 `eoc-install` 才能看到 agents
- 体验不好，很多用户不知道要运行第二步

## 解决方案
修改 `npm-install.js`，检测 `-g` 全局安装参数，自动配置到 `~/.opencode/`

---

## 修改内容

### 修改 scripts/npm-install.js

将当前只打印提示的脚本，改为：

1. 检测是否全局安装 (`-g` 参数)
2. 如果是全局安装，自动执行全局配置：
   - 复制 `.opencode/` 到 `~/.opencode/`
   - 复制 `skills/` 到 `~/.opencode/skills/`
   - 复制 `commands/` 到 `~/.opencode/commands/`
   - 复制 `prompts/` 到 `~/.opencode/prompts/`
   - 复制 `AGENTS.md` 到 `~/.opencode/`
   - 复制/合并 `opencode.json` 配置

---

## 预期效果

修改前：
```
npm install -g easy-opencode
# 只打印提示，不会自动配置
```

修改后：
```
npm install -g easy-opencode
# 自动配置到 ~/.opencode/
# 安装完成即可使用 eoc agents
```

---

## 验证

修改后测试：
```bash
npm install -g easy-opencode@latest
ls ~/.opencode/
# 应该看到 .opencode/ 配置
opencode
/agents  # 应该显示 eoc agents
```