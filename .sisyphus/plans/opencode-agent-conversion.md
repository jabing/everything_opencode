# OpenCode Agent 转换工作计划

## TL;DR

> **Quick Summary**: 将 raw/ 目录下的多平台 AI agent 配置转换为 opencode 专用格式。主要工作包括：同步 agent 定义、迁移 hooks、归档其他平台配置、复制到项目根目录。

> **Deliverables**:
> - 项目根目录 `.opencode/` 配置（从 raw/ 复制并优化）
> - 13 个 agent prompt 文件（与 agents/*.md 同步）
> - hooks 迁移到 opencode 格式
> - 其他平台配置归档到 `raw/archive/platforms/`

> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Wave 1 → Wave 2 → Wave 3 → Wave 4

---

## Context

### Original Request
用户要求将 `raw/` 目录下的原始项目源码转换为 opencode 专用开发 Agents，采用 opencode 的 Agents 与 subagents 方式。

### Interview Summary
**Key Discussions**:
- 目标平台：仅 opencode（删除其他平台配置）
- Agent 数量：12 个足够，无需新增
- Skills 处理：全部保留 50+
- Hooks：从 .cursor/hooks.json 迁移到 opencode
- 验证策略：TDD 完整测试
- Agent 主源：agents/*.md → 同步到 .txt
- 删除策略：归档后删除
- 目标位置：复制到项目根目录

**Research Findings**:
- `.opencode/` 已存在完整配置（12 agents + 24 commands）
- 存在 5 种平台配置需要归档：.cursor/, .claude/, .claude-plugin/, .codex/, .agents/
- hooks.json 有 15+ 个自动化钩子需要迁移
- skills/ 目录有 50+ 个 SKILL.md 文件需保留

### Metis Review
**Identified Gaps** (addressed):
- Agent 主源确认：选择 agents/*.md 作为主源
- Hooks 迁移范围：全部 15+ hooks 迁移
- 删除方式：归档到 raw/archive/platforms/ 而非直接删除
- 目标位置：复制到项目根目录

---

## Work Objectives

### Core Objective
将 raw/ 中的多平台配置转换为 opencode 专用格式，保留所有 agent/skill 功能，归档其他平台配置，最终部署到项目根目录。

### Concrete Deliverables
- `C:\dev_projects\everything-claude-code\.opencode/` - 项目根目录的 opencode 配置
- `.opencode/prompts/agents/*.txt` - 13 个 agent prompt 文件（与 raw/agents/*.md 同步）
- `.opencode/hooks/` - 迁移后的 hooks 配置
- `raw/archive/platforms/` - 归档的其他平台配置

### Definition of Done
- [ ] JSON 配置语法验证通过
- [ ] 13 个 agent prompt 文件存在且内容同步
- [ ] 其他平台配置已归档
- [ ] 项目根目录有完整的 .opencode/ 配置

### Must Have
- 保留所有 50+ skills
- 保留所有 12 个 agents
- Hooks 功能完整迁移
- 配置文件语法正确

### Must NOT Have (Guardrails)
- 不得修改 agent 指令内容（仅格式转换）
- 不得删除未归档的配置
- 不得遗漏任何 skill 文件
- 不得在迁移过程中改变 agent 行为

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: YES (tests/ 目录存在)
- **Automated tests**: YES (TDD)
- **Framework**: bun test
- **TDD Workflow**: 每个配置变更前验证 → 变更后验证 → 对比结果

### QA Policy
- **Config Files**: 使用 JSON.parse 验证语法
- **Agent Prompts**: 检查文件存在性和内容同步
- **Hooks**: 验证迁移后功能等效
- **Archive**: 验证归档完整性

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — 准备和验证):
├── Task 1: 创建归档目录结构 [quick]
├── Task 2: 验证现有 opencode.json 配置 [quick]
├── Task 3: 检查 agents/*.md 与 .txt 文件差异 [quick]
└── Task 4: 备份当前 raw/.opencode/ [quick]

Wave 2 (After Wave 1 — Agent 同步):
├── Task 5: 同步 planner agent [quick]
├── Task 6: 同步 architect agent [quick]
├── Task 7: 同步 code-reviewer agent [quick]
├── Task 8: 同步 security-reviewer agent [quick]
├── Task 9: 同步 tdd-guide agent [quick]
├── Task 10: 同步 build-error-resolver agent [quick]
├── Task 11: 同步 e2e-runner agent [quick]
├── Task 12: 同步 doc-updater agent [quick]
├── Task 13: 同步 refactor-cleaner agent [quick]
├── Task 14: 同步 go-reviewer agent [quick]
├── Task 15: 同步 go-build-resolver agent [quick]
└── Task 16: 同步 database-reviewer agent [quick]

Wave 3 (After Wave 2 — Hooks 和配置迁移):
├── Task 17: 分析 .cursor/hooks.json 结构 [quick]
├── Task 18: 迁移核心 hooks 到 opencode 格式 [unspecified-high]
├── Task 19: 归档 .cursor/ 配置 [quick]
├── Task 20: 归档 .claude/ 配置 [quick]
├── Task 21: 归档 .claude-plugin/ 配置 [quick]
├── Task 22: 归档 .codex/ 配置 [quick]
└── Task 23: 归档 .agents/ 配置 [quick]

Wave 4 (After Wave 3 — 部署和验证):
├── Task 24: 复制 .opencode/ 到项目根目录 [quick]
├── Task 25: 复制 agents/ 到项目根目录 [quick]
├── Task 26: 复制 skills/ 到项目根目录 [quick]
├── Task 27: 复制 commands/ 到项目根目录 [quick]
├── Task 28: 验证项目根目录配置完整性 [unspecified-high]
└── Task 29: 创建根目录 AGENTS.md 指南 [writing]

Critical Path: Task 1-4 → Task 5-16 → Task 17-23 → Task 24-29
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 12 (Wave 2)
```

### Dependency Matrix

- **1-4**: — — 5-16, 17
- **5-16**: 4 — 17-23, 3
- **17-23**: 16 — 24-29, 4
- **24-29**: 23 — F1-F4, 6

---

## TODOs

### Wave 1: 准备和验证

- [ ] 1. 创建归档目录结构

  **What to do**:
  - 创建 `raw/archive/platforms/` 目录
  - 创建子目录：`.cursor/`, `.claude/`, `.claude-plugin/`, `.codex/`, `.agents/`
  - 添加 README 说明归档目的

  **Must NOT do**:
  - 不要直接删除原始配置
  - 不要修改原始配置内容

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 19-23
  - **Blocked By**: None

  **References**:
  - `raw/.cursor/hooks.json` - 需要归档的 Cursor hooks 配置
  - `raw/.claude-plugin/plugin.json` - 需要归档的 Claude 插件配置

  **Acceptance Criteria**:
  - [ ] `raw/archive/platforms/` 目录存在
  - [ ] 5 个子目录已创建

  **QA Scenarios**:
  ```
  Scenario: 归档目录创建成功
    Tool: Bash
    Steps:
      1. ls raw/archive/platforms/
    Expected Result: 显示 5 个子目录
    Evidence: .sisyphus/evidence/task-01-archive-structure.txt
  ```

  **Commit**: YES
  - Message: `chore(archive): create archive directory structure`
  - Files: `raw/archive/`

- [ ] 2. 验证现有 opencode.json 配置

  **What to do**:
  - 读取 `raw/.opencode/opencode.json`
  - 验证 JSON 语法正确性
  - 检查所有 agent 定义完整（12 个）
  - 检查所有 command 定义完整（24 个）

  **Must NOT do**:
  - 不要修改配置内容

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 5-16
  - **Blocked By**: None

  **References**:
  - `raw/.opencode/opencode.json` - 主配置文件

  **Acceptance Criteria**:
  - [ ] JSON.parse 验证通过
  - [ ] 12 个 agent 定义存在
  - [ ] 24 个 command 定义存在

  **QA Scenarios**:
  ```
  Scenario: JSON 配置验证通过
    Tool: Bash
    Steps:
      1. node -e "JSON.parse(require('fs').readFileSync('raw/.opencode/opencode.json'))" && echo "PASS"
    Expected Result: 输出 "PASS"
    Evidence: .sisyphus/evidence/task-02-json-valid.txt
  ```

  **Commit**: NO

- [ ] 3. 检查 agents/*.md 与 .txt 文件差异

  **What to do**:
  - 对比 `raw/agents/*.md` 和 `raw/.opencode/prompts/agents/*.txt`
  - 记录每个文件的差异情况
  - 生成差异报告到 `.sisyphus/evidence/`

  **Must NOT do**:
  - 不要修改任何文件

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 5-16
  - **Blocked By**: None

  **References**:
  - `raw/agents/*.md` - Markdown 格式的 agent 定义
  - `raw/.opencode/prompts/agents/*.txt` - txt 格式的 agent prompt

  **Acceptance Criteria**:
  - [ ] 差异报告生成完成
  - [ ] 记录了所有 agent 的差异情况

  **QA Scenarios**:
  ```
  Scenario: 差异报告生成成功
    Tool: Bash
    Steps:
      1. test -f .sisyphus/evidence/task-03-diff-report.md && echo "PASS"
    Expected Result: 输出 "PASS"
    Evidence: .sisyphus/evidence/task-03-diff-report.md
  ```

  **Commit**: NO

- [ ] 4. 备份当前 raw/.opencode/

  **What to do**:
  - 复制 `raw/.opencode/` 到 `raw/.opencode.backup/`
  - 确保所有文件完整复制

  **Must NOT do**:
  - 不要修改原始文件

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 5-16
  - **Blocked By**: None

  **References**:
  - `raw/.opencode/` - 需要备份的目录

  **Acceptance Criteria**:
  - [ ] `raw/.opencode.backup/` 目录存在
  - [ ] 文件数量与原始目录一致

  **QA Scenarios**:
  ```
  Scenario: 备份完成
    Tool: Bash
    Steps:
      1. diff -r raw/.opencode raw/.opencode.backup > /dev/null 2>&1 && echo "PASS"
    Expected Result: 输出 "PASS"
    Evidence: .sisyphus/evidence/task-04-backup.txt
  ```

  **Commit**: YES
  - Message: `chore(backup): backup current opencode config`
  - Files: `raw/.opencode.backup/`

---

### Wave 2: Agent 同步（12 个并行任务）

- [ ] 5-16. 同步所有 Agent Prompts

  **What to do**（对以下每个 agent 执行）:
  - planner, architect, code-reviewer, security-reviewer
  - tdd-guide, build-error-resolver, e2e-runner, doc-updater
  - refactor-cleaner, go-reviewer, go-build-resolver, database-reviewer
  
  步骤：
  1. 读取 `raw/agents/{name}.md` 内容（跳过 YAML frontmatter）
  2. 写入 `raw/.opencode/prompts/agents/{name}.txt`
  3. 确保内容完全一致（除 frontmatter 外）

  **Must NOT do**:
  - 不要修改 agent 指令内容
  - 不要添加或删除指令

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES（12 个任务可并行）
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 17-23
  - **Blocked By**: Task 4

  **References**:
  - `raw/agents/*.md` - 源文件
  - `raw/.opencode/prompts/agents/*.txt` - 目标文件

  **Acceptance Criteria**（每个 agent）:
  - [ ] .txt 文件存在
  - [ ] 内容与 .md 文件（除 frontmatter）一致

  **QA Scenarios**:
  ```
  Scenario: Agent prompts 同步完成
    Tool: Bash
    Steps:
      1. for f in raw/.opencode/prompts/agents/*.txt; do test -f "$f" && echo "OK: $f"; done
    Expected Result: 所有 12 个文件输出 OK
    Evidence: .sisyphus/evidence/task-05-16-agents-sync.txt
  ```

  **Commit**: YES
  - Message: `feat(agents): sync agent prompts from .md to .txt`
  - Files: `raw/.opencode/prompts/agents/`

---

### Wave 3: Hooks 和配置迁移

- [ ] 17. 分析 .cursor/hooks.json 结构

  **What to do**:
  - 读取 `raw/.cursor/hooks.json`
  - 列出所有 hooks 及其触发条件和动作
  - 生成分析报告

  **References**:
  - `raw/.cursor/hooks.json` - Cursor hooks 配置

  **Commit**: NO

- [ ] 18. 迁移核心 hooks 到 opencode 格式

  **What to do**:
  - 将 .cursor/hooks.json 中的 hooks 转换为 opencode 格式
  - 创建 `raw/.opencode/hooks/` 目录（如不存在）
  - 保存转换后的 hooks

  **References**:
  - `raw/.cursor/hooks.json` - 源格式
  - `raw/.opencode/hooks/` - 目标目录

  **Commit**: YES
  - Message: `feat(hooks): migrate hooks from cursor to opencode`

- [ ] 19-23. 归档平台配置

  **What to do**（对每个目录执行）:
  - 19: 移动 `raw/.cursor/` → `raw/archive/platforms/.cursor/`
  - 20: 移动 `raw/.claude/` → `raw/archive/platforms/.claude/`
  - 21: 移动 `raw/.claude-plugin/` → `raw/archive/platforms/.claude-plugin/`
  - 22: 移动 `raw/.codex/` → `raw/archive/platforms/.codex/`
  - 23: 移动 `raw/.agents/` → `raw/archive/platforms/.agents/`

  **Must NOT do**:
  - 不要直接删除（必须先归档）
  - 不要修改归档内容

  **Parallelization**:
  - **Can Run In Parallel**: YES（5 个任务可并行）
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 24-29
  - **Blocked By**: Task 1, Task 18

  **QA Scenarios**:
  ```
  Scenario: 平台配置归档完成
    Tool: Bash
    Steps:
      1. test -d raw/archive/platforms/.cursor && echo "OK: cursor"
      2. test -d raw/archive/platforms/.claude && echo "OK: claude"
      3. test ! -d raw/.cursor && echo "OK: cursor removed"
    Expected Result: 所有检查通过
    Evidence: .sisyphus/evidence/task-19-23-archive.txt
  ```

  **Commit**: YES
  - Message: `refactor(archive): archive platform-specific configs`

---

### Wave 4: 部署和验证

- [ ] 24. 复制 .opencode/ 到项目根目录

  **What to do**:
  - 复制 `raw/.opencode/` 到 `C:\dev_projects\everything-claude-code\.opencode/`
  - 确保所有文件完整复制

  **Commit**: YES
  - Message: `feat(deploy): copy opencode config to project root`

- [ ] 25. 复制 agents/ 到项目根目录

  **What to do**:
  - 复制 `raw/agents/` 到 `C:\dev_projects\everything-claude-code\agents/`

  **Commit**: YES
  - Message: `feat(deploy): copy agents to project root`

- [ ] 26. 复制 skills/ 到项目根目录

  **What to do**:
  - 复制 `raw/skills/` 到 `C:\dev_projects\everything-claude-code\skills/`

  **Commit**: YES
  - Message: `feat(deploy): copy skills to project root`

- [ ] 27. 复制 commands/ 到项目根目录

  **What to do**:
  - 复制 `raw/commands/` 到 `C:\dev_projects\everything-claude-code\commands/`

  **Commit**: YES
  - Message: `feat(deploy): copy commands to project root`

- [ ] 28. 验证项目根目录配置完整性

  **What to do**:
  - 验证 `.opencode/opencode.json` 语法正确
  - 验证所有 agent prompt 文件存在
  - 验证 skills 目录完整

  **Commit**: NO

- [ ] 29. 创建根目录 AGENTS.md 指南

  **What to do**:
  - 复制或更新 `AGENTS.md` 到项目根目录
  - 更新路径引用（指向新位置）

  **Commit**: YES
  - Message: `docs: add AGENTS.md to project root`

---

- [ ] F1. **Plan Compliance Audit** — `oracle`
  验证所有 Must Have 存在，所有 Must NOT Have 不存在，证据文件完整。

- [ ] F2. **Code Quality Review** — `unspecified-high`
  运行 JSON 语法验证、文件引用检查、agent 内容对比。

- [ ] F3. **Config Verification** — `unspecified-high`
  验证 opencode.json 可被 opencode 正确加载，所有 agent 可被调用。

- [ ] F4. **Scope Fidelity Check** — `deep`
  确认没有遗漏的配置，没有额外的修改，归档完整。

---

## Commit Strategy

- **1**: `chore(archive): create archive directory structure` — raw/archive/.gitkeep
- **2-4**: `chore(backup): verify and backup current configs`
- **5-16**: `feat(agents): sync agent prompts from .md to .txt`
- **17-23**: `refactor(hooks): migrate hooks and archive platform configs`
- **24-29**: `feat(deploy): copy opencode config to project root`
- **F1-F4**: `test(verify): final verification and cleanup`

---

## Success Criteria

### Verification Commands
```bash
# JSON 语法验证
node -e "JSON.parse(require('fs').readFileSync('.opencode/opencode.json'))" && echo "PASS: Valid JSON"

# Agent 数量验证
test $(ls -1 .opencode/prompts/agents/*.txt | wc -l) -ge 13 && echo "PASS: 13+ agents"

# 平台配置归档验证
test -d raw/archive/platforms/.cursor && echo "PASS: Cursor archived"
test -d raw/archive/platforms/.claude && echo "PASS: Claude archived"

# Skills 保留验证
test $(ls -1 skills/*/SKILL.md | wc -l) -ge 50 && echo "PASS: 50+ skills"

# 项目根目录配置验证
test -f .opencode/opencode.json && echo "PASS: Root config exists"
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] JSON config valid
- [ ] All agent prompts synced
- [ ] All platform configs archived
- [ ] Root directory has complete opencode setup
