const path=require("path");
const fs=require("fs");

// Go up two levels from tests/lib to project root
const rootDir=path.resolve(__dirname,"..","..");

describe("hooks-config.js",()=>{
  const scriptPath=path.join(rootDir,"scripts","hooks-config.js");
  
  test("script exists",()=>{
    expect(fs.existsSync(scriptPath)).toBe(true);
  });
  
  test("script is valid JavaScript",()=>{
    const content=fs.readFileSync(scriptPath,"utf-8");
    expect(content).toContain("#!/usr/bin/env node");
    expect(content).toContain("ECC_HOOK_PROFILE");
  });
  
  test("has help command",()=>{
    const content=fs.readFileSync(scriptPath,"utf-8");
    expect(content).toContain("showHelp");
  });
});
