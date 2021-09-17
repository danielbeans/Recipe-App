"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors = require("cors");
const app = express_1.default(); // creates new express application
const PORT = 3000;
app.use(cors()); // informs express to use the cors middleware (Cross Origin Request Sharing)
app.use(express_1.default.json()); // allows JSON responses to be read
express_1.default.urlencoded({ extended: false }); // allows urlencoded responses to be read
// Need a POST route to /login in which will authenticate a user with credentials (Google OAuth or username and password).
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
});
// need a POST route to /signup in which will create a user account using information provided (either OAuth with Google or with email and password).
app.post("/signup", (req, res) => { });
app.get("/", (req, res) => {
    res.json("Hello World"); // sends back a JSON response to the client of "Hello World"
});
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`)); // tells express to listen on the port specified on localhost
