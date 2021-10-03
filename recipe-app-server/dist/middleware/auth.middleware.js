"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = tslib_1.__importDefault(require("../config"));
// verifies the JWT passed into a given route.
exports.verifyJwt = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token)
        return res.status(403).send({ error: "No token provided" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.auth.secret);
        req.user = decoded;
    }
    catch (err) {
        return res.status(401).send({ error: "Token is invalid" });
    }
    next();
};
