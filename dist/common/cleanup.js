"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cleanup = void 0;
const utils_1 = require("./utils");
function Cleanup(callback) {
    function exitHandler(options) {
        try {
            (callback || utils_1.noOp)();
        }
        catch (e) {
            console.log("exitHandler", e);
        }
        if (options.exit) {
            process.exit();
        }
    }
    process.on("cleanup", exitHandler.bind(null));
    process.on("exit", exitHandler.bind(null));
    process.on("SIGINT", exitHandler.bind(null, { exit: true }));
    process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
    process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
    process.on("SIGTERM", exitHandler.bind(null, { exit: true }));
    process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
}
exports.Cleanup = Cleanup;
