"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_service_1 = require("../services/Auth.service");
exports.AuthController = {
    async login(req, res) {
        try {
            const { token } = await Auth_service_1.AuthService.login(req.body); // logs the user
            res.status(201).json({ token }); // on successful login, return jwt
        }
        catch (err) {
            res.status(400).send({ error: err.message });
        }
    },
    async signup(req, res) {
        try {
            const { token } = await Auth_service_1.AuthService.createUser(req.body); // sign user up
            res.status(201).json(token); // on successful signup, send jwt
        }
        catch (err) {
            res.status(400).send({ error: err.message });
        }
    },
};
