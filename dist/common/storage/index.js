"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const const_1 = require("./const");
const resolve = (v) => path_1.default.resolve(__dirname, v);
const writeFileSync = (filename, data) => fs_extra_1.default.writeFileSync(resolve(filename), data);
const readFileSync = (filename) => fs_extra_1.default.readFileSync(resolve(filename), "utf-8");
const [writeJsonRules, readJsonRules, readTextRules] = (() => {
    let jsonRules = {};
    let textRules = "";
    let sync = false;
    let dirty = true;
    const r = () => {
        if (!sync) {
            try {
                jsonRules = JSON.parse(readFileSync(const_1.RULES_FILE));
                sync = true;
            }
            catch (_a) { }
        }
        return jsonRules;
    };
    const w = (r) => {
        dirty = true;
        jsonRules = r;
        writeFileSync(const_1.RULES_FILE, JSON.stringify(r));
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
    return [w, r, rt];
})();
const [writePort, readPort] = (() => {
    let port = 8899;
    let sync = false;
    const w = (p) => {
        writeFileSync(const_1.PORT_FILE, String((port = p)));
    };
    const r = () => {
        if (!sync) {
            try {
                port = +readFileSync(const_1.PORT_FILE);
                sync = true;
            }
            catch (_a) { }
        }
        return port;
    };
    return [w, r];
})();
exports.default = {
    getTextRules() {
        return readTextRules();
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
        writePort(p);
    },
    port() {
        return readPort();
    },
};
