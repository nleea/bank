"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenObj = void 0;
function flattenObj(obj, res = {}) {
    for (let key in obj) {
        let propName = key;
        if (typeof obj[key] == "object") {
            flattenObj(obj[key], res);
        }
        else {
            res[propName] = obj[key];
        }
    }
    return res;
}
exports.flattenObj = flattenObj;
