# Windows 安装错误修复计划

## 问题
`npm install -g easy-opencode` 在 Windows 上安装失败，报错：
```
SyntaxError: Invalid or unexpected token
at line 52: console.log('
```

## 原因
`npm-install.js` 中使用了多行字符串字面量，Windows Node.js 解析失败。

## 修复步骤
1. 修复 `scripts/npm-install.js`：
   - 将所有多行 `console.log` 改为单行，使用 `\n` 换行
   - 保持所有功能不变
   - 跨平台兼容

2. 升级版本到 1.9.5

3. 重新发布 NPM 包

## 验证
- Windows 上测试 `npm install -g easy-opencode@latest`
- 确认自动全局配置成功
- 确认 `opencode /agents` 显示 eoc_* 三个 agent