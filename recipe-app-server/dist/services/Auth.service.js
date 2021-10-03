"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const User_model_1 = require("../model/User.model");
const password_utility_1 = require("../util/password.utility");
const config_1 = tslib_1.__importDefault(require("../config"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
exports.AuthService = {
    EXPIRATION: "2h",
    async login({ email, password }) {
        const user = await User_model_1.UserModel.findOne({ email });
        if (user && (await password_utility_1.validatePassword(password, user.password))) {
            const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, config_1.default.auth.secret, {
                expiresIn: this.EXPIRATION,
            });
            user.token = token;
            return user;
        }
        throw new Error("Username and/or password combination incorrect");
    },
    async createUser({ name, username, password, email }) {
        const exists = await User_model_1.UserModel.findOne({ $or: [{ username }, { email }] }); // check if user with email or username already exists in db
        if (exists && exists.username === username && exists.email === email)
            throw new Error("User with username and email already exists.");
        else if (exists && exists.email === email)
            throw new Error("User with email already exists.");
        else if (exists && exists.username === username)
            throw new Error("User with username already exists.");
        email = email.toLowerCase();
        const user = await User_model_1.UserModel.create({
            name,
            email,
            username,
            password,
        });
        const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, config_1.default.auth.secret, {
            expiresIn: this.EXPIRATION,
        });
        user.token = token;
        return user;
    },
};
