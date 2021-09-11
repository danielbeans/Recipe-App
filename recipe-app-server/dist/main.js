"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors = require("cors");
const app = express_1.default(); // creates new express application
const PORT = 3000;
app.use(cors()); // informs express to use the cors middleware (Cross Origin Request Sharing)
express_1.default.json(); // allows JSON responses to be read
express_1.default.urlencoded({ extended: false }); // allows urlencoded responses to be read
app.get("/", (req, res) => {
    res.json("Hello World"); // sends back a JSON response to the client of "Hello World"
});
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`)); // tells express to listen on the port specified on localhost
