import express from "express";
import cors from "cors";
import config from "./config";
import { AuthRoutes } from "./routes/Auth.routes";
import { connectDb } from "./util/database.utility";
const app = express(); // creates new express application
app.use(cors()); // informs express to use the cors middleware (Cross Origin Request Sharing)
app.use(express.json()); // allows JSON responses to be read
express.urlencoded({ extended: false }); // allows urlencoded responses to be read

(async function main() {
  await connectDb(); // Before making any routes for the server, wait for DB to connect
  app.use("/auth", AuthRoutes()); // setup routes for AuthService. Second argument must be a function EXECUTION rather than a reference.
  app.listen(config.express.port, () =>
    console.log(`App running on http://localhost:${config.express.port}`)
  ); // tells express to listen on the port specified on localhost
})();
