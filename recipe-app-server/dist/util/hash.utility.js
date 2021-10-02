"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
async function hashPassword(password) {
    try {
        const salt = await bcrypt_1.default.genSalt(10); // generate salt for hashing
        return bcrypt_1.default.hash(password, salt); // return hashed password
    }
    catch (err) {
        console.error(err); // replace this with actual error handling
    }
}
exports.hashPassword = hashPassword;
