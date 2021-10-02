"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const config_1 = tslib_1.__importDefault(require("../config"));
exports.connectDb = async () => {
    const uri = `mongodb+srv://${config_1.default.atlas.username}:${config_1.default.atlas.password}@${config_1.default.atlas.cluster}/${config_1.default.atlas.dbname}?retryWrites=true&w=majority`;
    mongoose_1.default.Promise = global.Promise;
    mongoose_1.default.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
