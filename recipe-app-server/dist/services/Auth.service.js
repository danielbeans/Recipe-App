"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = require("../model/User.model");
exports.AuthService = {
    login({ username, password }) {
        // query db for username, authenticate by comparing pw hashes
        console.log("Here is where a login should occur.");
    },
    async createUser({ name, username, password, email }) {
        try {
            const user = new User_model_1.UserModel({ name, email, username, password });
            await user.save();
            return user;
        }
        catch (err) {
            console.error(err);
        }
    },
};
