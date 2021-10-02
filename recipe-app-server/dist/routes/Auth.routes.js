"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const Auth_controller_1 = require("../controllers/Auth.controller");
function AuthRoutes() {
    const router = express_1.default.Router(); // create a new router specifically for Auth routes
    router.post("/login", Auth_controller_1.AuthController.login);
    router.post("/signup", Auth_controller_1.AuthController.signup);
    return router;
}
exports.AuthRoutes = AuthRoutes;
