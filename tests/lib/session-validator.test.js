const path=require("path");
const fs=require("fs");
const rootDir=path.resolve(__dirname,"..","..");

describe("session-validator.js",()=>{
  const scriptPath=path.join(rootDir,"scripts","session-validator.js");
  test("script exists",()=>{expect(fs.existsSync(scriptPath)).toBe(true);});
  test("script is valid",()=>{const c=fs.readFileSync(scriptPath,"utf-8");expect(c).toContain("#!/usr/bin/env node");});
  test("has list command",()=>{const c=fs.readFileSync(scriptPath,"utf-8");expect(c).toContain("listSessions");});
});
