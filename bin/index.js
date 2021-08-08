#! /usr/bin/env node
const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const storage = require('../lib/storage');
const { spawn } = require( 'child_process')

const serverURL = `http://127.0.0.1:${storage.port()}/plugin.config/config`;

const cwd = process.cwd();

const debounce = (fn, time) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), time);
  };
};

const handler = debounce(async (type, file) => {
  const filePath = path.resolve(cwd, file);
  if (type === 'unlink') {
    axios.delete(serverURL, {
      params: {
        id: cwd,
      },
    });
  } else {
    const rules = await fs.readFile(filePath, 'utf-8');
    axios.put(serverURL, {
      body: {
        id: cwd,
        rules,
      },
    });
  }
}, 500);

const watchFiles = ['whislte.conf'];

const watcher = chokidar.watch(watchFiles, {
  cwd,
});

watcher.on('all', handler);

require('../common/cleanup').Cleanup(() => {
  spawn(`curl -X DELETE ${serverURL}?id=${cwd}`, {
    shell: true,
    detached: true,
    stdio: 'ignore'
  })
})