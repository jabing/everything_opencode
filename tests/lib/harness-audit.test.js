const path=require("path");
const fs=require("fs");
const rootDir=path.resolve(__dirname,"..","..");

describe("harness-audit.js",()=>{
  const scriptPath=path.join(rootDir,"scripts","harness-audit.js");
  test("script exists",()=>{expect(fs.existsSync(scriptPath)).toBe(true);});
  test("script is valid",()=>{const c=fs.readFileSync(scriptPath,"utf-8");expect(c).toContain("#!/usr/bin/env node");});
  test("script runs",()=>{const {execSync}=require("child_process");const r=execSync("node "+scriptPath,{encoding:"utf-8"});expect(r).toContain("Status: PASS");});
});
