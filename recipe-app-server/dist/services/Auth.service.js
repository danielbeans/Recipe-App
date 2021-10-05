"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const User_model_1 = require("../model/User.model");
const password_utility_1 = require("../util/password.utility");
const config_1 = tslib_1.__importDefault(require("../config"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
exports.AuthService = {
    EXPIRATION: "2h",
    async login({ username, password }) {
        const user = await User_model_1.UserModel.findOne({ username });
        if (user && (await password_utility_1.validatePassword(password, user.password))) {
            const token = this.signToken(user, username);
            user.token = token;
            delete user.password;
            return user;
        }
        throw new Error("Username and/or password combination incorrect");
    },
    async createUser({ name, username, password, email }) {
        const hasDuplicate = await this.checkDuplicateEmailOrUsername(email, username);
        if (hasDuplicate)
            throw hasDuplicate;
        email = email.toLowerCase();
        console.log(email);
        const user = await User_model_1.UserModel.create({
            name,
            email,
            username,
            password,
        });
        const token = this.signToken(user, email);
        user.token = token;
        delete user.password;
        return user;
    },
    async checkDuplicateEmailOrUsername(email, username) {
        // check if user with email or username already exists in db
        const exists = await User_model_1.UserModel.findOne({ $or: [{ username }, { email }] });
        if (exists && exists.username === username && exists.email === email)
            return new Error("User with username and email already exists.");
        else if (exists && exists.email === email)
            return new Error("User with email already exists.");
        else if (exists && exists.username === username)
            return new Error("User with username already exists.");
        return false;
    },
    signToken(user, username) {
        return jsonwebtoken_1.default.sign({ user_id: user._id, username }, config_1.default.auth.secret, {
            expiresIn: this.EXPIRATION,
        });
    },
};
