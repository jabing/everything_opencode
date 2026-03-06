const path=require("path");
const fs=require("fs");
const rootDir=path.resolve(__dirname,"..","..");

describe("quality-gate.js",()=>{
  const scriptPath=path.join(rootDir,"scripts","quality-gate.js");
  test("script exists",()=>{expect(fs.existsSync(scriptPath)).toBe(true);});
  test("script runs",()=>{const {execSync}=require("child_process");const r=execSync("node "+scriptPath,{encoding:"utf-8",cwd:rootDir});expect(r).toContain("Quality Gate");});
});

describe("model-route.js",()=>{
  const scriptPath=path.join(rootDir,"scripts","model-route.js");
  test("script exists",()=>{expect(fs.existsSync(scriptPath)).toBe(true);});
  test("script runs",()=>{const {execSync}=require("child_process");const r=execSync("node "+scriptPath,{encoding:"utf-8"});expect(r).toContain("Model Route");});
});
