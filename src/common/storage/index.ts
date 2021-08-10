import fs from "fs-extra";
import path from "path";
import { PORT_FILE, RULES_FILE } from "./const";
const resolve = (v: string) => path.resolve(__dirname, v);

const writeFileSync = (filename: string, data: string) =>
  fs.writeFileSync(resolve(filename), data);
const readFileSync = (filename: string) =>
  fs.readFileSync(resolve(filename), "utf-8");

const [writeJsonRules, readJsonRules, readTextRules] = (() => {
  let jsonRules: Record<string, string> = {};
  let textRules = "";
  let sync = false;
  let dirty = true;
  const r = () => {
    if (!sync) {
      try {
        jsonRules = JSON.parse(readFileSync(RULES_FILE));
        sync = true;
      } catch {}
    }
    return jsonRules;
  };

  const w = (r: Record<string, string>) => {
    dirty = true;
    jsonRules = r;
    writeFileSync(RULES_FILE, JSON.stringify(r));
  };

  const rt = () => {
    if (dirty) {
      const rules = r();
      textRules = Object.entries(rules).reduce((res, [id, value]) => {
        res += `# >>> begin >>>  >>> ${id} \n\n ${value} \n\n# >>> end >>> >>> ${id} \n\n`;
        return res;
      }, "");
      dirty = false;
    }
    return textRules;
  };

  return [w, r, rt] as const;
})();

const [writePort, readPort] = (() => {
  let port = 8899;
  let sync = false;
  const w = (p: number) => {
    writeFileSync(PORT_FILE, String((port = p)));
  };
  const r = () => {
    if (!sync) {
      try {
        port = +readFileSync(PORT_FILE);
        sync = true;
      } catch {}
    }
    return port;
  };
  return [w, r] as const;
})();

export default {
  getTextRules() {
    return readTextRules();
  },
  getJsonRules() {
    return readJsonRules();
  },
  put({ id, rules }: { id: string; rules: string }) {
    const sRules = readJsonRules();
    sRules[id] = rules;
    writeJsonRules(sRules);
  },
  delete({ id }: { id: string }) {
    const sRules = readJsonRules();
    Reflect.deleteProperty(sRules, id);
    writeJsonRules(sRules);
  },
  setPort(p: number) {
    writePort(p);
  },
  port() {
    return readPort();
  },
};
