const fs = require('fs-extra');
const path = require('path');
const resolve = (v) => path.resolve(__dirname, v);

const PORT_FILE = '.port';
const RULES_FILE = '.rules';

const writeFileSync = (filename, data) =>
  fs.writeFileSync(resolve(filename), data);
const readFileSync = (filename) => fs.readFileSync(resolve(filename), 'utf-8');

let jsonRules = {};
let port = 8899;

const readJsonRules = () => {
  if (!readJsonRules.sync) {
    try {
      jsonRules = JSON.parse(readFileSync(RULES_FILE));
      readPort.sync = true;
    } catch {}
  }
  return jsonRules;
};

let textRules = '';
const readTextRules = () => {
  const rules = readJsonRules();
  if (readTextRules.dirty) {
    textRules = Object.entries(rules).reduce((res, [id, value]) => {
      res += `# ${id} begin block >>> >>> >>> \n\n ${value} \n\n# ${id} end block >>> >>> >>>\n\n`;
      return res;
    }, '');
    readTextRules.dirty = false;
  }
  return textRules;
};
readTextRules.dirty = true;

const writeJsonRules = (r) => {
  readTextRules.dirty = true;
  jsonRules = r;
  writeFileSync(RULES_FILE, JSON.stringify(r));
};

const readPort = () => {
  if (!readPort.sync) {
    try {
      port = +readFileSync(PORT_FILE);
      readPort.sync = true;
    } catch {}
  }
  return port;
};

module.exports = {
  getTextRules() {
    return getTextRules();
  },
  getJsonRules() {
    return readJsonRules();
  },
  put({ id, rules }) {
    const sRules = readJsonRules();
    sRules[id] = rules;
    writeJsonRules(sRules);
  },
  delete({ id }) {
    const sRules = readJsonRules();
    Reflect.deleteProperty(sRules, id);
    writeJsonRules(sRules);
  },
  setPort(p) {
    writeFileSync(PORT_FILE, (port = String(p)));
  },
  port() {
    return readPort();
  },
};
