"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchFiles = exports.serverURL = void 0;
const storage_1 = __importDefault(require("../common/storage"));
exports.serverURL = `http://127.0.0.1:${storage_1.default.port()}/plugin.config/rules`;
exports.watchFiles = ["whistle.conf"];
