#! /usr/bin/env node
import chokidar from "chokidar";
import fs from "fs-extra";
import path from "path";
import { spawn } from "child_process";
import { watchFiles } from "./const";
import { ruleService } from "./service";
import { Cleanup } from "../common/cleanup";
import { debounce } from "../common/utils";
const cwd = process.cwd();
const pid = process.pid;
const handler = debounce(
  async (
    type: "add" | "addDir" | "change" | "unlink" | "unlinkDir",
    filename: string
  ) => {
    const filePath = path.resolve(cwd, filename);

    const id = `${pid}${cwd}`
    if (type === "unlink") {
      ruleService.delete(id);
    } else {
      const rules = await fs.readFile(filePath, "utf-8");
      ruleService.put(id, rules);
    }
  },
  500
);

const watcher = chokidar.watch(watchFiles, {
  cwd,
});

watcher.on("all", handler);

Cleanup(() => {
  spawn(`node ${path.resolve(__dirname, "clean.js")}`, {
    cwd,
    shell: true,
    detached: true,
    stdio: "ignore",
  });
});

console.log("whistle.config starts watching...");
