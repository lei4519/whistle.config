"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noOp = exports.debounce = void 0;
function debounce(fn, time) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), time);
    };
}
exports.debounce = debounce;
function noOp() { }
exports.noOp = noOp;
