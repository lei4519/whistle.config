"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = __importDefault(require("../../common/storage"));
exports.default = (server) => {
    server.on("request", (_req, res) => {
        const rules = storage_1.default.getTextRules();
        res.end(rules);
    });
};
