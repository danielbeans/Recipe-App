"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    atlas: {
        password: process.env.ATLAS_PASSWORD,
        username: process.env.ATLAS_USERNAME,
        cluster: process.env.ATLAS_CLUSTER,
        dbname: process.env.ATLAS_DBNAME,
    },
    express: {
        port: process.env.PORT,
    },
};
