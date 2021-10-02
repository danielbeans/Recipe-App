"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const config_1 = tslib_1.__importDefault(require("./config"));
const Auth_routes_1 = require("./routes/Auth.routes");
const database_utility_1 = require("./util/database.utility");
const app = express_1.default(); // creates new express application
app.use(cors_1.default()); // informs express to use the cors middleware (Cross Origin Request Sharing)
app.use(express_1.default.json()); // allows JSON responses to be read
express_1.default.urlencoded({ extended: false }); // allows urlencoded responses to be read
(async function main() {
    await database_utility_1.connectDb(); // Before making any routes for the server, wait for DB to connect
    app.use("/auth", Auth_routes_1.AuthRoutes()); // setup routes for AuthService. Second argument must be a function EXECUTION rather than a reference.
    app.listen(config_1.default.express.port, () => console.log(`App running on http://localhost:${config_1.default.express.port}`)); // tells express to listen on the port specified on localhost
})();
