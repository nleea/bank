"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanData = void 0;
const exclude_1 = require("./exclude");
const computedName_1 = require("../helpers/computedName");
const CleanData = (object, excludeData = [], computed = false) => {
    let obj = object;
    if (computed) {
        obj = (0, computedName_1.computeFullName)(obj);
    }
    if (excludeData.length) {
        excludeData.forEach((exc) => {
            obj = (0, exclude_1.exclude)(obj, exc);
        });
        return obj;
    }
};
exports.CleanData = CleanData;
