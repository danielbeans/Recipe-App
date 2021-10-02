"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_service_1 = require("../services/Auth.service");
exports.AuthController = {
    login(req, res) {
        Auth_service_1.AuthService.login(req.body);
    },
    async signup(req, res) {
        try {
            const user = await Auth_service_1.AuthService.createUser(req.body);
            console.log(user);
            res.status(200).send();
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: "Unable to create user." });
        }
    },
};
