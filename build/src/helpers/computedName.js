"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeFullName = void 0;
function computeFullName(user) {
    return {
        ...user,
        fullName: user.firts_name + " " + user.last_name,
    };
}
exports.computeFullName = computeFullName;
