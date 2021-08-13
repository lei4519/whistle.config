#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = __importDefault(require("chokidar"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const const_1 = require("./const");
const service_1 = require("./service");
const cleanup_1 = require("../common/cleanup");
const utils_1 = require("../common/utils");
const cwd = process.cwd();
const pid = process.pid;
const handler = utils_1.debounce(async (type, filename) => {
    const filePath = path_1.default.resolve(cwd, filename);
    const id = `${pid}${cwd}`;
    if (type === "unlink") {
        service_1.ruleService.delete(id);
    }
    else {
        const rules = await fs_extra_1.default.readFile(filePath, "utf-8");
        service_1.ruleService.put(id, rules);
    }
}, 500);
const watcher = chokidar_1.default.watch(const_1.watchFiles, {
    cwd,
});
watcher.on("all", handler);
cleanup_1.Cleanup(() => {
    child_process_1.spawn(`node ${path_1.default.resolve(__dirname, "clean.js")}`, {
        cwd,
        shell: true,
        detached: true,
        stdio: "ignore",
    });
});
console.log("whistle.config starts watching...");
