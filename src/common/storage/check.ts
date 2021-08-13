import storage from '.';
import { spawn } from 'child_process';

export function checkProcessAlive() {
  setInterval(() => {
    const rules = storage.getJsonRules() || {}
    Object.keys(rules).forEach((key) => {
      const [pid] = /\d+/.exec(key) || [];
      if (pid) {
        let stdout = '';
        const cp = spawn(
          process.platform === 'win32'
            ? `tasklist /FI "PID eq ${pid}"`
            : `ps ${pid}`,
          {
            shell: true,
            stdio: 'pipe',
          },
        );
        cp.stdout.on('data', (s) => (stdout += s));
        cp.on('exit', () => {
          if (!stdout.includes(pid)) {
            storage.delete({id: key})
          }
        });
      }
    });
  }, 1000 * 60);
}
