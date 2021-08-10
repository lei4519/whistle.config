"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ruleService = void 0;
const axios = require("axios");
const { serverURL } = require("./const");
exports.ruleService = {
    put(id, rules) {
        axios.put(serverURL, {
            body: {
                id,
                rules,
            },
        });
    },
    delete(id) {
        axios.delete(serverURL, {
            params: {
                id,
            },
        });
    },
};
