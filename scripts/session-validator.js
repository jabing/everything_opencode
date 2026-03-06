#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

function getSessionsDir() {
  return path.join(os.homedir(), '.opencode', 'sessions');
}

function getSessionFiles() {
  const dir = getSessionsDir();
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({ path: path.join(dir, f), name: f }))
    .sort((a, b) => b - a);
}

function listSessions() {
  const files = getSessionFiles();
  console.log('=== Sessions ===');
  console.log('Total:', files.length);
  files.slice(0, 10).forEach((f, i) => {
    console.log((i + 1) + '. ' + f.name);
  });
}

const cmd = process.argv[2];
if (cmd === 'list') listSessions();
else console.log('Usage: node session-validator.js list');
