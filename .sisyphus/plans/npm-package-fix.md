# NPM 包修复计划

## 问题描述
用户反馈安装 `easy-opencode` NPM 包后，OpenCode 中找不到 eoc 相关的 agents 和命令。

## 根本原因
1. `.opencode/` 目录被从 git 中删除，未打包到 NPM 包
2. `package.json` 配置错误：
   - `main: "index.js"` - 文件不存在
   - `files` 数组包含不存在的 `agents/` 目录

## 修复步骤

### Task 1: 修复 package.json 配置
- [x] 1.1 移除 `"main": "index.js"` (该文件不存在)
- [x] 1.2 版本号从 1.9.2 升级到 1.9.3
- [x] 1.3 从 `files` 数组移除 `agents/` (目录不存在)

### Task 2: 重建 NPM 包
- [x] 2.1 删除旧包：`rm easy-opencode-*.tgz`
- [x] 2.2 构建新包：`npm pack`
- [x] 2.3 验证包内容包含 `.opencode/` 目录

### Task 3: 验证 Agent 配置
- [x] 3.1 读取 `.opencode/opencode.json` 
- [x] 3.2 确认存在 eoc_build, eoc_planner, eoc_code_reviewer 三个 Agent
- [x] 3.3 确认配置为 visible (非 hidden)
- [x] 3.4 添加缺失的 eoc_code_reviewer agent 定义
- [x] 3.5 重建包包含修复

## 验证命令
```bash
# 检查包内容
tar -tzf easy-opencode-1.9.3.tgz | grep "^package/\.opencode"

# 检查 agent 配置
grep -A2 "eoc_build\|eoc_planner\|eoc_code_reviewer" .opencode/opencode.json
```

## 预期结果
安装修复后的包并运行 `eoc-install` 后，OpenCode 应显示：
- eoc_build
- eoc_planner  
- eoc_code_reviewer