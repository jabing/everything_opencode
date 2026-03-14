# 嵌套路径修复计划

## 问题
全局安装时目录结构错误，出现嵌套：
```
~/.opencode/.opencode/.opencode/...
```
而不是正确的：
```
~/.opencode/[配置文件]
```

## 原因
安装脚本中：
```javascript
// 错误
copyDir(path.join(installDir, '.opencode'), path.join(globalDir, '.opencode'));

// 正确
copyDir(path.join(installDir, '.opencode'), globalDir);
```

## 修复步骤
1. 修改 `scripts/npm-install.js` 修正路径
2. 版本升级到 1.9.6
3. 重新发布
4. 用户清理后重新安装：
```bash
rm -rf ~/.opencode/
npm uninstall -g easy-opencode
npm install -g easy-opencode@latest
```