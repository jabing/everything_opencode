const path=require("path");
const fs=require("fs");
const rootDir=path.resolve(__dirname,"..","..");
const skillsDir=path.join(rootDir,"skills");
function getSkillFiles(){const files=[];function walk(dir){const entries=fs.readdirSync(dir,{withFileTypes:true});for(const e of entries){const full=path.join(dir,e.name);if(e.isDirectory())walk(full);else if(e.isFile()&&e.name.endsWith(".md"))files.push(full);}}walk(skillsDir);return files;}
describe("Skills",()=>{
  test("skill files exist",()=>{const files=getSkillFiles();expect(files.length).toBeGreaterThan(10);});
  test("plankton-code-quality exists",()=>{const p=path.join(skillsDir,"plankton-code-quality","SKILL.md");expect(fs.existsSync(p)).toBe(true);});
  test("tdd-workflow exists",()=>{const p=path.join(skillsDir,"tdd-workflow","SKILL.md");expect(fs.existsSync(p)).toBe(true);});
  test("security-review exists",()=>{const p=path.join(skillsDir,"security-review","SKILL.md");expect(fs.existsSync(p)).toBe(true);});
});
