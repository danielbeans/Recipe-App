"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// MODELS USED TO CREATE NEW DOCUMENTS IN MONGODB
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const jdenticon_1 = tslib_1.__importDefault(require("jdenticon"));
const uuid_1 = require("uuid");
const hash_utility_1 = require("../util/hash.utility");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
});
UserSchema.pre("save", async function () {
    try {
        if (this.isModified("password") || this.isNew) {
            const hash = await hash_utility_1.hashPassword(this.password); // this refers to the current model being created
            this.password = hash;
            this.avatar = jdenticon_1.default.toSvg(uuid_1.v4(), 200);
        }
    }
    catch (err) {
        console.error(err);
    }
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
