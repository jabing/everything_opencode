const path=require("path");
const fs=require("fs");
const rootDir=path.resolve(__dirname,"..","..");
const commandsDir=path.join(rootDir,"commands");
function getCommandFiles(){return fs.readdirSync(commandsDir).filter(f=>f.endsWith(".md"));}
describe("Commands",()=>{
  test("all command files exist",()=>{const files=getCommandFiles();expect(files.length).toBeGreaterThan(30);});
  test("harness-audit.md has content",()=>{const c=fs.readFileSync(path.join(commandsDir,"harness-audit.md"),"utf-8");expect(c).toContain("# Harness Audit");});
  test("loop-start.md has content",()=>{const c=fs.readFileSync(path.join(commandsDir,"loop-start.md"),"utf-8");expect(c).toContain("# Loop Start");});
  test("loop-status.md has content",()=>{const c=fs.readFileSync(path.join(commandsDir,"loop-status.md"),"utf-8");expect(c).toContain("# Loop Status");});
  test("quality-gate.md has content",()=>{const c=fs.readFileSync(path.join(commandsDir,"quality-gate.md"),"utf-8");expect(c).toContain("# Quality Gate");});
  test("model-route.md has content",()=>{const c=fs.readFileSync(path.join(commandsDir,"model-route.md"),"utf-8");expect(c).toContain("# Model Route");});
});
