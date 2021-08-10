#! /usr/bin/env node
const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');
const { spawn } = require( 'child_process')
const {watchFiles} = require('./const')
const ruleService = require('./service')
const {Cleanup} = require('../common/cleanup')
const {debounce} = require('../common/utils')
const cwd = process.cwd();

const handler = debounce(async (type, file) => {
  const filePath = path.resolve(cwd, file);

  if (type === 'unlink') {
    ruleService.delete(cwd)
  } else {
    const rules = await fs.readFile(filePath, 'utf-8');
    ruleService.put(cwd, rules)
  }
}, 500)

const watcher = chokidar.watch(watchFiles, {
  cwd,
});

watcher.on('all', handler);

Cleanup(() => {
  spawn(`node ${path.resolve(__dirname, 'clean.js')}`, {
    cwd,
    shell: true,
    detached: true,
    stdio: 'ignore'
  })
})
