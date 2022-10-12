"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePin = exports.hashPin = void 0;
const bcrypt_1 = require("bcrypt");
const saltRounds = 10;
function hashPin(pin) {
    const salt = (0, bcrypt_1.genSaltSync)(saltRounds);
    const encrypted = (0, bcrypt_1.hashSync)(pin, salt);
    return {
        encrypted,
    };
}
exports.hashPin = hashPin;
function comparePin(pin, hashPin) {
    return (0, bcrypt_1.compareSync)(pin, hashPin);
}
exports.comparePin = comparePin;
