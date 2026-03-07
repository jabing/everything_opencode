# Token Recovery Command 
 
**Purpose:** 自动检测并处理 token 超限问题，智能压缩上下文后继续执行任务。 
 
## 使用方法 
 
当遇到 token 超限错误时： 
 
``` 
/token-recover --summary "继续实现支付流程，当前已完成：>> commands\token-recover.md & echo 1. 创建支付模型>> commands\token-recover.md & echo 2. 集成 Stripe API>> commands\token-recover.md & echo 下一步：实现 webhook 处理" 
``` 
 
## 压缩时机 
 
### ✅ 好的压缩点： 
- 研究 → 规划（完成研究后） 
- 规划 → 实现（计划在 TodoWrite 中） 
- 功能 A → 功能 B（A 已完成） 
- 调试 → 新任务（调试结束） 
 
### ❌ 避免压缩： 
- 实现过程中 
- 调试过程中 
- 复杂分析中间
