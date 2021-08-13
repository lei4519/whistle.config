"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProcessAlive = void 0;
const _1 = __importDefault(require("."));
const child_process_1 = require("child_process");
function checkProcessAlive() {
    setInterval(() => {
        const rules = _1.default.getJsonRules() || {};
        Object.keys(rules).forEach((key) => {
            const [pid] = /\d+/.exec(key) || [];
            if (pid) {
                let stdout = '';
                const cp = child_process_1.spawn(process.platform === 'win32'
                    ? `tasklist /FI "PID eq ${pid}"`
                    : `ps ${pid}`, {
                    shell: true,
                    stdio: 'pipe',
                });
                cp.stdout.on('data', (s) => (stdout += s));
                cp.on('exit', () => {
                    if (!stdout.includes(pid)) {
                        _1.default.delete({ id: key });
                    }
                });
            }
        });
    }, 1000 * 60);
}
exports.checkProcessAlive = checkProcessAlive;
