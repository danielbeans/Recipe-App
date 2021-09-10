import * as express from "express";
const cors = require("cors");
const app = express(); // creates new express application
const PORT = 3000;
app.use(cors()); // informs express to use the cors middleware (Cross Origin Request Sharing)
express.json(); // allows JSON responses to be read
express.urlencoded({ extended: false }); // allows urlencoded responses to be read

app.get("/", (req, res) => {
  res.json("Hello World"); // sends back a JSON response to the client of "Hello World"
});

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`)); // tells express to listen on the port specified on localhost
