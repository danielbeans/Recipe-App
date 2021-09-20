import express from "express";
import { createUser } from "./modules/Auth/auth.module";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebase.config";

const cors = require("cors");
const app = express(); // creates new express application
const PORT = 3000;
const firebaseApp = initializeApp(firebaseConfig);
app.use(cors()); // informs express to use the cors middleware (Cross Origin Request Sharing)
app.use(express.json()); // allows JSON responses to be read
express.urlencoded({ extended: false }); // allows urlencoded responses to be read

// Need a POST route to /login in which will authenticate a user with credentials (Google OAuth or username and password).
app.post("/login", async (req, res) => {});
// need a POST route to /signup in which will create a user account using information provided (either OAuth with Google or with email and password).
app.post("/signup", (req, res) => {
  createUser(firebaseApp, req.body);
});

app.get("/", (req, res) => {
  res.json("Hello World"); // sends back a JSON response to the client of "Hello World"
});

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`)); // tells express to listen on the port specified on localhost
